const notesCtrl = {};

const Note = require('../models/Note');

notesCtrl.getNotes = async (req,res) => 
{
    const notes = await Note.find();
    res.json(notes);
}

notesCtrl.createNote = async (req,res) => 
{
    const { title, content , date, author } = req.body;
    const newNote = new Note({
        title,
        content,
        date,
        author
    });
    await newNote.save();
    res.json({message: 'Note Saved'});
}

notesCtrl.getNote = async (req,res) => {
    const note = await Note.findById(req.params.id);
    res.json(note);
};

notesCtrl.updateNote = async (req,res) => 
{
    const { title, content , date, author } = req.body;
    const result = await Note.findOneAndUpdate(
        { _id: req.params.id }, 
        { 
            title, 
            content, 
            date, 
            author 
        }, 
        function(error, doc) {
            console.log(error,doc)
            // error: any errors that occurred
            // doc: the document before updates are applied if `new: false`, or after updates if `new = true`
        }
      );
    console.log(req.params.id, title, content , date, author, result);
    res.json({ message: 'Note Updated' });
};


notesCtrl.deleteNote = async (req,res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note Deleted' });
};

module.exports = notesCtrl;