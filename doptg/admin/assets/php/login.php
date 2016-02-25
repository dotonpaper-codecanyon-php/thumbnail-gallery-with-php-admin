<?php

/*
* Title                   : Thumbnail Gallery (with PHP Admin)
* Version                 : 1.3
* File                    : login.php
* File Version            : 1.0
* Created / Last Modified : 15 April 2012
* Author                  : Dot on Paper
* Copyright               : © 2012 Dot on Paper
* Website                 : http://www.dotonpaper.net
* Description             : Admin Login.
*/

    session_start();
    
    if (isset($_POST['username']) && isset($_POST['password'])){
        $DOPTG_load_scripts = true;
        require_once('../../../config.php');

        if (DOPTG_ADMIN_USERNAME == $_POST['username'] && DOPTG_ADMIN_PASSWORD == $_POST['password']){
            $_SESSION['DOP_ThumbnailGallery_isLogin'] = true;
            echo 'success';
        }
        else{
            $_SESSION['DOP_ThumbnailGallery_isLogin'] = false;
            echo 'error';
        }
    }   
    else{
        exit('<h2 style="color:#aaaaaa; font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:bold;">Warning! No direct script access allowed.</h2>');        
    }

?>