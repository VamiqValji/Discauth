import React, { useRef } from 'react';
import { /*gql,*/ useQuery, useMutation } from '@apollo/client';
import { getBooksQuery, addBookMutation } from "../queries/queries";

interface TestProps {

}

const Test: React.FC<TestProps> = (/*{}*/) => {

    const bookName:any = useRef(null);
    const genre:any = useRef(null);

    const { loading, error, data } = useQuery(getBooksQuery);
    console.log(loading, error, data);

    const [addBook, { loading: mutationLoading, error: mutationError }] = useMutation(addBookMutation, {
        refetchQueries: MutationRes => [{query: getBooksQuery}],
        // awaitRefetchQueries: true
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <>
            <h2>Test Page</h2>
            {
                data.books.map((book:any) => {
                    return (
                    <ul key={book.id + Math.random().toString()}>
                        <br/>
                        <li>Name: {book.name}</li>
                        <li>ID: {book.id}</li>
                        <li>Genre: {book.genre}</li>
                    </ul>);
                })
            }
            <br/><br/>
            <form onSubmit={(e) => {
                e.preventDefault();
                // addBookMutation(bookName.current.value, genre.current.value);
                addBook({
                    variables: {
                        name: bookName.current.value, 
                        genre: genre.current.value
                    },
                    // refetchQueries: [{query:getBooksQuery}]
                    // optimisticResponse: {
                    //     __typename: "Mutation",
                    //     addBook: {
                    //         name: bookName.current.value, 
                    //         genre: genre.current.value,
                    //     }
                    // }
                }
            );
                bookName.current.value = "";
                genre.current.value = "";
                console.log("mutationRes", mutationLoading, mutationError);
            }}>
                <label htmlFor="bookName">Book Name:</label><br/>
                <input ref={bookName} type="text" placeholder="Book Name" required/><br/>
                <label htmlFor="genre">Genre:</label><br/>
                <input ref={genre} type="text" placeholder="Doe" required/><br/><br/>
                <input type="submit" value="Submit"/>
            </form> 
        </>
    );
}

export default Test;