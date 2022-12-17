import useFlowerStore from "@/store/flowerStore";
import { mapState } from "pinia";
import HomeView from "../views/homeView";

const HomePresenter = {
  computed: {
    ...mapState(useFlowerStore, {userStatus: "currentUser"})
  },

  render() {
    return <HomeView userStatus={this.userStatus} />;
  }
};

export default HomePresenter;
