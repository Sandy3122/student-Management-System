const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.set('strictQuery', false);
const mongoUrl = process.env.MONGO_URL || 'mongodb+srv://Sandeep1999:Sandeep3122@sandeep.nlcna.mongodb.net/=studentanagementystem?retryWrites=true&w=majority';
mongoose.connect(mongoUrl, {
  maxPoolSize: 15,
})
.then(() => {
  console.log("Successfully Connected To MongoDB Database.");
})
.catch((e) => {
  console.log("Not Connected To MongoDB Database. Error:", e);
});
  

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server Start: http://localhost/${PORT}`);
});
