const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));
const PORT = 3000;


app.get('/api/helloWorld', (req, res) => {
    res.send(`<div> Welcome to your barebones Node App</div>`);
})

app.listen(PORT, ()=>{
    console.log(`app running on port ${PORT}`);
})