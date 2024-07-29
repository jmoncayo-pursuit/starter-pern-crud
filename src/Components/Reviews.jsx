// src/Components/Reviews.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Review from './Review';
import ReviewForm from './ReviewForm';

const API = import.meta.env.VITE_BASE_URL;

function Reviews() {
  const [reviews, setReviews] = useState([]);
  let { id } = useParams();

  const handleAdd = (newReview) => {
    fetch(`${API}/bookmarks/${id}/reviews`, {
      method: 'POST',
      body: JSON.stringify(newReview),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        setReviews([responseJSON, ...reviews]);
      })
      .catch((error) => console.error('catch', error));
  };
  
const handleDelete = (id) => {
  fetch(`${API}/bookmarks/${id}/reviews/${id}`, {
    method: 'DELETE',
  })
    .then(
      (response) => {
        const copyReviewArray = [...reviews];
        const indexDeletedReview = copyReviewArray.findIndex(
          (review) => {
            return review.id === id;
          }
        );
        copyReviewArray.splice(indexDeletedReview, 1);
        setReviews(copyReviewArray);
      },
      (error) => console.error(error)
    )
    .catch((error) => console.warn('catch', error));
};

  useEffect(() => {
    fetch(`${API}/bookmarks/${id}/reviews`)
      .then((response) => response.json())
      .then((response) => {
        setReviews(response.reviews);
      });
  }, [id, API]);
  return (
    <section className='Reviews'>
      <h2> Reviews </h2>
      <ReviewForm handleSubmit={handleAdd}>
        <h3> Add a New Review </h3>
      </ReviewForm>
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </section>
  );
}

export default Reviews;
