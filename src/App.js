import React from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom'
import { Exercise } from './Components/exercisesComponent';
import { CreateExercise } from './Components/newExercise';
import { EditExercise } from './Components/editExercise'
import { NewUser } from './Components/newUser'
import Navbar from './Components/navbar';
import Test from './Components/testRoute';

function App() {
  return (
    <Router>
      <div className="container-fluid px-0">
        <Navbar/>
        <br/>
        <Route path="/" exact component= {Exercise}/>
        <Route path="/create" exact component= {CreateExercise}/>
        <Route path="/edit/:id" exact component= {EditExercise}/>
        <Route path="/user" exact component= {NewUser}/>
        <Route path="/test" exact component= {Test}/>
      </div>
    </Router>
  );
}

export default App;
