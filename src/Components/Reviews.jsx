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

  const handleDelete = (id, bookmarkId) => {
    fetch(`${API}/bookmarks/${bookmarkId}/reviews/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        const copyReviewsArr = [...reviews];
        const indexDeletedReview = copyReviewsArr.findIndex(
          (review) => {
            return review.id === id;
          }
        );
        copyReviewsArr.splice(indexDeletedReview, 1);
        setReviews(copyReviewsArr);
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = (updatedReview) => {
    fetch(`${API}/bookmarks/${id}/reviews/${updatedReview.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedReview),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // Make a copy of the array
        const copyReviewArr = [...reviews];
        // Find the index of the review that we just updated
        const indexUpdatedReview = copyReviewArr.findIndex(
          (review) => review.id === updatedReview.id
        );
        // Using the index we can reassign that review in our array to be the response we got from our HTTP request
        copyReviewArr[indexUpdatedReview] = res;
        setReviews(copyReviewArr);
      })
      .catch((err) => console.log(err));
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
        <Review
          key={review.id}
          review={review}
          handleDelete={handleDelete}
          handleSubmit={handleEdit}
        />
      ))}
    </section>
  );
}

export default Reviews;
