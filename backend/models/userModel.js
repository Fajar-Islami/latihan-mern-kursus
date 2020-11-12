import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

// Middleware //

// Untuk login
// Sebelum brcrypt di controller
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Untuk create
userSchema.pre('save', async function (next) {
  // agar password tidak dihash ketika update email dan nama, password tidak di update
  if (!this.isModified('password')) {
    next(); // dilewati proses dibawah
  }

  const salt = await bcrypt.genSalt(10);
  // ketika input password, di hash
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
