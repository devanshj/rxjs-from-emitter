import { DomEmitter, NodeEmitter, JqueryEmitter } from "../package/types/preset-emitter";

export type AssertTrue<T extends true> = T;
export type Method<E> =
	E extends DomEmitter ? "addEventListener" :
	E extends NodeEmitter ? "addListener" :
	E extends JqueryEmitter ? "on" :
	never

export { AreEqual } from "../package/types/utils";