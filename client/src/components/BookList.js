import { useQuery } from "@apollo/client";

import { GET_BOOKS } from '../queries/clientQueries'


function BookList(props) {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div id="book-list">
      <ul>
        {data.books.map(book => <li key={book.id}>{book.name}</li>)}
      </ul>
    </div>
  );
}

export default BookList;
