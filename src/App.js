import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ErrorBoundry from './components/errorBoundries';
import ChatHeader from './components/header';
import Messanger from './pages/messanger';
import UsersChat from './pages/users-chat';
import Login from './pages/login';


function App() {
  useEffect(()=>{
    console.log("inside app");
  })
  return (
    <div className="App">
      <ErrorBoundry>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ChatHeader></ChatHeader>}>
            </Route>
            <Route path='/login' element={<Login></Login>}>
            </Route>
            <Route path='messanger' element={<Messanger></Messanger>}>
            </Route>
            <Route path='messanger/:id' element={<UsersChat></UsersChat>} ></Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundry>
    </div>
  );
}

export default App;
