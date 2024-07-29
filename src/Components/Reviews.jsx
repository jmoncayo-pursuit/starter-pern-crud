// src/Components/Reviews.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Review from './Review';

const API = import.meta.env.VITE_BASE_URL;

function Reviews() {
  const [reviews, setReviews] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    fetch(`${API}/bookmarks/${id}/reviews`)
      .then((response) => response.json())
      .then((response) => {
        setReviews(response.reviews);
      });
  }, [id, API]);
  return (
    <section className='Reviews'>
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </section>
  );
}

export default Reviews;
