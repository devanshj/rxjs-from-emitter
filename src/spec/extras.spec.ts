import { EventExtras } from "../package";
import { AssertTrue, AreEqual, Method } from "./utils";

class Emitter {
	on(
		eventName: string,
		listener: Function,
		extra0: boolean,
		extra1?: number
	) {}
	
	off(
		eventName: string,
		listener: Function
	) {}
}

type ExpectedEventExtras = [boolean, number?];

type E = Emitter;
type M = Method<E>;
type ActualEventExtras = EventExtras<E, M>

type Tests = [
	AreEqual<
		ExpectedEventExtras,
		ActualEventExtras
	>
];

type Works = AssertTrue<Tests[number]>