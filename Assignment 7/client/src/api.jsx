import axios from 'axios';

export async function fetchFeedbacks() {
  const response = await axios.get('/api/feedback');
  return response.data;
}

export async function submitFeedback(feedback) {
  const response = await axios.post('/api/feedback', feedback);
  return response.data;
}
