import './App.css';
import { RouterProvider, createHashRouter } from 'react-router-dom'
import Layout from './component/Layout/Layout';
import Home from './component/Home/Home';
import Login from './component/Login/Login';
import Movies from './component/Movies/Movies';
import People from './component/People/People';
import Register from './component/Register/Register';
import Tv from './component/TV/Tv';
import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react'
import Profile from './component/Profile/Profile';
import ItemDetails from './component/ItemDetails/ItemDetails';
import LoadingScreen from './component/LoadingScreen/LoadingScreen';
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute';



function App() {
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    setTimeout(() => setLoading(false), 3000)

    if (localStorage.getItem('userToken') !== null) {
      saveUserData()
    }
  }, []);

  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken')
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken)
    // console.log(decodedToken);
  }

  let x = createHashRouter([{
    path: '/', element: <Layout userData={userData} setUserData={setUserData} />, children: [
      { index: true, path: '/', element: <ProtectedRoute userData={userData}> <Home /></ProtectedRoute> },
      {path: 'movies', element: <ProtectedRoute userData={userData}> <Movies /></ProtectedRoute> },
      { path: 'people', element: <ProtectedRoute userData={userData}> <People /></ProtectedRoute> },
      { path: 'tv', element: <ProtectedRoute userData={userData}> <Tv /></ProtectedRoute> },
      { path: 'profile', element: <ProtectedRoute userData={userData}><Profile userData={userData} /></ProtectedRoute> },
      { path: 'itemDetails/:id/:media_type', element: <ProtectedRoute userData={userData}> <ItemDetails /></ProtectedRoute> },

      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login saveUserData={saveUserData} /> }


    ]
  }])

  return <>
   
    {loading && <LoadingScreen />}


      <RouterProvider router={x} />

  </>
}

export default App;
