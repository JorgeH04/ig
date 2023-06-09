import React, { useState } from 'react';
import Main from '../Components/Main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import Loading from '../Components/Loading';
import Axios from 'axios';

export default function Upload({ history, mostrarError }) {
  const [imageUrl, setImageUrl] = useState('');
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [enviandoPost, setEnviandoPost] = useState(false);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');



  async function handleImagenSeleccionada(evento) {
    try {
      setSubiendoImagen(true);
      const file = evento.target.files[0];
      const config = {
        headers: {
          'Content-Type': file.type
        }
      };
    //  const { data } = await Axios.post('https://igback.herokuapp.com/api/posts/upload', file, config);
      const { data } = await Axios.post('/api/posts/upload', file, config);
      setImageUrl(data.url);
      setSubiendoImagen(false);
    } catch (error) {
      setSubiendoImagen(false);
      mostrarError(error.response.data);
      console.log(error);
    }
  }



  
  async function handleSubmit(evento) {
    evento.preventDefault();
    // if (enviandoPost) {
    //   return;
    // }
    // if (subiendoImagen) {
    //   mostrarError('No se ha terminado de subir la imagen');
    //   return;
    // }
    // if (!imagenUrl) {
    //   mostrarError('Primero selecciona una imagen');
    //   return;
    // }
    try {
      setEnviandoPost(true);
      const body = {
        caption,
        title,
    //    url: imagenUrl
      };
      //await Axios.post('https://igback.herokuapp.com/api/posts', body);
      await Axios.post('/api/posts', body);
      setEnviandoPost(false);
      history.push('/');
    } catch (error) {
      mostrarError(error.response.data);
    }
  }
  return (
    <Main center>
      <div className="Upload">
        <form onSubmit={handleSubmit}>
        {/* <div className="Upload__image-section">
            <SeccionSubirImagen
              imagenUrl={imagenUrl}
              subiendoImagen={subiendoImagen}
              handleImagenSeleccionada={handleImagenSeleccionada}
            />
          </div> */}
       
          <input 
             className="Upload__caption"
             value={title}
             onChange={e => setTitle(e.target.value)}
          />
          
          <textarea
            name="caption"
            className="Upload__caption"
            required
            maxLength="180"
            placeholder="Caption de tu post."
            value={caption}
            onChange={e => setCaption(e.target.value)}
          />


          <button className="Upload__submit" type="submit">
            Post
          </button>
        </form>
      </div>
    </Main>
  );
}



function SeccionSubirImagen({
  subiendoImagen,
  imagenUrl,
  handleImagenSeleccionada
}) {
  if (subiendoImagen) {
    return <Loading />;
  } else if (imagenUrl) {
    return <img src={imagenUrl} alt="" />;
  } else {
    return (
      <label className="Upload__image-label">
        <FontAwesomeIcon icon={faUpload} />
        <span>Publica una foto</span>
        <input
          type="file"
          className="hidden"
          name="imagen"
          onChange={handleImagenSeleccionada}
        />
      </label>
    );
  }
}