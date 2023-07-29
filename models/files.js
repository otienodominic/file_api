import mongoose from "mongoose";
const { Schema } = mongoose

const FileSchema = new Schema({
    patientNumber: { type: Number, required: true, unique: true },
    patientName: { type: String,  required: true  },
    phoneNumber: { type: Number, required: false },     
    dateOfBirth: { type: Date, required: true, trim: true, },
    gender: { type: String, required: true }, 
    viralLoad: [{ type: String, required: true }], 
    visitDate:[{ type: Date, default: Date.now }],  
    createdAt:[{ type: Date, default: Date.now }],
    // creator: [{type: String, required: false}],       
    appointmentDate:[{ type: Date }],
    isBooked: { type: Boolean, default: false }
})

export default mongoose.model("Files", FileSchema)