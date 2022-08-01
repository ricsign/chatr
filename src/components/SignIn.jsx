import React from 'react'
import { Button } from '@mui/material'

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../serve/firebase.js'


function SignIn() {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider) // after sign in, auth variable is automatically changed to signed in 
  }

  return (
    <>
        <Button onClick={googleSignIn}>Sign In With Google</Button>
    </>
  )
}

export default SignIn