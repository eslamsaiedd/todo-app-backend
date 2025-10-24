const {mongoose} = require('mongoose')

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: "user"
    },
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports =  mongoose.model('task', taskSchema)