<?php

/*
* Title                   : Thumbnail Gallery (with PHP Admin)
* Version                 : 1.3
* File                    : index.php
* File Version            : 1.0
* Created / Last Modified : 15 April 2012
* Author                  : Dot on Paper
* Copyright               : © 2012 Dot on Paper
* Website                 : http://www.dotonpaper.net
* Description             : Admin index file.
*/

    session_start();
    $DOPTG_load_scripts = true;
    
    require_once('../config.php');
    require_once('assets/php/translation.php');
        
    if (isset($_GET['sign_out']) && $_GET['sign_out'] == 'true'){
        $_SESSION['DOP_ThumbnailGallery_isLogin'] = false;
        header('Location: '.DOPTG_URL.'doptg/admin');
    }
    else{
        if (isset($_SESSION['DOP_ThumbnailGallery_isLogin']) && $_SESSION['DOP_ThumbnailGallery_isLogin'] == true){
            require_once('assets/php/template-admin.php');
        }
        else{
            require_once('assets/php/template-login.php');
        }
    }

?>