import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Main from '../Components/Main';
import Loading from '../Components/Loading';
import Post from '../Components/Post';


async function cargarPosts(fechaDelUltimoPost) {
  const query = fechaDelUltimoPost ? `?fecha=${fechaDelUltimoPost}` : '';
  //const { data: nuevosPosts } = await Axios.get(`https://igback.herokuapp.com/api/posts/feed${query}`);
  const { data: nuevosPosts } = await Axios.get(`/api/posts/feed${query}`);
  return nuevosPosts;
}


const NUMERO_DE_POSTS_POR_LLAMADA = 3;
export default function Feed({ mostrarError, usuario }) {

  const [posts, setPosts] = useState([]);
  const [loadingInitialPosts, setLoadingInitialPosts] = useState(true);
  const [loadingMorePosts, setLoadingMorePosts] = useState(false);
  const [todosLosPostsCargados, setTodosLosPostsCargados] = useState(false);

  useEffect(() => {
    async function loadingInitialPosts() {
      try {
        const nuevosPosts = await cargarPosts();
        setPosts(nuevosPosts);
        console.log(nuevosPosts);
        setLoadingInitialPosts(false);
        revisarSiHayMasPosts(nuevosPosts);
      } catch (error) {
        mostrarError('Hubo un problema cargando tu feed.');
        console.log(error);
      }
    }
    loadingInitialPosts();
  }, []);


  function actualizarPost(postOriginal, postActualizado) {
    setPosts(posts => {
      const postsActualizados = posts.map(post => {
        if (post !== postOriginal) {
          return post;
        }
        return postActualizado;
      });
      return postsActualizados;
    });
  }


  async function cargarMasPosts() {
    if (loadingMorePosts) {
      return;
    }
    try {
      setLoadingMorePosts(true);
      const fechaDelUltimoPost = posts[posts.length - 1].fecha_creado;
      const nuevosPosts = await cargarPosts(fechaDelUltimoPost);
      setPosts(viejosPosts => [...viejosPosts, ...nuevosPosts]);
      setLoadingMorePosts(false);
      revisarSiHayMasPosts(nuevosPosts);
    } catch (error) {
      mostrarError('Hubo un problema cargando los siguientes posts.');
      setLoadingMorePosts(false);
    }
  }



  function revisarSiHayMasPosts(nuevosPosts) {
    if (nuevosPosts.length < NUMERO_DE_POSTS_POR_LLAMADA) {
      setTodosLosPostsCargados(true);
    }
  }



  if (loadingInitialPosts) {
    return (
      <Main center>
        <Loading />
      </Main>
    );
  }
  if (!loadingInitialPosts && posts.length === 0) {
    return (
      <Main center>
        <NoSiguesANadie />
      </Main>
    );
  }
  return (
    <Main center>



 
    <section class="single-block-wrapper section-padding">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                {posts.map(post => (
                   <Post
                       key={post._id}
                       post={post}
                       actualizarPost={actualizarPost}
                       mostrarError={mostrarError}
                       usuario={usuario}
                   />
             ))}
               <CargarMasPosts
                 onClick={cargarMasPosts}
                 todosLosPostsCargados={todosLosPostsCargados}
               />
              

                </div>
            </div>
        </div>
    </section>
 
 
 
    </Main>
  );
}



function NoSiguesANadie() {
  return (
    <div className="NoSiguesANadie">
      <p className="NoSiguesANadie__mensaje">
        Tu feed no tiene fotos porque no sigues a nadie, o porque no han
        publicado fotos.
      </p>
      <div className="text-center">
        <Link to="/explore" className="NoSiguesANadie__boton">
          Explora Clontagram
        </Link>
      </div>
    </div>
  );
}




function CargarMasPosts({ onClick, todosLosPostsCargados }) {
  if (todosLosPostsCargados) {
    return <div className="Feed__no-hay-mas-posts">No hay más posts</div>;
  }
  return (
    <button className="Feed__cargar-mas" onClick={onClick}>
      Ver más
    </button>
  );
}
