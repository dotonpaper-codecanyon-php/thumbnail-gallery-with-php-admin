<?php

/*
* Title                   : Thumbnail Gallery (with PHP Admin)
* Version                 : 1.3
* File                    : config.php
* File Version            : 1.0
* Created / Last Modified : 15 April 2012
* Author                  : Dot on Paper
* Copyright               : © 2012 Dot on Paper
* Website                 : http://www.dotonpaper.net
* Description             : Thumbnail Gallery Config.
*/
    
    if (!isset($DOPTG_load_scripts)){
        exit('<h2 style="color:#aaaaaa; font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:bold;">Warning! No direct script access allowed.</h2>');
    }
    
    define("DOPTG_ADMIN_USERNAME", ""); // Add admin username.
    define("DOPTG_ADMIN_PASSWORD", ""); // Add admin password.
    define("DOPTG_URL", ""); // Add URL to doptg folder (must start with http:// and end with /).
    define("DOPTG_ABSOLUTE_PATH", ""); // Add ABSOLUTE PATH to doptg folder (must end with /).

?>