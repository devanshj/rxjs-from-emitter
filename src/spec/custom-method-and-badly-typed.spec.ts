import { EventExtras, EventIdentifier, EventIdentifierStrict, ObservedValue } from "../package";
import { AssertTrue, AreEqual, Method } from "./utils";
import { ListenerHandlerKey } from "../package/types/listener-handler";
import { AreExact } from "../package/types/utils";

class Emitter {
	register(
		eventName: string,
		listener: Function
	): void;

	register(
		eventName: "a",
		listener: (a0: "a", a1: "b") => void
	): true

	register(
	eventName: "b",
	listener: (a0: any, a1: "c") => void
	): { "foo": "foo" }

	register(
		eventName: string,
		listener: Function
	): true | { "foo": "foo" } {
		return Math.random() ? true : { "foo": "foo" } ;
	}

	unregister(
		eventName: string,
		listener: Function
	) {}

	somethingElse(
		foo: string,
		bar: Function
	) {}

	somethingElseElse(
		bar: string,
		baz: number
	) {}
}

type ExpectedEventIdentifier = string;
type ExpectedEventIdentifierStrict = "a" | "b";
type ExpectedObservedValue<I> =
	I extends "a" ? ["a", "b"] :
	I extends "b" ? [any, "c"]:
	unknown;

type ExpectedListenerHandlerKey = 
	| "unregister"
	| "register"
	| "somethingElse"

type E = Emitter;
type M = "register";
type ActualEventIdentifier = EventIdentifier<E, M>;
type ActualEventIdentifierStrict = EventIdentifierStrict<E, M>;
type ActualObservedValue<I extends EventIdentifier<E, M>> = ObservedValue<E, M, I>;
type ActualListenerHandlerKey = ListenerHandlerKey<E>;

type debug = AreExact<[any, "c"], any[]>

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
		ExpectedObservedValue<"a">,
		ActualObservedValue<"a">
	>,
	AreEqual<
		ExpectedObservedValue<"b">,
		ActualObservedValue<"b">
	>,
	AreEqual<
		ExpectedObservedValue<"non-existent-event">,
		ActualObservedValue<"non-existent-event">
	>,
	AreEqual<
		ExpectedListenerHandlerKey,
		ActualListenerHandlerKey
	>
];

type Works = AssertTrue<Tests[number]>