import { isPromiseLoading } from "@/utils/loadingUtils";
import LoadingView from "./loadingView";

function promiseNoData(promiseState, renderErrorACB, linearProgressBar=false) {
  if (!promiseState.promise) {
    return <div>No data</div>;
  }

  if (isPromiseLoading(promiseState)) {
    return <LoadingView linear={linearProgressBar} />;
  }

  if (promiseState.promise && promiseState.error && !promiseState.data) {
    return renderErrorACB() || <div>{promiseState.error.toString()}</div>;
  }
  if (promiseState.promise && !promiseState.error && promiseState.data) {
    return false;
  }
}

export default promiseNoData;
