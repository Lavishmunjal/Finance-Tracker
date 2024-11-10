import {SignedIn, SignedOut, SignInButton, SignUpButton, UserButton} from '@clerk/clerk-react'

export const Auth = ()=>{
    return (
    <div className='sign-in-conatiner'>
        <SignedOut>
            <SignUpButton mode='modal' />
            <SignInButton mode='modal'/>
            {/* <UserButton/> */}
        </SignedOut>

        <SignedIn>
            <UserButton/>
            {/* <SignInButton/> */}

        </SignedIn>
        </div>
    )
}