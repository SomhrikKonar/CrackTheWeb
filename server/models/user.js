import  mongoose  from "mongoose"

const userSchema = new mongoose.Schema({
username: {
    type: String,
    unique: true,
    required: true,
},
email:{
type: String,
unique: true,
required: true,
},
password:{
type: String,
required: true,
min:6
},
isAdmin: {
    type: Boolean,
}
})
const User = mongoose.model('User', userSchema)
export default User