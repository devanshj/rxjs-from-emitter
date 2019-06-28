import { AssertTrue, Method } from "./utils";
import { AreEqual } from "../package/types/utils";
import { EmitterInferences, EmptyInference } from "../package/types/inferences";
import { MixtypedDOMEmitter, CustomEventA, CustomEventB } from "./dom-mixtyped.spec";

type Works = AssertTrue<
    AreEqual<
        EmitterInferences<MixtypedDOMEmitter, Method<MixtypedDOMEmitter>>,
        [
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
            { I: string, A: any[], X: [] },
            { I: "event-a", A: [CustomEventA], X: [] },
            { I: "event-b", A: [CustomEventB], X: [] }
        ]
    >
>