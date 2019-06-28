import { Method, AssertTrue } from "./utils";
import { EventIdentifier, EventIdentifierStrict, ObservedValue } from "../package";
import { AreEqual } from "../package/types/utils";

class EmitterWith15Events {

	on(
		eventName: string,
		listener: (_: "something-something") => void
	): void;

    on(
		eventName: "event-0",
		listener: (_: "event-0-result") => void
	): void;


	on(
		eventName: "event-1",
		listener: (_: "event-1-result") => void
	): void;


	on(
		eventName: "event-2",
		listener: (_: "event-2-result") => void
	): void;


	on(
		eventName: "event-3",
		listener: (_: "event-3-result") => void
	): void;


	on(
		eventName: "event-4",
		listener: (_: "event-4-result") => void
	): void;


	on(
		eventName: "event-5",
		listener: (_: "event-5-result") => void
	): void;


	on(
		eventName: "event-6",
		listener: (_: "event-6-result") => void
	): void;


	on(
		eventName: "event-7",
		listener: (_: "event-7-result") => void
	): void;


	on(
		eventName: "event-8",
		listener: (_: "event-8-result") => void
	): void;


	on(
		eventName: "event-9",
		listener: (_: "event-9-result") => void
	): void;


	on(
		eventName: "event-10",
		listener: (_: "event-10-result") => void
	): void;


	on(
		eventName: "event-11",
		listener: (_: "event-11-result") => void
	): void;

	on(
		eventName: "event-12",
		listener: (_: "event-12-result") => void
	): void;

	on(
		eventName: "event-13",
		listener: (_: "event-13-result") => void
	): void;

	on(
		eventName: "event-14",
		listener: (_: "event-14-result") => void
	): void;
    
    on(
        eventName: string,
        listener: Function
    ) {}

    off(
        eventName: string,
        listener: Function
    ) {}
}

type E = EmitterWith15Events;
type M = Method<E>;

type ExpectedEventIdentifier = unknown;
type ExpectedEventIdentifierStrict = unknown;
type ExpectedObservedValue<I> = 
	I extends "event-0" ? "event-0-result" :
	I extends "event-1" ? "event-1-result" :
	I extends "event-2" ? "event-2-result" :
	I extends "event-3" ? "event-3-result" :
	I extends "event-4" ? "event-4-result" :
	I extends "event-5" ? "event-5-result" :
	I extends "event-6" ? "event-6-result" :
	I extends "event-7" ? "event-7-result" :
	I extends "event-8" ? "event-8-result" :
	I extends "event-9" ? "event-9-result" :
	I extends "event-10" ? "event-10-result" :
	I extends "event-11" ? "event-11-result" :
	I extends string ? unknown :
	unknown;

type ActualEventIdentifier = EventIdentifier<E, M>
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
		ExpectedObservedValue<"event-5">,
		ActualObservedValue<"event-5">
	>,
	AreEqual<
		ExpectedObservedValue<"non-exsistent-event">,
		ActualObservedValue<"non-exsistent-event">
	>
];

type Works = AssertTrue<Tests[number]>;
