// src/Components/Bookmarks.jsx
import { useState, useEffect } from 'react';
import Bookmark from './Bookmark';

const API = import.meta.env.VITE_BASE_URL;

console.log(API);
function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetch(`${API}/bookmarks`)
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        setBookmarks(responseJSON);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className='Bookmarks'>
      <section>
        <table>
          <thead>
            <tr>
              <th> Favorite </th>
              <th> Take me there </th>
              <th> Edit this bookmark </th>
            </tr>
          </thead>
          <tbody>
            {bookmarks.map((bookmark) => {
              return (
                <Bookmark key={bookmark.id} bookmark={bookmark} />
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Bookmarks;
