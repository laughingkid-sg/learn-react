import mongoose from 'mongoose';
require("dotenv").config()

const db = async () => mongoose.connect(process.env.DB!)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB Error => ", err));

export default db