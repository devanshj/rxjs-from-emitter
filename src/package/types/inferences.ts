import { ListenerHandler } from "./listener-handler";
import { AreEqual, AreExact, MathMax, ToNumber, SubtractFrom15, Add1 } from "./utils";

export type Inferences<E, M extends string> = Exclude<{
	[K in keyof E]:
		K extends M
			? E[K] extends ListenerHandler<
				infer I0, infer A0, infer X0,
				infer I1, infer A1, infer X1,
				infer I2, infer A2, infer X2,
				infer I3, infer A3, infer X3,
				infer I4, infer A4, infer X4,
				infer I5, infer A5, infer X5,
				infer I6, infer A6, infer X6,
				infer I7, infer A7, infer X7,
				infer I8, infer A8, infer X8,
				infer I9, infer A9, infer X9,
				infer I10, infer A10, infer X10,
				infer I11, infer A11, infer X11,
				infer I12, infer A12, infer X12,
				infer I13, infer A13, infer X13,
				infer I14, infer A14, infer X14
			>
				? [
					TransfromInference<{ "I": I0, "A": A0, "X": X0 }>,
					TransfromInference<{ "I": I1, "A": A1, "X": X1 }>,
					TransfromInference<{ "I": I2, "A": A2, "X": X2 }>,
					TransfromInference<{ "I": I3, "A": A3, "X": X3 }>,
					TransfromInference<{ "I": I4, "A": A4, "X": X4 }>,
					TransfromInference<{ "I": I5, "A": A5, "X": X5 }>,
					TransfromInference<{ "I": I6, "A": A6, "X": X6 }>,
					TransfromInference<{ "I": I7, "A": A7, "X": X7 }>,
					TransfromInference<{ "I": I8, "A": A8, "X": X8 }>,
					TransfromInference<{ "I": I9, "A": A9, "X": X9 }>,
					TransfromInference<{ "I": I10, "A": A10, "X": X10 }>,
					TransfromInference<{ "I": I11, "A": A11, "X": X11 }>,
					TransfromInference<{ "I": I12, "A": A12, "X": X12 }>,
					TransfromInference<{ "I": I13, "A": A13, "X": X13 }>,
					TransfromInference<{ "I": I14, "A": A14, "X": X14 }>,
				]
				: never
			: never
}[keyof E], undefined>;

export type EmptyInference =
	{ "I": never, "A": never[], "X": never[] };

type TransfromInference<T> = 
	AreEqual<T, { "I": any, "A": any[], "X": any[] }> extends true
		? EmptyInference
		: T;

export type InferencesLength<
	G extends any[]
> =
	SubtractFrom15<
		MathMax<{
			[K in keyof G]:
				AreExact<G[K], EmptyInference> extends true
					? Add1<ToNumber<K>>
					: never
		}>
	>;