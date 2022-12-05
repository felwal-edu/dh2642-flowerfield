
export default
function App(){
    return (
        <div>
            <div>
                <router-link to="/">Home</router-link>
                <router-link to="/about">About</router-link>
                <router-link to="/upload">Upload</router-link>
            </div>
            <div>
                <router-view></router-view>
            </div>

        </div>
    )
}
