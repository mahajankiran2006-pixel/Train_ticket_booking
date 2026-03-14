import React, { useState } from 'react'


export default function Textform(props) {
  //  const [text, setText] =useState('enter text');
  //  setText("new twxt");
  const handleClick = () => {
    console.log("upper case was click" + text);
    let newText = text.toUpperCase();
    setText(newText);
  }
  const handleonClick = () => {
    console.log("lower case was click" + text);
    let newText = text.toLowerCase();
    setText(newText);
  }
   const handleclClick = () => {
    console.log("lower case was click" + text);
    let newText = '';
    setText(newText);
  }
  const handleOnchange = (event) => {
    console.log("upper case was on changed");
    setText(event.target.value);
  }

  const [text, setText] = useState('enter text');
  return (

    <>
      <div className='container'>

        <h1>
          {props.heading}
        </h1>
        <div className="mb-3">

          <textarea className="form-control" onChange={handleOnchange} value={text} id="exampleFormControlTextarea1" rows="8"></textarea>
        </div>
        <button className="btn btn-primary mx-3" onClick={handleClick}>convert to uppercase</button>
        <button className="btn btn-primary mx-3" onClick={handleonClick}>convert  to LowerCase</button>
         <button className="btn btn-primary mx-3" onClick={handleclClick}>clear text</button>
      </div>
      <div className="conatiner my-3">

        <h1>
          your text summary
        </h1>
        <p>
          {text.split("").length}words and length {text.length}

        </p>
        <p> {0.008 * text.split("").length}minutes</p>
        <h2>preiview
        </h2>
        <p>{text}</p>
      </div>
    </>
  )
}
