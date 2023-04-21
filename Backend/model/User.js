const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  numero: {
    type: Number,
    require: true,
  },
  pdp: {
    type: String,
    require: true,
  },
  mail: {
    type: String,
    required: true,
    unique: true,
  },
  role: { type: String },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  token: {
    type: String,
  },
  resetToken: { type: String },
  seenNotifications: {
    required: false,
    type: Array,
    default: [],
  },
  unseenNotifications: {
    required: false,
    type: Array,
    default: [],
  },
});