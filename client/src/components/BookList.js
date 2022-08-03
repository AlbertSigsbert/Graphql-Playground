import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_BOOKS } from "../queries/clientQueries";
import BookDetails from "./BookDetails";

function BookList(props) {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [selected, setSelected] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div>
      <ul id="book-list">
        {data.books.map((book) => (
          <li key={book.id} onClick={(e) => setSelected(book.id)}>
            {book.name}
          </li>
        ))}
      </ul>
      <BookDetails bookId={selected} />
    </div>
  );
}

export default BookList;
