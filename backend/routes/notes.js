const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Note");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

//GET ALL NODES
router.post("/fetchnotes", fetchuser, async (req, res) => {
  //userid = req.user.id;
  try {
    let notes = await Notes.find({ user: req.user.id });
   // console.log(notes);
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("error occured");
  }
});

//ADD NOTE

router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "enter valid title").isLength({ min: 2 }),
    body("description", "enter valid description").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //userid = req.user.id;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title: title,
        description: description,
        tag: tag,
        user: req.user.id,
      });
      const savednote = await note.save();
      res.json(savednote);
    } catch (error) {
      console.error(error);
      res.status(500).send("error occured");
    }
  }
);

//UPDATE NOTES

router.put(
  "/updatenotes/:id",
  fetchuser,
  [
    body("title", "enter valid title").isLength({ min: 2 }),
    body("description", "enter valid description").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Note not found");
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed");
      }
      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json({ note });
    } catch (error) {
      console.error(error);
      res.status(500).send("error occured");
    }
  }
);

//DELETE NOTES

router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "note deleted", note: note });
  } catch (error) {
    console.error(error);
    res.status(500).send("error occured");
  }
});

module.exports = router;
