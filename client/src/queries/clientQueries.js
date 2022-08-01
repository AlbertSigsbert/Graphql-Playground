import { gql } from "@apollo/client";

const GET_BOOKS = gql`
  query GetBooks {
    books {
      name
      genre
      id
    }
  }
`;


const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      name
      age
      id
    }
  }
`;


export { GET_AUTHORS, GET_BOOKS};