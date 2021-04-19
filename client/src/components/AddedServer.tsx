import React, { useRef } from 'react';
import { useSelector } from "react-redux";
import { useMutation } from '@apollo/client';
import { deleteServerMutation } from "../mutations/ownerMutations";
import { loggedInformation } from "../ts/interface";


interface AddedServerProps {
    serverName: string | undefined,
    code: string | undefined
}

const AddedServer: React.FC<AddedServerProps> = ({serverName, code}) => {

    const cardRef = useRef<HTMLDivElement>(null);

    const loggedInfo:loggedInformation = useSelector((state:any) => state.loggedInfo);

    const [deleteServerMutationVar/*, { loading: mutationLoading, error: mutationError }*/] = useMutation(deleteServerMutation);

    return (
    <div ref={cardRef}>
        <br/>
        <div className="addedServerContainer">
            <div className="info">
                <h3>{serverName}</h3>
                <h4>Verification Code: <span>{code}</span></h4>
            </div>
            <i onClick={() => {
                deleteServerMutationVar({
                    variables: {
                        googleId: loggedInfo.id, 
                        serverName: serverName,
                    }
                });
                cardRef.current?.remove();
            }} className="fas fa-trash cursorPointer"></i>
        </div>
    </div>);
}

export default AddedServer;