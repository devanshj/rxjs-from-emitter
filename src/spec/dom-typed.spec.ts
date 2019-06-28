import { EventIdentifier, EventIdentifierStrict, ObservedValue } from "../package";
import { AssertTrue, Method, AreEqual } from "./utils";

class CustomEventA { private _ = "" }
class CustomEventB { private _ = "" }

class TypedDOMEmitter {

	addEventListener(
		eventName: "event-a",
		listener: (event: CustomEventA) => void
	): void;

	addEventListener(
		eventName: "event-b",
		listener: (event: CustomEventB) => void
	): void;

	addEventListener(
		eventName:
			| "event-a"
			| "event-b",
		listener:
			| ((event: CustomEventA) => void)
			| ((event: CustomEventB) => void)
	) {}

	removeEventListener(
		eventName: "event-a",
		listener: (event: CustomEventA) => void
	): void;

	removeEventListener(
		eventName: "event-b",
		listener: (event: CustomEventB) => void
	): void;

	removeEventListener(
		eventName:
			| "event-a"
			| "event-b",
		listener:
			| ((event: CustomEventA) => void)
			| ((event: CustomEventB) => void)
	) {}
}

type ExpectedEventIdentifier =
	| "event-a"
	| "event-b";

type ExpectedEventIdentifierStrict =
	| "event-a"
	| "event-b";

type ExpectedObservedValue<I> =
	I extends "event-a" ? CustomEventA :
	I extends "event-b" ? CustomEventB :
	never;

type E = TypedDOMEmitter;
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
		ExpectedEventIdentifierStrict,
		ActualEventIdentifierStrict
	>,
	AreEqual<
		ExpectedObservedValue<"event-a">,
		ActualObservedValue<"event-a">
	>,
	AreEqual<
		ExpectedObservedValue<"event-b">,
		ActualObservedValue<"event-b">
	>
];

type Works = AssertTrue<Tests[number]>;