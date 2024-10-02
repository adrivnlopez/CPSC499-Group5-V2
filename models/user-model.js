import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({ //model for each entry
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
export default User;