const { registerBlockType } = wp.blocks;
const { 
  RichText, 
  MediaUpload,
  BlockControls,
  AlignmentToolbar 
} = wp.editor;
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

registerBlockType('ga/hero', {


  title:'Ga Hero',
  icon: { src: Logo },
  category: 'gourmet-artist',
  attribute:{
    tituloHero: {
      type: 'string',
      source: 'html',
      selector: '.hero-block h1'
    },
    textoHero: {
      type: 'string',
      source: 'html',
      selector: '.hero-block p'
    },
    imagenHero: {
      type: 'string',
      selector: '.hero-block',
    },
    alinearContenido: {
      type: 'string',
      default: 'center',
    }
  },
  edit: props =>{

     //extraemos los valores de los props
     const { attributes: { 
      tituloHero,
      textoHero,
      imagenHero,
      alinearContenido
    }, 
    setAttributes } = props

    const onChangeTitulo = nuevoTitulo =>{
      setAttributes( { tituloHero:  nuevoTitulo } )
    }
    
    const onChangeTexto = nuevoTexto =>{
      setAttributes( { textoHero:  nuevoTexto } )
    }
    
    const onSeleccionarImagen = nuevoImagen =>{
      setAttributes( { imagenHero:  nuevoImagen.sizes.full.url } )
    }

    const onChangeAlinearContenido = nuevaAlineacion =>{
      setAttributes( { alinearContenido:  nuevaAlineacion } )
    }

    return (
      <div class="hero-block" style={{ backgroundImage: `url( ${imagenHero} )` }}>


      <BlockControls>
          <AlignmentToolbar
            onChange={onChangeAlinearContenido}
          />

          
      </BlockControls>

        <MediaUpload 
            onSelect={onSeleccionarImagen}
            type="image"
            value={imagenHero}
            render= { ( {open} ) =>(
              <IconButton
                onClick={open}
                icon="format-image"
                showTooltip="true"
                label="Cambiar Imagen"
              />
                
            ) }
          />

          <h1>
          <RichText
            style={ {textAlign: alinearContenido} } 
            placeholder="Agrega un texto"
            onChange={onChangeTitulo}
            value={tituloHero}
          />
          </h1>
          <p>
          <RichText
            style={ {textAlign: alinearContenido} } 
            placeholder="Agrega Descripcion texto"
            onChange={onChangeTexto}
            value={textoHero}
          />
          </p>
      </div>
    )
  },
  save: props =>{

    //extraemos los valores de los props
    const { attributes: { 
      tituloHero,
      textoHero,
      imagenHero,
      alinearContenido
      }, 
    } = props

    return (
      <div class="hero-block" style={
          { 
            backgroundImage: `url( ${imagenHero} )`,
            textAlign: alinearContenido 
          }
        }>
          <h1>
            <RichText.Content value={tituloHero} />
          </h1>
          <p>
            <RichText.Content value={textoHero} />
          </p>
      </div>
    )
  }

})