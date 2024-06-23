const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must have a name'],
        maxLength: [20, 'must be less than 20 characters'],
        trim: true
    }, completed: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: [true, 'must have a description'],
        maxLength: [100, 'must be less than 100 characters'],
        trim: true
    },
    dueDate: {
        type: Date,
        required: [true, 'must have a due date'],
    },
})


module.exports = mongoose.model('task', TaskSchema)