import './App.css';
import React, {useEffect, useState} from 'react'

import axios from 'axios';

function App() {

  const [message, setMessage] = useState('Hello World Again!')

  useEffect(() => {

    axios.get('http://localhost:8080/test')
    .then((response) => {
        setMessage(response.data)
    })
  
  },[])

  return (
    <>
    Hello World!
    {message}
    </>
  );
}

export default App;
