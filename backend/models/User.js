import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    googleId: {
      type: String
    },

    password: {
      type: String
    },

    role: {
      type: String,
      default: "user"
    }
  },
  {
    timestamps: true
  }
);

// Hash password before saving
userSchema.pre("save", async function () {
  if (this.isModified("password") && this.password) {
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(
      this.password,
      salt
    );
  }
});

// Check password during login
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(
    password,
    this.password
  );
};

const User = mongoose.model("User", userSchema);

export default User;