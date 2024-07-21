import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "d:/firebase_project/src/pages/home";
import Private from './pages/private'; 
import './App.css';
import ProtectedRoute from './components/protectedRoute';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(null)
  const [isFetching, setIsFetching] = useState(true)
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(user)=>{
      if(user){
        setUser(user)
        setIsFetching(false)
        return
      }
      setUser(null)
      setIsFetching(false)
    })
    return ()=>unsubscribe()
  },[])

  if(isFetching){
    return <h2>Loading.....</h2>
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/Private" element={<ProtectedRoute user={user}>
          <Private/>
          </ProtectedRoute>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;