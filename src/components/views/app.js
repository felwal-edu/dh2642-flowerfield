
export default
function App(){
    return (
        <div>
            <div>
                <router-link to="/">Home</router-link>
                <router-link to="/about">About</router-link>
                <router-link to="/collection">Collection</router-link>
                <router-link to="/profile">Profile</router-link>
                <router-link to="/login">Login</router-link>

            </div>
            <div>
                <router-view></router-view>
            </div>

        </div>
    )
}
