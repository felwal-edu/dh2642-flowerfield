import { removeUser, signOutUser } from "@/persistence/firebaseAuth";
import useFlowerStore from "@/store/flowerStore";
import ProfileView from "../views/profileView";
import { getRank, getProgressBarValue } from "@/utils/plantUtils";
import { waitingForUserToBeSignedIn } from "@/utils/userUtils";
import "../css/profile.css"
import log from "@/utils/logUtils";
import { deleteUserData } from "@/persistence/firebaseModel";
import { mapState } from "pinia";
import LoadingView from "@/views/loadingView";
import DialogView from "@/views/dialogView";

const ProfilePresenter = {
  data() {
    return {
      showDeleteAccountDialog: false,
    };
  },

  computed: {
    ...mapState(useFlowerStore, {userStatus: "currentUser"})
  },

  render() {
    if (waitingForUserToBeSignedIn(this.userStatus, this.$router)) return <LoadingView />;

    function signOutACB() {
      signOutUser();
      this.$router.push({name: "home"});
    }

    function showDeleteAccountDialogACB() {
      this.showDeleteAccountDialog = true;
    }

    function hideDeleteAccountDialogACB() {
      this.showDeleteAccountDialog = false;
    }

    function deleteAccountACB() {
      deleteUserData(useFlowerStore().currentUser);
      removeUser();
      this.$router.push({name: "home"});
    }

    function setUserNameACB(newName) {
      useFlowerStore().setUserName(newName)
    }

    return (
      <div>
        <ProfileView
          currentUser={useFlowerStore().currentUser}
          onSignOut={signOutACB.bind(this)}
          onDeleteAccount={showDeleteAccountDialogACB.bind(this)}
          currentRank={getRank(useFlowerStore().ranks, useFlowerStore().experience)}
          experienceBar={getProgressBarValue(useFlowerStore().ranks, useFlowerStore().experience)}
          onChangeUserName={setUserNameACB.bind(this)}
          userName={useFlowerStore().userName} />
        {
          this.showDeleteAccountDialog
            ? <DialogView
              title="Delete account?"
              message="This action cannot be undone."
              buttonPrimaryText="Delete"
              onButtonPrimaryClick={deleteAccountACB.bind(this)}
              cancel
              onDismiss={hideDeleteAccountDialogACB.bind(this)} />
            : undefined
        }
      </div>
    );
  }
};

export default ProfilePresenter;
