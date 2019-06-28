import { EventIdentifier, ObservedValue, EventIdentifierStrict } from "../package";
import { AssertTrue, AreEqual, Method } from "./utils";

class UntypedNodeEmitter {

	addListener(
		eventName: string | symbol,
		listener: (...args: any[]) => void
	) {}

	removeListener(
		eventName: string | symbol,
		listener: (...args: any[]) => void
	) {}

}

type ExpectedEventName =
	| symbol
	| string;

type ExpectedStrictEventName = never;

type ExpectedObservedValue<I> =
	I extends string | symbol ? unknown :
	never;

type E = UntypedNodeEmitter;
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
		ExpectedObservedValue<string | symbol>,
		ActualObservedValue<string | symbol>
	>,
	AreEqual<
		ExpectedObservedValue<"non-exsistent-event">,
		ActualObservedValue<"non-exsistent-event">
	>
];

type Works = AssertTrue<Tests[number]>