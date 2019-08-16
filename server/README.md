user Schema:
name: {
  type: String,
  lowercase: true,
  required: [true, 'First Name is required'],
},
email: {
  type: String,
  lowercase: true,
  unique: true,
  required: [true, 'Email is required'],
  index: true,
},
password: {
  type: String,
  required: [true, 'Password is required'],
},
profilePicUrl: {
  type: String,
  default: ''
},
verified: false,
gender: {
  type: String,
  default: 'Male'
},
DOB: {
  type: Date,
  default: Date()
}

Pre save hook hashes the password using Bcrypt
comparePassword method is used to compare passwords
verified is for verified users (i.e. email verification)