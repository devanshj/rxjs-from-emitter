import { And, AreEqual, IsLiteral, IsLessThan15, AreExact, IsAnyArray } from "./utils";
import { Inferences, InferencesLength } from "./inferences";

// -------------------------
// EventIdentifier

type _EventIdentifier<E, M extends string> =
	| Inferences<E, M>[number]["I"]
	| (
		And<[
			E extends HTMLElement ? true : false,
			M extends "addEventListener" ? true : false
		]> extends true
			? keyof HTMLElementEventMap
			: never
	);

export type EventIdentifier<E, M extends string> =
	| _EventIdentifier<E, M>
	| (
		IsLessThan15<InferencesLength<Inferences<E, M>>> extends true
			? never
			: unknown
	);

// -------------------------
// EventIdentifierStrict

export type __EventIdentifierStrict<
	E,
	M extends string,
	G extends Inferences<E, M> = Inferences<E, M>
> = 
	| {
		[K in keyof G]:
			G[K] extends { "I": infer I }
				? IsLiteral<I> extends true
					? I
					: never
				: never
	}[number]
	| (
		And<[
			E extends HTMLElement ? true : false,
			M extends "addEventListener" ? true : false
		]> extends true
			? {
				[I in keyof HTMLElementEventMap]:
					IsLiteral<I> extends true
						? I
						: never
			}[keyof HTMLElementEventMap]
			: never
	);

type _EventIdentifierStrict<
		E,
		M extends string,
		G extends Inferences<E, M> = Inferences<E, M>
	> = 
	| __EventIdentifierStrict<E, M, G>
	| (
		IsLessThan15<InferencesLength<G>> extends true
			? never
			: unknown
	);

export type EventIdentifierStrict<E, M extends string> = 
	_EventIdentifierStrict<E, M>;

// -------------------------
// EventExtras

type _EventExtras<E, M extends string> =
	Exclude<Inferences<E, M>[number]["X"], never[]>;

export type EventExtras<E, M extends string> = 
	_EventExtras<E, M> extends never
		? []
		: _EventExtras<E, M>;


// -------------------------
// ObservedValue

type _ObservedValue<
	E,
	M extends string,
	I extends EventIdentifier<E, M>,
	G extends Inferences<E, M> = Inferences<E, M>
> =
	TransformArgs<
		| {
			[K in keyof G]:
				G[K] extends { "I": infer GI, "A": infer GA }
					? AreEqual<I, GI> extends true
						? GA
						: never
					: never
		}[number]
		| (I extends __EventIdentifierStrict<E, M>
			? never
			: {
				[K in keyof G]:
					G[K] extends { "I": infer GI, "A": infer GA }
						? I extends GI
							? GA
							: never
						: never
			}[number]
		)
		| (
			I extends __EventIdentifierStrict<E, M>
				? never
				: IsLessThan15<InferencesLength<G>> extends true
					? never
					: any[]
		)
		| (
			And<[
				E extends HTMLElement ? true : false,
				M extends "addEventListener" ? true : false
			]> extends true 
				? I extends keyof HTMLElementEventMap
					? [HTMLElementEventMap[I]]
					: never
				: never
		)
	>;

export type ObservedValue<
	E,
	M extends string,
	I extends EventIdentifier<E, M>
> =
	_ObservedValue<E, M, I>

type TransformArgs<A> = 
	IsAnyArray<A> extends true
		? unknown :
	A extends any[]
		? A["length"] extends 0
			? never
			: A["length"] extends 1
				? A[0]
				: A :
	never;