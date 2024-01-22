<?php
/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://infinityloop.pl
 * @since      1.0.0
 *
 * @package    Infinity_Bus
 * @subpackage Infinity_Bus/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Infinity_Bus
 * @subpackage Infinity_Bus/includes
 * @author     Rafał Herszkowicz <rafal.herszkowicz@outlook.com>
 */
class Infinity_Bus_I18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'infinity-bus',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
