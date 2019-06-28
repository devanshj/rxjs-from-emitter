import { fromEmitter } from "../package";
import { AreEqual } from "../package/types/utils";
import { Observable } from "rxjs";
import { ChildProcess } from "child_process";
import { AssertTrue } from "./utils";


const click$ = fromEmitter(document.querySelector<HTMLElement>(".something")!).eventStrict("click");
const unknownDomEvent$ = fromEmitter(document.body).event("random");

const exit$ = fromEmitter(process).eventStrict("exit");
const childExit$ = fromEmitter({} as ChildProcess).eventStrict("exit");
const unknownNodeEvent$ = fromEmitter({} as ChildProcess).event("random");

const connection$ =
    fromEmitter({} as SocketIO.Server)
    .withMethods("on", null)
    .eventStrict("connection");

const request$ =
    fromEmitter({} as SocketIO.Server)
    .withMethods("checkRequest", null)
    .event("somethingIdk");

const message$ =
    fromEmitter({} as SocketIO.Socket)
    .event("some-message-event")

type Tests = [
    AreEqual<
        typeof click$,
        Observable<MouseEvent>
    >,
    AreEqual<
        typeof unknownDomEvent$,
        Observable<Event>
    >,
    AreEqual<
        typeof exit$,
        Observable<number>
    >,
    AreEqual<
        typeof childExit$,
        Observable<[number | null, string | null]>
    >,
    AreEqual<
        typeof unknownNodeEvent$,
        Observable<unknown>
    >,
    AreEqual<
        typeof connection$,
        Observable<SocketIO.Socket>
    >,
    AreEqual<
        typeof request$,
        Observable<[any, boolean]>
    >,
    AreEqual<
        typeof message$,
        Observable<unknown>
    >
];

type Works = AssertTrue<Tests[number]>