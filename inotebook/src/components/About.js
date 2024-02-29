import React,{useState} from 'react';

const About = () => {

 


  //old
    const [myStyle,setMyStyle] =useState({
        color:"#343a40",
        backgroundColor:"white",
        
       }) 
    const [btnText, setBtnText] = useState("Enable Dark mode");
    
    const toggleStyle=()=>{
        if(myStyle.color==="#343a40"){
            setMyStyle({
                color:"white",
                backgroundColor:"#343a40",
                border:"1px solid white"
            })
            setBtnText("Enable Light mode"); 
        } else{
            setMyStyle({
                color:"#343a40",
                backgroundColor:"white"
            })
            setBtnText("Enable Dark mode"); 
        }
    }   
    

    return (
      <>
    <div className="container my-3" style={myStyle}>
        <h1>About us</h1>
      <div className="accordion" id="accordionExample">
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button" type="button" style={myStyle} data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Mern Blog Project
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div className="accordion-body" style={myStyle}>
      The MERN stack is highly customizable, making it suitable for various blog applications. Developers can choose from a wide range of libraries, frameworks, and tools that best fit the specific requirements of their blog. They can easily extend and modify the functionality, design, and features to match their project's needs, providing a personalized and tailored user experience.
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" style={myStyle} data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      How does the MERN stack work together in a blog application?
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body" style={myStyle}>
      In a MERN blog application, MongoDB is used to store blog posts, comments, and other data. Express.js provides the backend API and handles HTTP requests to interact with the database. React is used on the frontend to create the user interface, allowing users to view and interact with blog posts. Node.js runs on the server to handle backend logic and manage the entire application's workflow.
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" style={myStyle} data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
      What is MERN?
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body" style={myStyle} >
      MERN is an acronym that stands for MongoDB, Express.js, React, and Node.js. It is a popular technology stack used to build modern web applications. MongoDB is the database, Express.js is the backend web framework, React is the frontend library, and Node.js is the server-side runtime environment.
      </div>
    </div>
  </div>
</div>
<button type="button" onClick={toggleStyle} className="btn btn-primary my-3">{btnText}</button>
    </div>
   {/*till here */}

 

    <div>this is about page and </div>

    </>
  );
}

export default About;
