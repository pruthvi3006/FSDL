import React, { useState } from 'react';

const initialState = {
  studentName: '',
  course: '',
  instructor: '',
  rating: 5,
  comment: ''
};

function FeedbackForm({ onSubmit }) {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...formData,
      rating: Number(formData.rating)
    });
    setFormData(initialState);
  };

  return (
    <section className="feedback-form-section">
      <h2>Submit Feedback</h2>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <label>
          Student Name
          <input name="studentName" value={formData.studentName} onChange={handleChange} required />
        </label>
        <label>
          Course
          <input name="course" value={formData.course} onChange={handleChange} required />
        </label>
        <label>
          Instructor
          <input name="instructor" value={formData.instructor} onChange={handleChange} required />
        </label>
        <label>
          Rating
          <select name="rating" value={formData.rating} onChange={handleChange}>
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </label>
        <label>
          Comments
          <textarea name="comment" value={formData.comment} onChange={handleChange} required />
        </label>
        <button type="submit">Submit Feedback</button>
      </form>
    </section>
  );
}

export default FeedbackForm;
