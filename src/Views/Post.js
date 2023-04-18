import React, { useState, useEffect } from 'react';
import Main from '../Components/Main';
import Loading from '../Components/Loading';
import Avatar from '../Components/Avatar';
import Comentar from '../Components/Comentar';
import BotonLike from '../Components/BotonLike';
import RecursoNoExiste from '../Components/RecursoNoExiste';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { toggleLike, comentar } from '../Helpers/post-helpers';


export default function PostVista({ mostrarError, match, usuario }) {
  const postId = match.params.id;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postNoExiste, setPostNoExiste] = useState(false);
  const [enviandoLike, setEnviandoLike] = useState(false);

  
  useEffect(() => {
    async function cargarPost() {
      try {
       // const { data: post } = await Axios.get(`https://igback.herokuapp.com/api/posts/${postId}`);
        const { data: post } = await Axios.get(`/api/posts/${postId}`);
        setPost(post);
        setLoading(false);
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 404 || error.response.status === 400)
        ) {
          setPostNoExiste(true);
        } else {
          mostrarError('Hubo un problema cargando este post.');
        }
        setLoading(false);
      }
    }
    cargarPost();
  }, [postId]);



  async function onSubmitComentario(mensaje) {
    const postActualizado = await comentar(post, mensaje, usuario);
    setPost(postActualizado);
  }



  async function onSubmitLike() {
    if (enviandoLike) {
      return;
    }
    try {
      setEnviandoLike(true);
      const postActualizado = await toggleLike(post);
      setPost(postActualizado);
      setEnviandoLike(false);
    } catch (error) {
      setEnviandoLike(false);
      mostrarError('Hubo un problema modificando el like. Intenta de nuevo.');
      console.log(error);
    }
  }
  if (loading) {
    return (
      <Main center>
        <Loading />
      </Main>
    );
  }
  if (postNoExiste) {
    return (
      <RecursoNoExiste mensaje="El post que estas intentando ver no existe" />
    );
  }
  if (post == null) {
    return null;
  }
  return (
    <Main center>
      <Post
        {...post}
        onSubmitComentario={onSubmitComentario}
        onSubmitLike={onSubmitLike}
      />
    </Main>
  );
}



function Post({
  comentarios,
  caption,
  url,
  title,
  usuario,
  estaLike,
  onSubmitLike,
  onSubmitComentario
}) {
  return (
<>
<div class="col-lg-9">
                    <div class="blog-item">
                        <div class="bi-pic">
                            <img src={caption} alt=""/>
                        </div>
                        <div class="bi-text">
                            <div class="label">Typography</div>
                            <h5><a href="./blog-details.html">Women were photography pioneers yet gender inequality persists in the...</a>
                            </h5>
                            <ul>
                                <li>by <span>Admin</span></li>
                                <li>Aug,15, 2019</li>
                                <li>20 Comment</li>
                            </ul>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo
                                viverra maecenas accumsan lacus vel facilisis. </p>
                        </div>
                    </div>
                 </div>
</>

  );
}


function Comments({ usuario, caption, comments }) {
  return (
    <ul className="Post__comentarios">
      <li className="Post__comentario">
        <Link
          to={`/perfil/${usuario.username}`}
          className="Post__autor-comentario"
        >
          <b>{usuario.username}</b>
        </Link>{' '}
        {caption}
      </li>
      {comments.map(comment => (
        <li className="Post__comentario" key={comment._id}>
          <Link
            to={`/perfil/${comment.usuario.username}`}
            className="Post__autor-comentario"
          >
            <b>{comment.usuario.username}</b>
          </Link>{' '}
          {comment.mensaje}
        </li>
      ))}
    </ul>
  );
}