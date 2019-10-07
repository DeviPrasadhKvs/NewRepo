const User = new Schema({
  user_id: {
    type: {
      type: String
    },
    autoIncrement: true,
    primaryKey: true
  },
  user_email: {
    type: {
      type: String
    },
    unique: true,
  },
  user_password: {
    type: {
      type: String
    },
  },
  user_created_on: {
    type: String
  },
});