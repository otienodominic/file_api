import express from 'express'
import {createFile, editFile, deleteFile, getFile, getAllFiles, search} from '../controllers/files.js'

const router = express.Router()

// CREATE
router.post('/create', createFile)
// UPDATE
router.put('/edit/:id', editFile)
// DELETE
router.delete('/delete/:id', deleteFile)
// GET ONE
router.get('/:id', getFile)
// GET ALL
router.get('/', getAllFiles)
// SEARCH THE DATABASE
router.post('/search', search)


export default router