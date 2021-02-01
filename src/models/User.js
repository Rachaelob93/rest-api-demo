const mongoose = require ("mongoose")
const userSchema = new mongoose.Schema({
    // name ,email, password
    name: {
        type: String,
        required: true,
    },
    email: {
      type: String,
      required: true,
      validate (value) {
        if (!validator.isEmail(value)) {
            throw new Error("Invalid Email")  
      } 
    },
},
    password: {
    type: String,
    required: true,
},
})
const User = mongoose.model("User", userSchema)
module.exports = {
    User
};




