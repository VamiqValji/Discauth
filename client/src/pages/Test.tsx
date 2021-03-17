import React from 'react';
import {gql} from "apollo-boost";
import {graphql} from "react-apollo";

interface TestProps {

}

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`

const Test: React.FC<TestProps> = ({}) => {
    console.log(getBooksQuery);
    return (
        <>
            <h2>Test Page</h2>
        </>
    );
}

export default graphql(getBooksQuery)(Test);