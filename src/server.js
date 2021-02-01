require('./db/connection');
const express = require ("express")
const {User} = require("./models/User")
// use port given OR us./user port 5000 as below
const port = process.env.PORT || 5000
const app = express();
app.use(express.json());
// json>javascript middleware
app.get("/health", (req, res) => {
    // this will be the route to get health fro the database
    res.status(200).send({message: "API is working"});
});
// status(200 = code of error for users)
// get all users
app.get("/users", async(req, res) => {
    try {
        const allUsers = await User.find({})
        res.status(200).send(allUsers);
    } catch (error) {
        res.status(500).send(error);
    }
    // this will be the route to get users from the database
    // return all users in an array
    
});
// add a user * try catch and error feedback. 
app.post("/users", async (req, res) =>{
    try{
        const user = new User(req.body);
        const savedUser = await user.save();
        // function for new user input
        console.log(req.body);
        res.status(201).send(savedUser);
    } catch (error) {
        res.status(500).send({message: "Could not connect"});
    }
});
app.patch("/user/:id", async (req, res) => {
    // this is the route to update a user
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        console.log(user)
        res.status(200).send(user)
    } catch (error) {
        res.status(404).send({message: "User not found"});
    }
});

app.delete("/user/:id", async (req, res) => {
    // this is the route to delete a user
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).send(user)
    } catch (error) {
        res.status(404).send({message: "User not found"})
    }
});

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});
