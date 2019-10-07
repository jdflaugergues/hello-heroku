const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    createdDate: {
      type: String,
    },
  },
  { versionKey: false, strict: 'throw', useNestedStrict: true },
);

module.exports = userSchema;
