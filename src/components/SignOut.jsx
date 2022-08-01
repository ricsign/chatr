import React from 'react'
import { Button } from '@mui/material'

import { signOut } from "firebase/auth";
import { auth } from '../serve/firebase.js'

function SignOut() {
  return (
    <>
        <Button onClick={() => signOut(auth)}>Sign Out</Button>
    </>
  )
}

export default SignOut