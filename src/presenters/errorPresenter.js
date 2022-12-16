import ErrorView from "@/views/errorView";


const ErrorPresenter = {
    data() {
        return {
            errorMessage: ""
        };
    },
    created() {
    },
    render() {

        function toHomePage() {
            this.$router.push({ name: "home" })
        }

        return (<ErrorView
            goToHomePage={toHomePage.bind(this)} />)
    }
};

export default ErrorPresenter;
