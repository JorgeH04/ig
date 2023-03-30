import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Main from '../Componentes/Main';
import imagenSignup from '../imagenes/signup.png';         
//import ErrorMsg from './ErrorMsg' 

export default function Signup({ signup, mostrarError }) {
  const [usuario, setUsuario] = useState({
    email: '',
    username: '',
    password: '',
    bio: '',
    nombre: ''
  });
 // const [error, setError] = useState('')


  function handleInputChange(e) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  }


  
  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      await signup(usuario);
    } catch (error) {
      mostrarError(error.response.data);
     
    }

    // let { error } = response.data
    // if(error){
    //     console.log(error)
    //     setError(error)
    //     setTimeout( ()=>{
    //         setError('')
    //     },6000)
    // }else{
    //     console.log(response.data)
    //     alert('change')
    // }


  }



  return (
    <Main center={true}>


      <div className="Signup">
        <div className="FormContainer">
          <h1 className="Form__titulo">Clontagram</h1>
          <p className="FormContainer__info">
            Regístrate para que veas el clon de Instagram
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="Form__field"
              required
              onChange={handleInputChange}
              value={usuario.email}
            />
            <input
              type="text"
              name="nombre"
              placeholder="Nombre y Apellido"
              className="Form__field"
              required
              minLength="3"
              maxLength="100"
              onChange={handleInputChange}
              value={usuario.nombre}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="Form__field"
              required
              minLength="3"
              maxLength="30"
              onChange={handleInputChange}
              value={usuario.username}
            />
            <input
              type="text"
              name="bio"
              placeholder="Cuéntanos de ti..."
              className="Form__field"
              required
              maxLength="150"
              onChange={handleInputChange}
              value={usuario.bio}
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="Form__field"
              required
              onChange={handleInputChange}
              value={usuario.password}
            />
            <button className="Form__submit" type="submit">
              Sign up
            </button>
            <p className="FormContainer__info">
              Ya tienes cuenta? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>



           <div class="contact_section layout_padding">
         <div class="container">
            <div class="row">
           
               <div class="col-md-6">
                  <div class="mail_section">
                     <h1 class="contact_taital">Contact us</h1>
                     <form onSubmit={handleSubmit}>
                        <input type="email" name="email" class="email_text" placeholder="Email" onChange={handleInputChange} />
                        <input 
                            type="password" 
                            class="email_text" 
                            placeholder="Password" 
                            name="nombre"               
                            onChange={handleInputChange}
                            value={usuario.nombre} 
                            minLength="3"
                            maxLength="100"
                            />
                          <input 
                            type="password" 
                            class="email_text" 
                            placeholder="Password" 
                            name="nombre"               
                            onChange={handleInputChange}
                            value={usuario.nombre} 
                            minLength="3"
                            maxLength="100"
                            />    
                          <input 
                            type="text"
                            name="bio"
                            placeholder="Cuéntanos de ti..."
                            class="email_text" 
                            required
                            maxLength="150"
                            onChange={handleInputChange}
                            value={usuario.bio}
                            />   

                          <input 
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            class="email_text" 
                            required
                            onChange={handleInputChange}
                            value={usuario.password}
                            />   
                         <div class="send_bt"><a href="#">send</a></div>
                     </form>

                  </div>
               </div>
            </div>
         </div>
      </div>

    </Main>
  );
}