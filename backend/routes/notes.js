const express =require('express');
const router = express.Router();
const fetchuser=require('../middleware/fetchuser');
const Note =require('../models/Note');
const {body,validationResult} = require('express-validator');

//ROUTE 1: Get all the notes using: GET "/api/notes/fetchallnotes" 
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try {
        const notes = await Note.find({user:req.user.id});
        res.json(notes);  
    } catch (error) {
        console.error(error.message);
      res.status(500).send("Internal server error route 1 in notes")
    }
    
})

//ROUTE 2: add a note using: Post "/api/notes/addnote" .login required
router.post('/addnote', fetchuser,[
    body('title','enter a valid title').isLength({min:3}),
  body('description','description must be 5 char').isLength({min:5}),
],async(req,res)=>{
   
   try{ const {title,description,tag}=req.body;
    //if there are errors return bad request and the errors
   const errors = validationResult(req);
   if(!errors.isEmpty()) {
     return res.status(400).json({errors:errors.array()})
   }

    const note = await new Note({
        title,description,tag, user: req.user.id   
    });
    const savedNote=await note.save();
    res.json(savedNote);
}
catch (error) {
    console.error(error.message);
      res.status(500).send("Internal server error route 2 in notes")
}
})
//ROUTE 3: Update an existing note using: PUT "/api/notes/updatenote" login required
router.put('/updatenote/:id', fetchuser,async(req,res)=>{
    const {title,description,tag} = req.body;
  try{  //Create a newNote object
    const newNote ={};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //Find the note to be updated and update it
    let note=await Note.findById(req.params.id);
    if(!note){
        return res.status(401).send("Not found")
    }

    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note});
}catch(error){
    console.error(error.message);
    res.status(500).json({ error: "Server Error in update" });
} 
})   


//ROUTE 4: delete an existing note using: DELETE "/api/notes/deletenote" login required
router.delete('/deletenote/:id', fetchuser,async(req,res)=>{
    try{
    //Find the note to be delete and delete it
    let note=await Note.findById(req.params.id);
    if(!note){
        return res.status(401).send("Not found")
    }
    //jo insan delete kr rha h ky ye note usi ka hai
    if(note.user.toString() !==req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndRemove(req.params.id)
    res.json({"Success":"note has been deleted",note:note }); 
}
catch (error) {
    console.error(error.message);
        res.status(500).json({ error: "Server Error in delete" });
}

})   

module.exports = router;