import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Well done! Chatbot deployed.');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`The application is listening on port ${PORT}!`);
})