import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  return response.json({ message: 'NLW Together Method GET' });
});

app.post('/test-post', (request, response) => {
  return response.json({ message: 'NLW Together Method POST' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
