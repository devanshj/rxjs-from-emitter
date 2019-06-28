import { EventIdentifier, ObservedValue, EventIdentifierStrict } from "../package";
import { AssertTrue, AreEqual, Method } from "./utils";

class SomeType { private _ = "" }
const someSymbol = Symbol("foo");

class TypedNodeEmitter {

	addListener(
		eventName: "event-a",
		listener: (a0: number, a1: string) => void
	): void;

	addListener(
		eventName: typeof someSymbol,
		listener: (a0: SomeType) => void
	): void;

	addListener(
		eventName:
			| "event-a"
			| typeof someSymbol,
		listener:
			| ((a0: number, a1: string) => void)
			| ((a0: SomeType) => void)
	) {}

	removeListener(
		eventName: "event-a",
		listener: (a0: number, a1: string) => void
	): void;

	removeListener(
		eventName: typeof someSymbol,
		listener: (a0: SomeType) => void
	): void;

	removeListener(
		eventName:
			| "event-a"
			| typeof someSymbol,
		listener:
			| ((a0: number, a1: string) => void)
			| ((a0: SomeType) => void)
	) {}

}

type ExpectedEventName =
	| "event-a"
	| typeof someSymbol;

type ExpectedStrictEventName =
	| "event-a"
	| typeof someSymbol;

type ExpectedObservedValue<I> =
	I extends "event-a" ? [number, string] :
	I extends typeof someSymbol ? SomeType :
	never;

type E = TypedNodeEmitter;
type M = Method<E>;
type ActualEventIdentifier = EventIdentifier<E, M>;
type ActualEventIdentifierStrict = EventIdentifierStrict<E, M>;
type ActualObservedValue<I extends EventIdentifier<E, M>> = ObservedValue<E, M, I>;

type Tests = [
	AreEqual<
		ExpectedEventName,
		ActualEventIdentifier
	>,
	AreEqual<
		ExpectedStrictEventName,
		ActualEventIdentifierStrict
	>,
	AreEqual<
		ExpectedObservedValue<"event-a">,
		ActualObservedValue<"event-a">
	>,
	AreEqual<
		ExpectedObservedValue<typeof someSymbol>,
		ActualObservedValue<typeof someSymbol>
	>
];

type Works = AssertTrue<Tests[number]>