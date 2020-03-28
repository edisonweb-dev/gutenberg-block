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

}
add_action('init', 'ga_registrar_bloques');