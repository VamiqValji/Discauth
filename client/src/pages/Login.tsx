import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import React from 'react'

interface LoginProps {

}

const successResponseGoogle = (res: GoogleLoginResponse | GoogleLoginResponseOffline | any) => {
    console.log(res.profileObj.email);
    console.log(res.profileObj.googleId);
    console.log(res.profileObj.imageUrl);
}

const Login: React.FC<LoginProps> = (/*{}*/) => {
    return (
        <>
            <GoogleLogin
                clientId="189591425875-5kbjefvskjc36qsl9guqcmla5ut759ip.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={successResponseGoogle}
                onFailure={(res:any) => console.log(res)}
                cookiePolicy={'single_host_origin'}
            />
        </>
    );
}

export default Login;