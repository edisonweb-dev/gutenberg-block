const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload } = wp.editor;
const { IconButton } = wp.components;

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

registerBlockType('ga/testimonial', {


  title:'Ga Testimonial',
  icon: { src: Logo },
  category: 'gourmet-artist',
  attribute: {
    textoTestimonial: {
      type: 'string',
      source: 'html',
      selector: '.testimonial-block blockquote'
    },
    nombreTestimonial: {
      type: 'string',
      source: 'html',
      selector: '.testimonial-info p'
    },
    imagenTestimonial: {
      type: 'string',
      source: 'attribute',
      attribute: 'src',
      selector: '.testimonial-info img',
      default: Logo
    }
  },
  edit: props =>{

    //extraemos los valores de los props
    const { attributes: { 
      textoTestimonial, 
      nombreTestimonial,
      imagenTestimonial 
    }, 
    setAttributes } = props

    const onChangeTextoTestimonial = nuevoTexto =>{
      setAttributes( { textoTestimonial:  nuevoTexto } )
    }
    
    const onChangeNombreTestimonial = nuevoTestimonial =>{
      setAttributes( { nombreTestimonial:  nuevoTestimonial } )
    }
    
    const onSeleccionarImagen = imagen =>{
      setAttributes( { imagenTestimonial:  imagen.sizes.medium.url } )
    }

      return (
        <div className="seccion contenedor">
            <h1>Testimonial</h1>

            <div className="testimonial-block">
                <blockquote>
                    <RichText 
                      placeholder="Agrega un texto del testimonial"
                      onChange={onChangeTextoTestimonial}
                      value={textoTestimonial}
                    />
                </blockquote>

                <div className="testimonial-info">
                    <img src={imagenTestimonial} />
                    <MediaUpload 
                      onSelect={onSeleccionarImagen}
                      type="image"
                      value={imagenTestimonial}
                      render= { ( {open} ) =>(
                        <IconButton
                          onClick={open}
                          icon="format-image"
                          showTooltip="true"
                          label="Seleccionar Imagen"
                        />
                          
                      ) }
                    />
                    <p>
                    <RichText 
                      placeholder="Agrega el nombre del testimonial"
                      onChange={onChangeNombreTestimonial}
                      value={nombreTestimonial}
                    />
                    </p>
                </div>
            </div>
          </div>
      )
  },
  save: props =>{

    const { attributes: { 
      textoTestimonial,
      nombreTestimonial,
      imagenTestimonial
     } 
    } = props

    return (
      <div className="seccion contenedor">
            <h1>Testimonial</h1>

            <div className="testimonial-block">
                <blockquote>
                    <RichText.Content value={textoTestimonial} />
                </blockquote>

                <div className="testimonial-info">
                    <img src={imagenTestimonial} />
                    <p>
                    <RichText.Content value={nombreTestimonial} />
                    </p>
                </div>
            </div>
          </div>
    )
  }


})