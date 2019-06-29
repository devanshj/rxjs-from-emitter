import { EventIdentifier, EventIdentifierStrict, ObservedValue } from "./types";
import { Observable, fromEvent as rxjsFromEvent } from "rxjs";
import { DomEmitter, JqueryEmitter, NodeEmitter } from "./types/preset-emitter";

type Method<E> =
	E extends DomEmitter ? "addEventListener" :
	E extends NodeEmitter ? "addListener" :
	E extends JqueryEmitter ? "on" :
	never

type RxjsFromEvent<S extends boolean> = {
	<
		E extends DomEmitter | JqueryEmitter | NodeEmitter,
		N extends (
			S extends true
				? EventIdentifierStrict<E, Method<E>>
				: EventIdentifier<E, Method<E>>
			),
		X extends (
			E extends DomEmitter
				? [(boolean | AddEventListenerOptions)?]
				: []
		)
	>
	(emitter: E, event: N, ...options: X):
		Observable<ObservedValue<E, Method<E>, N>>;

	<T>(
		emitter:
			| DomEmitter
			| JqueryEmitter
			| NodeEmitter,
		event: string | symbol,
		options?: boolean | AddEventListenerOptions
	): 
		Observable<T>;
}

export const fromEvent = (
	(emitter: any, event: any, options: any) =>
		rxjsFromEvent(emitter, event, options)
	) as RxjsFromEvent<false>;

export const fromEventStrict = (
		(emitter: any, event: any, options: any) =>
			rxjsFromEvent(emitter, event, options)
		) as RxjsFromEvent<true>;