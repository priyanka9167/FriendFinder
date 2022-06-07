import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from '../ProtectedRoute';
import CreatePost from '../Posts/CreatePost';
import ShowPostFunctional from '../Posts/ShowPost';
import RegisterLogin from '../RegisterLogin';
import ShowFriends from '../FriendsComponent/ShowFriends';

function App(props) {


  return (


    <Router>
      <Routes>
        <Route exact path='/content/:id' element={<ProtectedRoute/>}>
          <Route exact path='/content/:id' element={<ShowPostFunctional/>}/>
        </Route>
        <Route exact path='/friends/:id' element={<ProtectedRoute/>}>
          <Route exact path='/friends/:id' element={<ShowFriends/>}/>
        </Route>
        <Route exact path='/create_post' element={<CreatePost/>}>
          <Route exact path='/create_post' element={<CreatePost/>}/>
        </Route>

        <Route exact path='/account/register-login' element={<RegisterLogin/>}/>
        
      </Routes>
    </Router>

  )
}





export default App;
