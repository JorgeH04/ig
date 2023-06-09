import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Components/Loading';
import { ImagenAvatar } from '../Components/Avatar';        
import Axios from 'axios';
import Main from '../Components/Main';
import Grid from '../Components/Grid';


export default function Explore({ mostrarError}) {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function cargarPostsYUsuarios() {
      try {
        const [posts, users] = await Promise.all([
          // Axios.get('https://igback.herokuapp.com/api/posts/explore').then(({ data }) => data),
          // Axios.get('https://igback.herokuapp.com/api/usuarios/explore').then(({ data }) => data)
          Axios.get('/api/posts/explore').then(({ data }) => data),
          Axios.get('/api/usuarios/explore').then(({ data }) => data)
        ]);
        setPosts(posts);
        setUsers(users);
        setLoading(false);
      } catch (error) {
        mostrarError(
          'Hubo un problema cargando explore. Por favor refresca la página.'
        );
        console.log(error);
      }
    }
    cargarPostsYUsuarios();
  }, []);



  if (loading) {
    return (
      <Main center>
        <Loading />
      </Main>
    );
  }
  return (
    <Main>
      <div class="about_section layout_padding">
         <div class="container">
            <div class="row">

               <div class="col-lg-4 col-sm-12">
                  <div class="newsletter_main">
                     <h1 class="recent_taital">Recent post</h1>
                     {users.map(user => {
                         return (
                     <div class="recent_box" key={user._id}>
                        <div class="recent_left">

                           <Link to={`/perfil/${user.username}`}>
                           <div class="image_6"> 
                                  <img src={user.imagen}/> 
                           </div>
                          </Link>
                        </div>
                        <div class="recent_right">
                           <h3 class="consectetur_text">{user.username}</h3>
                           <p class="dolor_text">    </p>
                        </div>
                     </div>
                                 );

                     })}
                  </div>
               </div>
            </div>
         </div>
      </div>
    </Main>
  );
}




