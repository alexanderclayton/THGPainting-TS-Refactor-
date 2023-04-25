import mongoose, { Document, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    isCorrectPassword: (password: string) => Promise<boolean>;
}

interface UserDocument extends IUser, Document {}

const userSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
      },
      password: {
        type: String,
        required: true,
        minlength: 5,
      },
      avatar: {
        type: String,
      },
});

userSchema.pre<UserDocument>('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model<UserDocument>('User', userSchema);

export { User, UserDocument };