<?php
/**
 * Plugin Name:       TAO System Requirements and Downloads
 * Plugin URI:        https://path/to/build/wordpress-plugin/index.html
 * Description:       Registers short codes to display TAO system requirements and downloads in real time
 * Version:           1.0.0
 * Requires at least: 5.5
 * Requires PHP:      7.2
 * Author:            Dieter Raber
 * License:           GPL v2
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Update URI:        https://path/to/build/wordpress-plugin/tao-system-requirements.zip
 */

require_once 'vendor/autoload.php';

use Oat\TaoSystemRequirements\WpBridge;

try {
    new WpBridge(plugin_basename( __FILE__ ), dirname(__FILE__));
} catch (Exception $e) {
    print $e->getMessage();
}