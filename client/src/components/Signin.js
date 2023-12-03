import React from "react";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

function Signin({ showSignin, setShowSignin }) {
    
    return (
        <div>
            {showSignin ? (
                <>
                <SigninForm setShowSignin={setShowSignin} />
                </>
            ) : (
                <>
                <SignupForm setShowSignin={setShowSignin} />
                </>
            )
            }
        </div>
    )
}

export default Signin;
