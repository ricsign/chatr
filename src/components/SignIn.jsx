import React from "react";
import { Button } from "@mui/material";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../serve/firebase.js";

function SignIn() {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider); // after sign in, auth variable is automatically changed to signed in
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
      <Button style={{ padding: '30px', fontSize: '20px', fontWeight: '600' }} onClick={googleSignIn} variant="contained">Sign In With Google</Button>
    </div>
  );
}

export default SignIn;
