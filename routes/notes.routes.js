const express = require("express");
const { NoteModel } = require("../model/notes.model");
const noteRouter = express.Router();
const { auth } = require("../middlewares/auth.middleware");
const { UserModel } = require("../model/user.model");
noteRouter.use(auth)
noteRouter.post("/create", async (req, res) => {
    try {
        const note = new NoteModel(req.body)
        await note.save()
        res.status(200).send({ "msg": "note as been added" })
    }
    catch (err) {
        res.status(400).send({ "err": err })

    }
})
noteRouter.get("/", async (req, res) => {
    try {
        const notes = await NoteModel.find({ username: req.body.username })
        res.status(200).send(notes)
    }
    catch (err) {
        res.status(400).send({ "err": err })

    }
})
noteRouter.patch("/update/:note_id", async (req, res) => {
    const { note_id } = req.params;
    const note = await NoteModel.findOne({ _id: note_id })
console.log("note" ,note)
    try {
        if (req.body.userID === note.userID) {
            await NoteModel.findByIdAndUpdate({ _id: note_id }, req.body)
            res.status(200).send({ "msg": `the note with id ${note_id} has been updated` })
        }
        else {

            res.status(200).send({ "msg": "youre not authorized" })
        }
    }
    catch (err) {
        res.status(400).send({ "err": err })

    }
})
noteRouter.delete("/delete/:note_id", async(req, res) => {
    const { note_id } = req.params;
    const note =await NoteModel.findOne({ _id: note_id })

    try {
        if (req.body.userID === note.userID) {
            await NoteModel.findByIdAndDelete({ _id: note_id })
            res.status(200).send({ "msg": `the note with id ${note_id} has been deleted` })
        }
        else {

            res.status(200).send({ "msg": "youre not authorized" })
        }
    }
    catch (err) {
        res.status(400).send({ "err": err.message })

    }
})

module.exports = { noteRouter }