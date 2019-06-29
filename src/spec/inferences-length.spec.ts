import { AreEqual } from "../package/types/utils";
import { InferencesLength, EmptyInference } from "../package/types/inferences";
import { AssertTrue } from "./utils";

type Tests = [
	AreEqual<
		InferencesLength<[
			EmptyInference,
			EmptyInference,
			EmptyInference,
			EmptyInference,
			EmptyInference,
			EmptyInference,
			EmptyInference,
			EmptyInference,
			EmptyInference,
			EmptyInference,
			EmptyInference,
			EmptyInference,
			EmptyInference,
			{ I: "click", A: ["somthing"], X: [] },
			{ I: "move", A: ["somthing-else"], X: [number?] },
		]>,
		2
	>,
	AreEqual<
		InferencesLength<[
			EmptyInference,
			EmptyInference,
			EmptyInference,
			EmptyInference,
			EmptyInference,
			EmptyInference,
			EmptyInference,
			EmptyInference,
			{ I: any, A: any, X: any },
			{ I: never, A: never, X: never },
			{ I: never[], A: never, X: never },
			{ I: never[], A: never, X: any },
			{ I: any, A: any, X: any[] },
			{ I: any, A: any[], X: [] },
			{ I: any, A: [], X: [] }
		]>,
		7
	>
]
type Works = AssertTrue<Tests[number]>;