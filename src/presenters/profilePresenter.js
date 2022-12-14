import { signOutUser } from "@/persistence/firebaseAuth";
import useFlowerStore from "@/store/flowerStore";
import ProfileView from "../views/profileView";
import { rankDisplay } from "@/utils/plantUtils";
import { watch } from "vue";
import { waitingForUserToBeSignedIn } from "@/utils/userUtils";

const ProfilePresenter = {
  data() {
    return {
      userStatus: undefined
    };
  },

  created() {
    this.userStatus = useFlowerStore().currentUser;

    // watch user status
    watch(() => useFlowerStore().currentUser, function (newUser) {
      this.userStatus = newUser;
    }.bind(this));
  },

  render() {
    if (waitingForUserToBeSignedIn(this.userStatus, this.$router)) return;

    function signOutACB() {
      signOutUser();
      // return to home
      this.$router.push({name: "home"});
    }

    return (
      <ProfileView
        currentUser={useFlowerStore().currentUser}
        onSignOut={signOutACB.bind(this)}
        userExperience={useFlowerStore().experience}
        amountPlants={useFlowerStore().plants.length}
        currentRank={rankDisplay(useFlowerStore().experience)} />
    );
  }
};

export default ProfilePresenter;
