import { EventIdentifier, EventExtras, ObservedValue, EventIdentifierStrict } from "./types";
import { Observable } from "rxjs"
import { DomEmitter, NodeEmitter, JqueryEmitter } from "./types/preset-emitter";
import { ListenerHandlerKey } from "./types/listener-handler";



type FromEmitter = 
	<E>(emitter: E) =>
		E extends DomEmitter ? {
			event: EventSelector<E, "addEventListener">
			eventStrict: EventSelectorStrict<E, "addEventListener">
		} :
		E extends NodeEmitter ? {
			event: EventSelector<E, "addListener">
			eventStrict: EventSelectorStrict<E, "addListener">
		} :
		E extends JqueryEmitter ? {
			event: EventSelector<E, "on">
			eventStrict: EventSelectorStrict<E, "on">
		} :
		WithMethods<E>;

type EventSelector<E, M extends string> =
	<I extends EventIdentifier<E, M>>
		(identifier: I, ...extras: EventExtras<E, M>)
			=> Observable<ObservedValue<E, M, I>>;

type EventSelectorStrict<E, M extends string> =
	<I extends EventIdentifierStrict<E, M>>
		(identifier: I, ...extras: EventExtras<E, M>)
			=> Observable<ObservedValue<E, M, I>>;

type WithMethods<E> = {
	withMethods:<
		A extends ListenerHandlerKey<E> & string,
		R extends
			| Exclude<ListenerHandlerKey<E>, A> & string
			| null
	>(
		addListenerMethodName: A,
		removeListenerMethodName: R
	) =>
		{
			event: EventSelector<E, A>
			eventStrict: EventSelectorStrict<E, A>
		}
}

export const fromEmitter = (
	(emitter: any) =>
		isDomEmitter(emitter) ? {
			event: (identifier: any, ...extras: any[]) =>
				fromEvent(
					emitter,
					["addEventListener", "removeEventListener"],
					identifier,
					...extras
				),
			eventStrict: (identifier: any, ...extras: any[]) =>
				fromEvent(
					emitter,
					["addEventListener", "removeEventListener"],
					identifier,
					...extras
				)
		} :

		isNodeEmitter(emitter) ? {
			event: (identifier: any, ...extras: any[]) =>
				fromEvent(
					emitter,
					["addListener", "removeListener"],
					identifier,
					...extras
				),
			eventStrict: (identifier: any, ...extras: any[]) =>
				fromEvent(
					emitter,
					["addListener", "removeListener"],
					identifier,
					...extras
				)
		} :

		isJqueryEmitter(emitter) ? {
			event: (identifier: any, ...extras: any[]) =>
				fromEvent(
					emitter,
					["on", "off"],
					identifier,
					...extras
				),
			eventStrict: (identifier: any, ...extras: any[]) =>
				fromEvent(
					emitter,
					["on", "off"],
					identifier,
					...extras
				)
		} :
		
		({
			withMethods: (a: string, r: string | null) => ({
				event: (identifier: any, ...extras: any[]) =>
					fromEvent(
						emitter,
						[a, r],
						identifier,
						...extras
					),
				eventStrict: (identifier: any, ...extras: any[]) =>
					fromEvent(
						emitter,
						[a, r],
						identifier,
						...extras
					)
			})
		})
	) as FromEmitter;

const fromEvent = (
		emitter: any,
		methods: [string, string | null],
		eventIdentifier: any,
		...extras: any[]
	) => 
		new Observable(observer => {
			const listener =
				(...args: any[]) =>
					observer.next(
						args.length > 1
							? args
							: args[0]
					);
			emitter[methods[0]](eventIdentifier, listener, ...extras);

			() => methods[1] && emitter[methods[1]](eventIdentifier, listener);
		})

const isDomEmitter =
	(emitter: any): emitter is DomEmitter =>
		emitter &&
		typeof emitter.addEventListener === "function" &&
		typeof emitter.removeEventListener === "function";

const isNodeEmitter =
	(emitter: any): emitter is NodeEmitter =>
		emitter &&
		typeof emitter.addListener === "function" &&
		typeof emitter.removeListener === "function";

const isJqueryEmitter =
	(emitter: any): emitter is JqueryEmitter =>
		emitter &&
		typeof emitter.addListener === "function" &&
		typeof emitter.removeListener === "function";

export { EventIdentifier, EventIdentifierStrict, EventExtras, ObservedValue }