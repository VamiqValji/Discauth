import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import React from 'react'
import { /*gql, useQuery,*/ useMutation } from '@apollo/client';
import { addOwnerMutation } from "../queries/ownerQueries";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut } from "../actions/index";

interface LoginProps {

}

interface loggedInformation {
    loggedIn: boolean,
    id: string
}

const Login: React.FC<LoginProps> = (/*{}*/) => {

    const dispatch = useDispatch();

    const loggedInfo:loggedInformation = useSelector((state:any) => state.loggedInfo);
    console.log(loggedInfo);

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
        dispatch(logIn(res.profileObj.googleId));
    }

    if (loggedInfo.loggedIn) {
        return  (
            <>
                <h1>Instructions</h1>
                <p>Click <a href="https://discord.com/api/oauth2/authorize?client_id=822620298679287850&permissions=8&scope=bot">here</a> to add Discauth bot to your server.</p>
                <p>As the owner of a server you would like to connect Discauth to, write `.registerServer` in a channel, then refresh this web page.</p>
                <p>Now, write `<b>.verifyOwner {"placeHolderCode"}</b>` in a channel, then refresh this web page.</p>
            </>
        );
    }
    return (
        <>
            <GoogleLogin
                clientId="189591425875-5kbjefvskjc36qsl9guqcmla5ut759ip.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={successResponseGoogle}
                onFailure={(res:any) => {
                    console.log(res, mutationLoading, mutationError)
                    dispatch(logOut());
                }}
                cookiePolicy={'single_host_origin'}
            />
        </>
    );
}

export default Login;