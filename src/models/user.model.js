import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary url
      required: true,
    },
    coverImage: {
      type: String, //cloudinary url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
    try {
      // Check if the password field is modified
      if (!this.isModified('password')) return next();
  
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(this.password, 10);
  
      // Set the hashed password in the user document
      this.password = hashedPassword;
  
      // Continue with the save operation
      next();
    } catch (error) {
      // Handle the error (e.g., log or pass it to the next middleware)
      next(error);
    }
  });

userSchema.methods.isPasswordCorrect = async function(password) {
   return await bcrypt.compare(password, this.password)
} 


userSchema.methods.generateAccessToken = async function() {

    // Create a JWT payload containing the user information
    const payload = {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    }

    // Sign the JWT with a secret key and set an expiration time
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
    return accessToken;
}

userSchema.methods.generateRefreshToken = async function() {
    // Create a JWT payload containing the user information
    const payload = {
        _id: this._id
    }

    // Sign the JWT with a secret key and set an expiration time
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
    return refreshToken;
}


export const User = mongoose.model("User", userSchema);
