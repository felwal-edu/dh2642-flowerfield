import ErrorView from "@/views/errorView";

const ErrorPresenter = {
  data() {
    return {
      errorMessage: ""
    };
  },

  render() {
    function goToHomeACB() {
      this.$router.push({name: "home"});
    }

    return <ErrorView onGoToHome={goToHomeACB.bind(this)} />;
  }
};

export default ErrorPresenter;
