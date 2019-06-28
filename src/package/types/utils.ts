export type And<T extends boolean[]> = 
	AreEqual<T[number], true>;

export type Or<T extends boolean[]> = 
	AreEqual<T[number], false> extends true
		? false
		: true;

export type AreEqual<A, B> =
	IsAny<A> extends true
		? IsAny<B> extends true
			? true 
			: false :
	IsAny<B> extends true
		? IsAny<A> extends true
			? true
			: false :
	_AreEqual<A, B>;

export type IsAny<T> =
	_AreEqual<
		_AreEqual<T, "anything-except-any">,
		boolean
	>;

type _AreEqual<A, B> =
	Exclude<A, B> extends never
		? Exclude<B, A> extends never
			? true
			: false
		: false;

export type IsStringLiteral<T> =
	T extends string
		? string extends T
			? false
			: true
		: false;
	
export type IsSymbolLiteral<T> =
	T extends symbol
		? symbol extends T
			? false
			: true
		: false;

export type IsNumberLiteral<T> =
	T extends symbol
		? symbol extends T
			? false
			: true
		: false;

export type IsLiteral<T> =
	Or<[
		IsStringLiteral<T>,
		IsNumberLiteral<T>,
		IsSymbolLiteral<T>
	]>;

// https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650
export type AreExact<A, B> = 
    (<T>() => T extends A ? 0 : 1) extends (<T>() => T extends B ? 0 : 1)
		? true
		: false;

export type IsAnyArray<T> = 
	T extends any[]
		? IsAny<T[0]> extends true
			? AreEqual<T["length"], number> extends true
				? true
				: false
			: false
		: false;



export type IsLessThan15<T> = 
	T extends 0 ? true :
	T extends 1 ? true :
	T extends 2 ? true :
	T extends 3 ? true :
	T extends 4 ? true :
	T extends 5 ? true :
	T extends 6 ? true :
	T extends 7 ? true :
	T extends 8 ? true :
	T extends 9 ? true :
	T extends 10 ? true :
	T extends 11 ? true :
	T extends 12 ? true :
	T extends 13 ? true :
	T extends 14 ? true :
	false

export type ToNumber<T> = 
	T extends "0" ? 0 :
	T extends "1" ? 1 :
	T extends "2" ? 2 :
	T extends "3" ? 3 :
	T extends "4" ? 4 :
	T extends "5" ? 5 :
	T extends "6" ? 6 :
	T extends "7" ? 7 :
	T extends "8" ? 8 :
	T extends "9" ? 9 :
	T extends "10" ? 10 :
	T extends "11" ? 11 :
	T extends "12" ? 12 :
	T extends "13" ? 13 :
	T extends "14" ? 14 :
	T extends "15" ? 15 :
	number;

export type MathMax<Xs extends number[]> =
	15 extends Xs[number] ? 15 :
	14 extends Xs[number] ? 14 :
	13 extends Xs[number] ? 13 :
	12 extends Xs[number] ? 12 :
	11 extends Xs[number] ? 11 :
	10 extends Xs[number] ? 10 :
	9 extends Xs[number] ? 9 :
	8 extends Xs[number] ? 8 :
	7 extends Xs[number] ? 7 :
	6 extends Xs[number] ? 6 :
	5 extends Xs[number] ? 5 :
	4 extends Xs[number] ? 4 :
	3 extends Xs[number] ? 3 :
	2 extends Xs[number] ? 2 :
	1 extends Xs[number] ? 1 :
	0 extends Xs[number] ? 0 :
	number;

export type SubtractFrom15<T extends number> =
	0 extends T ? 15 :
	1 extends T ? 14 :
	2 extends T ? 13 :
	3 extends T ? 12 :
	4 extends T ? 11 :
	5 extends T ? 10 :
	6 extends T ? 9 :
	7 extends T ? 8 :
	8 extends T ? 7 :
	9 extends T ? 6 :
	10 extends T ? 5 :
	11 extends T ? 4 :
	12 extends T ? 3 :
	13 extends T ? 2 :
	14 extends T ? 1 :
	15 extends T ? 0 :
	number;

export type Add1<T extends number> =
	0 extends T ? 1 :
	1 extends T ? 2 :
	2 extends T ? 3 :
	3 extends T ? 4 :
	4 extends T ? 5 :
	5 extends T ? 6 :
	6 extends T ? 7 :
	7 extends T ? 8 :
	8 extends T ? 9 :
	9 extends T ? 10 :
	10 extends T ? 11 :
	11 extends T ? 12 :
	12 extends T ? 13 :
	13 extends T ? 14 :
	14 extends T ? 15 :
	15 extends T ? 16 :
	number;