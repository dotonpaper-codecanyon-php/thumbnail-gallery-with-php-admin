<?php

/*
* Title                   : Thumbnail Gallery (with PHP Admin)
* Version                 : 1.3
* File                    : login.js
* File Version            : 1.2
* Created / Last Modified : 20 January 2013
* Author                  : Dot on Paper
* Copyright               : © 2012 Dot on Paper
* Website                 : http://www.dotonpaper.net
* Description             : Admin PHP Class.
*/
    
    if (isset($_POST['action'])){
        $DOPTG_load_scripts = true;
        
        require_once('../../../config.php');
        require_once('translation.php');
        
        if (!class_exists("DOPTGAdmin")){
            class DOPTGAdmin{
                function DOPTGAdmin(){// Constructor.
                }

                function init(){// Admin init.

                }

                function showGalleries(){// Show Galleries List.                    
                    $jsonData = file_get_contents('../../../data/galleries.json');
                    $galleries = json_decode($jsonData, TRUE);
                    $HTML = array();
                    $galleriesHTML = array();
                    $no = 0;
                    
                    for ($i=count($galleries)-1; $i>=0; $i--){
                        if ($galleries[$i]['status'] != 'deleted'){
                            $no++;
                            array_push($galleriesHTML, '<li class="item" id="DOPTG-ID-'.$galleries[$i]['id'].'"><span class="id">ID '.$galleries[$i]['id'].':</span> <span class="name">'.$this->shortGalleryName($galleries[$i]['name'], 25).'</span></li>');
                        }
                    }                    
                    
                    if ($no == 0){
                        array_push($galleriesHTML, '<li class="no-data">'.DOPTG_NO_GALLERIES.'</li>');
                    }
                    
                    array_push($HTML, '<ul>');
                    array_push($HTML, implode('', $galleriesHTML));
                    array_push($HTML, '</ul>');
                                        
                    echo implode('', $HTML);
                }

                function addGallery(){// Add Gallery.                    
                    $jsonData = file_get_contents('../../../data/galleries.json');
                    $galleries = json_decode($jsonData, TRUE);                    
                    $settings = array();
                    
                    array_push($galleries, array("id" => count($galleries)+1, "name" => DOPTG_ADD_GALLERY_NAME, "status" => ""));
                    
                    $settings = array('Width' => 900,
                                      'Height' => 600,        
                                      'BgColor' => 'f1f1f1',
                                      'BgAlpha' => 100,
                                      'ImagesOrder' => 'normal',
                                      'ResponsiveEnabled' => 'true',
                                      'ThumbnailsPosition' => 'bottom',
                                      'ThumbnailsOverImage' => 'false',
                                      'ThumbnailsBgColor' => 'f1f1f1',
                                      'ThumbnailsBgAlpha' => 100,
                                      'ThumbnailsSpacing' => 5,
                                      'ThumbnailsPaddingTop' => 0,
                                      'ThumbnailsPaddingRight' => 5,
                                      'ThumbnailsPaddingBottom' => 5,
                                      'ThumbnailsPaddingLeft' => 5,
                                      'ThumbnailsNavigation' => 'normal',
                                      'ThumbnailsNavigationPrev' => 'doptg/uploads/settings/thumbnails-navigation-prev/0.png',
                                      'ThumbnailsNavigationPrevHover' => 'doptg/uploads/settings/thumbnails-navigation-prev-hover/0.png',
                                      'ThumbnailsNavigationNext' => 'doptg/uploads/settings/thumbnails-navigation-next/0.png',
                                      'ThumbnailsNavigationNextHover' => 'doptg/uploads/settings/thumbnails-navigation-next-hover/0.png',
                                      'ThumbnailLoader' => 'doptg/uploads/settings/thumb-loader/0.gif',
                                      'ThumbnailWidth' => 60,
                                      'ThumbnailHeight' => 60,
                                      'ThumbnailWidthMobile' => 60,
                                      'ThumbnailHeightMobile' => 60,
                                      'ThumbnailAlpha' => 50,
                                      'ThumbnailAlphaHover' => 100,
                                      'ThumbnailAlphaSelected' => 100,
                                      'ThumbnailBgColor' => 'f1f1f1',
                                      'ThumbnailBgColorHover' => '000000',
                                      'ThumbnailBgColorSelected' => '000000',
                                      'ThumbnailBorderSize' => 2,
                                      'ThumbnailBorderColor' => 'f1f1f1',
                                      'ThumbnailBorderColorHover' => '000000',
                                      'ThumbnailBorderColorSelected' => '000000',
                                      'ThumbnailPaddingTop' => 0,
                                      'ThumbnailPaddingRight' => 0,
                                      'ThumbnailPaddingBottom' => 0,
                                      'ThumbnailPaddingLeft' => 0,
                                      'ImageLoader' => 'doptg/uploads/settings/image-loader/0.gif',
                                      'ImageBgColor' => 'afafaf',
                                      'ImageBgAlpha' => 100,
                                      'ImageDisplayType' => 'fit',
                                      'ImageDisplayTime' => 1000,
                                      'ImageMarginTop' => 20,
                                      'ImageMarginRight' => 20,
                                      'ImageMarginBottom' => 20,
                                      'ImageMarginLeft' => 20,
                                      'ImagePaddingTop' => 5,
                                      'ImagePaddingRight' => 5,
                                      'ImagePaddingBottom' => 5,        
                                      'ImagePaddingLeft' => 5,
                                      'NavigationEnabled' => 'true',
                                      'NavigationOverImage' => 'true',
                                      'NavigationPrev' => 'doptg/uploads/settings/navigation-prev/0.png',
                                      'NavigationPrevHover' => 'doptg/uploads/settings/navigation-prev-hover/0.png',
                                      'NavigationNext' => 'doptg/uploads/settings/navigation-next/0.png',
                                      'NavigationNextHover' => 'doptg/uploads/settings/navigation-next-hover/0.png',
                                      'NavigationLightbox' => 'doptg/uploads/settings/navigation-lightbox/0.png',
                                      'NavigationLightboxHover' => 'doptg/uploads/settings/navigation-lightbox-hover/0.png',
                                      'NavigationTouchDeviceSwipeEnabled' => 'true',
                                      'CaptionWidth' => 900,
                                      'CaptionHeight' => 70,
                                      'CaptionTitleColor' => '000000',
                                      'CaptionTextColor' => '000000',
                                      'CaptionBgColor' => 'ffffff',
                                      'CaptionBgAlpha' => 50,
                                      'CaptionPosition' => 'bottom',
                                      'CaptionOverImage' => 'true',
                                      'CaptionScrollScrubColor' => '777777',
                                      'CaptionScrollBgColor' => 'e0e0e0',
                                      'CaptionMarginTop' => 0,
                                      'CaptionMarginRight' => 0,
                                      'CaptionMarginBottom' => 0,
                                      'CaptionMarginLeft' => 0,
                                      'CaptionPaddingTop' => 10,
                                      'CaptionPaddingRight' => 10,
                                      'CaptionPaddingBottom' => 10,
                                      'CaptionPaddingLeft' => 10,
                                      'LightboxEnabled' => 'true',
                                      'LightboxWindowColor' => '000000',
                                      'LightboxWindowAlpha' => 80,
                                      'LightboxLoader' => 'doptg/uploads/settings/lightbox-loader/0.gif',
                                      'LightboxBgColor' => '000000',
                                      'LightboxBgAlpha' => 100,
                                      'LightboxMarginTop' => 70,
                                      'LightboxMarginRight' => 70,
                                      'LightboxMarginBottom' => 70,
                                      'LightboxMarginLeft' => 70,
                                      'LightboxPaddingTop' => 10,
                                      'LightboxPaddingRight' => 10,
                                      'LightboxPaddingBottom' => 10,
                                      'LightboxPaddingLeft' => 10,
                                      'LightboxNavigationPrev' => 'doptg/uploads/settings/lightbox-navigation-prev/0.png',
                                      'LightboxNavigationPrevHover' => 'doptg/uploads/settings/lightbox-navigation-prev-hover/0.png',
                                      'LightboxNavigationNext' => 'doptg/uploads/settings/lightbox-navigation-next/0.png',
                                      'LightboxNavigationNextHover' => 'doptg/uploads/settings/lightbox-navigation-next-hover/0.png',
                                      'LightboxNavigationClose' => 'doptg/uploads/settings/lightbox-navigation-close/0.png',
                                      'LightboxNavigationCloseHover' => 'doptg/uploads/settings/lightbox-navigation-close-hover/0.png',
                                      'LightboxNavigationInfoBgColor' => '000000',
                                      'LightboxNavigationInfoTextColor' => 'dddddd',
                                      'LightboxNavigationTouchDeviceSwipeEnabled' => 'true',
                                      'SocialShareEnabled' => 'true',
                                      'SocialShare' => 'doptg/uploads/settings/social-share/0.png',
                                      'SocialShareLightbox' > 'doptg/uploads/settings/social-share-lightbox/0.png',
                                      'TooltipEnabled' => 'false',
                                      'TooltipBgColor' => 'ffffff',
                                      'TooltipStrokeColor' => '000000',
                                      'TooltipTextColor' => '000000',
                                      'Slideshow' => 'false',
                                      'SlideshowTime' => 5000,
                                      'SlideshowAutostart' => 'true',
                                      'SlideshowLoop' => 'true',
                                      'SlideshowPlay' => 'doptg/uploads/settings/slideshow-play/0.png',
                                      'SlideshowPlayHover' => 'doptg/uploads/settings/slideshow-play-hover/0.png',
                                      'SlideshowPause' => 'doptg/uploads/settings/slideshow-pause/0.png',
                                      'SlideshowPauseHover' => 'doptg/uploads/settings/slideshow-pause-hover/0.png',
                                      'AutoHide' => 'false',
                                      'AutoHideTime' => 2000);
                     
                    $file = fopen('../../../data/galleries.json', 'w');
                    fwrite($file, json_encode($galleries));
                    fclose($file);
                                                            
                    $file = fopen('../../../data/settings'.count($galleries).'.json', 'w');
                    fwrite($file, json_encode($settings));
                    fclose($file);
                    
                    $file = fopen('../../../data/content'.count($galleries).'.json', 'w');
                    fwrite($file, '[]');
                    fclose($file);
                    
                    $this->showGalleries();
                }

                function showGalleryInfo(){// Show Gallery Info.     
                    if ($_POST['gallery_id'] == 0){
                        echo file_get_contents('../../../data/settings.json');
                    }
                    else{
                        $jsonData = file_get_contents('../../../data/galleries.json');
                        $galleries = json_decode($jsonData, TRUE);
                        $name = '';

                        foreach ($galleries as $gallery){
                            if ($gallery['id'] ==  $_POST['gallery_id']){
                                $name = $gallery['name'];
                            }
                        }    
                        
                        $jsonData = file_get_contents('../../../data/settings'.$_POST['gallery_id'].'.json');
                        $settings = json_decode($jsonData, TRUE);
                        $settings['Name'] = $name;
                        
                        echo json_encode($settings);
                    }
                }

                function updateSettingsImage(){// Update Settings Images via AJAX.
                    if (isset($_POST['gallery_id'])){
                        $jsonData = file_get_contents('../../../data/settings'.$_POST['gallery_id'].'.json');
                        $settings = json_decode($jsonData, TRUE);
                        
                        switch ($_POST['item']){
                            case 'thumbnails_navigation_prev':
                                $settings['ThumbnailsNavigationPrev'] = 'doptg/'.$_POST['path'];
                                break;
                            case 'thumbnails_navigation_prev_hover':
                                $settings['ThumbnailsNavigationPrevHover'] = 'doptg/'.$_POST['path'];
                                break;
                            case 'thumbnails_navigation_next':
                                $settings['ThumbnailsNavigationNext'] = 'doptg/'.$_POST['path'];
                                break;
                            case 'thumbnails_navigation_next_hover':
                                $settings['ThumbnailsNavigationNextHover'] = 'doptg/'.$_POST['path'];
                                break;
                            case 'thumbnail_loader':
                                $settings['ThumbnailLoader'] = 'doptg/'.$_POST['path'];
                                break;
                            case 'image_loader':
                                $settings['ImageLoader'] = 'doptg/'.$_POST['path'];
                                break;
                            case 'navigation_prev':
                                $settings['NavigationPrev'] = 'doptg/'.$_POST['path'];
                                break;
                            case 'navigation_prev_hover':
                                $settings['NavigationPrevHover'] = 'doptg/'.$_POST['path'];
                                break;
                            case 'navigation_next':
                                $settings['NavigationNext'] = 'doptg/'.$_POST['path'];
                                break;
                            case 'navigation_next_hover':
                                $settings['NavigationNextHover'] = 'doptg/'.$_POST['path'];
                                break;
                            case 'navigation_lightbox':
                                $settings['NavigationLightbox'] = 'doptg/'.$_POST['path'];
                                break;
                            case 'navigation_lightbox_hover':
                                $settings['NavigationLightboxHover'] = 'doptg/'.$_POST['path'];
                                break;
                            case 'lightbox_loader':
                                $settings['LightboxLoader'] = 'doptg/'.$_POST['path'];
                                break;
                            case 'lightbox_navigation_prev':
                                $settings['LightboxNavigationPrev'] = 'doptg/'.$_POST['path'];
                                break;
                            case 'lightbox_navigation_prev_hover':
                                $settings['LightboxNavigationPrevHover'] = 'doptg/'.$_POST['path'];
                                break;
                            case 'lightbox_navigation_next':
                                $settings['LightboxNavigationNext'] = 'doptg/'.$_POST['path'];
                                break;
                            case 'lightbox_navigation_next_hover':
                                $settings['LightboxNavigationNextHover'] = 'doptg/'.$_POST['path'];
                                break;
                            case 'lightbox_navigation_close':
                                $settings['LightboxNavigationClose'] = 'doptg/'.$_POST['path'];
                                break;
                            case 'lightbox_navigation_close_hover':
                                $settings['LightboxNavigationCloseHover'] = 'doptg/'.$_POST['path'];
                                break;
                            case 'social_share':
                                $settings['SocialShare'] = 'doptg/'.$_POST['path'];
                                break;
                            case 'social_share_lightbox':
                                $settings['SocialShareLightbox'] = 'doptg/'.$_POST['path'];
                                break;                            
                            case 'slideshow_play':
                                $settings['SlideshowPlay'] = 'doptg/'.$_POST['path'];
                                break;
                            case 'slideshow_play_hover':
                                $settings['SlideshowPlayHover'] = 'doptg/'.$_POST['path'];
                                break;
                            case 'slideshow_pause':
                                $settings['SlideshowPause'] = 'doptg/'.$_POST['path'];
                                break;
                            case 'slideshow_pause_hover':
                                $settings['SlideshowPauseHover'] = 'doptg/'.$_POST['path'];
                                break;
                        }
                        
                        $file = fopen('../../../data/settings'.$_POST['gallery_id'].'.json', 'w');
                        fwrite($file, json_encode($settings));
                        fclose($file);

                        echo '';
                    }
                }

                function editGallery(){// Edit Gallery Settings.
                    if ($_POST['gallery_id'] == 0){
                        $jsonData = file_get_contents('../../../data/settings.json');
                    }
                    else{
                        $jsonData = file_get_contents('../../../data/settings'.$_POST['gallery_id'].'.json');
                    }
                    $settings = json_decode($jsonData, TRUE);
                                            
                    $settings['Width'] = $_POST['width'];
                    $settings['Height'] = $_POST['height'];
                    $settings['BgColor'] = $_POST['bg_color'];
                    $settings['BgAlpha'] = $_POST['bg_alpha'];
                    $settings['ImagesOrder'] = $_POST['images_order'];
                    $settings['ResponsiveEnabled'] = $_POST['responsive_enabled'];
                    $settings['ThumbnailsPosition'] = $_POST['thumbnails_position'];
                    $settings['ThumbnailsOverImage'] = $_POST['thumbnails_over_image'];
                    $settings['ThumbnailsBgColor'] = $_POST['thumbnails_bg_color'];
                    $settings['ThumbnailsBgAlpha'] = $_POST['thumbnails_bg_alpha'];
                    $settings['ThumbnailsSpacing'] = $_POST['thumbnails_spacing'];
                    $settings['ThumbnailsPaddingTop'] = $_POST['thumbnails_padding_top'];
                    $settings['ThumbnailsPaddingRight'] = $_POST['thumbnails_padding_right'];
                    $settings['ThumbnailsPaddingBottom'] = $_POST['thumbnails_padding_bottom'];
                    $settings['ThumbnailsPaddingLeft'] = $_POST['thumbnails_padding_left'];
                    $settings['ThumbnailsNavigation'] = $_POST['thumbnails_navigation'];
                    $settings['ThumbnailWidth'] = $_POST['thumbnail_width'];
                    $settings['ThumbnailHeight'] = $_POST['thumbnail_height'];
                    $settings['ThumbnailWidthMobile'] = $_POST['thumbnail_width_mobile'];
                    $settings['ThumbnailHeightMobile'] = $_POST['thumbnail_height_mobile'];
                    $settings['ThumbnailAlpha'] = $_POST['thumbnail_alpha'];
                    $settings['ThumbnailAlphaHover'] = $_POST['thumbnail_alpha_hover'];
                    $settings['ThumbnailAlphaSelected'] = $_POST['thumbnail_alpha_selected'];
                    $settings['ThumbnailBgColor'] = $_POST['thumbnail_bg_color'];
                    $settings['ThumbnailBgColorHover'] = $_POST['thumbnail_bg_color_hover'];
                    $settings['ThumbnailBgColorSelected'] = $_POST['thumbnail_bg_color_selected'];
                    $settings['ThumbnailBorderSize'] = $_POST['thumbnail_border_size'];
                    $settings['ThumbnailBorderColor'] = $_POST['thumbnail_border_color'];
                    $settings['ThumbnailBorderColorHover'] = $_POST['thumbnail_border_color_hover'];
                    $settings['ThumbnailBorderColorSelected'] = $_POST['thumbnail_border_color_selected'];
                    $settings['ThumbnailPaddingTop'] = $_POST['thumbnail_padding_top'];
                    $settings['ThumbnailPaddingRight'] = $_POST['thumbnail_padding_right'];
                    $settings['ThumbnailPaddingBottom'] = $_POST['thumbnail_padding_bottom'];
                    $settings['ThumbnailPaddingLeft'] = $_POST['thumbnail_padding_left'];
                    $settings['ImageBgColor'] = $_POST['image_bg_color'];
                    $settings['ImageBgAlpha'] = $_POST['image_bg_alpha'];
                    $settings['ImageDisplayType'] = $_POST['image_display_type'];
                    $settings['ImageDisplayTime'] = $_POST['image_display_time'];
                    $settings['ImageMarginTop'] = $_POST['image_margin_top'];
                    $settings['ImageMarginRight'] = $_POST['image_margin_right'];
                    $settings['ImageMarginBottom'] = $_POST['image_margin_bottom'];
                    $settings['ImageMarginLeft'] = $_POST['image_margin_left'];
                    $settings['ImagePaddingTop'] = $_POST['image_padding_top'];
                    $settings['ImagePaddingRight'] = $_POST['image_padding_right'];
                    $settings['ImagePaddingBottom'] = $_POST['image_padding_bottom'];
                    $settings['ImagePaddingLeft'] = $_POST['image_padding_left'];                                    
                    $settings['NavigationEnabled'] = $_POST['navigation_enabled'];                                
                    $settings['NavigationOverImage'] = $_POST['navigation_over_image'];
                    $settings['NavigationTouchDeviceSwipeEnabled'] = $_POST['navigation_touch_device_swipe_enabled'];
                    $settings['CaptionWidth'] = $_POST['caption_width'];
                    $settings['CaptionHeight'] = $_POST['caption_height'];
                    $settings['CaptionTitleColor'] = $_POST['caption_title_color'];
                    $settings['CaptionTextColor'] = $_POST['caption_text_color'];
                    $settings['CaptionBgColor'] = $_POST['caption_bg_color'];
                    $settings['CaptionBgAlpha'] = $_POST['caption_bg_alpha'];
                    $settings['CaptionPosition'] = $_POST['caption_position'];
                    $settings['CaptionOverImage'] = $_POST['caption_over_image'];
                    $settings['CaptionScrollScrubColor'] = $_POST['caption_scroll_scrub_color'];
                    $settings['CaptionScrollBgColor'] = $_POST['caption_scroll_bg_color'];
                    $settings['CaptionMarginTop'] = $_POST['caption_margin_top'];
                    $settings['CaptionMarginRight'] = $_POST['caption_margin_right'];
                    $settings['CaptionMarginBottom'] = $_POST['caption_margin_bottom'];
                    $settings['CaptionMarginLeft'] = $_POST['caption_margin_left'];
                    $settings['CaptionPaddingTop'] = $_POST['caption_padding_top'];
                    $settings['CaptionPaddingRight'] = $_POST['caption_padding_right'];
                    $settings['CaptionPaddingBottom'] = $_POST['caption_padding_bottom'];
                    $settings['CaptionPaddingLeft'] = $_POST['caption_padding_left'];                                
                    $settings['LightboxEnabled'] = $_POST['lightbox_enabled'];
                    $settings['LightboxWindowColor'] = $_POST['lightbox_window_color'];
                    $settings['LightboxWindowAlpha'] = $_POST['lightbox_window_alpha'];
                    $settings['LightboxBgColor'] = $_POST['lightbox_bg_color'];
                    $settings['LightboxBgAlpha'] = $_POST['lightbox_bg_alpha'];
                    $settings['LightboxMarginTop'] = $_POST['lightbox_margin_top'];
                    $settings['LightboxMarginRight'] = $_POST['lightbox_margin_right'];
                    $settings['LightboxMarginBottom'] = $_POST['lightbox_margin_bottom'];
                    $settings['LightboxMarginLeft'] = $_POST['lightbox_margin_left'];
                    $settings['LightboxPaddingTop'] = $_POST['lightbox_padding_top'];
                    $settings['LightboxPaddingRight'] = $_POST['lightbox_padding_right'];
                    $settings['LightboxPaddingBottom'] = $_POST['lightbox_padding_bottom'];
                    $settings['LightboxPaddingLeft'] = $_POST['lightbox_padding_left'];
                    $settings['LightboxNavigationInfoBgColor'] = $_POST['lightbox_navigation_info_bg_color'];
                    $settings['LightboxNavigationInfoTextColor'] = $_POST['lightbox_navigation_info_text_color'];    
                    $settings['LightboxNavigationTouchDeviceSwipeEnabled'] = $_POST['lightbox_navigation_touch_device_swipe_enabled']; 
                    $settings['SocialShareEnabled'] = $_POST['social_share_enabled']; 
                    $settings['TooltipEnabled'] = $_POST['tooltip_enabled'];
                    $settings['TooltipBgColor'] = $_POST['tooltip_bg_color'];
                    $settings['TooltipStrokeColor'] = $_POST['tooltip_stroke_color'];
                    $settings['TooltipTextColor'] = $_POST['tooltip_text_color'];
                    $settings['Slideshow'] = $_POST['slideshow'];
                    $settings['SlideshowTime'] = $_POST['slideshow_time'];
                    $settings['SlideshowAutostart'] = $_POST['slideshow_autostart'];
                    $settings['SlideshowLoop'] = $_POST['slideshow_loop'];
                    $settings['AutoHide'] = $_POST['auto_hide'];
                    $settings['AutoHideTime'] = $_POST['auto_hide_time'];
                    
                    if (isset($_POST['thumbnail_loader'])){
                        $settings['ThumbnailsNavigationPrev'] = $_POST['thumbnails_navigation_prev'];
                        $settings['ThumbnailsNavigationPrevHover'] = $_POST['thumbnails_navigation_prev_hover'];
                        $settings['ThumbnailsNavigationNext'] = $_POST['thumbnails_navigation_next'];
                        $settings['ThumbnailsNavigationNextHover'] = $_POST['thumbnails_navigation_next_hover'];
                        $settings['ThumbnailLoader'] = $_POST['thumbnail_loader'];
                        $settings['ImageLoader'] = $_POST['image_loader'];
                        $settings['NavigationPrev'] = $_POST['navigation_prev'];
                        $settings['NavigationPrevHover'] = $_POST['navigation_prev_hover'];
                        $settings['NavigationNext'] = $_POST['navigation_next'];
                        $settings['NavigationNextHover'] = $_POST['navigation_next_hover'];
                        $settings['NavigationLightbox'] = $_POST['navigation_lightbox'];
                        $settings['NavigationLightboxHover'] = $_POST['navigation_lightbox_hover'];
                        $settings['LightboxLoader'] = $_POST['lightbox_loader'];                    
                        $settings['LightboxNavigationPrev'] = $_POST['lightbox_navigation_prev'];
                        $settings['LightboxNavigationPrevHover'] = $_POST['lightbox_navigation_prev_hover'];
                        $settings['LightboxNavigationNext'] = $_POST['lightbox_navigation_next'];
                        $settings['LightboxNavigationNextHover'] = $_POST['lightbox_navigation_next_hover'];
                        $settings['LightboxNavigationClose'] = $_POST['lightbox_navigation_close'];
                        $settings['LightboxNavigationCloseHover'] = $_POST['lightbox_navigation_close_hover'];
                        $settings['SocialShare'] = $_POST['social_share']; 
                        $settings['SocialShareLightbox'] = $_POST['social_share_lightbox']; 
                        $settings['SlideshowPlay'] = $_POST['slideshow_play'];
                        $settings['SlideshowPlayHover'] = $_POST['slideshow_play_hover'];
                        $settings['SlideshowPause'] = $_POST['slideshow_pause'];
                        $settings['SlideshowPauseHover'] = $_POST['slideshow_pause_hover'];
                    }
                    
                    $jsonData = file_get_contents('../../../data/galleries.json');
                    $galleries = json_decode($jsonData, TRUE);
                    $newGalleries = array();
                    
                    foreach ($galleries as $gallery){
                        if ($gallery['id'] == $_POST['gallery_id']){
                            $gallery['name'] = $_POST['name'];
                        }
                        
                        array_push($newGalleries, $gallery);
                    }     
                                        
                    $file = fopen('../../../data/galleries.json', 'w');
                    fwrite($file, json_encode($newGalleries));
                    fclose($file);
                    
                    $file = fopen('../../../data/settings'.$_POST['gallery_id'].'.json', 'w');
                    fwrite($file, json_encode($settings));
                    fclose($file);

                    echo '';
                }

                function deleteGallery(){// Delete Gallery.
                    $jsonData = file_get_contents('../../../data/galleries.json');
                    $galleries = json_decode($jsonData, TRUE);
                    $newGalleries = array();
                    $no = 0;
                    
                    foreach ($galleries as $gallery){                        
                        if ($gallery['id'] == (int)$_POST['id']){
                            $gallery['status'] = 'deleted';
                        }
                        else if ($gallery['status'] != 'deleted'){
                            $no++;
                        }
                        
                        array_push($newGalleries, $gallery);
                    }     
                                        
                    $file = fopen('../../../data/galleries.json', 'w');
                    fwrite($file, json_encode($newGalleries));
                    fclose($file);

                    $jsonData = file_get_contents('../../../data/content'.$_POST['id'].'.json');
                    $images = json_decode($jsonData, TRUE);                    
                    
                    foreach ($images as $image) {
                        if (file_exists(DOPTG_ABSOLUTE_PATH.$image['Image'])){                            
                            unlink(DOPTG_ABSOLUTE_PATH.$image['Image']);
                        }
                        if (file_exists(DOPTG_ABSOLUTE_PATH.$image['Thumb'])){
                            unlink(DOPTG_ABSOLUTE_PATH.$image['Thumb']);
                        }
                    }
                                        
                    if (file_exists(DOPTG_ABSOLUTE_PATH.'doptg/data/settings'.$_POST['id'].'.json')){ 
                        unlink(DOPTG_ABSOLUTE_PATH.'doptg/data/settings'.$_POST['id'].'.json');
                    }
                    if (file_exists(DOPTG_ABSOLUTE_PATH.'doptg/data/content'.$_POST['id'].'.json')){ 
                        unlink(DOPTG_ABSOLUTE_PATH.'doptg/data/content'.$_POST['id'].'.json');
                    }
                    
                    echo $no;
                }            

                function shortGalleryName($name, $size){// Return a short name for the gallery.
                    $new_name = '';
                    $pieces = str_split($name);

                    if (count($pieces) <= $size){
                        $new_name = $name;
                    }
                    else{
                        for ($i=0; $i<$size-3; $i++){
                            $new_name .= $pieces[$i];
                        }
                        $new_name .= '...';
                    }

                    return $new_name;
                }

                function showImages(){// Show Images List.
                    $jsonData = file_get_contents('../../../data/content'.$_POST['gallery_id'].'.json');
                    $images = json_decode($jsonData, TRUE);                    
                    $imagesHTML = array();
                    $id = 0;
                        
                    array_push($imagesHTML, '<ul>');
                                        
                    if (count($images) != 0){
                        foreach ($images as $image){
                            $id++;
                            
                            if ($image['Enabled'] == 'true'){
                                array_push($imagesHTML, '<li class="item-image" id="DOPTG-image-ID-'.$id.'"><img src="'.DOPTG_URL.$image['Thumb'].'" alt="" /></li>');
                            }
                            else{
                                array_push($imagesHTML, '<li class="item-image item-image-disabled" id="DOPTG-image-ID-'.$id.'"><img src="'.DOPTG_URL.$image['Thumb'].'" alt="" /></li>');
                            }
                        }
                    }
                    else{
                        array_push($imagesHTML, '<li class="no-data">'.DOPTG_NO_IMAGES.'</li>');
                    }

                    array_push($imagesHTML, '</ul>');

                    echo implode('', $imagesHTML);
                }

                function addImageFTP(){// Add Images from FTP.
                    global $wpdb;

                    $folder = DOPTG_ABSOLUTE_PATH.'doptg/ftp-uploads';
                    $images = array();
                    $folderData = opendir($folder);

                    while (($file = readdir($folderData)) !== false){
                        if ($file != '.' && $file != '..'){
                            array_push($images, "$file");
                        }
                    }

                    closedir($folderData);

                    $result = array();
                    $targetPath = DOPTG_ABSOLUTE_PATH.'doptg/uploads';
                    sort($images);

                    foreach ($images as $image):
                        $currFile = DOPTG_ABSOLUTE_PATH.'doptg/ftp-uploads/'.$image;
                        $ext = substr($image, strrpos($image, '.')+1);
                        $newName = $this->generateName();
                        $targetFile =  str_replace('//','/',$targetPath).'/'.$newName.'.'.$ext;

                        // File and new size
                        $filename = $targetPath.'/'.$newName.'.'.$ext;

                        // Get new sizes
                        list($width, $height) = getimagesize($currFile);

                        // Load
                        $newImage = ImageCreateTrueColor($width, $height);
                        if ($ext == 'png'){
                            imagealphablending($newImage, false);
                            imagesavealpha($newImage, true);  
                        }
                        if ($ext == 'png'){
                            $source = imagecreatefrompng($_POST['image_url']);
                            imagealphablending($source, true);
                        }
                        else{
                            $source = imagecreatefromjpeg($currFile);
                        }

                        // Resize
                        imagecopyresampled($newImage, $source, 0, 0, 0, 0, $width, $height, $width, $height);

                        // Output
                        if ($ext == 'png'){
                            $source = imagepng($newImage, $filename);
                        }
                        else{
                            $source = imagejpeg($newImage, $filename, 100);
                        }

                        // CREATE THUMBNAIL

                        // Get new sizes
                        list($width, $height) = getimagesize($filename);
                        $newheight = 300;
                        $newwidth = $width*$newheight/$height;

                        if ($newwidth < 300){
                            $newwidth = 300;
                            $newheight = $height*$newwidth/$width;
                        }

                        // Load
                        $thumb = ImageCreateTrueColor($newwidth, $newheight);
                        if ($ext == 'png'){
                            imagealphablending($thumb, false);
                            imagesavealpha($thumb, true);  
                        }
                        if ($ext == 'png'){
                            $source = imagecreatefrompng($filename);
                            imagealphablending($source, true);
                        }
                        else{
                            $source = imagecreatefromjpeg($filename);
                        }

                        // Resize
                        imagecopyresampled($thumb, $source, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

                        // Output
                        if ($ext == 'png'){
                            $source = imagepng($thumb, $targetPath.'/thumbs/'.$newName.'.'.$ext);
                        }
                        else{
                            $source = imagejpeg($thumb, $targetPath.'/thumbs/'.$newName.'.'.$ext, 100);
                        }

                        $jsonData = file_get_contents('../../../data/content'.$_POST['gallery_id'].'.json');
                        $imagesList = json_decode($jsonData, TRUE);
                    
                        array_push($imagesList, array('Image' => 'doptg/uploads/'.$newName.'.'.$ext,
                                                      'Thumb' => 'doptg/uploads/thumbs/'.$newName.'.'.$ext,
                                                      'CaptionTitle' => '',
                                                      'CaptionText' => '',
                                                      'Media' => '',
                                                      'LightboxMedia' => '',
                                                      'Enabled' => 'true'));
                        
                        $file = fopen('../../../data/content'.$_POST['gallery_id'].'.json', 'w');
                        fwrite($file, json_encode($imagesList));
                        fclose($file);
                        
                        array_push($result, count($imagesList).';;;'.$newName.'.'.$ext);
                    endforeach;

                    echo implode(';;;;;', $result);
                }

                function addImage(){// Add Image via AJAX.
                    $jsonData = file_get_contents('../../../data/content'.$_POST['gallery_id'].'.json');
                    $imagesList = json_decode($jsonData, TRUE);

                    array_push($imagesList, array('Image' => 'doptg/uploads/'.$_POST['name'],
                                                  'Thumb' => 'doptg/uploads/thumbs/'.$_POST['name'],
                                                  'CaptionTitle' => '',
                                                  'CaptionText' => '',
                                                  'Media' => '',
                                                  'LightboxMedia' => '',
                                                  'Enabled' => 'true'));

                    $file = fopen('../../../data/content'.$_POST['gallery_id'].'.json', 'w');
                    fwrite($file, json_encode($imagesList));
                    fclose($file);                

                    echo count($imagesList);
                }

                function sortImages(){// Sort Images via AJAX.
                    $jsonData = file_get_contents('../../../data/content'.$_POST['gallery_id'].'.json');
                    $images = json_decode($jsonData, TRUE);
                    $order = explode(',', $_POST['data']);
                    $orderedImages = array();
                    
                    for ($i=0; $i<=count($order); $i++){
                        $id = 0;
                        
                        foreach ($images as $image):
                            $id++;
                        
                            if ($id == $order[$i]){
                                array_push($orderedImages, $image);
                                break;
                            }
                        endforeach;
                    }

                    $file = fopen('../../../data/content'.$_POST['gallery_id'].'.json', 'w');
                    fwrite($file, json_encode($orderedImages));
                    fclose($file);
                }

                function showImage(){// Show Image details.
                    $jsonData = file_get_contents('../../../data/content'.$_POST['gallery_id'].'.json');
                    $images = json_decode($jsonData, TRUE);
                    $id = 0;
                    
                    foreach ($images as $image):
                        $id++;
                        
                        if ($id == $_POST['image_id']){
                            $jsonSettings = file_get_contents('../../../data/settings'.$_POST['gallery_id'].'.json');
                            $settings = json_decode($jsonSettings, TRUE);
                            
                            $result = array('id' => $id,
                                            'image' => $image['Image'],
                                            'thumb' => $image['Thumb'],
                                            'thumbnail_width' => $settings['ThumbnailWidth'],
                                            'thumbnail_height' => $settings['ThumbnailHeight'],
                                            'title' => stripslashes($image['CaptionTitle']),
                                            'caption' => preg_replace("/<br>/", "\n", stripslashes($image['CaptionText'])),
                                            'media' => stripslashes($image['Media']),
                                            'lightbox_media' => stripslashes($image['LightboxMedia']),
                                            'enabled' => $image['Enabled']);
                            
                            echo json_encode($result);
                            
                            break;
                        }
                    endforeach;
                }

                function editImage(){// Edit Image.
                    $jsonData = file_get_contents('../../../data/content'.$_POST['gallery_id'].'.json');
                    $images = json_decode($jsonData, TRUE);
                    $newImages = array();
                    $id = 0;
                    
                    foreach ($images as $image):                    
                        $id++;
                    
                        if ($id == (int)$_POST['image_id']){
                            $imageData = $image['Image'];
                            $thumbData = $image['Thumb'];
                            $image['CaptionTitle'] = $_POST['image_title'];
                            $image['CaptionText'] = preg_replace('`[\r\n]`', "<br>", $_POST['image_caption']);
                            $image['Media'] = $_POST['image_media'];
                            $image['LightboxMedia'] = $_POST['image_lightbox_media'];
                            $image['Enabled'] = $_POST['image_enabled'];
                        }
                                                
                        array_push($newImages, $image);
                    endforeach;
                    
                    $file = fopen('../../../data/content'.$_POST['gallery_id'].'.json', 'w');
                    fwrite($file, json_encode($newImages));
                    fclose($file);
                    
                    if ($_POST['crop_width'] > 0){
                        list($width, $height) = getimagesize(DOPTG_ABSOLUTE_PATH.$imageData);
                        $pr = $width/$_POST['image_width'];
                        $ext = substr($_POST['image_name'], strrpos($_POST['image_name'], '.') + 1);

                        $src = DOPTG_ABSOLUTE_PATH.$imageData;

                        if ($ext == 'png'){
                            $img_r = imagecreatefrompng($src);
                            imagealphablending($img_r, true);
                        }
                        else{
                            $img_r = imagecreatefromjpeg($src);
                        }

                        $thumb = ImageCreateTrueColor($_POST['thumb_width'], $_POST['thumb_height']);
                        if ($ext == 'png'){
                            imagealphablending($thumb, false);
                            imagesavealpha($thumb, true);  
                        }

                        imagecopyresampled($thumb, $img_r , 0, 0, $_POST['crop_x']*$pr, $_POST['crop_y']*$pr, $_POST['thumb_width'], $_POST['thumb_height'], $_POST['crop_width']*$pr, $_POST['crop_height']*$pr);

                        if ($ext == 'png') $source = imagepng($thumb, DOPTG_ABSOLUTE_PATH.$thumbData);
                        else $source = imagejpeg($thumb, DOPTG_ABSOLUTE_PATH.$thumbData, 100);

                        echo DOPTG_URL.$thumbData;
                    }
                    else{
                        echo '';
                    }
                }

                function deleteImage(){// Delete Image.
                    $jsonData = file_get_contents('../../../data/content'.$_POST['gallery_id'].'.json');
                    $images = json_decode($jsonData, TRUE);
                    $newImages = array();
                    $id = 0;
                    $num_rows = 0;
                    
                    foreach ($images as $image):                    
                        $id++;
                    
                        if ($id == (int)$_POST['image_id']){
                            $imageData = $image['Image'];
                            $thumbData = $image['Thumb'];                            
                        }
                        else{                        
                            $num_rows++;
                            array_push($newImages, $image);
                        }
                    endforeach;
                    
                    $file = fopen('../../../data/content'.$_POST['gallery_id'].'.json', 'w');
                    fwrite($file, json_encode($newImages));
                    fclose($file);
                                        
                    if (file_exists(DOPTG_ABSOLUTE_PATH.$imageData)){                            
                        unlink(DOPTG_ABSOLUTE_PATH.$imageData);
                    }
                    if (file_exists(DOPTG_ABSOLUTE_PATH.$thumbData)){
                        unlink(DOPTG_ABSOLUTE_PATH.$thumbData);
                    }

                    echo $num_rows;
                }

                private function generateName(){
                    $len = 64;
                    $base = 'ABCDEFGHKLMNOPQRSTWXYZabcdefghjkmnpqrstwxyz123456789';
                    $max = strlen($base)-1;
                    $newName = '';
                    mt_srand((double)microtime()*1000000);

                    while (strlen($newName)<$len+1){
                        $newName .= $base{mt_rand(0,$max)};
                    }

                    return $newName;
                }  
            }
        }
        
        $admin = new DOPTGAdmin();
        
        switch ($_POST['action']){
            case 'doptg_show_galleries':
                $admin->showGalleries(); break; 
            case 'doptg_add_gallery':
                $admin->addGallery(); break; 
            case 'doptg_show_gallery_info':
                $admin->showGalleryInfo(); break;  
            case 'doptg_update_settings_image':
                $admin->updateSettingsImage(); break;  
            case 'doptg_edit_gallery':
                $admin->editGallery(); break;   
            case 'doptg_delete_gallery':
                $admin->deleteGallery(); break; 
            case 'doptg_show_images':
                $admin->showImages(); break;  
            case 'doptg_add_image_ftp':
                $admin->addImageFTP(); break; 
            case 'doptg_add_image':
                $admin->addImage(); break; 
            case 'doptg_sort_images':
                $admin->sortImages(); break; 
            case 'doptg_show_image':
                $admin->showImage(); break; 
            case 'doptg_edit_image':
                $admin->editImage(); break;   
            case 'doptg_delete_image':
                $admin->deleteImage(); break;   
        }
    }
    else{
        echo 'not ok';
        exit('<h2 style="color:#aaaaaa; font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:bold;">Warning! No direct script access allowed.</h2>');        
    }
    
?>