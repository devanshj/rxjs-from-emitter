import { EventIdentifier, ObservedValue, EventIdentifierStrict } from "../package";
import { AssertTrue, AreEqual, Method } from "./utils";

class UntypedDOMEmitter {

	addEventListener(
		eventName: string,
		listener: (event: any) => void
	) {}

	removeEventListener(
		eventName: string,
		listener: (event: any) => void
	) {}

}

type ExpectedEventIdentifier = string;
type ExpectedStrictEventIdentifier = never;
type ExpectedObservedValue<I> = any;

type E = UntypedDOMEmitter;
type M = Method<E>
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
		ExpectedObservedValue<string>,
		ActualObservedValue<string>
	>
];
type Works = AssertTrue<Tests[number]>;