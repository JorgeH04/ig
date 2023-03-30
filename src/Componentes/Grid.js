import React from 'react';
import { Link } from 'react-router-dom';
export default function Grid({ posts }) {
  const columnas = posts.reduce((columnas, post) => {
    const ultimaColumna = columnas[columnas.length - 1];
    if (ultimaColumna && ultimaColumna.length < 3) {
      ultimaColumna.push(post);
    } else {
      columnas.push([post]);
    }
    return columnas;
  }, []);


  return (
    <div>
      {columnas.map((columna, index) => {
        return (
          <div key={index} className="Grid__row">
            {columna.map(post => (
              <GridFoto key={post._id} {...post} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
function GridFoto({ _id, url, caption }) {
  return (
    <>
    

         <div class="col-lg-3 col-md-6">
							<article class="post-grid mb-5">
								<a class="post-thumb mb-4 d-block" href="blog-single.html">
									<img src={url} alt="" class="img-fluid w-100"/>
								</a>
								<span class="cat-name text-color font-extra text-sm text-uppercase letter-spacing-1">Explore</span>
								<h3 class="post-title mt-1"><a href="blog-single.html">The best place to explore to enjoy</a></h3>

								<span class="text-muted letter-spacing text-uppercase font-sm">June 15, 2019</span>

							</article>
						</div>
	
  
    </>
  );
}