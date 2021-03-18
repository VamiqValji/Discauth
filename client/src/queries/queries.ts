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

const addBookMutation = (bookName:string, genre:string) => {
    return(gql`
    mutation {
        addBook(name: "${bookName}", authorID: "random_${Math.random().toString()}", genre:"${genre}") {
        id
        }
    }
    `);
}

export { getBooksQuery, addBookMutation };