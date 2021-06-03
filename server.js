//Bring in all required dependencies/functions/variables:
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const garden = require('./routes/garden');
const cors = require('cors');

//Create your server application using express:
const app = express();

//Define your port number:
const PORT = process.env.PORT || 5000;

//DB Config/Connection:
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err))

//Middleware: 
  //Need JSON parsing, and express static to host the client:
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client/build')))
app.use('/api/garden', garden);

//Serve Static Assets in Production:
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
})