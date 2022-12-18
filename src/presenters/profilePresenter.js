import { removeUser, signOutUser } from "@/persistence/firebaseAuth";
import useFlowerStore from "@/store/flowerStore";
import ProfileView from "../views/profileView";
import { rankDisplay, progressBarValue } from "@/utils/plantUtils";
import { waitingForUserToBeSignedIn } from "@/utils/userUtils";
import "../css/profile.css"
import log from "@/utils/logUtils";
import { deleteUserData } from "@/persistence/firebaseModel";
import { mapState } from "pinia";
import LoadingView from "@/views/loadingView";

const ProfilePresenter = {
  computed: {
    ...mapState(useFlowerStore, { userStatus: "currentUser" })
  },

  render() {
    if (waitingForUserToBeSignedIn(this.userStatus, this.$router)) return <LoadingView />;

    function signOutACB() {
      signOutUser();
      this.$router.push({ name: "home" });
    }

    function deleteAccountACB() {
      if (window.confirm("Are you sure that you want to delete your account?")) {
        deleteUserData(useFlowerStore().currentUser);
        removeUser();

        this.$router.push({ name: "home" });
      }
    }

    function changeUserNameACB(newName) {
      log.d("update name:", newName);
      useFlowerStore().setUserName(newName)
    }

    return (
      <ProfileView
        currentUser={useFlowerStore().currentUser}
        onSignOut={signOutACB.bind(this)}
        onDeleteAccount={deleteAccountACB.bind(this)}
        currentRank={rankDisplay(useFlowerStore().ranks, useFlowerStore().experience)}
        experienceBar={progressBarValue(useFlowerStore().ranks, useFlowerStore().experience)}
        onChangeUserName={changeUserNameACB.bind(this)}
        userName={useFlowerStore().userName} />
    );
  }
};

export default ProfilePresenter;
