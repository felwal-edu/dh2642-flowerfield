import { signOutUser } from "@/persistence/firebaseAuth";
import useFlowerStore from "@/store/flowerStore";
import ProfileView from "../views/profileView";
import { rankDisplay } from "@/utils/plantUtils";
import { watch } from "vue";
import { waitingForUserToBeSignedIn } from "@/utils/userUtils";
import "../css/profile.css"

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

    function changeUsernameACB(evt, newName){
      if(evt.key === 'Enter') {
        console.log("update name: " + newName);
      }
    }

    return (
      <ProfileView
        currentUser={useFlowerStore().currentUser}
        onSignOut={signOutACB.bind(this)}
        userExperience={useFlowerStore().experience}
        amountPlants={useFlowerStore().plants.length}
        currentRank={rankDisplay(useFlowerStore().experience)}
        onChangeUsername={changeUsernameACB.bind(this)}
        userName={"Bingus"} />
    );
  }
};

export default ProfilePresenter;
