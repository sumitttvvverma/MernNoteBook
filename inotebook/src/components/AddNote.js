import React,{useContext,useState} from 'react';
import contextValue from '../context/notes/noteContext';

const AddNote = (props) => {
    const context=useContext(contextValue);
    const {addNote}=context;

    const [note, setNote]=useState({title:"",description:"",tag:""})
    
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"",description:"",tag:""});
        props.showAlert("added suceesfully","success")
    }
    const onChange=(e)=>{
         setNote({
            ...note,
            [e.target.name]:e.target.value
         })
    }
  return (
    <div>
        <div className='container my-3'> <h1>Write Your Note</h1>
      </div>
      <div className='container my-3'>
      <form className="row g-3">
  <div className="row-md-6">
    <label htmlFor="title" className="form-label">Name</label>
    <input type="text" className="form-control" id="title" name="title" onChange={onChange} value={note.title} minLength={5} required/>
  </div>
  <div className="row-md-6">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={note.description} minLength={5} required/>
  </div>
  <div className="row-md-6">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}value={note.tag} minLength={5} required/>
  </div>
  <div className="col-12">
    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
  </div>
</form>
      </div>
    </div>
  );
}

export default AddNote;
