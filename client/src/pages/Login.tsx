import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import React from 'react'

interface LoginProps {

}

const responseGoogle = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log(res);
  }

const Login: React.FC<LoginProps> = (/*{}*/) => {
        return (
            <>
                <GoogleLogin
                    clientId="189591425875-5kbjefvskjc36qsl9guqcmla5ut759ip.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </>
        );
}

export default Login;