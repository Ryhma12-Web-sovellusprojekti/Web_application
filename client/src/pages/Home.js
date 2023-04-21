import React from "react";
import Profile from "./Profile";
import Footer from "../components/Footer";
import Viewlinks from "../components/Viewlinks";
import { auth } from "../firebase-config";
import LoginLinks from "../components/LoginLinks";

function Home({ route }) {
    const isAuth = localStorage.getItem("isAuth");
        
if (isAuth) {
    const user = auth.currentUser;
    
    return (
        <div className="wrapper-side">
            <aside></aside>
            <section className="sidebyside">
                <main>
                    <h1>Welcome to The Visual Climate {user?.displayName}!</h1>
                    <Viewlinks route={route} />
                </main>
                <Profile />
            </section>
            <Footer />
        </div>
    );

} else {
    return(
        <div className="wrapper-side">
        <aside></aside>
        <section className="sidebyside">
            <main>
                <h1 id="error">Session timeout</h1>
                <LoginLinks/>
            </main>
            <h1>No profile</h1>
        </section>
        <Footer />
    </div>
    );
    }

}

export default Home;