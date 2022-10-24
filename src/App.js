//Link - https://todo-app-a72ae.web.app
import React, { useEffect, useState } from 'react';
import './App.css';
import { FormControl, Button, InputLabel, Input } from '@mui/material';
import Todo from './Todo';
import db from './Firebase';
import firebase from 'firebase/compat/app';

function App() {

  const [todos, setTodos] = useState([]);

  const [input, setInput] = useState('');


  //when the app we had to get todos from database.

  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo, time: doc.data().timestamp.toDate().toString() })))
    })
  }, []);


  const addTodo = (event) => {
    event.preventDefault();


    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput('');



  }

  return (
    <div className="App">
      <h1 sx={{ mb: 5 }} style={{ marginBottom: '80' }}>TODO App!!</h1>
      <form sx={{ mt: 5, mb: 5 }}>

        <FormControl>
          <InputLabel sx={{
            width: 150,
            maxWidth: '100%',
          }}>
            Write a Todo</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />
        </FormControl>

        <Button disabled={!input} variant="contained" color="primary"
          type='submit' onClick={addTodo}>

          Add Todo
        </Button>
      </form>

      <ul>
        {todos.map(todo => (
          <Todo todo={todo} key={todo.id}/>
        ))}
      </ul>
    </div>
  );
}

export default App;
