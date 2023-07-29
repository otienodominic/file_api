import File from '../models/files.js'

export const createFile = async (req, res, next) => {
    const {patientNumber,  patientName,  phoneNumber,  dateOfBirth,  gender, viralLoad} = req.body
    const newFile = new File({patientNumber,  patientName,  phoneNumber,  dateOfBirth,  gender, viralLoad})

    try {
        const savedFile = await newFile.save()
        res.status(200).json(savedFile)
        
    } catch (err) {
        next(err)
    }
}

export const editFile = async (req, res, next)=> {
    try {
        const updatedFile = await File.findByIdAndUpdate(req.params.id, {$set: req.body}, { new: true})
        res.status(200).json(updatedFile)        
    } catch (err) {
        next(err)
    }
}

export const deleteFile = async (req, res, next) => {
    try {
        await File.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "File Deleted Successfully"})        
    } catch (err) {
        next(err)
    }
}

export const getFile = async (req, res, next) => {
    try {
        const foundFile = await File.findById(req.params.id)
        res.status(200).json(foundFile)
    } catch (err) {
        next(err)
    }
}

export const getAllFiles = async (req, res, next) => {
    try {
        const files = await File.find()
        res.status(200).json(files)
    } catch (error) {
        next(error)
    }
}


export const search  = async (req, res, next) => {
    try {
        const {message} = req.body
        const foundFiles = await File.find({
            patientName: { $regex: message, $options: 'i' }
        })  
        if(!foundFiles) res.status(400).send({error: "No files Found!"})     
        res.status(200).json(foundFiles)
    } catch (error) {
        next(error)
    }
}

// export const search  = async (req, res, next) => {
//     try {
//         const {message} = req.body
//         const foundFiles = await File.find({
//             $or: [
//                 { patientName: { $regex: message, $options: 'i' } },
//                 { patientNumber: { $regex: message, $options: 'i' } }
//             ]   
            
//         })  
//         if(!foundFiles) res.status(400).send({error: "No files Found!"})     
//         res.status(200).json(foundFiles)
//     } catch (error) {
//         next(error)
//     }
// }