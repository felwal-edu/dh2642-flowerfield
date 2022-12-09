import { signOutUser } from "@/persistence/firebaseAuth";
import useFlowerStore from "@/store/flowerStore";
import ProfileView from "../views/profileView";

const ProfilePresenter = {
  data() {
    return {
    };
  },

  render() {
    function signOutACB() {
      signOutUser();
    }

    return (
      <ProfileView
        currentUser={useFlowerStore().currentUser}
        onSignOut={signOutACB}
        userExperience={useFlowerStore().experience}
        amountPlants={useFlowerStore().plants.length} />
    );
  }
};

export default ProfilePresenter;