const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homestaySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true, // Removes leading and trailing spaces
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        pricePerNight: {
            type: Number,
            required: true,
            min: 0, // Ensures price is not negative
        },
        amenities: {
            type: [String],
            required: true,
            validate: {
                validator: function (v) {
                    return v.length > 0; // Ensures at least one amenity is provided
                },
                message: 'A homestay must have at least one amenity.',
            },
        },
        photos: {
            type: [String],
            default: [],
            validate: {
                validator: function (v) {
                    return v.length <= 10; // Restricts the maximum number of photos
                },
                message: 'A homestay cannot have more than 10 photos.',
            },
        },
        createdAt: {
            type: Date,
            default: Date.now, // Automatically set the creation timestamp
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
);

module.exports = mongoose.model('Homestay', homestaySchema);
