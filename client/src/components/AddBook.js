import {useQuery } from "@apollo/client";

import { GET_AUTHORS} from '../queries/clientQueries'

function AddBook(props) {
  const { loading, error, data } = useQuery(GET_AUTHORS);

  if (error) return <p>Error :</p>;

  return (
    <form id="add-book">
      <div className="field">
        <label htmlFor="">Book Name:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label htmlFor="">Genre:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label htmlFor="">Select Author</label>
       
        {!error && (
          <select>
            {loading ? (
              <option disabled>Loading Authors...</option>
            ) : (
              data.authors.map((author) => (
                <option key={author.id} value={author.name}>
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
