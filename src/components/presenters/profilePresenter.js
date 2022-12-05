import { useUserStore } from "@/data/flowerStore";
import { signOutUser } from "@/data/persistence/firebaseAuth";
import ProfileView from "../views/profileView";

const Profile = {
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
        currentUser={useUserStore().currentUser}
        onSignOut={signOutACB} />
    );
  }
}

export default Profile
