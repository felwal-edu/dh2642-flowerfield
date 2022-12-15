import useFlowerStore from "@/store/flowerStore";
import { watch } from "vue";
import HomeView from "../views/homeView";

const HomePresenter = {
  data() {
    return {
      userStatus: undefined,
    }
  },

  created () {
    this.userStatus = useFlowerStore().currentUser;

    // watch user status
    watch(() => useFlowerStore().currentUser, function (newUser) {
      this.userStatus = newUser;
    }.bind(this));
  },

  render() {
    return <HomeView userStatus={this.userStatus} />;
  }
};

export default HomePresenter;
