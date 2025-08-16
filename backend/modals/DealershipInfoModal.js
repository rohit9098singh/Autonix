import mongoose from "mongoose";

const dealershipSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Vehiql Motors',
  },
  address: {
    type: String,
    default: '69 Car Street, Autoville, CA 69420',
  },
  phone: {
    type: String,
    default: '+1 (555) 123-4567',
  },
  email: {
    type: String,
    default: 'contact@vehiql.com',
  },
}, { timestamps: true });

export default mongoose.model('DealershipInfo', dealershipSchema);
