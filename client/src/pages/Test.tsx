import React from 'react';
import { useQuery, gql } from '@apollo/client';

interface TestProps {

}

const getBooksQuery = gql`
{
    books {
      id
      name
      genre
      author {
        id
      }
    }
}
`;

const Test: React.FC<TestProps> = ({}) => {

    const { loading, error, data } = useQuery(getBooksQuery);
    console.log(loading, error, data)

    return (
        <>
            <h2>Test Page</h2>
        </>
    );
}

export default Test;