export type ListenerHandler<
	I0 extends any, A0 extends any[], X0 extends any[],
	I1 extends any, A1 extends any[], X1 extends any[],
	I2 extends any, A2 extends any[], X2 extends any[],
	I3 extends any, A3 extends any[], X3 extends any[],
	I4 extends any, A4 extends any[], X4 extends any[],
	I5 extends any, A5 extends any[], X5 extends any[],
	I6 extends any, A6 extends any[], X6 extends any[],
	I7 extends any, A7 extends any[], X7 extends any[],
	I8 extends any, A8 extends any[], X8 extends any[],
	I9 extends any, A9 extends any[], X9 extends any[],
	I10 extends any, A10 extends any[], X10 extends any[],
	I11 extends any, A11 extends any[], X11 extends any[],
	I12 extends any, A12 extends any[], X12 extends any[],
	I13 extends any, A13 extends any[], X13 extends any[],
	I14 extends any, A14 extends any[], X14 extends any[],
> = {

	(
		identifier: I0,
		listener: (...args: A0) => any,
		...extras: X0
	): any;

	(
		identifier: I1,
		listener: (...args: A1) => any,
		...extras: X1
	): any;

	(
		identifier: I2,
		listener: (...args: A2) => any,
		...extras: X2
	): any;

	(
		identifier: I3,
		listener: (...args: A3) => any,
		...extras: X3
	): any;

	(
		identifier: I4,
		listener: (...args: A4) => any,
		...extras: X4
	): any;

	(
		identifier: I5,
		listener: (...args: A5) => any,
		...extras: X5
	): any;

	(
		identifier: I6,
		listener: (...args: A6) => any,
		...extras: X6
	): any;

	(
		identifier: I7,
		listener: (...args: A7) => any,
		...extras: X7
	): any;

	(
		identifier: I8,
		listener: (...args: A8) => any,
		...extras: X8
	): any;

	(
		identifier: I9,
		listener: (...args: A9) => any,
		...extras: X9
	): any;

	(
		identifier: I10,
		listener: (...args: A10) => any,
		...extras: X10
	): any;

	(
		identifier: I11,
		listener: (...args: A11) => any,
		...extras: X11
	): any;

	(
		identifier: I12,
		listener: (...args: A12) => any,
		...extras: X12
	): any;

	(
		identifier: I13,
		listener: (...args: A13) => any,
		...extras: X13
	): any;

	(
		identifier: I14,
		listener: (...args: A14) => any,
		...extras: X14
	): any;

}

type IsListenerHandler<T> = 
	T extends (
		identifier: any,
		listener: (...args: any[]) => any,
		...extras: any[]
	) => any
		? true
		: false;

export type ListenerHandlerKey<T> = {
	[K in keyof T]:
		IsListenerHandler<T[K]> extends true
			? K
			: never
}[keyof T];