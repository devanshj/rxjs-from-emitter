import { Method, AssertTrue } from "./utils";
import { AreEqual } from "../package/types/utils";
import { EventIdentifier, EventIdentifierStrict, ObservedValue } from "../package";


class MyEventEmitter {

	on(e: "a", l: (e: "a") => void){ }
	addListener(e: "b", l: (e: "b") => void){ }
	addEventListener(e: "c", l: (e: "c") => void){ }

	off(e: "a", l: (e: "a") => void){ }
	removeListener(e: "b", l: (e: "b") => void){ }
	removeEventListener(e: "c", l: (e: "c") => void){ }
}


type ExpectedEventIdentifier =
	| "a"
	| "b"
	| "c";

type ExpectedEventIdentifierStrict =
	| "a"
	| "b"
	| "c";

type ExpectedObservedValue<I> =
	I extends "a" ? "a" :
	I extends "b" ? "b" :
	I extends "c" ? "c" :
	never;

type E = MyEventEmitter;
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
		ExpectedObservedValue<"a">,
		ActualObservedValue<"a">
	>,
	AreEqual<
		ExpectedObservedValue<"b">,
		ActualObservedValue<"b">
	>,
	AreEqual<
		ExpectedObservedValue<"c">,
		ActualObservedValue<"c">
	>
];

type Works = AssertTrue<Tests[number]>;