import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const UserSchema = new mongoose.Schema(
    {
        _id: { type: String, default: uuidv4 },
        username: { type: String, required: true, unique: true, trim: true },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: { type: String, required: true, select: false },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
    },
    {
        timestamps: true,
        toJSON: {
            // Transforma o _id em id e remove __v e a senha quando o objeto é serializado
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                delete ret.password;
                return ret;
            },
        },
    }
);

const User = mongoose.model('User', UserSchema);

const findUserByEmail = async (email) => {
    return await User.findOne({ email }).select('+password');
};

const findUserByUsername = async (username) => {
    return await User.findOne({ username }).select('+password');
};

const findUserById = async (id) => {
    return await User.findById(id);
};

const createUser = async (userData) => {
    return await User.create(userData);
};

const updateUser = async (id, userData) => {
    return await User.findByIdAndUpdate(id, userData, { new: true });
};

const findAllUsers = async () => {
    return await User.find({});
};

const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};

export default {
    findUserByEmail,
    findUserByUsername,
    findUserById,
    createUser,
    updateUser,
    findAllUsers,
    deleteUser,
};
