import { gql } from "@apollo/client";

const ADD_BOOK = gql`
   mutation addBook($name: String!, $genre: String!, $authorId:  ID!){
        addBook(name:$name, genre:$genre, authorId: $authorId){
           id
           name
           genre
        }
   }
`;


export { ADD_BOOK };
