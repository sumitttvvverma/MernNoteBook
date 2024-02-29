import React,{useContext,useEffect,useRef,useState} from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Notes = (props) => {
    const context=useContext(noteContext);
    const {notes, getNotes, editNote}=context;
    let history= useHistory();

    useEffect(() => {
      if(localStorage.getItem('token')){
        getNotes()
      }
      else{
       history.push("/login")
      }
      //eslint-disable-next-line
    },[])

    const ref =useRef(null)
    const refClose =useRef(null)
    const [note, setNote]=useState({id:"",etitle:"",edescription:"",etag:""})

   
    const updateNote =(currentNote)=>{
       ref.current.click();
       setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
        
      }


   const onChange=(e)=>{
    setNote({
       ...note,
       [e.target.name]:e.target.value
    })
}   
const handleClick=(e)=>{
    console.log("updating the note...")
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("updated suceesfully","success")
}

  return (
   <> 
      <AddNote showAlert={props.showAlert}/>
           
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

        {/*form ayga yaha se */}
        <form className="row g-3">
  <div className="row-md-6">
    <label htmlFor="title" className="form-label">Name</label>
    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required/>
  </div>
  <div className="row-md-6">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
  </div>
  <div className="row-md-6">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
  </div>
</form>
     {/*till here */}
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5||note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>
      <div className='row my-3'>
         <h1>Your Notes </h1>
         {notes.length===0 && 'no notes to display'}
           {notes.map((note)=>{
            return <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note}/>
           })}
      </div>
      </>

  );
}

export default Notes;
