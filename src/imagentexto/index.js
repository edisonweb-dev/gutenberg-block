const { registerBlockType } = wp.blocks;
const { 
  RichText, 
  MediaUpload,
  URLInputButton,
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

registerBlockType('ga/imagentexto', {
  title:'Ga Imagen',
  icon: { src: Logo },
  category: 'gourmet-artist',
  attribute:{
    appTitulo: {
      type: 'string',
      source: 'html',
      selector: '.contenido h1'
    },
    appTexto: {
      type: 'string',
      source: 'html',
      selector: '.contenido p'
    },
    appImagen: {
      type: 'string',
      source: 'attribute',
      attribute: 'src',
      selector: '.imagen img',
      default: Logo
    },
    urlApp:{
      type: 'string',
      source: 'attribute',
      attribute: 'href'
    },
    alinearContenido: {
      type: 'string',
      default: 'center',
    }
  },
  supports: {
    align: ['wide','full']
  },
  styles: [
    {
      name: 'default',
      label: 'Azul (default)',
      isDefault: true
    },
    {
      name: 'verde',
      label: 'Verde'
    },
    {
      name: 'rosa',
      label: 'Rosa'
    }
  ],
  edit: props => {

    //extraemos los valores de los props
    const { attributes: { 
      appTitulo,
      appTexto,
      appImagen,
      urlApp,
      alinearContenido
    }, 
    setAttributes } = props

    const onChangeTitulo = nuevoTitulo =>{
      setAttributes( { appTitulo:  nuevoTitulo } )
    }
    
    const onChangeTexto = nuevoTexto =>{
      setAttributes( { appTexto:  nuevoTexto } )
    }
    
    const onSeleccionarImagen = imagen =>{
      setAttributes( { appImagen:  imagen.sizes.medium.url } )
    }
    
    const onChangeURL = nuevaUrl =>{
      setAttributes( { urlApp:  nuevaUrl } )
    }
    
    const onChangeAlinearContenido = nuevaAlineacion =>{
      setAttributes( { alinearContenido:  nuevaAlineacion } )
    }

    return (
    <>
    <BlockControls>
          <AlignmentToolbar
            onChange={onChangeAlinearContenido}
            value={alinearContenido}
          />
    </BlockControls>
      <div className="imagen-texto-block">
          <div className="contenedor">
              <div className="contenido">
                  <h1>
                    <RichText
                      placeholder="Agrega el titulo"
                      onChange={onChangeTitulo}
                      value={appTitulo}
                      style={ {textAlign: alinearContenido} } 
                    />
                  </h1>

                  <p>
                    <RichText
                      placeholder="Agrega la descripción"
                      onChange={onChangeTexto}
                      value={appTexto}
                      style={ {textAlign: alinearContenido} } 
                    />
                  </p>
                  <a href={urlApp} className="boton">Descargar</a>
                  <URLInputButton 
                    url={urlApp}
                    onChange={onChangeURL}
                  />
              </div>
  
              <div className="imagen">
                  <img src={appImagen} />

                  <MediaUpload 
                      onSelect={onSeleccionarImagen}
                      type="image"
                      value={appImagen}
                      render= { ( {open} ) =>(
                        <IconButton
                          onClick={open}
                          icon="format-image"
                          showTooltip="true"
                          label="Seleccionar Imagen"
                        />
                          
                      ) }
                    />
              </div>
          </div>
      </div>
    </>
    )

  },
  save: props => {

    //extraemos los valores de los props
    const { attributes: { 
      appTitulo,
      appTexto,
      appImagen,
      urlApp,
      alinearContenido
    }, 
    } = props

    return (
      <div className="imagen-texto-block">
          <div className="contenedor">
              <div className="contenido" style={`text-align: ${alinearContenido}`}>
                  <h1>
                    <RichText.Content value={appTitulo} />
                  </h1>
                  <p>
                    <RichText.Content value={appTexto} />
                  </p>
                  <a href={urlApp} className="boton">Descargar</a>
              </div>
  
              <div className="imagen">
                  <img src={appImagen} />
              </div>
          </div>
      </div>
    )

  }
})