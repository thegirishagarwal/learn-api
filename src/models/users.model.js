const mongoosePaginate = require('mongoose-aggregate-paginate');

const mongoose = require('mongoose');
const UsersSchema = mongoose.Schema({
    name: String,
    countryCode: String,
    phone: { type: String, index: true },
    email: {type: String, required: true, email: true, unique: true},
    address: {
        address_line1: String,
        address_line2: String,
        city: String,
        state: String,
        country: String,
        zip: {
            type: Number,
            minlength: 6
        },
    },
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
});

UsersSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('users', UsersSchema);
