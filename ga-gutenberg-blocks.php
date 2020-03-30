<?php 
/*
    Plugin Name: GA Artist Bloques de gutenberg
    Plugin URI:
    Description: Añade Bloques personalizados de Gutenberg
    Version: 1.0
    Author: Edison Perdomo
    Author URI:
    License: GLP2
    Licence URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

if(!defined('ABSPATH')) exit;

//* Registrar los bloques y el css */


function ga_registrar_bloques(){

  //si gutenberg no existe no ejecutar nada
  if( !function_exists('register_block_type') ){
    return;
  }

  // Registrar el script que contiene los bloques
  wp_register_script(
    'ga-editor-script', //nombre
    plugins_url('build/index.js', __FILE__), // Archivo con los bloques
    array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'), // dependencia
    filemtime( plugin_dir_path(__FILE__) .'build/index.js' ) //version
  );


  // Registrar Estilos para el editor
  wp_register_style(
    'ga-editor-style', //nombre
    plugins_url('build/editor.css', __FILE__), // Archivo ubicacion
    array('wp-edit-blocks'), // dependencia
    filemtime( plugin_dir_path(__FILE__) .'build/editor.css' ) //version
  );

  // Registrar Estilos para el frontend
  wp_register_style(
    'ga-front-end-style', //nombre
    plugins_url('build/style.css', __FILE__), // Archivo ubicacion
    array(), // dependencia
    filemtime( plugin_dir_path(__FILE__) .'build/style.css' ) //version
  );

  // Importante Los bloques no tiene consulta a la base de datos
  //Arreglo de bloques 
  $blocks = array(
    'ga/testimonial',
    'ga/hero',
    'ga/imagentexto'
  );

  foreach($blocks as $block){
    register_block_type(
      $block,
      array(
        'editor_script' => 'ga-editor-script', // informacion del bloque
        'editor_style' => 'ga-editor-style', // estilos css al editor gutenberg
        'style' => 'ga-front-end-style'
      )
    );
  }

  //Bloque que realiza consulta a la base de datos 
  //Registrar Bloque Dinamico
  register_block_type(
    'ga/dinamico',
    array(
      'editor_script' => 'ga-editor-script', // informacion del bloque
      'editor_style' => 'ga-editor-style', // estilos css al editor gutenberg
      'style' => 'ga-front-end-style',
      'render_callback' => 'ga_ultimas_recetas_gutenberg' // llamada a una funcion
    )
  );

}
add_action('init', 'ga_registrar_bloques');


//Creamos la nueva categoria para los bloques de gutenberg
function ga_nueva_categoria($categories, $post){
  return array_merge(
    $categories,
    array(
      array(
        'slug' => 'gourmet-artist',
        'title' => 'Gourmet Artist (GA)',
        'icon' => 'awards'
      )
    )
  );
}
add_filter('block_categories', 'ga_nueva_categoria', 10, 2);


//Query a la base de datos para el frontend
// bloque dinamico de gutenberg
function ga_ultimas_recetas_gutenberg(){
  
  global $post;

  $args = array(
    'post_type' => 'recetas',
    'numberposts' => 3,
    'post_status' => 'publish'
  );

  //arreglo recetas
  $recetas = wp_get_recent_posts($args);

  if(count($recetas) == 0){
    return 'No hay recetas';
  }

  $cuerpo = '';
  $cuerpo .= '<h2>Últimas Recetas</h2>';
  $cuerpo .= '<ul className="ultimas-recetas contenedor">';

  foreach($recetas as $receta):

    $post = get_post($receta['ID']);
    setup_postdata($post);

    $cuerpo .= sprintf(
      '
      <li>
        %1$s
        <div className="contenido">
          <h3>%2$s</h3>
          <p>
            %3$s
          </p>
          <a href="%4$s" className="boton" >Leer Más</a>
        </div>
      </li>
      ',
      get_the_post_thumbnail($post),
      esc_html(get_the_title($post)),
      esc_html( wp_trim_words( get_the_content($post), 30 ) ),
      esc_url( get_the_permalink($post) )

    );

    wp_reset_postdata();
  endforeach;
  
  $cuerpo .= '</ul>';

  return $cuerpo;
}


//Muestra la imagen destacada en la WP REST API
function ga_imagenes_rest_api(){
  register_rest_field( 
    array('recetas'), 
    'imagen_destacada', 
    array(
      'get_callback' => 'ga_obtener_imagen_destacada',
      'update_callback' => null,
      'schema' => null
    ) 
  );
}
add_action('rest_api_init', 'ga_imagenes_rest_api');



function ga_obtener_imagen_destacada($object, $field_name, $request){

  if($object['featured_media']){
    $imagen = wp_get_attachment_image_src($object['featured_media'], 'medium');
    return $imagen[0];
  }
  return false;
}

