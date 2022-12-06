import useFlowerStore from "@/data/flowerStore";
import HomeView from "../views/homeView";

const HomePresenter = {
  data() {
    return {
        userStatus: undefined,
    }
  },

  created () {
    // TODO WAIT FOR FIREBASE TO LOAD FIRS
    this.userStatus = useFlowerStore().currentUser;
    useFlowerStore().$subscribe(function (mutation, state) {
      if (mutation.events.key === "currentUser") {
        // transform plant list to object with id as key
        this.userStatus = mutation.events.newValue;
      }
    }.bind(this));
  },

  render() {
    return <HomeView userStatus={this.userStatus}/>;
  }
}

export default HomePresenter
