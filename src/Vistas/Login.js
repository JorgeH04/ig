import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Main from '../Componentes/Main';


export default function Login({ login, mostrarError }) {
  const [emailYPassword, setEmailYPassword] = useState({
    email: '',
    password: ''
  });



  function handleInputChange(e) {
    setEmailYPassword({
      ...emailYPassword,
      [e.target.name]: e.target.value
    });
  }

  
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(emailYPassword.email, emailYPassword.password);
    } catch (error) {
      mostrarError(error.response.data);
      console.log(error);
    }
  }
  return (
    <Main center>


     <div class="contact_section layout_padding">
         <div class="container">
            <div class="row">
           
               <div class="col-md-6">
                  <div class="mail_section">
                     <h1 class="contact_taital">Contact us</h1>
                     <form onSubmit={handleSubmit}>
                        <input type="email" name="email" class="email_text" placeholder="Email" onChange={handleInputChange} value={emailYPassword.email}/>
                        <input type="password" class="email_text" placeholder="Password" name="password" onChange={handleInputChange} value={emailYPassword.password} />
                         
                         <button type="submit" class="send_bt">
                            Login
                         </button>
                         <p className="FormContainer__info">
                           No tienes cuenta? <Link to="/signup">Signup</Link>
                         </p>
                     </form>

                  </div>
               </div>
            </div>
         </div>
      </div>


    </Main>
  );
}