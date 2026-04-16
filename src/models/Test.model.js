import mongoose from 'mongoose';


const testSchema = new mongoose.Schema({
    testName:{
        type: String,
        required: [true, "Test name is required"],
        trim: true
    },
    normalValueforFemale:{
        type: String,
        required: [true, "Normal value is required"],
        trim: true
    },
    normalValueforMale:{
        type: String,
        required: [true, "Normal value is required"],
        trim: true
    },
    description:{
        type: String,
        trim: true
    },
}
    , { timestamps: true });

const Test = mongoose.model("Test", testSchema);
export default Test;