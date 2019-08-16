import mongoose from 'mongoose';

const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: {
    type: String,
  },
}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);

export default Category;
