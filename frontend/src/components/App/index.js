import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from '../ProtectedRoute';
import CreatePost from '../Posts/CreatePost';
import ShowPostFunctional from '../Posts/ShowPost';
import RegisterLogin from '../RegisterLogin';
import ShowFriends from '../FriendsComponent/ShowFriends';
import Feeds from '../Feeds';

function App(props) {


  return (


    <Router>
      <Routes>
      <Route exact path='/' element={<ProtectedRoute/>}>
          <Route exact path='/' element={<Feeds/>}/>
        </Route>
        <Route exact path='/content/:username' element={<ProtectedRoute/>}>
          <Route exact path='/content/:username' element={<ShowPostFunctional/>}/>
        </Route>
        <Route exact path='/friends/:username' element={<ProtectedRoute/>}>
          <Route exact path='/friends/:username' element={<ShowFriends/>}/>
        </Route>
        <Route exact path='/create-post' element={<ProtectedRoute/>}>
          <Route exact path='/create-post' element={<CreatePost/>}/>
        </Route>

        <Route exact path='/account/register-login' element={<RegisterLogin/>}/>
        
      </Routes>
    </Router>

  )
}





export default App;
