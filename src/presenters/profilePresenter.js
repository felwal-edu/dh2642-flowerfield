import { removeUser, signOutUser } from "@/persistence/firebaseAuth";
import useFlowerStore from "@/store/flowerStore";
import ProfileView from "../views/profileView";
import { rankDisplay, progressBarValue } from "@/utils/plantUtils";
import { waitingForUserToBeSignedIn } from "@/utils/userUtils";
import "../css/profile.css"
import log from "@/utils/logUtils";
import { deleteUserData } from "@/persistence/firebaseModel";
import { mapState } from "pinia";

const ProfilePresenter = {
  computed: {
    ...mapState(useFlowerStore, {userStatus: "currentUser"})
  },

  render() {
    if (waitingForUserToBeSignedIn(this.userStatus, this.$router)) return;

    function signOutACB() {
      signOutUser();
      this.$router.push({ name: "home" });
    }

    function deleteAccountACB() {
      deleteUserData(useFlowerStore().currentUser);
      removeUser();

      this.$router.push({name: "home"});
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
        onDeleteAccount={deleteAccountACB.bind(this)}
        amountPlants={useFlowerStore().plants.length}
        currentRank={rankDisplay(useFlowerStore().ranks, useFlowerStore().experience)}
        experienceBar={progressBarValue(useFlowerStore().ranks, useFlowerStore().experience)}
        onChangeUsername={changeUsernameACB.bind(this)}
        userName={useFlowerStore().userName} />
    );
  }
};

export default ProfilePresenter;
