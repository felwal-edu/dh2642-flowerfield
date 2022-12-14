import { signOutUser } from "@/persistence/firebaseAuth";
import useFlowerStore from "@/store/flowerStore";
import ProfileView from "../views/profileView";
import { rankDisplay } from "@/utils/plantUtils";

const ProfilePresenter = {
  data() {
    return {
    };
  },

  render() {
    function signOutACB() {
      signOutUser();
      // return to home
      this.$router.push({name: "home"});
    }

    return (
      <ProfileView
        currentUser={useFlowerStore().currentUser}
        onSignOut={signOutACB}
        userExperience={useFlowerStore().experience}
        amountPlants={useFlowerStore().plants.length}
        currentRank={rankDisplay(useFlowerStore().experience)} />
    );
  }
};

export default ProfilePresenter;
