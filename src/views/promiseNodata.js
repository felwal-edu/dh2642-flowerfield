
function promiseNoData(promiseState) {
    if (!promiseState.promise) {
        return <div>No data</div>;
    }
    if (promiseState.promise && !promiseState.error && !promiseState.data) {
        return (
            <div justify="center" align="center"><img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" />
            </div>
        );
    }

    if (promiseState.promise && promiseState.error && !promiseState.data) {
        return <div>{promiseState.error.toString()}</div>;
    }
    if (promiseState.promise && !promiseState.error && promiseState.data) {
        return false;
    }

}

export default promiseNoData;
