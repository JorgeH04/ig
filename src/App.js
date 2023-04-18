import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Axios from 'axios';
   
import {  
  setToken,
  deleteToken,
  getToken,
  initAxiosInterceptors
} from './Helpers/auth-helpers';

import Nav from './Components/Nav';
//import Hero from './Components/Hero';

import Loading from './Components/Loading';
import Error from './Components/Error';
import Signup from './Views/Signup';
import Login from './Views/Login';
import Upload from './Views/Upload';
import Feed from './Views/Feed';
import Post from './Views/Post';
import Explore from './Views/Explore';
import Profile from './Views/Profile';
import Footer from './Views/Footer/Footer';

import Main from './Components/Main';

import { Helmet } from 'react-helmet';


initAxiosInterceptors();

export default function App() {

  //return <h1>¡Bienvenido al curso!</h1>;
  const [usuario, setUsuario] = useState(null); // no sabemos si hay un usuario autenticado
  const [cargandoUsuario, setCargandoUsuario] = useState(true);
  const [error, setError] = useState(null);


  
  useEffect(() => {
    async function cargarUsuario() {
      if (!getToken()) {
        setCargandoUsuario(false);
        return;
      }
      try {
      //  const { data: usuario } = await Axios.get('https://igback.herokuapp.com/api/usuarios/whoami');
        const { data: usuario } = await Axios.get('/api/usuarios/whoami');

        setUsuario(usuario);
        setCargandoUsuario(false);
      } catch (error) {
        console.log(error);
      }
    }
    cargarUsuario();
  }, []);





  async function login(email, password) {
   // const { data } = await Axios.post('https://igback.herokuapp.com/api/usuarios/login', {
   const { data } = await Axios.post('/api/usuarios/login', {
      email,
      password
    });
    setUsuario(data.usuario);
    setToken(data.token);
  }
  async function signup(usuario) {
   // const { data } = await Axios.post('https://igback.herokuapp.com/api/usuarios/signup', usuario);
    const { data } = await Axios.post('/api/usuarios/signup', usuario);
    setUsuario(data.usuario);
    setToken(data.token);
  }
  
  function logout() {
    setUsuario(null);
    deleteToken();
  }
  function mostrarError(mensaje) {
    setError(mensaje);
  }
  function esconderError() {
    setError(null);
  }


  if (cargandoUsuario) {
    return (
      <Main center>
        <Loading />
      </Main>
    );
  }
  return (
    <Router>
      <Nav usuario={usuario} />

      <Error mensaje={error} esconderError={esconderError} />
      {usuario ? (
        <LoginRoutes
          mostrarError={mostrarError}
          usuario={usuario}
          logout={logout}
        />
      ) : (
        <LogoutRoutes
          login={login}
          signup={signup}
          mostrarError={mostrarError}
        />
      )}
      
      <Footer/>


      <Helmet>
      <link rel="stylesheet" href="plugins/bootstrap/css/bootstrap.min.css"/>
     <link rel="stylesheet" href="plugins/themify/css/themify-icons.css"/>
    <link rel="stylesheet" href="plugins/slick-carousel/slick-theme.css"/>
    <link rel="stylesheet" href="plugins/slick-carousel/slick.css"/>
     <link rel="stylesheet" href="plugins/owl-carousel/owl.carousel.min.css"/>
    <link rel="stylesheet" href="plugins/owl-carousel/owl.theme.default.min.css"/>
    <link rel="stylesheet" href="plugins/magnific-popup/magnific-popup.css"/>
     <link rel="stylesheet" href="css/style.css"/>


     <script src="plugins/jquery/jquery.js"></script>
     <script src="plugins/bootstrap/js/bootstrap.min.js"></script>
    <script src="plugins/bootstrap/js/popper.min.js"></script>
     <script src="plugins/owl-carousel/owl.carousel.min.js"></script>
    <script src="plugins/slick-carousel/slick.min.js"></script>
    <script src="plugins/magnific-popup/magnific-popup.js"></script>
     <script src="plugins/instafeed-js/instafeed.min.js"></script>
     <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCC72vZw-6tGqFyRhhg5CkF2fqfILn2Tsw"></script>
    <script src="plugins/google-map/gmap.js"></script>
     <script src="js/custom.js"></script>
        </Helmet>

   
    </Router>
  );
}



function LoginRoutes({ mostrarError, usuario, logout }) {
  return (
    <Switch>
 
      <Route
        path="/upload"
        render={props => <Upload {...props} mostrarError={mostrarError} />}
      />
      <Route
        path="/post/:id"
        render={props => (
          <Post {...props} mostrarError={mostrarError} usuario={usuario} />
        )}
      />
      <Route
        path="/perfil/:username"
        render={props => (
          <Profile
            {...props}
            mostrarError={mostrarError}
            usuario={usuario}
            logout={logout}
          />
        )}
      />
      <Route
        path="/explore"
        render={props => <Explore {...props} mostrarError={mostrarError} />}
      />
      <Route
        path="/"
        render={props => (
          <Feed {...props} mostrarError={mostrarError} usuario={usuario} />
        )}
 
        default
      />
    </Switch>

 



  );
}


function LogoutRoutes({ login, signup, mostrarError }) {
  return (
    <Switch>
      <Route
        path="/login/"
        render={props => (
          <Login {...props} login={login} mostrarError={mostrarError} />
        )}
      />
      <Route
        render={props => (
          <Signup {...props} signup={signup} mostrarError={mostrarError} />
        )}
        default
      />
    </Switch>
  );
}
