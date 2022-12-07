export default function resolvePromise(promise, promiseState, notifyACB) {
  if (!promise) return;

  // cancel uncompleted previous promise
  if (promiseState.promise && !promiseState.data && !promiseState.error) {
    // TODO: cancel
    //cancelPromise(promiseState.promise);
  }

  promiseState.promise = promise;
  promiseState.data = null;
  promiseState.error = null;

  if (notifyACB) notifyACB();

  function saveDataACB(result) {
    if (promiseState.promise !== promise) return;

    promiseState.data = result;
    if (notifyACB) notifyACB();
  }

  function saveErrorACB(err) {
    if (promiseState.promise !== promise) return;

    promiseState.error = err;
    if (notifyACB) notifyACB();
  }

  promise.then(saveDataACB).catch(saveErrorACB);
}

export function resolvePromiseMock(response, promiseState, notifyACB) {
  promiseState.promise = null;
  promiseState.data = response;
  promiseState.error = null;

  if (notifyACB) notifyACB();
}
