
# Problems

Apart from not being type-safe, there are some things that `fromEvent` got wrong on a more design-level. They are as follows &ndash;

Also, I may come across as someone picking on RxJS or it's types. Absolutely not, I love RxJS and am grateful to the smart and selfless folks working on it. I'm criticizing only to show how `fromEmitter` is solving these problems.

## The way `fromEvent` checks if the first argument passed is an emitter or not is incorrect

Let's say you wrote a NodeJS code like &ndash;

```typescript
const exit$ = fromEvent(process, "exit")
```

You actually get a TypeScript error if you are in strict mode (which is recommended) saying &ndash;

```plaintext
Argument of type 'Process' is not assignable to parameter of type 'FromEventTarget<unknown>'.
    Type 'Process' is not assignable to type 'JQueryStyleEventEmitter'.
        Types of property 'on' are incompatible.
            ...
                ...
                    Type 'string' is not assignable to type '"beforeExit"'.ts(2345)
```

Huh? An error? But you can listen to "exit" event with...

```typescript
process.addListener("exit", code => {
    // do somthing
})
```

Also `typeof process` should clearly extend [`NodeStyleEventEmitter`](https://github.com/ReactiveX/rxjs/blob/a9fa9d421d69e6e07aec0fa835b273283f8a034c/src/internal/observable/fromEvent.ts#L9-L12) &ndash;

```typescript
interface NodeStyleEventEmitter {
    addListener: (eventName: string | symbol, handler: NodeEventHandler) => this;
    removeListener: (eventName: string | symbol, handler: NodeEventHandler) => this;
}
```

Then what's going on :thinking:

The thing is `process` doesn't extend `NodeStyleEventEmitter`. Because type definition looks like [this](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/d200340ecb521b3856f8bbf6e5b61a33182f9363/types/node/globals.d.ts#L940-L951) &ndash;

```typescript
    interface Process extends EventEmitter {

        ...
        addListener(event: "beforeExit", listener: BeforeExitListener): this;
        addListener(event: "disconnect", listener: DisconnectListener): this;
        addListener(event: "exit", listener: ExitListener): this;
        addListener(event: "rejectionHandled", listener: RejectionHandledListener): this;
        addListener(event: "uncaughtException", listener: UncaughtExceptionListener): this;
        addListener(event: "unhandledRejection", listener: UnhandledRejectionListener): this;
        addListener(event: "warning", listener: WarningListener): this;
        addListener(event: "message", listener: MessageListener): this;
        addListener(event: Signals, listener: SignalsListener): this;
        addListener(event: "newListener", listener: NewListenerListener): this;
        addListener(event: "removeListener", listener: RemoveListenerListener): this;
        addListener(event: "multipleResolves", listener: MultipleResolveListener): this;
        ...

    }
```

If you notice none of the overloads have `event: string`. All of them are string literals, they are narrower/more specific that string. Hence they can't extend string and hence `typeof process` can't extend `NodeStyleEventEmitter`

```typescript
type IsNodeStyleEventEmitter = typeof process extends NodeStyleEventEmitter ? "yep" : "nope";
// "nope"
```

Also having string literals is a good practice, they make the user unable to write code like `process.addListener("foo", ...)`.

This doesn't stop at `process`. You can't use `fromEvent` for anything that is typed like this. Example &ndash;

```typescript
class MyEmitter {
    ...
    on(name: "event-1", listener: (event: SomeEvent) => void);
    on(name: "event-2", listener: (event: SomeEvent) => void);
    ...
    off(name: "event-1", listener: (event: SomeEvent) => void);
    off(name: "event-2", listener: (event: SomeEvent) => void);
}
```

## `fromEvent` has different goals

All the [emitter interfaces](https://github.com/ReactiveX/rxjs/blob/a9fa9d421d69e6e07aec0fa835b273283f8a034c/src/internal/observable/fromEvent.ts#L9-L47) are designed to support well-known emitter styles like `DOM`'s `EventTarget`, node's `EventEmitter`, and jQuery style that is with methods `on` & `off`.

Even a minor change in the style will make it incompatible with `fromEvent`. For example let's say the you want to use `fromEvent` with a 3rd party event emitter that is jQuery style except `on` takes number as event names instead of string. Now if someone is writing JS, they can use `fromEvent` and it would work because it passes whatever the type is to the `on` method. On the otherhand in TS you'll get a error saying `on` methods are not compatible because it wants string.

Also in case of DOM style emitters, it actually just assumes that it's DOM's EventTarget and thus it returns observable of type [`Event`](https://github.com/microsoft/TypeScript/blob/3e6856137ad2618dcdfe13ee49a06cca8e4d7ee2/lib/lib.dom.d.ts#L5092-L5099) in lib.dom.d.ts

## It's a little too strict

You know when you create a observable via the constructor, [it's optional to return `TearDownLogic`](https://github.com/ReactiveX/rxjs/blob/01a09789a0a9484c368b7bd6ed37f94d25490a00/src/internal/types.ts#L30). But for event emitters it's compulsory to have a function that removes the listener. A lot of 3rd party event emitters don't have removers. For example there is no `off` method in socket.io's socket, there is only `on`.

# Solution

Firstly `fromEmitter` can take any emitters that have the style &ndash;

```typescript
{
    [addMethod]: (
        eventIdentifier: any,
        listener: (...args: any[]) => any,
        ...extras: any[]
    ) => any

    [removeMethod]?: (
        eventIdentifier: any,
        listener: (...args: any[]) => any,
        ...extra: any[]
    ) => any
}
```

The user has to provide name of addMethod and name of removeMethod or `null` via the `withMethods` method. But only when we can't find the popular pairs like `on` & `off` and others.

The style doesn't care about any things that it doesn't depend on. For example the return types, extra arguments etc. The style is just strict enough to not cause runtime errors.

This little (or huge xD) change in the design solves all the above problems.
