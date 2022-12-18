import { isPromiseLoading } from "@/utils/loadingUtils";
import LoadingView from "./loadingView";

function promiseNoData(promiseState, _callback, linearProgressBar=false) {
    if (!promiseState.promise) {
        return <div>No data</div>;
    }
    if (isPromiseLoading(promiseState)) {
        return <LoadingView linear={linearProgressBar} />;
    }

    if (promiseState.promise && promiseState.error && !promiseState.data) {
        // TODO: skicka in custom callback för error display? eller egen funktion bara...
        // jag gör en egen funktion för error i uploadView, men jag vill prata med Felix om hur man skulle alternativt kunna göra detta
        // går liksom inte i viewn riktigt eftersom viewn hämtar divven här i från.
        return _callback();
        //return <div>{promiseState.error.toString()}</div>;
    }
    if (promiseState.promise && !promiseState.error && promiseState.data) {
        return false;
    }
}

export default promiseNoData;
