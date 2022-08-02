import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ADD_BOOK } from "../mutations/clientMutations";

import { GET_AUTHORS, GET_BOOKS } from "../queries/clientQueries";

function AddBook(props) {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const [addBook] = useMutation(ADD_BOOK, {
    variables:{ name, genre, authorId},
    update(cache, { data:{ addBook}}){

      const {books} = cache.readQuery({ query: GET_BOOKS });

      cache.writeQuery({
        query:GET_BOOKS,
        // data: { books: books.concat([addBook])}
        data: { books: [...books, addBook ]}
      })

    }
  })

  const { loading, error, data } = useQuery(GET_AUTHORS);

  const handleSubmit = (e) => {
     e.preventDefault();

     if(name === '' || genre=== '' || authorId===''){
       return alert('Please fill all fields')
     }
      
     addBook(name,genre,authorId);

     setName('')
     setGenre('')
     setAuthorId('')
  }

  if (error) return <p>Error :</p>;

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="">Book Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value) }/>
      </div>
      <div className="field">
        <label htmlFor="">Genre:</label>
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value) } />
      </div>
      <div className="field">
        <label htmlFor="">Select Author</label>

        {!error && (
          <select  onChange={(e) => setAuthorId(e.target.value) }>
            {loading ? (
              <option disabled>Loading Authors...</option>
            ) : (
              data.authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))
            )}
          </select>
        )}
      </div>

      <button>+</button>
    </form>
  );
}

export default AddBook;
