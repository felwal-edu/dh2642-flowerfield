import { signOutUser } from "@/persistence/firebaseAuth";
import useFlowerStore from "@/store/flowerStore";
import ProfileView from "../views/profileView";
import { rankDisplay, progressBarValue } from "@/utils/plantUtils";
import { watch } from "vue";
import { waitingForUserToBeSignedIn } from "@/utils/userUtils";
import "../css/profile.css"
import log from "@/utils/logUtils";

const ProfilePresenter = {
  data() {
    return {
      userStatus: undefined,
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
      this.$router.push({ name: "home" });
    }

    function changeUsernameACB(evt, newName) {
      if (evt.key === 'Enter') {
        log.d("update name:", newName);
        useFlowerStore().setUserName(newName)
      }
    }

    return (
      <ProfileView
        currentUser={useFlowerStore().currentUser}
        onSignOut={signOutACB.bind(this)}
        amountPlants={useFlowerStore().plants.length}
        currentRank={rankDisplay(useFlowerStore().ranks, useFlowerStore().experience)}
        experienceBar={progressBarValue(useFlowerStore().ranks, useFlowerStore().experience)}
        onChangeUsername={changeUsernameACB.bind(this)}
        userName={useFlowerStore().userName} />
    );
  }
};

export default ProfilePresenter;
