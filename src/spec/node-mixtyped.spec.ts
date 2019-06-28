import { EventIdentifier, ObservedValue, EventIdentifierStrict } from "../package";
import { AssertTrue, AreEqual, Method } from "./utils";

class SomeType { private _ = "" }
const someSymbol = Symbol("foo");

class MixtypedNodeEmitter {

	addListener(
		eventName: string | symbol,
		listener: (...args: any[]) => void
	): void;

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
		eventName: string | symbol,
		listener: (...args: any[]) => void
	): void;

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

type ExpectedEventIdentifier =
	| "event-a"
	| typeof someSymbol
	| symbol
	| string;

type ExpectedStrictEventIdentifier =
	| "event-a"
	| typeof someSymbol;

type ExpectedObservedValue<I> =
	I extends "event-a" ? [number, string] :
	I extends typeof someSymbol ? SomeType :
	I extends string | symbol ? unknown :
	never;

type E = MixtypedNodeEmitter;
type M = Method<E>;
type ActualEventIdentifier = EventIdentifier<E, M>;
type ActualEventIdentifierStrict = EventIdentifierStrict<E, M>;
type ActualObservedValue<I extends EventIdentifier<E, M>> = ObservedValue<E, M, I>;

type Tests = [
	AreEqual<
		ExpectedEventIdentifier,
		ActualEventIdentifier
	>,
	AreEqual<
		ExpectedStrictEventIdentifier,
		ActualEventIdentifierStrict
	>,
	AreEqual<
		ExpectedObservedValue<"event-a">,
		ActualObservedValue<"event-a">
	>,
	AreEqual<
		ExpectedObservedValue<typeof someSymbol>,
		ActualObservedValue<typeof someSymbol>
	>,
	AreEqual<
		ExpectedObservedValue<string | symbol>,
		ActualObservedValue<string | symbol>
	>,
	AreEqual<
		ExpectedObservedValue<"non-exsistent-event">,
		ActualObservedValue<"non-exsistent-event">
	>
];

type Works = AssertTrue<Tests[number]>