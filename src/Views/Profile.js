import React, { useState, useEffect } from 'react';
import Main from '../Components/Main';
import Loading from '../Components/Loading';
import Grid from '../Components/Grid';
import RecursoNoExiste from '../Components/RecursoNoExiste';
import Axios from 'axios';
import stringToColor from 'string-to-color';
import toggleSiguiendo from '../Helpers/amistad-helpers';
import useEsMobil from '../Hooks/useEsMobil';


export default function Profile({ mostrarError, usuario, match, logout }) {
  const username = match.params.username;
  const [profileOwner, setProfileOwner] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [perfilNoExiste, setPerfilNoExiste] = useState(false);
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [enviandoAmistad, setEnviandoAmistad] = useState(false);
  const esMobil = useEsMobil();


  useEffect(() => {
    async function cargarPostsYUsuario() {
      try {
        setLoading(true);
        // const { data: usuario } = await Axios.get(`https://igback.herokuapp.com/api/usuarios/${username}`);
        // const { data: posts } = await Axios.get(
        //   `https://igback.herokuapp.com/api/posts/usuario/${usuario._id}`
        // );

        const { data: usuario } = await Axios.get(`/api/usuarios/${username}`);
        const { data: posts } = await Axios.get(
          `/api/posts/usuario/${usuario._id}`
        );
        setProfileOwner(usuario);
        setPosts(posts);
        setLoading(false);
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 404 || error.response.status === 400)
        ) {
          setPerfilNoExiste(true);
        } else {
          mostrarError('Hubo un problema cargando este perfil.');
        }
        setLoading(false);
      }
    }
    cargarPostsYUsuario();
  }, [username]);





  function esElPerfilDeLaPersonaLogin() {
    return usuario._id === profileOwner._id;
  }



  
  
  async function handleImagenSeleccionada(event) {
    try {
      setSubiendoImagen(true);
      const file = event.target.files[0];
      const config = {
        headers: {
          'Content-Type': file.type
        }
      };
      const { data } = await Axios.post('/api/usuarios/upload', file, config);
      setProfileOwner({ ...profileOwner, imagen: data.url });
      setSubiendoImagen(false);
    } catch (error) {
      mostrarError(error.response.data);
      setSubiendoImagen(false);
      console.log(error);
    }
  }


  async function onToggleSiguiendo() {
    if (enviandoAmistad) {
      return;
    }
    try {
      setEnviandoAmistad(true);
      const usuarioActualizado = await toggleSiguiendo(profileOwner);
      setProfileOwner(usuarioActualizado);
      setEnviandoAmistad(false);
    } catch (error) {
      mostrarError(
        'Hubo un problema siguiendo/dejando de seguir a este usuario. Intenta de nuevo'
      );
      setEnviandoAmistad(false);
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
  if (perfilNoExiste) {
    return (
      <RecursoNoExiste mensaje="El perfil que estas intentando ver no existe" />
    );
  }
  if (usuario == null) {
    return null;
  }



  return (
    <Main>
   <div className="Perfil">
        <ImageAvatar
          esElPerfilDeLaPersonaLogin={esElPerfilDeLaPersonaLogin()}
          usuarioDueñoDelPerfil={profileOwner}
          handleImagenSeleccionada={handleImagenSeleccionada}
          subiendoImagen={subiendoImagen}
        />
        <div className="Perfil__bio-container">
          <div className="Perfil__bio-heading">
            <h2 className="capitalize">{profileOwner.username}</h2>
            {!esElPerfilDeLaPersonaLogin() && (
              <FollowButton
                siguiendo={profileOwner.siguiendo}
                toggleSiguiendo={onToggleSiguiendo}
              />
            )}
            {esElPerfilDeLaPersonaLogin() && <LogoutButton logout={logout} />}
          </div>
          {!esMobil && (
            <DescripcionPerfil usuarioDueñoDelPerfil={profileOwner} />
          )}
        </div>
      </div>


      {esMobil && (
        <DescripcionPerfil usuarioDueñoDelPerfil={profileOwner} />
      )}

 

  <section class="section-padding">
		<div class="container">
			<div class="row">
				<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div class="row">

              {posts.length > 0 ? <Grid posts={posts} /> : <NoHaPosteadoFotos />}

					</div>
				</div>
			</div>
		</div>
	</section>
    </Main>
  );
}











function DescripcionPerfil({profileOwner}) {
  return (
    <div className="Perfil__descripcion">
      <h2 className="Perfil__nombre">{profileOwner.nombre}</h2>
      <p>{profileOwner.bio}</p>
      <p className="Perfil__estadisticas">
        <b>{profileOwner.numSiguiendo}</b> following
        <span className="ml-4">
          <b>{profileOwner.numSeguidores}</b> followers
        </span>
      </p>
    </div>
  );
}











function ImageAvatar({
  esElPerfilDeLaPersonaLogin,
  profileOwner,
  handleImagenSeleccionada,
  subiendoImagen
}) {
  let contenido;
  if (subiendoImagen) {
    contenido = <Loading />;
  } else if (esElPerfilDeLaPersonaLogin) {
    contenido = (
      <label
        className="Perfil__img-placeholder Perfil__img-placeholder--pointer"
        style={{
          backgroundImage: profileOwner.imagen
            ? `url(${profileOwner.imagen})`
            : null,
          backgroundColor: stringToColor(profileOwner.username)
        }}
      >
        <input
          type="file"
          onChange={handleImagenSeleccionada}
          className="hidden"
          name="imagen"
        />
      </label>
    );
  } else {
    contenido = (
      <div
        className="Perfil__img-placeholder"
        style={{
          backgroundImage: profileOwner.imagen
            ? `url(${profileOwner.imagen})`
            : null,
          backgroundColor: stringToColor(profileOwner.username)
        }}
      />
    );
  }
  return <div className="Perfil__img-container">{contenido}</div>;
}










function FollowButton({ siguiendo, toggleSiguiendo }) {
  return (
    <button onClick={toggleSiguiendo} className="Perfil__boton-seguir">
      {siguiendo ? 'Dejar de seguir' : 'Seguir'}
    </button>
  );
}









function LogoutButton({ logout }) {
  return (
    <button className="Perfil__boton-logout" onClick={logout}>
      Logout
    </button>
  );
}







function NoHaPosteadoFotos() {
  return <p className="text-center">Este usuario no ha poteado fotos.</p>;
}