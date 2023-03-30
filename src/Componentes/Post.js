import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import BotonLike from './BotonLike';
import Comentar from './Comentar';
import { toggleLike, comentar } from '../Helpers/post-helpers';
export default function Post({ post, actualizarPost, mostrarError, usuario }) {
  const {
    numLikes,
    numComentarios,
    comentarios,
    _id,
    caption,
    title,
    url,
    usuario: usuarioDelPost,
    estaLike
  } = post;
  const [enviandoLike, setEnviandoLike] = useState(false);
  async function onSubmitLike() {
    if (enviandoLike) {
      return;
    }
    try {
      setEnviandoLike(true);
      const postActualizado = await toggleLike(post);
      actualizarPost(post, postActualizado);
      setEnviandoLike(false);
    } catch (error) {
      setEnviandoLike(false);
      mostrarError('Hubo un problema modificando el like. Intenta de nuevo.');
      console.log(error);
    }
  }
  async function onSubmitComentario(mensaje) {
    const postActualizado = await comentar(post, mensaje, usuario);
    actualizarPost(post, postActualizado);
  }
  return (


<>
              <div class="single-post">
                        <div class="post-header mb-5 text-center">
                            <div class="meta-cat">
                                <a class="post-category font-extra text-color text-uppercase font-sm letter-spacing-1"
                                    href="#">Health ,</a>
                                <a class="post-category font-extra text-color text-uppercase font-sm letter-spacing-1"
                                    href="#">lifestyle</a>
                            </div>
                            <h2 class="post-title mt-2">
                                First Look At Self-Portrait's Autumn Collection
                            </h2>

                            <div class="post-meta">
                                <span class="text-uppercase font-sm letter-spacing-1 mr-3">by Liam</span>
                                <span class="text-uppercase font-sm letter-spacing-1">January 17,2019</span>
                            </div>
                            <div class="post-featured-image mt-5">
                   
                                <img src={url} class="img-fluid w-100" alt="featured-image"/>
                            </div>
                        </div>
                        <div class="post-body">

                       
                        </div>
                    </div>
</>
  );
}




function VerTodosLosComentarios({ _id, numComentarios }) {
  if (numComentarios < 4) {
    return null;
  }
  return (
    <li className="text-grey-dark">
      <Link to={`/post/${_id}`}>Ver los {numComentarios} comentarios</Link>
    </li>
  );
}


function Comentarios({ comentarios }) {
  if (comentarios.length === 0) {
    return null;
  }
  return comentarios.map(comentario => {
    return (
      <li key={comentario._id}>
        <Link to={`/perfil/${comentario.usuario.username}`}>
          <b>{comentario.usuario.username}</b>
        </Link>{' '}
        {comentario.mensaje}
      </li>
    );
  });
}