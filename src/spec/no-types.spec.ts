import { Method, AssertTrue } from "./utils";
import { EventIdentifier, EventIdentifierStrict, ObservedValue } from "../package";
import { AreEqual } from "../package/types/utils";

class NoTypesEmitter {
	on(
		name: any,
		handler: any
	) {};

	off(
		name: any,
		handler: any
	) {};
}

type E = NoTypesEmitter;
type M = Method<E>;
type ExpectedEventIdentifier = any;
type ExpectedEventIdentifierStrict = never;
type ExpectedObservedValue<I> = unknown;

type ActualEventIdentifier = EventIdentifier<E, M>;
type ActualEventIdentifierStrict = EventIdentifierStrict<E, M>;
type ActualObservedValue<I> = ObservedValue<E, M, I>;

type Tests = [
	AreEqual<
		M,
		"on"
	>,
	AreEqual<
		ExpectedEventIdentifier,
		ActualEventIdentifier
	>,
	AreEqual<
		ExpectedEventIdentifierStrict,
		ActualEventIdentifierStrict
	>,
	AreEqual<
		ExpectedObservedValue<"something">,
		ActualObservedValue<"something">
	>
];

type Works = AssertTrue<Tests[number]>