import { gql } from '@apollo/client';

const getBooksQuery = gql`
{
    books {
      id
      name
      genre
    }
}
`;

const addBookMutation = gql`
    mutation ($name: String!, $genre: String!) {
        addBook(name: $name, authorID: "random", genre:$genre) {
        id
        }
    }
`

export { getBooksQuery, addBookMutation };