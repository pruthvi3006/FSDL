import React from 'react';

function FeedbackList({ feedbacks }) {
  if (feedbacks.length === 0) {
    return <p className="empty-state">No feedback has been submitted yet.</p>;
  }

  return (
    <section className="feedback-list-section">
      <h2>Feedback Review</h2>
      <div className="feedback-grid">
        {feedbacks.map((feedback) => (
          <article key={feedback._id} className="feedback-card">
            <div className="feedback-meta">
              <strong>{feedback.studentName}</strong>
              <span>{new Date(feedback.createdAt).toLocaleDateString()}</span>
            </div>
            <p><strong>Course:</strong> {feedback.course}</p>
            <p><strong>Instructor:</strong> {feedback.instructor}</p>
            <p><strong>Rating:</strong> {feedback.rating} / 5</p>
            <p>{feedback.comment}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FeedbackList;
