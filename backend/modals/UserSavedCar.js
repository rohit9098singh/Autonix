import mongoose from 'mongoose';

const userSavedCarSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  savedAt: { type: Date, default: Date.now },
});

userSavedCarSchema.index({ userId: 1, carId: 1 }, { unique: true });

export default mongoose.model('UserSavedCar', userSavedCarSchema);
