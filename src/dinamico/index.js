const { registerBlockType } = wp.blocks;
const { RichText} = wp.editor;
const { withSelect } = wp.data;

//importamos icono personalizado
import { ReactComponent as Logo } from '../ga-logo.svg';

/**  
        ---7 Pasos para crear un Bloque en Gutenberg ---
    1.- Importar el componente(s) que utilizarás
    2.- Coloca el componente donde deseas utilizarlo.
    3.- Crea una función que lea los contenidos
    4.- Registra un atributo
    5.- Extraer el contenido desde props
    6.- Guarda el contenido con setAttributes
    7.- Lee los contenidos guardados en save()
*/

registerBlockType('ga/dinamico', {
  title:'Ga Ultimas Recetas',
  icon: { src: Logo },
  category: 'gourmet-artist',
  edit: withSelect( select =>{
    return {
      //Consultar WP REST API para traer las ultimas recetas
      posts: select("core").getEntityRecords("postType","recetas",{
        per_page: 3,
        offset: 1
      })

      
      //posts: select("core").getEntityRecords('postType', 'post', { per_page: -1 })
    };
  }) 
  ( ({posts}) =>{
    
    console.log(posts);
    //Se hara una consulta a posts
    if(!posts){
      return 'Cargando..';
    }

    if(posts && posts.length == 0){
      return 'No hay resultados';
    }

    

    return (
      <>
        <h2>Últimas Recetas</h2>
        <ul className="ultimas-recetas contenedor">
        {
          posts.map(post => (
            <li>
              <img src={post.imagen_destacada} />
              <div className="contenido">
                <h3>{post.title.rendered}</h3>
                <p>
                  <RichText.Content value={post.content.rendered.substring(0, 180) + '...' } />
                </p>
                <a href={post.link} className="boton" >Leer Más</a>
              </div>
            </li>
          ) )
        }
        </ul>
      </>
    )


  }),
  save: () =>{
    return null
  }

})