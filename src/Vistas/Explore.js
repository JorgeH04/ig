import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Componentes/Loading';
import { ImagenAvatar } from '../Componentes/Avatar';        
import Axios from 'axios';
import Main from '../Componentes/Main';
import Grid from '../Componentes/Grid';


export default function Explore({ mostrarError}) {
  const [posts, setPosts] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function cargarPostsYUsuarios() {
      try {
        const [posts, usuarios] = await Promise.all([
          Axios.get('/api/posts/explore').then(({ data }) => data),
          Axios.get('/api/usuarios/explore').then(({ data }) => data)
        ]);
        setPosts(posts);
        setUsuarios(usuarios);
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
                     {usuarios.map(usuario => {
                         return (
                     <div class="recent_box" key={usuario._id}>
                        <div class="recent_left">

                           <Link to={`/perfil/${usuario.username}`}>
                           <div class="image_6"> 
                                  <img src={usuario.imagen}/> 
                           </div>
                          </Link>
                        </div>
                        <div class="recent_right">
                           <h3 class="consectetur_text">{usuario.username}</h3>
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




