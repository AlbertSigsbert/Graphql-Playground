import { useQuery } from "@apollo/client";
import { GET_BOOK } from "../queries/clientQueries";

function BookDetails(props) {
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { id: props.bookId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  if (data.book !== null) {
    const { book } = data;
    return (
      <div id="book-details">
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>All Books By This Author</p>
        <ul className="other-books">
          {book.author.books.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div id="book-details">
      <p>No Book Selected...</p>
    </div>
  );
}

export default BookDetails;
