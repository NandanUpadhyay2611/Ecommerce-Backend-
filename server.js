const express = require ('express')
const bodyParser=require('body-parser')
const mongoose=require("mongoose")

const usersRoute=require("./routes/user");
const app = express();

const db=mongoose.connect("mongodb+srv://nandanupadhyay1234:pkPPznLjgogmQZkC@cluster0.5ltnqvy.mongodb.net/Ecommerce")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/users',usersRoute);


// // declare a route with a response
// app.get('/', (req, res) => {
//   res.send("What's up doc ?!");
// });



// start the server
app.listen(3000, () => {
  console.log(`server running : http://localhost:3000`);

  });