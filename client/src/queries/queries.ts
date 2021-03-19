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
    mutation addBook($name: String!, $genre: String!) {
        addBook(name: $name, authorID: "random", genre:$genre) {
        name
    }
}
`

export { getBooksQuery, addBookMutation };