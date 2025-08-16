import mongoose from 'mongoose';

const workingHourSchema = new mongoose.Schema({
  dealershipId: { type: mongoose.Schema.Types.ObjectId, ref: 'DealershipInfo', required: true },
  dayOfWeek: {
    type: String,
    enum: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'],
    required: true,
  },
  openTime: { type: String, required: true },
  closeTime: { type: String, required: true },
  isOpen: { type: Boolean, default: true },
}, { timestamps: true });

workingHourSchema.index({ dealershipId: 1, dayOfWeek: 1 }, { unique: true });

export default mongoose.model('WorkingHour', workingHourSchema);
