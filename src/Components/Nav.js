import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { faCompass, faUser } from '@fortawesome/free-regular-svg-icons';


export default function Nav({ usuario }) {
  return (
     <>


<div id="preloder">
        <div class="loader"></div>
    </div>




    <div class="header-logo py-5 d-none d-lg-block">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-6 text-center">
                    <a class="navbar-brand" href="index.html"><img src="images/logo.png" alt=""
                            class="img-fluid w-100"/></a>
                </div>
            </div>
        </div>
    </div>

    <header class="header-top bg-grey justify-content-center">
        <nav class="navbar navbar-expand-lg navigation">
            <div class="container">
              
                        <Link class="navbar-brand d-lg-none" to={`/`}>
                            <img src="images/logo.png" alt="" class="img-fluid"/>
                        </Link>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent"
                    aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="ti-menu"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarContent">
                    <ul id="menu" class="menu navbar-nav ">


                        <li class="nav-item dropdown  pl-0">
                              <Link class="nav-link dropdown-toggle"  to={`/`}>
                                 Home
                              </Link>
                        </li>

                        <li class="nav-item dropdown  pl-0">
                              <Link class="nav-link dropdown-toggle"  to={`/upload`}>
                                 Upload
                              </Link>
                        </li>
                        <li class="nav-item dropdown">
                             <Link class="nav-link dropdown-toggle"  to={`/explore`}>
                                Explore
                              </Link>
                        </li>

                        <li class="nav-item">
                             <Link class="nav-link" to={`/perfil/:username`}>
                                 Perfil
                              </Link>
                         </li>

                         <li class="nav-item">
                             {usuario && <LoginRoutes usuario={usuario} />}
                         </li>
 
                    </ul>
                </div>


            </div>
        </nav>

    </header>



    

 
    

    </>
  );
}



function LoginRoutes({ usuario }) {
  return (
    <>
      <li className="Nav__link-push">
        <Link className="Nav__link" to="/upload">
          <FontAwesomeIcon icon={faCameraRetro} />
        </Link>
      </li>
      <li className="Nav__link-margin-left">
        <Link className="Nav__link" to="/explore">
          <FontAwesomeIcon icon={faCompass} />
        </Link>
      </li>
      <li className="Nav__link-margin-left">
        <Link className="Nav__link" to={`/perfil/${usuario.username}`}>
          <FontAwesomeIcon icon={faUser} />
        </Link>
      </li>
    </>
  );
}