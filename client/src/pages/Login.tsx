import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import React from 'react'
import { /*gql, useQuery,*/ useMutation } from '@apollo/client';
import { addOwnerMutation } from "../queries/ownerQueries";

interface LoginProps {

}

const Login: React.FC<LoginProps> = (/*{}*/) => {

    const [addBook, { loading: mutationLoading, error: mutationError }] = useMutation(addOwnerMutation, {
        // refetchQueries: MutationRes => [{query: getBooksQuery}],
    });
    
    const successResponseGoogle = (res: GoogleLoginResponse | GoogleLoginResponseOffline | any) => {
        console.log(res.profileObj.imageUrl);
        addBook({
            variables: {
                discordID: "",
                discordName: "",
                email: res.profileObj.email, 
                googleId: res.profileObj.googleId,
            },
        });
    }

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