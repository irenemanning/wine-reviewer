import React from "react";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

function Signin({ setUser, showSignin, setShowSignin}) {
    return (
        <div>
            {showSignin ? (
                <>
                <SigninForm setShowSignin={setShowSignin} setUser={setUser} />
                </>
            ) : (
                <>
                <SignupForm setShowSignin={setShowSignin} setUser={setUser}/>
                </>
            )
            }
        </div>
    )
}

export default Signin;