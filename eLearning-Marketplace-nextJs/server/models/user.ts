import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        require: true
    },
    password: {
        type: String,
        require: true,
        min: 6,
        max: 64
    },
    email: {
        type: String,
        trim: true,
        require: true,
        unique: true,
    },
    picture: {
        type: String,
        default: '/avatar.png'
    },
    role: {
        type: [String],
        default: ["Subscriber"],
        enum: ["Subscriber", "Instructor", "Admin"]
    },
    stripe_account_id: '',
    stripe_sell: {},
    stripeSession: {}
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
export {
    User
}

// export default mongoose.model('User', userSchema)