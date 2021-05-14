import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Well done!');
})

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log(`The application is listening on port ${PORT}!`);
})