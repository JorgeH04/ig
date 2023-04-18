import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as heartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons';


export default function BotonLike({ onSubmitLike, like }) {
  return (
    <button onClick={onSubmitLike}>
      {like ? (
          <img src="https://res.cloudinary.com/dd3uzxyfv/image/upload/c_scale,w_60/v1678201593/images_vsw9ru.png" 
           
            />

      ) : (
          <img src="https://res.cloudinary.com/dd3uzxyfv/image/upload/c_scale,w_60/v1678201586/Download_s8xkep.png"/>
      )}

                  

    </button>
  );
}