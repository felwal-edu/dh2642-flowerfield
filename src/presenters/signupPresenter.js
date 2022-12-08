import resolvePromise from "../utils/resolvePromise.js";
import useFlowerStore from "@/store/flowerStore";
import { signUpUser } from "@/persistence/firebaseAuth.js";
import { render } from "vue";



const SignUpPresenter = {
    data() {
        return {
            email: "",
            password: "",
            password_check: ""
        }
    },

    render() {


        return (
            <SignUpView></SignUpView>
        )


    }

}

export default SignUpPresenter;

