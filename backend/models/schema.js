import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
fullName: { type: String, required: true },
email: { type: String, required: true },
phone: { type: String, required: true },
state: { type: String },
course: { type: String },
intakeYear: { type: String },
consent: { type: Boolean, default: false },
createdAt: { type: Date, default: Date.now }
});


export default mongoose.model('USER', userSchema);