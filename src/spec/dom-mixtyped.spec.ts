import { ObservedValue, EventIdentifier, EventIdentifierStrict } from "../package";
import { AssertTrue, AreEqual, Method } from "./utils";

export class CustomEventA { private _ = "" }
export class CustomEventB { private _ = "" }

export class MixtypedDOMEmitter {

	addEventListener(
		eventIdentifier: string,
		listener: (...args: any[]) => void
	): void;

	addEventListener(
		eventIdentifier: "event-a",
		listener: (event: CustomEventA) => void
	): void;

	addEventListener(
		eventIdentifier: "event-b",
		listener: (event: CustomEventB) => void
	): void;

	addEventListener(
		eventIdentifier:
			| "event-a"
			| "event-b",
		listener:
			| ((event: CustomEventA) => void)
			| ((event: CustomEventB) => void)
	) {}

	removeEventListener(
		eventIdentifier: string,
		listener: (...args: any[]) => void
	): void;

	removeEventListener(
		eventIdentifier: "event-a",
		listener: (event: CustomEventA) => void
	): void;

	removeEventListener(
		eventIdentifier: "event-b",
		listener: (event: CustomEventB) => void
	): void;

	removeEventListener(
		eventIdentifier:
			| "event-a"
			| "event-b",
		listener:
			| ((event: CustomEventA) => void)
			| ((event: CustomEventB) => void)
	) {}
}

type ExpectedEventIdentifier =
	| "event-a"
	| "event-b"
	| string;

type ExpectedStrictEventIdentifier =
	| "event-a"
	| "event-b";

type ExpectedObservedValue<I> =
	I extends "event-a" ? CustomEventA :
	I extends "event-b" ? CustomEventB :
	I extends string ? unknown :
	never;

type E = MixtypedDOMEmitter;
type M = Method<E>
type ActualEventIdentifier = EventIdentifier<E, M>;
type ActualEventIdentifierStrict = EventIdentifierStrict<E, M>;
type ActualObservedValue<N extends EventIdentifier<E, M>> = ObservedValue<E, M, N>;

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
		ExpectedObservedValue<"event-b">,
		ActualObservedValue<"event-b">
	>,
	AreEqual<
		ExpectedObservedValue<string>,
		ActualObservedValue<string>
	>,
	AreEqual<
		ExpectedObservedValue<"non-existent-event">,
		ActualObservedValue<"non-existent-event">
	>
];

type Works = AssertTrue<Tests[number]>