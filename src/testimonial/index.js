const { registerBlockType } = wp.blocks;
const { 
  RichText, 
  MediaUpload,
  InspectorControls,
  ColorPalette
 } = wp.editor;

const { IconButton, PanelBody } = wp.components;

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
    },
    colorTestimonial: {
      type: 'string'
    }
  },
  edit: props =>{

    //extraemos los valores de los props
    const { attributes: { 
      textoTestimonial, 
      nombreTestimonial,
      imagenTestimonial,
      colorTestimonial 
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

    const onChangeColorTestimonial = colorNuevo =>{
      setAttributes( { colorTestimonial:  colorNuevo } )
    }

      return (
        <>
        <InspectorControls>
          <PanelBody title={'Opciones de Color'}>
            <div className="components-base-control">
              <div className="components-base-control__field">
                <label className="components-base-control__label">
                  Color de texto y linea
                </label>
                <ColorPalette 
                  onChange={onChangeColorTestimonial}
                />
              </div>
            </div>
          </PanelBody>
        </InspectorControls>
        <div className="seccion contenedor">
            <h1>Testimonial</h1>

            <div className="testimonial-block" style={ { borderColor: colorTestimonial } }>
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
                      style={{ color: colorTestimonial }}
                    />
                    </p>
                </div>
            </div>
          </div>
        </>
      )
  },
  save: props =>{

    const { attributes: { 
      textoTestimonial,
      nombreTestimonial,
      imagenTestimonial,
      colorTestimonial
     } 
    } = props

    return (
      <div className="seccion contenedor">
            <h1>Testimonial</h1>

            <div className="testimonial-block" style={ { borderColor: colorTestimonial } }>
                <blockquote>
                    <RichText.Content value={textoTestimonial} />
                </blockquote>

                <div className="testimonial-info">
                    <img src={imagenTestimonial} />
                    <p style={{ color: colorTestimonial }} >
                    <RichText.Content 
                      value={nombreTestimonial}
                      
                    />
                    </p>
                </div>
            </div>
          </div>
    )
  }


})