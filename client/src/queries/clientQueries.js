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

const GET_BOOK = gql`
  query ($id: ID) {
    book(id: $id) {
      name
      genre
      id
      author{
        name
        age
        id
        books{
          name
          id
        }
      }
    }
  }
`;

export { GET_AUTHORS, GET_BOOKS, GET_BOOK};
