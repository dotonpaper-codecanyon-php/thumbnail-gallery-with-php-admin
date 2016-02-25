
/*
* Title                   : Thumbnail Gallery (with PHP Admin)
* Version                 : 1.3
* File                    : admin.js
* File Version            : 1.3
* Created / Last Modified : 20 January 2012
* Author                  : Dot on Paper
* Copyright               : © 2012 Dot on Paper
* Website                 : http://www.dotonpaper.net
* Description             : Admin Scripts.
*/

//Declare global variables.
var ajaxurl = 'assets/php/admin.php',
currGallery = 0,
currImage = 0,
clearClick = true,
imageDisplay = false,
imageWidth = 0,
imageHeight = 0,
$jDOPTG = jQuery.noConflict();

$jDOPTG(document).ready(function(){
    doptgResize();

    $jDOPTG(window).resize(function(){
        doptgResize();
    });
    
    $jDOPTG(document).scroll(function(){
        doptgResize();
    });

    switch (DOPTG_curr_page){
        case 'Galleries List':
            doptgShowGalleries();
            break;
        case 'Help':
            doptgInitHelp();
            break;            
    }
});

function doptgResize(){// ResiE admin panel.
    $jDOPTG('.column2', '.DOPTG-admin').width(($jDOPTG('.DOPTG-admin').width()-$jDOPTG('.column1', '.DOPTG-admin').width()-2)/2);
    $jDOPTG('.column3', '.DOPTG-admin').width(($jDOPTG('.DOPTG-admin').width()-$jDOPTG('.column1', '.DOPTG-admin').width()-2)/2);
    $jDOPTG('.column-separator', '.DOPTG-admin').height(0);
    $jDOPTG('.column-separator', '.DOPTG-admin').height($jDOPTG('.DOPTG-admin').height()-$jDOPTG('h1', '.DOPTG-admin').height()-parseInt($jDOPTG('h1', '.DOPTG-admin').css('padding-top'))-parseInt($jDOPTG('h1', '.DOPTG-admin').css('padding-bottom')));
    $jDOPTG('.main', '.DOPTG-admin').css('display', 'block');

    $jDOPTG('.column-input', '.DOPTG-admin').width($jDOPTG('.column-content', '.column3', '.DOPTG-admin').width()-32);
    $jDOPTG('.column-image', '.DOPTG-admin').width($jDOPTG('.column-content', '.column3', '.DOPTG-admin').width()-20);
    
    if (imageDisplay){
        $jDOPTG('span', '.column-image', '.DOPTG-admin').width($jDOPTG('.column-image', '.DOPTG-admin').width());
        $jDOPTG('span', '.column-image', '.DOPTG-admin').height(($jDOPTG('.column-image', '.DOPTG-admin').width())*imageHeight/imageWidth);
        $jDOPTG('img', '.column-image', '.DOPTG-admin').width($jDOPTG('span', '.column-image', '.DOPTG-admin').width());
        $jDOPTG('img', '.column-image', '.DOPTG-admin').height($jDOPTG('span', '.column-image', '.DOPTG-admin').height());
        $jDOPTG('img', '.column-image', '.DOPTG-admin').css('margin-top', 0);
        $jDOPTG('img', '.column-image', '.DOPTG-admin').css('margin-left', 0);
    }
}

function doptgShowGalleries(){// Show all galleries.
    doptgRemoveColumns(2);
    doptgToggleMessage('show', DOPTG_LOAD);
    
    $jDOPTG.post(ajaxurl, {action: 'doptg_show_galleries'}, function(data){
        $jDOPTG('.column-content', '.column1', '.DOPTG-admin').html(data);
        doptgGalleriesEvents();
        doptgToggleMessage('hide', DOPTG_GALLERIES_LOADED);
    });
}

function doptgAddGallery(){// Add gallery via AJAX.
    if (clearClick){
        doptgRemoveColumns(2);
        doptgToggleMessage('show', DOPTG_ADD_GALLERY_SUBMITED);
        
        $jDOPTG.post(ajaxurl, {action: 'doptg_add_gallery'}, function(data){
            $jDOPTG('.column-content', '.column1', '.DOPTG-admin').html(data);
            doptgGalleriesEvents();
            doptgToggleMessage('hide', DOPTG_ADD_GALERRY_SUCCESS);
        });
    }
}

function doptgShowGalleriesInfo(){// Show default settings.
    if (clearClick){
        $jDOPTG('li', '.column1', '.DOPTG-admin').removeClass('item-selected');
        currGallery = 0;
        currImage = 0;
        doptgRemoveColumns(2);
        $jDOPTG('#gallery_id').val(0);
        doptgToggleMessage('show', DOPTG_LOAD);
        
        $jDOPTG.post(ajaxurl, {action: 'doptg_show_gallery_info', gallery_id:$jDOPTG('#gallery_id').val()}, function(data){
            var HeaderHTML = new Array(),
            json = $jDOPTG.parseJSON(data);

            HeaderHTML.push('<input type="button" name="DOPTG_gallery_submit" class="submit-style" onclick="doptgEditGallery()" title="'+DOPTG_EDIT_GALLERIES_SUBMIT+'" value="'+DOPTG_SUBMIT+'" />');
            HeaderHTML.push('<a href="javascript:void()" class="header-help" title="'+DOPTG_GALLERIES_EDIT_INFO_HELP+'"></a>');

            $jDOPTG('.column-header', '.column2', '.DOPTG-admin').html(HeaderHTML.join(''));
            doptgSettingsForm(json, 2);

            doptgResize();
            doptgToggleMessage('hide', DOPTG_GALLERY_LOADED);
        });
    }
}

function doptgShowGalleryInfo(){// Show gallery settings.
    if (clearClick){
        $jDOPTG('li', '.column2', '.DOPTG-admin').removeClass('item-image-selected');
        doptgRemoveColumns(3);
        doptgToggleMessage('show', DOPTG_LOAD);
        
        $jDOPTG.post(ajaxurl, {action: 'doptg_show_gallery_info', gallery_id:$jDOPTG('#gallery_id').val()}, function(data){            
            var HeaderHTML = new Array(),
            json = $jDOPTG.parseJSON(data);
            
            HeaderHTML.push('<input type="button" name="DOPTG_gallery_submit" class="submit-style" onclick="doptgEditGallery()" title="'+DOPTG_EDIT_GALLERY_SUBMIT+'" value="'+DOPTG_SUBMIT+'" />');
            HeaderHTML.push('<input type="button" name="DOPTG_gallery_delete" class="submit-style" onclick="doptgDeleteGallery('+$jDOPTG('#gallery_id').val()+')" title="'+DOPTG_DELETE_GALLERY_SUBMIT+'" value="'+DOPTG_DELETE+'" />');
            HeaderHTML.push('<input type="button" name="DOPTG_gallery_delete" class="submit-style" onclick="doptgDefaultGallery()" title="'+DOPTG_DEFAULT+'" value="'+DOPTG_DEFAULT+'" />');
            HeaderHTML.push('<a href="javascript:void()" class="header-help" title="'+DOPTG_GALLERY_EDIT_INFO_HELP+'"></a>');
            
            $jDOPTG('.column-header', '.column3', '.DOPTG-admin').html(HeaderHTML.join(''));
            doptgSettingsForm(json, 3);
            
            doptgResize();
            doptgToggleMessage('hide', DOPTG_GALLERY_LOADED);
        });
    }
}

function doptgEditGallery(){// Edit Gallery Settings.
    if (clearClick){
        doptgToggleMessage('show', DOPTG_SAVE);
        
        $jDOPTG.post(ajaxurl, {action: 'doptg_edit_gallery',
                               gallery_id: $jDOPTG('#gallery_id').val(),
                               name: $jDOPTG('#name').val(),
                               width: $jDOPTG('#width').val(),
                               height: $jDOPTG('#height').val(),
                               bg_color: $jDOPTG('#bg_color').val(),
                               bg_alpha: $jDOPTG('#bg_alpha').val(),
                               images_order: $jDOPTG('#images_order').val(),
                               responsive_enabled: $jDOPTG('#responsive_enabled').val(),
                               thumbnails_position: $jDOPTG('#thumbnails_position').val(),
                               thumbnails_over_image: $jDOPTG('#thumbnails_over_image').val(),
                               thumbnails_bg_color: $jDOPTG('#thumbnails_bg_color').val(),
                               thumbnails_bg_alpha: $jDOPTG('#thumbnails_bg_alpha').val(),
                               thumbnails_spacing: $jDOPTG('#thumbnails_spacing').val(),
                               thumbnails_padding_top: $jDOPTG('#thumbnails_padding_top').val(),
                               thumbnails_padding_right: $jDOPTG('#thumbnails_padding_right').val(),
                               thumbnails_padding_bottom: $jDOPTG('#thumbnails_padding_bottom').val(),
                               thumbnails_padding_left: $jDOPTG('#thumbnails_padding_left').val(),
                               thumbnails_navigation: $jDOPTG('#thumbnails_navigation').val(),
                               thumbnail_width: $jDOPTG('#thumbnail_width').val(),
                               thumbnail_height: $jDOPTG('#thumbnail_height').val(),
                               thumbnail_width_mobile: $jDOPTG('#thumbnail_width_mobile').val(),
                               thumbnail_height_mobile: $jDOPTG('#thumbnail_height_mobile').val(),
                               thumbnail_alpha: $jDOPTG('#thumbnail_alpha').val(),
                               thumbnail_alpha_hover: $jDOPTG('#thumbnail_alpha_hover').val(),
                               thumbnail_alpha_selected: $jDOPTG('#thumbnail_alpha_selected').val(),
                               thumbnail_bg_color: $jDOPTG('#thumbnail_bg_color').val(),
                               thumbnail_bg_color_hover: $jDOPTG('#thumbnail_bg_color_hover').val(),
                               thumbnail_bg_color_selected: $jDOPTG('#thumbnail_bg_color_selected').val(),
                               thumbnail_border_size: $jDOPTG('#thumbnail_border_size').val(),
                               thumbnail_border_color: $jDOPTG('#thumbnail_border_color').val(),
                               thumbnail_border_color_hover: $jDOPTG('#thumbnail_border_color_hover').val(),
                               thumbnail_border_color_selected: $jDOPTG('#thumbnail_border_color_selected').val(),
                               thumbnail_padding_top: $jDOPTG('#thumbnail_padding_top').val(),
                               thumbnail_padding_right: $jDOPTG('#thumbnail_padding_right').val(),
                               thumbnail_padding_bottom: $jDOPTG('#thumbnail_padding_bottom').val(),
                               thumbnail_padding_left: $jDOPTG('#thumbnail_padding_left').val(),
                               image_bg_color: $jDOPTG('#image_bg_color').val(),
                               image_bg_alpha: $jDOPTG('#image_bg_alpha').val(),
                               image_display_type: $jDOPTG('#image_display_type').val(),
                               image_display_time: $jDOPTG('#image_display_time').val(),
                               image_margin_top: $jDOPTG('#image_margin_top').val(),
                               image_margin_right: $jDOPTG('#image_margin_right').val(),
                               image_margin_bottom: $jDOPTG('#image_margin_bottom').val(),
                               image_margin_left: $jDOPTG('#image_margin_left').val(),
                               image_padding_top: $jDOPTG('#image_padding_top').val(),
                               image_padding_right: $jDOPTG('#image_padding_right').val(),
                               image_padding_bottom: $jDOPTG('#image_padding_bottom').val(),
                               image_padding_left: $jDOPTG('#image_padding_left').val(),
                               navigation_enabled: $jDOPTG('#navigation_enabled').val(),
                               navigation_over_image: $jDOPTG('#navigation_over_image').val(),
                               navigation_touch_device_swipe_enabled: $jDOPTG('#navigation_touch_device_swipe_enabled').val(),
                               caption_width: $jDOPTG('#caption_width').val(),
                               caption_height: $jDOPTG('#caption_height').val(),
                               caption_title_color: $jDOPTG('#caption_title_color').val(),
                               caption_text_color: $jDOPTG('#caption_text_color').val(),
                               caption_bg_color: $jDOPTG('#caption_bg_color').val(),
                               caption_bg_alpha: $jDOPTG('#caption_bg_alpha').val(),
                               caption_position: $jDOPTG('#caption_position').val(),
                               caption_over_image: $jDOPTG('#caption_over_image').val(),
                               caption_scroll_scrub_color: $jDOPTG('#caption_scroll_scrub_color').val(),
                               caption_scroll_bg_color: $jDOPTG('#caption_scroll_bg_color').val(),
                               caption_margin_top: $jDOPTG('#caption_margin_top').val(),
                               caption_margin_right: $jDOPTG('#caption_margin_right').val(),
                               caption_margin_bottom: $jDOPTG('#caption_margin_bottom').val(),
                               caption_margin_left: $jDOPTG('#caption_margin_left').val(),
                               caption_padding_top: $jDOPTG('#caption_padding_top').val(),
                               caption_padding_right: $jDOPTG('#caption_padding_right').val(),
                               caption_padding_bottom: $jDOPTG('#caption_padding_bottom').val(),
                               caption_padding_left: $jDOPTG('#caption_padding_left').val(),
                               lightbox_enabled: $jDOPTG('#lightbox_enabled').val(),
                               lightbox_window_color: $jDOPTG('#lightbox_window_color').val(),
                               lightbox_window_alpha: $jDOPTG('#lightbox_window_alpha').val(),
                               lightbox_bg_color: $jDOPTG('#lightbox_bg_color').val(),
                               lightbox_bg_alpha: $jDOPTG('#lightbox_bg_alpha').val(),
                               lightbox_margin_top: $jDOPTG('#lightbox_margin_top').val(),
                               lightbox_margin_right: $jDOPTG('#lightbox_margin_right').val(),
                               lightbox_margin_bottom: $jDOPTG('#lightbox_margin_bottom').val(),
                               lightbox_margin_left: $jDOPTG('#lightbox_margin_left').val(),
                               lightbox_padding_top: $jDOPTG('#lightbox_padding_top').val(),
                               lightbox_padding_right: $jDOPTG('#lightbox_padding_right').val(),
                               lightbox_padding_bottom: $jDOPTG('#lightbox_padding_bottom').val(),
                               lightbox_padding_left: $jDOPTG('#lightbox_padding_left').val(),
                               lightbox_navigation_info_bg_color: $jDOPTG('#lightbox_navigation_info_bg_color').val(),
                               lightbox_navigation_info_text_color: $jDOPTG('#lightbox_navigation_info_text_color').val(),
                               lightbox_navigation_touch_device_swipe_enabled: $jDOPTG('#lightbox_navigation_touch_device_swipe_enabled').val(),
                               social_share_enabled: $jDOPTG('#social_share_enabled').val(),
                               tooltip_enabled: $jDOPTG('#tooltip_enabled').val(),
                               tooltip_bg_color: $jDOPTG('#tooltip_bg_color').val(),
                               tooltip_stroke_color: $jDOPTG('#tooltip_stroke_color').val(),
                               tooltip_text_color: $jDOPTG('#tooltip_text_color').val(),
                               slideshow: $jDOPTG('#slideshow').val(),
                               slideshow_autostart: $jDOPTG('#slideshow_autostart').val(),
                               slideshow_time: $jDOPTG('#slideshow_time').val(),
                               slideshow_loop: $jDOPTG('#slideshow_loop').val(),
                               auto_hide: $jDOPTG('#auto_hide').val(),
                               auto_hide_time: $jDOPTG('#auto_hide_time').val()}, function(data){
            if ($jDOPTG('#gallery_id').val() != '0'){
                $jDOPTG('.name', '#DOPTG-ID-'+$jDOPTG('#gallery_id').val()).html($jDOPTG('#name').val());
                doptgToggleMessage('hide', DOPTG_EDIT_GALLERY_SUCCESS);
            }
            else{
                doptgToggleMessage('hide', DOPTG_EDIT_GALLERIES_SUCCESS);
            }
        });
    }
}

function doptgDefaultGallery(){// Add default settings to gallery.
    if (clearClick){
        if (confirm(DOPTG_EDIT_GALLERY_USE_DEFAULT_CONFIRMATION)){
            doptgToggleMessage('show', DOPTG_SAVE);
            
            $jDOPTG.post(ajaxurl, {action: 'doptg_show_gallery_info', gallery_id:0}, function(data){
                data = $jDOPTG.parseJSON(data);

                $jDOPTG('#width').val(data['Width']);
                $jDOPTG('#height').val(data['Height']);
                $jDOPTG('#bg_color').val(data['BgColor']);
                $jDOPTG('#bg_alpha').val(data['BgAlpha']);
                $jDOPTG('#images_order').val(data['ImagesOrder']);
                $jDOPTG('#responsive_enabled').val(data['ResponsiveEnabled']);
                
                $jDOPTG('#thumbnails_position').val(data['ThumbnailsPosition']);
                $jDOPTG('#thumbnails_over_image').val(data['ThumbnailsOverImage']);
                $jDOPTG('#thumbnails_bg_color').val(data['ThumbnailsBgColor']);
                $jDOPTG('#thumbnails_bg_alpha').val(data['ThumbnailsBgAlpha']);
                $jDOPTG('#thumbnails_spacing').val(data['ThumbnailsSpacing']);
                $jDOPTG('#thumbnails_padding_top').val(data['ThumbnailsPaddingTop']);
                $jDOPTG('#thumbnails_padding_right').val(data['ThumbnailsPaddingRight']);
                $jDOPTG('#thumbnails_padding_bottom').val(data['ThumbnailsPaddingBottom']);
                $jDOPTG('#thumbnails_padding_left').val(data['ThumbnailsPaddingLeft']);     
                
                $jDOPTG('#thumbnails_navigation').val(data['ThumbnailsNavigation']); 
                $jDOPTG('#thumbnails_navigation_prev_image').html('<img src="'+DOPTG_URL+data['ThumbnailsNavigationPrev']+'?cacheBuster='+doptgRandomString(64)+'" alt="" />');
                $jDOPTG('#thumbnails_navigation_prev_hover_image').html('<img src="'+DOPTG_URL+data['ThumbnailsNavigationPrevHover']+'?cacheBuster='+doptgRandomString(64)+'" alt="" />');
                $jDOPTG('#thumbnails_navigation_next_image').html('<img src="'+DOPTG_URL+data['ThumbnailsNavigationNext']+'?cacheBuster='+doptgRandomString(64)+'" alt="" />');
                $jDOPTG('#thumbnails_navigation_next_hover_image').html('<img src="'+DOPTG_URL+data['ThumbnailsNavigationNextHover']+'?cacheBuster='+doptgRandomString(64)+'" alt="" />');           
                
                $jDOPTG('#thumbnail_loader_image').html('<img src="'+DOPTG_URL+data['ThumbnailLoader']+'?cacheBuster='+doptgRandomString(64)+'" alt="" />');
                $jDOPTG('#thumbnail_width').val(data['ThumbnailWidth']);
                $jDOPTG('#thumbnail_height').val(data['ThumbnailHeight']);
                $jDOPTG('#thumbnail_width_mobile').val(data['ThumbnailWidthMobile']);
                $jDOPTG('#thumbnail_height_mobile').val(data['ThumbnailHeightMobile']);
                $jDOPTG('#thumbnail_alpha').val(data['ThumbnailAlpha']);
                $jDOPTG('#thumbnail_alpha_hover').val(data['ThumbnailAlphaHover']);
                $jDOPTG('#thumbnail_alpha_selected').val(data['ThumbnailAlphaSelected']);
                $jDOPTG('#thumbnail_bg_color').val(data['ThumbnailBgColor']);
                $jDOPTG('#thumbnail_bg_color_hover').val(data['ThumbnailBgColorHover']);
                $jDOPTG('#thumbnail_bg_color_selected').val(data['ThumbnailBgColorSelected']);
                $jDOPTG('#thumbnail_border_size').val(data['ThumbnailBorderSize']);
                $jDOPTG('#thumbnail_border_color').val(data['ThumbnailBorderColor']);
                $jDOPTG('#thumbnail_border_color_hover').val(data['ThumbnailBorderColorHover']);
                $jDOPTG('#thumbnail_border_color_selected').val(data['ThumbnailBorderColorSelected']);
                $jDOPTG('#thumbnail_padding_top').val(data['ThumbnailPaddingTop']);
                $jDOPTG('#thumbnail_padding_right').val(data['ThumbnailPaddingRight']);
                $jDOPTG('#thumbnail_padding_bottom').val(data['ThumbnailPaddingBottom']);
                $jDOPTG('#thumbnail_padding_left').val(data['ThumbnailPaddingLeft']);
                
                $jDOPTG('#image_loader_image').html('<img src="'+DOPTG_URL+data['ImageLoader']+'?cacheBuster='+doptgRandomString(64)+'" alt="" />');
                $jDOPTG('#image_bg_color').val(data['ImageBgColor']);
                $jDOPTG('#image_bg_alpha').val(data['ImageBgAlpha']);
                $jDOPTG('#image_display_type').val(data['ImageDisplayType']);
                $jDOPTG('#image_display_time').val(data['ImageDisplayTime']);
                $jDOPTG('#image_margin_top').val(data['ImageMarginTop']);
                $jDOPTG('#image_margin_right').val(data['ImageMarginRight']);
                $jDOPTG('#image_margin_bottom').val(data['ImageMarginBottom']);
                $jDOPTG('#image_margin_left').val(data['ImageMarginLeft']);
                $jDOPTG('#image_padding_top').val(data['ImagePaddingTop']);
                $jDOPTG('#image_padding_right').val(data['ImagePaddingRight']);
                $jDOPTG('#image_padding_bottom').val(data['ImagePaddingBottom']);
                $jDOPTG('#image_padding_left').val(data['ImagePaddingLeft']);
                
                $jDOPTG('#navigation_enabled').val(data['NavigationEnabled']);
                $jDOPTG('#navigation_over_image').val(data['NavigationOverImage']);
                $jDOPTG('#navigation_prev_image').html('<img src="'+DOPTG_URL+data['NavigationPrev']+'?cacheBuster='+doptgRandomString(64)+'" alt="" />');
                $jDOPTG('#navigation_prev_hover_image').html('<img src="'+DOPTG_URL+data['NavigationPrevHover']+'?cacheBuster='+doptgRandomString(64)+'" alt="" />');
                $jDOPTG('#navigation_next_image').html('<img src="'+DOPTG_URL+data['NavigationNext']+'?cacheBuster='+doptgRandomString(64)+'" alt="" />');
                $jDOPTG('#navigation_next_hover_image').html('<img src="'+DOPTG_URL+data['NavigationNextHover']+'?cacheBuster='+doptgRandomString(64)+'" alt="" />');
                $jDOPTG('#navigation_lightbox_image').html('<img src="'+DOPTG_URL+data['NavigationLightbox']+'?cacheBuster='+doptgRandomString(64)+'" alt="" />');
                $jDOPTG('#navigation_lightbox_hover_image').html('<img src="'+DOPTG_URL+data['NavigationLightboxHover']+'?cacheBuster='+doptgRandomString(64)+'" alt="" />');
                $jDOPTG('#navigation_touch_device_swipe_enabled').val(data['NavigationTouchDeviceSwipeEnabled']);   
                   
                $jDOPTG('#caption_width').val(data['CaptionWidth']);
                $jDOPTG('#caption_height').val(data['CaptionHeight']);
                $jDOPTG('#caption_title_color').val(data['CaptionTitleColor']);
                $jDOPTG('#caption_text_color').val(data['CaptionTextColor']);
                $jDOPTG('#caption_bg_color').val(data['CaptionBgColor']);
                $jDOPTG('#caption_bg_alpha').val(data['CaptionBgAlpha']);
                $jDOPTG('#caption_position').val(data['CaptionPosition']);
                $jDOPTG('#caption_over_image').val(data['CaptionOverImage']);
                $jDOPTG('#caption_scroll_scrub_color').val(data['CaptionScrollScrubColor']);
                $jDOPTG('#caption_scroll_bg_color').val(data['CaptionScrollBgColor']);
                $jDOPTG('#caption_margin_top').val(data['CaptionMarginTop']);
                $jDOPTG('#caption_margin_right').val(data['CaptionMarginRight']);
                $jDOPTG('#caption_margin_bottom').val(data['CaptionMarginBottom']);
                $jDOPTG('#caption_margin_left').val(data['CaptionMarginLeft']);
                $jDOPTG('#caption_padding_top').val(data['CaptionPaddingTop']);
                $jDOPTG('#caption_padding_right').val(data['CaptionPaddingRight']);
                $jDOPTG('#caption_padding_bottom').val(data['CaptionPaddingBottom']);
                $jDOPTG('#caption_padding_left').val(data['CaptionPaddingLeft']);
                
                $jDOPTG('#lightbox_enabled').val(data['LightboxEnabled']);
                $jDOPTG('#lightbox_window_color').val(data['LightboxWindowColor']);
                $jDOPTG('#lightbox_window_alpha').val(data['LightboxWindowAlpha']);
                $jDOPTG('#lightbox_loader_image').html('<img src="'+DOPTG_URL+data['LightboxLoader']+'?cacheBuster='+doptgRandomString(64)+'" alt="" />');
                $jDOPTG('#lightbox_bg_color').val(data['LightboxBgColor']);
                $jDOPTG('#lightbox_bg_alpha').val(data['LightboxBgAlpha']);
                $jDOPTG('#lightbox_margin_top').val(data['LightboxMarginTop']);
                $jDOPTG('#lightbox_margin_right').val(data['LightboxMarginRight']);
                $jDOPTG('#lightbox_margin_bottom').val(data['LightboxMarginBottom']);
                $jDOPTG('#lightbox_margin_left').val(data['LightboxMarginLeft']);
                $jDOPTG('#lightbox_padding_top').val(data['LightboxPaddingTop']);
                $jDOPTG('#lightbox_padding_right').val(data['LightboxPaddingRight']);
                $jDOPTG('#lightbox_padding_bottom').val(data['LightboxPaddingBottom']);
                $jDOPTG('#lightbox_padding_left').val(data['LightboxPaddingLeft']);
                                
                $jDOPTG('#lightbox_navigation_prev_image').html('<img src="'+DOPTG_URL+data['LightboxNavigationPrev']+'?cacheBuster='+doptgRandomString(64)+'" alt="" />');
                $jDOPTG('#lightbox_navigation_prev_hover_image').html('<img src="'+DOPTG_URL+data['LightboxNavigationPrevHover']+'?cacheBuster='+doptgRandomString(64)+'" alt="" />');
                $jDOPTG('#lightbox_navigation_next_image').html('<img src="'+DOPTG_URL+data['LightboxNavigationNext']+'?cacheBuster='+doptgRandomString(64)+'" alt="" />');
                $jDOPTG('#lightbox_navigation_next_hover_image').html('<img src="'+DOPTG_URL+data['LightboxNavigationNextHover']+'?cacheBuster='+doptgRandomString(64)+'" alt="" />');
                $jDOPTG('#lightbox_navigation_close_image').html('<img src="'+DOPTG_URL+data['LightboxNavigationClose']+'?cacheBuster='+doptgRandomString(64)+'" alt="" />');
                $jDOPTG('#lightbox_navigation_close_hover_image').html('<img src="'+DOPTG_URL+data['LightboxNavigationCloseHover']+'?cacheBuster='+doptgRandomString(64)+'" alt="" />');
                $jDOPTG('#lightbox_navigation_info_bg_color').val(data['LightboxNavigationInfoBgColor']);
                $jDOPTG('#lightbox_navigation_info_text_color').val(data['LightboxNavigationInfoTextColor']);
                $jDOPTG('#lightbox_navigation_touch_device_swipe_enabled').val(data['LightboxNavigationTouchDeviceSwipeEnabled']);   
                
                $jDOPTG('#social_share_enabled').val(data['SocialShareEnabled']);  
                $jDOPTG('#social_share').html('<img src="'+DOPTG_URL+data['SocialShare']+'?cacheBuster='+doptgRandomString(64)+'" alt="" />');
                $jDOPTG('#social_share_lightbox').html('<img src="'+DOPTG_URL+data['SocialShareLightbox']+'?cacheBuster='+doptgRandomString(64)+'" alt="" />');
                                      
                $jDOPTG('#tooltip_enabled').val(data['TooltipEnabled']);
                $jDOPTG('#tooltip_bg_color').val(data['TooltipBgColor']);
                $jDOPTG('#tooltip_stroke_color').val(data['TooltipStrokeColor']);
                $jDOPTG('#tooltip_text_color').val(data['TooltipTextColor']);
                
                $jDOPTG('#slideshow').val(data['Slideshow']);
                $jDOPTG('#slideshow_time').val(data['SlideshowTime']);
                $jDOPTG('#slideshow_autostart').val(data['SlideshowAutostart']);
                $jDOPTG('#slideshow_loop').val(data['SlideshowLoop']);
                $jDOPTG('#slideshow_play_image').html('<img src="'+DOPTG_URL+data['SlideshowPlay']+'?cacheBuster='+doptgRandomString(64)+'" alt="" />');
                $jDOPTG('#slideshow_play_hover_image').html('<img src="'+DOPTG_URL+data['SlideshowPlayHover']+'?cacheBuster='+doptgRandomString(64)+'" alt="" />');
                $jDOPTG('#slideshow_pause_image').html('<img src="'+DOPTG_URL+data['SlideshowPause']+'?cacheBuster='+doptgRandomString(64)+'" alt="" />');
                $jDOPTG('#slideshow_pause_hover_image').html('<img src="'+DOPTG_URL+data['SlideshowPauseHover']+'?cacheBuster='+doptgRandomString(64)+'" alt="" />');
                                
                $jDOPTG('#auto_hide').val(data['AutoHide']);
                $jDOPTG('#auto_hide_time').val(data['AutoHideTime']);
                
                $jDOPTG.post(ajaxurl, {action: 'doptg_edit_gallery',
                                       gallery_id: $jDOPTG('#gallery_id').val(),
                                       name: $jDOPTG('#name').val(),
                                       width: $jDOPTG('#width').val(),
                                       height: $jDOPTG('#height').val(),
                                       bg_color: $jDOPTG('#bg_color').val(),
                                       bg_alpha: $jDOPTG('#bg_alpha').val(),
                                       images_order: $jDOPTG('#images_order').val(),
                                       responsive_enabled: $jDOPTG('#responsive_enabled').val(),
                                       thumbnails_position: $jDOPTG('#thumbnails_position').val(),
                                       thumbnails_over_image: $jDOPTG('#thumbnails_over_image').val(),
                                       thumbnails_bg_color: $jDOPTG('#thumbnails_bg_color').val(),
                                       thumbnails_bg_alpha: $jDOPTG('#thumbnails_bg_alpha').val(),
                                       thumbnails_spacing: $jDOPTG('#thumbnails_spacing').val(),
                                       thumbnails_padding_top: $jDOPTG('#thumbnails_padding_top').val(),
                                       thumbnails_padding_right: $jDOPTG('#thumbnails_padding_right').val(),
                                       thumbnails_padding_bottom: $jDOPTG('#thumbnails_padding_bottom').val(),
                                       thumbnails_padding_left: $jDOPTG('#thumbnails_padding_left').val(),
                                       thumbnails_navigation: $jDOPTG('#thumbnails_navigation').val(),
                                       thumbnails_navigation_prev: data['ThumbnailsNavigationPrev'],
                                       thumbnails_navigation_prev_hover: data['ThumbnailsNavigationPrevHover'],
                                       thumbnails_navigation_next: data['ThumbnailsNavigationNext'],
                                       thumbnails_navigation_next_hover: data['ThumbnailsNavigationNextHover'],
                                       thumbnail_loader: data['ThumbnailLoader'],
                                       thumbnail_width: $jDOPTG('#thumbnail_width').val(),
                                       thumbnail_height: $jDOPTG('#thumbnail_height').val(),
                                       thumbnail_width_mobile: $jDOPTG('#thumbnail_width_mobile').val(),
                                       thumbnail_height_mobile: $jDOPTG('#thumbnail_height_mobile').val(),
                                       thumbnail_alpha: $jDOPTG('#thumbnail_alpha').val(),
                                       thumbnail_alpha_hover: $jDOPTG('#thumbnail_alpha_hover').val(),
                                       thumbnail_alpha_selected: $jDOPTG('#thumbnail_alpha_selected').val(),
                                       thumbnail_bg_color: $jDOPTG('#thumbnail _bg_color').val(),
                                       thumbnail_bg_color_hover: $jDOPTG('#thumbnail_bg_color_hover').val(),
                                       thumbnail_bg_color_selected: $jDOPTG('#thumbnail_bg_color_selected').val(),
                                       thumbnail_border_size: $jDOPTG('#thumbnail_border_size').val(),
                                       thumbnail_border_color: $jDOPTG('#thumbnail_border_color').val(),
                                       thumbnail_border_color_hover: $jDOPTG('#thumbnail_border_color_hover').val(),
                                       thumbnail_border_color_selected: $jDOPTG('#thumbnail_border_color_selected').val(),
                                       thumbnail_padding_top: $jDOPTG('#thumbnail_padding_top').val(),
                                       thumbnail_padding_right: $jDOPTG('#thumbnail_padding_right').val(),
                                       thumbnail_padding_bottom: $jDOPTG('#thumbnail_padding_bottom').val(),
                                       thumbnail_padding_left: $jDOPTG('#thumbnail_padding_left').val(),
                                       image_loader: data['ImageLoader'],
                                       image_bg_color: $jDOPTG('#image_bg_color').val(),
                                       image_bg_alpha: $jDOPTG('#image_bg_alpha').val(),
                                       image_display_type: $jDOPTG('#image_display_type').val(),
                                       image_display_time: $jDOPTG('#image_display_time').val(),
                                       image_margin_top: $jDOPTG('#image_margin_top').val(),
                                       image_margin_right: $jDOPTG('#image_margin_right').val(),
                                       image_margin_bottom: $jDOPTG('#image_margin_bottom').val(),
                                       image_margin_left: $jDOPTG('#image_margin_left').val(),
                                       image_padding_top: $jDOPTG('#image_padding_top').val(),
                                       image_padding_right: $jDOPTG('#image_padding_right').val(),
                                       image_padding_bottom: $jDOPTG('#image_padding_bottom').val(),
                                       image_padding_left: $jDOPTG('#image_padding_left').val(),
                                       navigation_enabled: $jDOPTG('#navigation_enabled').val(),
                                       navigation_over_image: $jDOPTG('#navigation_over_image').val(),
                                       navigation_prev: data['NavigationPrev'],
                                       navigation_prev_hover: data['NavigationPrevHover'],
                                       navigation_next: data['NavigationNext'],
                                       navigation_next_hover: data['NavigationNextHover'],
                                       navigation_lightbox: data['NavigationLightbox'],
                                       navigation_lightbox_hover: data['NavigationLightboxHover'],
                                       navigation_touch_device_swipe_enabled: data['NavigationTouchDeviceSwipeEnabled'],
                                       caption_width: $jDOPTG('#caption_width').val(),
                                       caption_height: $jDOPTG('#caption_height').val(),
                                       caption_title_color: $jDOPTG('#caption_title_color').val(),
                                       caption_text_color: $jDOPTG('#caption_text_color').val(),
                                       caption_bg_color: $jDOPTG('#caption_bg_color').val(),
                                       caption_bg_alpha: $jDOPTG('#caption_bg_alpha').val(),
                                       caption_position: $jDOPTG('#caption_position').val(),
                                       caption_over_image: $jDOPTG('#caption_over_image').val(),
                                       caption_scroll_scrub_color: $jDOPTG('#caption_scroll_scrub_color').val(),
                                       caption_scroll_bg_color: $jDOPTG('#caption_scroll_bg_color').val(),
                                       caption_margin_top: $jDOPTG('#caption_margin_top').val(),
                                       caption_margin_right: $jDOPTG('#caption_margin_right').val(),
                                       caption_margin_bottom: $jDOPTG('#caption_margin_bottom').val(),
                                       caption_margin_left: $jDOPTG('#caption_margin_left').val(),
                                       caption_padding_top: $jDOPTG('#caption_padding_top').val(),
                                       caption_padding_right: $jDOPTG('#caption_padding_right').val(),
                                       caption_padding_bottom: $jDOPTG('#caption_padding_bottom').val(),
                                       caption_padding_left: $jDOPTG('#caption_padding_left').val(),
                                       lightbox_enabled: $jDOPTG('#lightbox_enabled').val(),
                                       lightbox_window_color: $jDOPTG('#lightbox_window_color').val(),
                                       lightbox_window_alpha: $jDOPTG('#lightbox_window_alpha').val(),
                                       lightbox_loader: data['LightboxLoader'],
                                       lightbox_bg_color: $jDOPTG('#lightbox_bg_color').val(),
                                       lightbox_bg_alpha: $jDOPTG('#lightbox_bg_alpha').val(),
                                       lightbox_margin_top: $jDOPTG('#lightbox_margin_top').val(),
                                       lightbox_margin_right: $jDOPTG('#lightbox_margin_right').val(),
                                       lightbox_margin_bottom: $jDOPTG('#lightbox_margin_bottom').val(),
                                       lightbox_margin_left: $jDOPTG('#lightbox_margin_left').val(),
                                       lightbox_padding_top: $jDOPTG('#lightbox_padding_top').val(),
                                       lightbox_padding_right: $jDOPTG('#lightbox_padding_right').val(),
                                       lightbox_padding_bottom: $jDOPTG('#lightbox_padding_bottom').val(),
                                       lightbox_padding_left: $jDOPTG('#lightbox_padding_left').val(),
                                       lightbox_navigation_prev: data['LightboxNavigationPrev'],
                                       lightbox_navigation_prev_hover: data['LightboxNavigationPrevHover'],
                                       lightbox_navigation_next: data['LightboxNavigationNext'],
                                       lightbox_navigation_next_hover: data['LightboxNavigationNextHover'],
                                       lightbox_navigation_close: data['LightboxNavigationClose'],
                                       lightbox_navigation_close_hover: data['LightboxNavigationCloseHover'],
                                       lightbox_navigation_info_bg_color: $jDOPTG('#lightbox_navigation_info_bg_color').val(),
                                       lightbox_navigation_info_text_color: $jDOPTG('#lightbox_navigation_info_text_color').val(),
                                       lightbox_navigation_touch_device_swipe_enabled: $jDOPTG('#lightbox_navigation_touch_device_swipe_enabled').val(),                
                                       social_share_enabled: $jDOPTG('#social_share_enabled').val(),
                                       social_share: data['SocialShare'],
                                       social_share_lightbox: data['SocialShareLightbox'],                
                                       tooltip_enabled: $jDOPTG('#tooltip_enabled').val(),
                                       tooltip_bg_color: $jDOPTG('#tooltip_bg_color').val(),
                                       tooltip_stroke_color: $jDOPTG('#tooltip_stroke_color').val(),
                                       tooltip_text_color: $jDOPTG('#tooltip_text_color').val(),
                                       slideshow: $jDOPTG('#slideshow').val(),
                                       slideshow_time: $jDOPTG('#slideshow_time').val(),
                                       slideshow_autostart: $jDOPTG('#slideshow_autostart').val(),
                                       slideshow_loop: $jDOPTG('#slideshow_loop').val(),
                                       slideshow_play: data['SlideshowPlay'],
                                       slideshow_play_hover: data['SlideshowPlayHover'],
                                       slideshow_pause: data['SlideshowPause'],
                                       slideshow_pause_hover: data['SlideshowPauseHover'],
                                       auto_hide: $jDOPTG('#auto_hide').val(),
                                       auto_hide_time: $jDOPTG('#auto_hide_time').val()}, function(data){
                    doptgToggleMessage('hide', DOPTG_EDIT_GALLERY_SUCCESS);
                });
            });
        }
    }
}

function doptgDeleteGallery(id){// Delete gallery
    if (clearClick){
        if (confirm(DOPTG_DELETE_GALLERY_CONFIRMATION)){
            doptgToggleMessage('show', DOPTG_DELETE_GALLERY_SUBMITED);
            
            $jDOPTG.post(ajaxurl, {action: 'doptg_delete_gallery', id:id}, function(data){
                doptgRemoveColumns(2);
                $jDOPTG('#DOPTG-ID-'+id).stop(true, true).animate({'opacity':0}, 600, function(){
                    $jDOPTG(this).remove();
                    if (data == '0'){
                        $jDOPTG('.column-content', '.column1', '.DOPTG-admin').html('<ul><li class="no-data">'+DOPTG_NO_GALLERIES+'</li></ul>');
                    }
                    doptgToggleMessage('hide', DOPTG_DELETE_GALERRY_SUCCESS);
                });
            });
        }
    }
}

function doptgGalleriesEvents(){// Init Gallery Events.
    $jDOPTG('li', '.column1', '.DOPTG-admin').click(function(){
        if (clearClick){
            var id = $jDOPTG(this).attr('id').split('-')[2];
            
            if (currGallery != id){
                currGallery = id;
                $jDOPTG('li', '.column1', '.DOPTG-admin').removeClass('item-selected');
                $jDOPTG(this).addClass('item-selected');
                doptgShowImages(id);
            }
        }
    });
}

function doptgShowImages(gallery_id){// Show Images List.
    if (clearClick){
        $jDOPTG('#gallery_id').val(gallery_id);
        doptgRemoveColumns(2);
        doptgToggleMessage('show', DOPTG_LOAD);
        
        $jDOPTG.post(ajaxurl, {action: 'doptg_show_images', gallery_id:gallery_id}, function(data){
            var HeaderHTML = new Array();
            HeaderHTML.push('<div class="add-button">');
            HeaderHTML.push('    <a href="javascript:doptgAddImages()" title="'+DOPTG_ADD_IMAGE_SUBMIT+'"></a>');
            HeaderHTML.push('</div>');
            HeaderHTML.push('<div class="edit-button">');
            HeaderHTML.push('    <a href="javascript:doptgShowGalleryInfo()" title="'+DOPTG_EDIT_GALLERY_SUBMIT+'"></a>');
            HeaderHTML.push('</div>');
            HeaderHTML.push('<div class="code-button">');
            HeaderHTML.push('    <a href="javascript:doptgShowGalleryCode()" title="'+DOPTG_EDIT_GALLERY_CODE+'"></a>');
            HeaderHTML.push('</div>');
            HeaderHTML.push('<a href="javascript:void()" class="header-help" title="'+DOPTG_GALLERY_EDIT_HELP+'"></a>');
            
            $jDOPTG('.column-header', '.column2', '.DOPTG-admin').html(HeaderHTML.join(''));
            $jDOPTG('.column-content', '.column2', '.DOPTG-admin').html(data);
            $jDOPTG('.column-content', '.column2', '.DOPTG-admin').DOPImageLoader({'LoaderURL': DOPTG_URL+'doptg/libraries/gui/images/image-loader/loader.gif', 'NoImageURL': DOPTG_URL+'doptg/libraries/gui/images/image-loader/no-image.png'});
            doptgImagesEvents();
            doptgToggleMessage('hide', DOPTG_IMAGES_LOADED);
        });
    }
}

function doptgImagesEvents(){// Init Images Events.
    $jDOPTG('li', '.column2', '.DOPTG-admin').click(function(){
        var id = $jDOPTG(this).attr('id').split('-')[3];
        
        if (currImage != id && clearClick){
            $jDOPTG('li', '.column2', '.DOPTG-admin').removeClass('item-image-selected');
            $jDOPTG(this).addClass('item-image-selected');
            doptgShowImage(id);
        }
    });

    $jDOPTG('ul', '.column2').sortable({opacity:0.6, cursor:'move', update:function(){
        if (clearClick){
            var data = new Array();
            
            doptgToggleMessage('show', DOPTG_SORT_IMAGES_SUBMITED);
            $jDOPTG('li', '.column2', '.DOPTG-admin').each(function(){
                data.push($jDOPTG(this).attr('id').split('-')[3]);
            });
                        
            $jDOPTG.post(ajaxurl, {action: 'doptg_sort_images', gallery_id:$jDOPTG('#gallery_id').val(), data:data.join(',')}, function(data){
                doptgRedoImageIDs();
                doptgToggleMessage('hide', DOPTG_SORT_IMAGES_SUCCESS);
            });
        }
    },
    stop:function(){
        $jDOPTG('li', '.column2').removeAttr('style');
    }});
}

function doptgRedoImageIDs(){
    var id = 0;
    
    doptgRemoveColumns(3);
    
    $jDOPTG('.DOPTG-admin .column2 .item-image').each(function(){
        id++;        
        $jDOPTG(this).attr('id', 'DOPTG-image-ID-'+id);
    });
}

function doptgAddImages(){// Add Image/Images.
    if (clearClick){
        $jDOPTG('li', '.column2', '.DOPTG-admin').removeClass('item-image-selected');
        doptgRemoveColumns(3);
        
        var uploadifyHTML = new Array(), HeaderHTML = new Array();
        HeaderHTML.push('<a href="javascript:void()" class="header-help" title="'+DOPTG_ADD_IMAGES_HELP+'"></a>');

        uploadifyHTML.push('<h3 class="settings">'+DOPTG_ADD_IMAGE_SIMPLE_UPLOAD+'</h3>');
        uploadifyHTML.push('<form action="'+DOPTG_URL+'doptg/libraries/php/upload.php?path='+DOPTG_ABSOLUTE_PATH+'/doptg/" method="post" enctype="multipart/form-data" id="doptg_ajax_upload_form" name="doptg_ajax_upload_form" target="doptg_upload_target" onsubmit="doptgUploadImage()">');
        uploadifyHTML.push('    <input name="doptg_image" type="file" onchange="$jDOPTG(\'#doptg_ajax_upload_form\').submit(); return false;" style="margin:5px 0 0 10px"; />');
        uploadifyHTML.push('    <a href="javascript:void()" class="header-help" title="'+DOPTG_ADD_IMAGES_HELP_AJAX+'"></a><br class="DOPTG-clear" />');
        uploadifyHTML.push('</form>');
        uploadifyHTML.push('<iframe id="doptg_upload_target" name="doptg_upload_target" src="javascript:void(0)" style="display: none;"></iframe>');
        
        uploadifyHTML.push('<h3 class="settings">'+DOPTG_ADD_IMAGE_MULTIPLE_UPLOAD+'</h3>');
        uploadifyHTML.push('<div class="uploadifyContainer" style="float:left; margin-top:5px;">');
        uploadifyHTML.push('    <div><input type="file" name="uploadify" id="uploadify" style="width:100px;" /></div>');
        uploadifyHTML.push('    <div id="fileQueue"></div>');
        uploadifyHTML.push('</div>');
        uploadifyHTML.push('<a href="javascript:void()" class="header-help" title="'+DOPTG_ADD_IMAGES_HELP_UPLOADIFY+'"></a><br class="DOPTG-clear" />');  
        
        uploadifyHTML.push('<h3 class="settings">'+DOPTG_ADD_IMAGE_FTP_UPLOAD+'</h3>');
        uploadifyHTML.push('<input name="doptg_ftp_image" id="doptg_ftp_image" type="button" value="'+DOPTG_SELECT_FTP_IMAGES+'" class="select-images" />');
        uploadifyHTML.push('<a href="javascript:void()" class="header-help" title="'+DOPTG_ADD_IMAGES_HELP_FTP+'"></a><br class="DOPTG-clear" />');

        $jDOPTG('.column-header', '.column3', '.DOPTG-admin').html(HeaderHTML.join(''));
        $jDOPTG('.column-content', '.column3', '.DOPTG-admin').html(uploadifyHTML.join(''));
        
        // Add Images width Uploadify.
        
        $jDOPTG('#uploadify').uploadify({
            'uploader'       : DOPTG_URL+'doptg/libraries/swf/uploadify.swf',
            'script'         : DOPTG_URL+'doptg/libraries/php/uploadify.php?path='+DOPTG_ABSOLUTE_PATH+'/doptg/',
            'cancelImg'      : DOPTG_URL+'doptg/libraries/gui/images/uploadify/cancel.png',
            'folder'         : '',
            'queueID'        : 'fileQueue',
            'buttonText'     : DOPTG_SELECT_IMAGES,
            'auto'           : true,
            'multi'          : true,
            'onError'        : function (event,ID,fileObj,errorObj){
                                    alert(errorObj.type + ' Error: ' + errorObj.info);
                               },
            'onInit'         : function(){
                                   doptgResize();
                               },
            'onCancel'         : function(event,ID,fileObj,data){
                                   doptgResize();
                               },
            'onSelect'       : function(event, ID, fileObj){
                                   clearClick = false;
                                   doptgToggleMessage('show', DOPTG_ADD_IMAGE_SUBMITED);
                                   setTimeout(function(){
                                       doptgResize();
                                   }, 100);
                               },
            'onComplete'     : function(event, ID, fileObj, response, data){                       
                                   if (response != '-1'){
                                       setTimeout(function(){
                                           doptgResize();
                                       }, 1000);
                                       $jDOPTG.post(ajaxurl, {action: 'doptg_add_image', gallery_id:$jDOPTG('#gallery_id').val(), name:response}, function(data){
                                           if ($jDOPTG('ul', '.column2', '.DOPTG-admin').html() == '<li class="no-data">'+DOPTG_NO_IMAGES+'</li>'){
                                               $jDOPTG('ul', '.column2', '.DOPTG-admin').html('<li class="item-image" id="DOPTG-image-ID-'+data+'"><img src="'+DOPTG_URL+'doptg/uploads/thumbs/'+response+'" alt="" /></li>');
                                           }
                                           else{
                                               $jDOPTG('ul', '.column2', '.DOPTG-admin').append('<li class="item-image" id="DOPTG-image-ID-'+data+'"><img src="'+DOPTG_URL+'doptg/uploads/thumbs/'+response+'" alt="" /></li>');
                                           }
                                           doptgResize();
                                           $jDOPTG('#DOPTG-image-ID-'+data).click(function(){
                                               var id = $jDOPTG(this).attr('id').split('-')[3];
                                               if (currImage != id && clearClick){
                                                   $jDOPTG('li', '.column2', '.DOPTG-admin').removeClass('item-image-selected');
                                                   $jDOPTG(this).addClass('item-image-selected');
                                                   doptgShowImage(id);
                                               }
                                           });
                                           $jDOPTG('#DOPTG-image-ID-'+data).DOPImageLoader({'LoaderURL': DOPTG_URL+'doptg/libraries/gui/images/image-loader/loader.gif', 'NoImageURL': DOPTG_URL+'doptg/libraries/gui/images/image-loader/no-image.png'});
                                       });
                                   }
                               },
            'onAllComplete'  : function(event, data){
                                   doptgToggleMessage('hide', DOPTG_ADD_IMAGE_SUCCESS);
                               }
        });
        
        // Add Images from FTP.
                
        $jDOPTG('#doptg_ftp_image').click(function(){
            if (clearClick){
                doptgToggleMessage('show', DOPTG_ADD_IMAGE_SUBMITED);

                $jDOPTG.post(ajaxurl, {action: 'doptg_add_image_ftp', gallery_id:$jDOPTG('#gallery_id').val()}, function(data){
                    var images = data.split(';;;;;'), 
                    i, imageName, imageID;
                    
                    for (i=0; i<images.length; i++){
                        imageID = images[i].split(';;;')[0];
                        imageName = images[i].split(';;;')[1];

                        if ($jDOPTG('ul', '.column2', '.DOPTG-admin').html() == '<li class="no-data">'+DOPTG_NO_IMAGES+'</li>'){
                            $jDOPTG('ul', '.column2', '.DOPTG-admin').html('<li class="item-image" id="DOPTG-image-ID-'+imageID+'"><img src="'+DOPTG_URL+'doptg/uploads/thumbs/'+imageName+'" alt="" /></li>');
                        }
                        else{
                            $jDOPTG('ul', '.column2', '.DOPTG-admin').append('<li class="item-image" id="DOPTG-image-ID-'+imageID+'"><img src="'+DOPTG_URL+'doptg/uploads/thumbs/'+imageName+'" alt="" /></li>');
                        }

                        doptgResize();

                        $jDOPTG('#DOPTG-image-ID-'+imageID).click(function(){
                            var id = $jDOPTG(this).attr('id').split('-')[3];

                            if (currImage != id && clearClick){
                                $jDOPTG('li', '.column2', '.DOPTG-admin').removeClass('item-image-selected');
                                $jDOPTG(this).addClass('item-image-selected');
                                doptgShowImage(id);
                            }
                        });

                        $jDOPTG('#DOPTG-image-ID-'+imageID).DOPImageLoader({'LoaderURL': DOPTG_URL+'libraries/gui/images/image-loader/loader.gif', 'NoImageURL': DOPTG_URL+'doptg/libraries/gui/images/image-loader/no-image.png'});
                    }

                    doptgToggleMessage('hide', DOPTG_ADD_IMAGE_SUCCESS);
                });            
            }
        });

        doptgResize();
    }
}

function doptgUploadImage(){
    doptgToggleMessage('show', DOPTG_ADD_IMAGE_SUBMITED);
}

function doptgUploadImageSuccess(response, data){
    if (response != '-1'){
        setTimeout(function(){
            doptgResize();
        }, 1000);

        $jDOPTG.post(ajaxurl, {action: 'doptg_add_image', gallery_id:$jDOPTG('#gallery_id').val(), name:response}, function(data){
            if ($jDOPTG('ul', '.column2', '.DOPTG-admin').html() == '<li class="no-data">'+DOPTG_NO_IMAGES+'</li>'){
                $jDOPTG('ul', '.column2', '.DOPTG-admin').html('<li class="item-image" id="DOPTG-image-ID-'+data+'"><img src="'+DOPTG_URL+'doptg/uploads/thumbs/'+response+'" alt="" /></li>');
            }
            else{
                $jDOPTG('ul', '.column2', '.DOPTG-admin').append('<li class="item-image" id="DOPTG-image-ID-'+data+'"><img src="'+DOPTG_URL+'doptg/uploads/thumbs/'+response+'" alt="" /></li>');
            }
            doptgResize();
            
            $jDOPTG('#DOPTG-image-ID-'+data).click(function(){
                var id = $jDOPTG(this).attr('id').split('-')[3];

                if (currImage != id && clearClick){
                    $jDOPTG('li', '.column2', '.DOPTG-admin').removeClass('item-image-selected');
                    $jDOPTG(this).addClass('item-image-selected');
                    doptgShowImage(id);
                }
            });
            doptgToggleMessage('hide', DOPTG_ADD_IMAGE_SUCCESS);
            $jDOPTG('#DOPTG-image-ID-'+data).DOPImageLoader({'LoaderURL': DOPTG_URL+'doptg/libraries/gui/images/image-loader/loader.gif', 'NoImageURL': DOPTG_URL+'doptg/libraries/gui/images/image-loader/no-image.png'});
        });
    }
    else{
        doptgToggleMessage('hide', DOPTG_ADD_IMAGE_SUCCESS);        
    }
}

function doptgShowImage(id){// Show Image Details.
    if (clearClick){
        doptgRemoveColumns(3);
        currImage = id;
        doptgToggleMessage('show', DOPTG_LOAD);
        
        $jDOPTG.post(ajaxurl, {action: 'doptg_show_image', gallery_id: $jDOPTG('#gallery_id').val(), image_id: id}, function(data){          
            var json = $jDOPTG.parseJSON(data),
            HeaderHTML = new Array(), HTML = new Array();
            
            HeaderHTML.push('<input type="button" name="DOPTG_image_submit" class="submit-style" onclick="doptgEditImage('+json['id']+')" title="'+DOPTG_EDIT_IMAGE_SUBMIT+'" value="'+DOPTG_SUBMIT+'" />');
            HeaderHTML.push('<input type="button" name="DOPTG_image_delete" class="submit-style" onclick="doptgDeleteImage('+json['id']+')" title="'+DOPTG_DELETE_IMAGE_SUBMIT+'" value="'+DOPTG_DELETE+'" />');
            HeaderHTML.push('<a href="javascript:void()" class="header-help" title="'+DOPTG_IMAGE_EDIT_HELP+'"></a>');

            HTML.push('<input type="hidden" name="crop_x" id="crop_x" value="0" />');
            HTML.push('<input type="hidden" name="crop_y" id="crop_y" value="0" />');
            HTML.push('<input type="hidden" name="crop_width" id="crop_width" value="0" />');
            HTML.push('<input type="hidden" name="crop_height" id="crop_height" value="0" />');
            HTML.push('<input type="hidden" name="image_width" id="image_width" value="0" />');
            HTML.push('<input type="hidden" name="image_height" id="image_height" value="0" />');
            HTML.push('<input type="hidden" name="thumb_width" id="thumb_width" value="'+json['thumbnail_width']+'" />');
            HTML.push('<input type="hidden" name="thumb_height" id="thumb_height" value="'+json['thumbnail_height']+'" />');
            HTML.push('<div class="column-image">');
            HTML.push('    <img src="'+DOPTG_URL+json['image']+'" alt="" />');
            HTML.push('</div>');
            HTML.push('<div class="column-thumbnail-left">');
            HTML.push('    <label class="label">'+DOPTG_EDIT_IMAGE_CROP_THUMBNAIL+'</label>');
            HTML.push('    <div class="column-thumbnail" style="width:'+json['thumbnail_width']+'px; height:'+json['thumbnail_height']+'px;">');
            HTML.push('        <img src="'+DOPTG_URL+json['image']+'" style="width:'+json['thumbnail_width']+'px; height:'+json['thumbnail_height']+'px;" alt="" />');
            HTML.push('    </div>');
            HTML.push('</div>');
            HTML.push('<div class="column-thumbnail-right">');
            HTML.push('    <label class="label">'+DOPTG_EDIT_IMAGE_CURRENT_THUMBNAIL+'</label>');
            HTML.push('    <div class="column-thumbnail" id="DOPTG-curr-thumb" style="float: right; width:'+json['thumbnail_width']+'px; height:'+json['thumbnail_height']+'px;">');
            HTML.push('        <img src="'+DOPTG_URL+json['thumb']+'?cacheBuster='+doptgRandomString(64)+'" style="width:'+json['thumbnail_width']+'px; height:'+json['thumbnail_height']+'px;" alt="" />');
            HTML.push('    </div>');
            HTML.push('</div>');
            HTML.push('<br class="DOPTG-clear" />');
            HTML.push('<label class="label" for="image_title">'+DOPTG_EDIT_IMAGE_TITLE+'</label>');
            HTML.push('<input type="text" class="column-input" name="image_title" id="image_title" value="'+json['title']+'" />');
            HTML.push('<label class="label" for="image_caption">'+DOPTG_EDIT_IMAGE_CAPTION+'</label>');
            HTML.push('<textarea class="column-input" name="image_caption" id="image_caption" cols="" rows="6">'+json['caption']+'</textarea>');
            HTML.push('<label class="label" for="image_video">'+DOPTG_EDIT_IMAGE_MEDIA+'</label>');
            HTML.push('<textarea class="column-input" name="image_media" id="image_media" cols="" rows="6">'+json['media']+'</textarea>');
            HTML.push('<label class="label" for="image_video">'+DOPTG_EDIT_IMAGE_LIGHTBOX_MEDIA+'</label>');
            HTML.push('<textarea class="column-input" name="image_lightbox_media" id="image_lightbox_media" cols="" rows="6">'+json['lightbox_media']+'</textarea>');
            HTML.push('<label class="label" for="image_enabled">'+DOPTG_EDIT_IMAGE_ENABLED+'</label>');
            HTML.push('<select class="column-select" name="image_enabled" id="image_enabled">');
            
            if (json['enabled'] == 'true'){
                HTML.push('<option value="true" selected="selected">true</option>');
                HTML.push('<option value="false">false</option>');
            }
            else{
                HTML.push('<option value="true">true</option>');
                HTML.push('<option value="false" selected="selected">false</option>');
            }
            HTML.push('</select>');

            $jDOPTG('.column-header', '.column3', '.DOPTG-admin').html(HeaderHTML.join(''));
            $jDOPTG('.column-content', '.column3', '.DOPTG-admin').html(HTML.join(''));
            doptgResize();
            $jDOPTG('.column-image', '.DOPTG-admin').DOPImageLoader({'LoaderURL': DOPTG_URL+'doptg/libraries/gui/images/image-loader/loader.gif', 'NoImageURL': DOPTG_URL+'doptg/libraries/gui/images/image-loader/no-image.png', 'SuccessCallback': 'doptgInitJcrop()'});
            
            doptgToggleMessage('hide', DOPTG_IMAGE_LOADED);
        });
    }
}

function doptgInitJcrop(){// Init Jcrop. (For croping thumbnails)
    imageDisplay = true;
    imageWidth = $jDOPTG('img', '.column-image', '.DOPTG-admin').width();
    imageHeight = $jDOPTG('img', '.column-image', '.DOPTG-admin').height();
    doptgResize();
    $jDOPTG('img', '.column-image', '.DOPTG-admin').Jcrop({onChange: doptgShowCropPreview, onSelect: doptgShowCropPreview, aspectRatio: $jDOPTG('.column-thumbnail', '.DOPTG-admin').width()/$jDOPTG('.column-thumbnail', '.DOPTG-admin').height(), minSize: [$jDOPTG('.column-thumbnail', '.DOPTG-admin').width(), $jDOPTG('.column-thumbnail', '.DOPTG-admin').height()]});
    doptgResize();        
    setTimeout(function(){        
        doptgResize();        
    }, 100);
}

function doptgShowCropPreview(coords){// Select thumbnail with Jcrop.
    if (parseInt(coords.w) > 0){
        $jDOPTG('#crop_x').val(coords.x);
        $jDOPTG('#crop_y').val(coords.y);
        $jDOPTG('#crop_width').val(coords.w);
        $jDOPTG('#crop_height').val(coords.h);
        $jDOPTG('#image_width').val($jDOPTG('img', '.column-image', '.DOPTG-admin').width());
        $jDOPTG('#image_height').val($jDOPTG('img', '.column-image', '.DOPTG-admin').height());

        var rx = $jDOPTG('.column-thumbnail', '.DOPTG-admin').width()/coords.w;
        var ry = $jDOPTG('.column-thumbnail', '.DOPTG-admin').height()/coords.h;

        $jDOPTG('img', '.column-thumbnail-left', '.DOPTG-admin').css({
            width: Math.round(rx*$jDOPTG('img', '.column-image', '.DOPTG-admin').width()) + 'px',
            height: Math.round(ry*$jDOPTG('img', '.column-image', '.DOPTG-admin').height()) + 'px',
            marginLeft: '-'+Math.round(rx * coords.x)+'px',
            marginTop: '-'+Math.round(ry * coords.y)+'px'
        });
    }
}

function doptgEditImage(id){// Edit Image Details.
    if (clearClick){
        doptgToggleMessage('show', DOPTG_SAVE);
        
        $jDOPTG.post(ajaxurl, {action: 'doptg_edit_image',
                               gallery_id: $jDOPTG('#gallery_id').val(),
                               image_id: id,
                               crop_x: $jDOPTG('#crop_x').val(),
                               crop_y: $jDOPTG('#crop_y').val(),
                               crop_width: $jDOPTG('#crop_width').val(),
                               crop_height: $jDOPTG('#crop_height').val(),
                               image_width: $jDOPTG('#image_width').val(),
                               image_height: $jDOPTG('#image_height').val(),
                               image_name: $jDOPTG('#image_name').val(),
                               thumb_width: $jDOPTG('#thumb_width').val(),
                               thumb_height: $jDOPTG('#thumb_height').val(),
                               image_title: $jDOPTG('#image_title').val(),
                               image_caption: $jDOPTG('#image_caption').val(),
                               image_media: $jDOPTG('#image_media').val(),
                               image_lightbox_media: $jDOPTG('#image_lightbox_media').val(),
                               image_enabled: $jDOPTG('#image_enabled').val()}, function(data){
            doptgToggleMessage('hide', DOPTG_EDIT_IMAGE_SUCCESS);
            if ($jDOPTG('#image_enabled').val() == 'true'){
                $jDOPTG('#DOPTG-image-ID-'+id).removeClass('item-image-disabled');
            }
            else{
                $jDOPTG('#DOPTG-image-ID-'+id).addClass('item-image-disabled');
            }
            
            if (data != ''){
                $jDOPTG('#DOPTG-curr-thumb').html('<img src="'+data+'?cacheBuster='+doptgRandomString(64)+'" style="width:'+$jDOPTG('#thumb_width').val()+'px; height:'+$jDOPTG('#thumb_height').val()+'px;" alt="" />');
            }
        });
    }
}

function doptgDeleteImage(id){// Delete Image.
    if (clearClick){
        if (confirm(DOPTG_DELETE_IMAGE_CONFIRMATION)){
            doptgToggleMessage('show', DOPTG_DELETE_IMAGE_SUBMITED);
            $jDOPTG.post(ajaxurl, {action: 'doptg_delete_image',
                                   gallery_id: $jDOPTG('#gallery_id').val(),
                                   image_id: id}, function(data){
                doptgRemoveColumns(3);
                $jDOPTG('#DOPTG-image-ID-'+id).stop(true, true).animate({'opacity':0}, 600, function(){
                    $jDOPTG(this).remove();
                    doptgToggleMessage('hide', DOPTG_DELETE_GALERRY_SUCCESS);
                    
                    if (data == '0'){
                        $jDOPTG('.column-content', '.column2', '.DOPTG-admin').html('<ul><li class="no-data">'+DOPTG_NO_IMAGES+'</li></ul>');
                    }
                    else{
                        doptgRedoImageIDs();
                    }
                });
            });
        }
    }
}

function doptgRemoveColumns(no){// Clear columns content.
    if (no <= 2){
        $jDOPTG('.column-header', '.column2', '.DOPTG-admin').html('');
        $jDOPTG('.column-content', '.column2', '.DOPTG-admin').html('');
    }
    if (no <= 3){
        $jDOPTG('.column-header', '.column3', '.DOPTG-admin').html('');
        $jDOPTG('.column-content', '.column3', '.DOPTG-admin').html('');
        imageDisplay = false;
        currImage = 0;
        doptgResize();
    }
}

function doptgToggleMessage(action, message){// Display Info Messages.
    doptgResize();
    
    if (action == 'show'){
        clearClick = false;
        $jDOPTG('#DOPTG-admin-message').addClass('loader');
        $jDOPTG('#DOPTG-admin-message').html(message);
        $jDOPTG('#DOPTG-admin-message').stop(true, true).animate({'opacity':1}, 600);
    }
    else{
        clearClick = true;
        $jDOPTG('#DOPTG-admin-message').removeClass('loader');
        $jDOPTG('#DOPTG-admin-message').html(message);
        setTimeout(function(){
            $jDOPTG('#DOPTG-admin-message').stop(true, true).animate({'opacity':0}, 600, function(){
                $jDOPTG('#DOPTG-admin-message').html('');
            });
        }, 2000);
    }
}

function doptgRandomString(string_length){// Create a string with random elements
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",
    random_string = '';

    for (var i=0; i<string_length; i++){
        var rnum = Math.floor(Math.random()*chars.length);
        random_string += chars.substring(rnum,rnum+1);
    }
    return random_string;
}

function doptgShowGalleryCode(){// Show Image Details.
    if (clearClick){
        doptgRemoveColumns(3);
        
        var HeaderHTML = new Array(), HTML = new Array();

        HeaderHTML.push('<input type="button" name="DOPTG_image_submit" class="submit-style" onclick="doptgGenerateGalleryCode()" title="'+DOPTG_EDIT_GALLERY_CODE+'" value="'+DOPTG_EDIT_GALLERY_CODE+'" />');
        HeaderHTML.push('<a href="javascript:void()" class="header-help" title="'+DOPTG_EDIT_GALLERY_CODE_HELP+'"></a>');
                    
        HTML.push('<div class="setting-box">');
        HTML.push('    <input type="checkbox" name="jquery_file" id="jquery_file" checked="checked" /><label for="jquery_file" style="width:auto;">'+DOPTG_EDIT_GALLERY_CODE_INCLUDE_JQUERY+'</label>');
        HTML.push('<br class="DOPTG-clear"></div>');
        HTML.push('<div class="setting-box">');
        HTML.push('    <input type="checkbox" name="scroll_pane_file" id="scroll_pane_file" checked="checked" /><label for="scroll_pane_file" style="width:auto;">'+DOPTG_EDIT_GALLERY_CODE_INCLUDE_SCROLL+'</label>');
        HTML.push('<br class="DOPTG-clear"></div>');
        HTML.push('<div class="setting-box">');
        HTML.push('    <input type="checkbox" name="mouse_wheel_file" id="mouse_wheel_file" checked="checked" /><label for="mouse_wheel_file" style="width:auto;">'+DOPTG_EDIT_GALLERY_CODE_INCLUDE_MOUSE+'</label>');
        HTML.push('<br class="DOPTG-clear"></div>');
        HTML.push('<div class="setting-box">');
        HTML.push('    <input type="checkbox" name="gallery_file" id="gallery_file" checked="checked" /><label for="gallery_file" style="width:auto;">'+DOPTG_EDIT_GALLERY_CODE_INCLUDE_GALLERY+'</label>');
        HTML.push('<br class="DOPTG-clear"></div>');
        HTML.push('<div class="setting-box">');
        HTML.push('    <input type="checkbox" name="gallery_fullscreen" id="gallery_fullscreen" /><label for="gallery_fullscreen" style="width:auto;">'+DOPTG_EDIT_GALLERY_CODE_GALLERY_FULLSCREEN+'</label>');
        HTML.push('<br class="DOPTG-clear"></div>');
        HTML.push('<div class="setting-box">');
        HTML.push('    <input type="checkbox" name="gallery_embed" id="gallery_embed" /><label for="gallery_embed" style="width:auto;">'+DOPTG_EDIT_GALLERY_CODE_GALLERY_EMBED+'</label>');
        HTML.push('<br class="DOPTG-clear"></div>');
        HTML.push('<label class="label" for="code_area">'+DOPTG_EDIT_GALLERY_CODE_COPY+'</label>');
        HTML.push('<textarea class="column-input" name="code_area" id="code_area" cols="" rows="6"></textarea>');
        HTML.push('<label class="label" for="code_link">'+DOPTG_EDIT_GALLERY_CODE_LINK+'</label>');
        HTML.push('<input type="text" class="column-input" name="code_link" id="code_link" value="'+DOPTG_URL+'doptg/?gallery_id='+$jDOPTG('#gallery_id').val()+'" />');
        
        $jDOPTG('.column-header', '.column3', '.DOPTG-admin').html(HeaderHTML.join(''));
        $jDOPTG('.column-content', '.column3', '.DOPTG-admin').html(HTML.join(''));
        doptgResize();
    }
}

function doptgGenerateGalleryCode(){
    var CODE = new Array(),
    htmlCODE = new Array();
    
    if ($jDOPTG('#jquery_file').prop('checked')){
        CODE.push('<script type="text/JavaScript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>\n');
    }
    if ($jDOPTG('#mouse_wheel_file').prop('checked')){
        CODE.push('<script type="text/JavaScript" src="'+DOPTG_URL+'doptg/libraries/js/jquery.mousewheel.js"></script>\n');
    }
    if ($jDOPTG('#scroll_pane_file').prop('checked')){
        CODE.push('<link rel="stylesheet" type="text/css" href="'+DOPTG_URL+'doptg/libraries/gui/css/jquery.jscrollpane.css" />\n');
        CODE.push('<script type="text/JavaScript" src="'+DOPTG_URL+'doptg/libraries/js/jquery.jscrollpane.min.js"></script>\n');
    }    
    if ($jDOPTG('#gallery_file').prop('checked')){    
        CODE.push('<link rel="stylesheet" type="text/css" href="'+DOPTG_URL+'doptg/assets/gui/css/jquery.dop.ThumbnailGallery.css" />\n');
        CODE.push('<script type="text/JavaScript" src="'+DOPTG_URL+'doptg/assets/js/jquery.dop.ThumbnailGallery.js"></script>\n');
    }
    
    if ($jDOPTG('#gallery_embed').prop('checked')){  
        $jDOPTG.getJSON(doptgACAOBuster(DOPTG_URL+'doptg/data/settings'+$jDOPTG('#gallery_id').val()+'.json'), {}, function(data){
            htmlCODE.push('    <ul class="Settings" style="display:none;">\n');
            htmlCODE.push('        <li class="Height">'+(data['Height'] || '100%')+'</li>\n');
            htmlCODE.push('        <li class="BgColor">'+(data['BgColor'] || 'f1f1f1')+'</li>\n');
            htmlCODE.push('        <li class="BgAlpha">'+(parseInt(data['BgAlpha']))+'</li>\n');
            htmlCODE.push('        <li class="ImagesOrder">'+(data['ImagesOrder'] || 'normal')+'</li>\n');
            htmlCODE.push('        <li class="ResponsiveEnabled">'+(data['ResponsiveEnabled'] || 'true')+'</li>\n');

            htmlCODE.push('        <li class="ThumbnailsPosition">'+(data['ThumbnailsPosition'] || 'bottom')+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailsOverImage">'+(data['ThumbnailsOverImage'] || 'false')+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailsBgColor">'+(data['ThumbnailsBgColor'] || 'f1f1f1')+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailsBgAlpha">'+(parseInt(data['ThumbnailsBgAlpha']))+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailsSpacing">'+(parseInt(data['ThumbnailsSpacing']))+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailsPaddingTop">'+(parseInt(data['ThumbnailsPaddingTop']))+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailsPaddingRight">'+(parseInt(data['ThumbnailsPaddingRight']))+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailsPaddingBottom">'+(parseInt(data['ThumbnailsPaddingBottom']))+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailsPaddingLeft">'+(parseInt(data['ThumbnailsPaddingLeft']))+'</li>\n');

            htmlCODE.push('        <li class="ThumbnailsNavigation">'+(data['ThumbnailsNavigation'] || 'mouse')+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailsNavigationPrev">'+(DOPTG_URL+data['ThumbnailsNavigationPrev'] || DOPTG_URL+'doptg/assets/gui/images/ThumbnailsPrev.png')+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailsNavigationPrevHover">'+(DOPTG_URL+data['ThumbnailsNavigationPrevHover'] || DOPTG_URL+'doptg/assets/gui/images/ThumbnailsPrevHover.png')+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailsNavigationNext">'+(DOPTG_URL+data['ThumbnailsNavigationNext'] || DOPTG_URL+'doptg/assets/gui/images/ThumbnailsNext.png')+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailsNavigationNextHover">'+(DOPTG_URL+data['ThumbnailsNavigationNextHover'] || DOPTG_URL+'doptg/assets/gui/images/ThumbnailsNextHover.png')+'</li>\n');

            htmlCODE.push('        <li class="ThumbnailLoader">'+(DOPTG_URL+data['ThumbnailLoader'] || DOPTG_URL+'doptg/assets/gui/images/ThumbnailLoader.gif')+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailWidth">'+(parseInt(data['ThumbnailWidth']))+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailHeight">'+(parseInt(data['ThumbnailHeight']))+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailWidthMobile">'+(parseInt(data['ThumbnailWidthMobile']))+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailHeightMobile">'+(parseInt(data['ThumbnailHeightMobile']))+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailAlpha">'+(parseInt(data['ThumbnailAlpha']))+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailAlphaHover">'+(parseInt(data['ThumbnailAlphaHover']))+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailAlphaSelected">'+(parseInt(data['ThumbnailAlphaSelected']))+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailBgColor">'+(data['ThumbnailBgColor'] || 'f1f1f1')+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailBgColorHover">'+(data['ThumbnailBgColorHover'] || '000000')+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailBgColorSelected">'+(data['ThumbnailBgColorSelected'] || '000000')+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailBorderSize">'+(parseInt(data['ThumbnailBorderSize']))+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailBorderColor">'+(data['ThumbnailBorderColor'] || 'f1f1f1')+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailBorderColorHover">'+(data['ThumbnailBorderColorHover'] || '000000')+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailBorderColorSelected">'+(data['ThumbnailBorderColorSelected'] || '000000')+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailPaddingTop">'+(parseInt(data['ThumbnailPaddingTop']))+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailPaddingRight">'+(parseInt(data['ThumbnailPaddingRight']))+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailPaddingBottom">'+(parseInt(data['ThumbnailPaddingBottom']))+'</li>\n');
            htmlCODE.push('        <li class="ThumbnailPaddingLeft">'+(parseInt(data['ThumbnailPaddingLeft']))+'</li>\n');

            htmlCODE.push('        <li class="ImageLoader">'+(DOPTG_URL+data['ImageLoader'] || DOPTG_URL+'doptg/assets/gui/images/ImageLoader.gif')+'</li>\n');
            htmlCODE.push('        <li class="ImageBgColor">'+(data['ImageBgColor'] || 'afafaf')+'</li>\n');
            htmlCODE.push('        <li class="ImageBgAlpha">'+(parseInt(data['ImageBgAlpha']))+'</li>\n');
            htmlCODE.push('        <li class="ImageDisplayType">'+(data['ImageDisplayType'] || 'fit')+'</li>\n');
            htmlCODE.push('        <li class="ImageDisplayTime">'+(parseInt(data['ImageDisplayTime']))+'</li>\n');
            htmlCODE.push('        <li class="ImageMarginTop">'+(parseInt(data['ImageMarginTop']))+'</li>\n');
            htmlCODE.push('        <li class="ImageMarginRight">'+(parseInt(data['ImageMarginRight']))+'</li>\n');
            htmlCODE.push('        <li class="ImageMarginBottom">'+(parseInt(data['ImageMarginBottom']))+'</li>\n');
            htmlCODE.push('        <li class="ImageMarginLeft">'+(parseInt(data['ImageMarginLeft']))+'</li>\n');
            htmlCODE.push('        <li class="ImagePaddingTop">'+(parseInt(data['ImagePaddingTop']))+'</li>\n');
            htmlCODE.push('        <li class="ImagePaddingRight">'+(parseInt(data['ImagePaddingRight']))+'</li>\n');
            htmlCODE.push('        <li class="ImagePaddingBottom">'+(parseInt(data['ImagePaddingBottom']))+'</li>\n');
            htmlCODE.push('        <li class="ImagePaddingLeft">'+(parseInt(data['ImagePaddingLeft']))+'</li>\n');

            htmlCODE.push('        <li class="NavigationEnabled">'+(data['NavigationEnabled'] || 'true')+'</li>\n');
            htmlCODE.push('        <li class="NavigationOverImage">'+(data['NavigationOverImage'] || 'true')+'</li>\n');
            htmlCODE.push('        <li class="NavigationPrev">'+(DOPTG_URL+data['NavigationPrev'] || DOPTG_URL+'doptg/assets/gui/images/Prev.png')+'</li>\n');
            htmlCODE.push('        <li class="NavigationPrevHover">'+(DOPTG_URL+data['NavigationPrevHover'] || DOPTG_URL+'doptg/assets/gui/images/PrevHover.png')+'</li>\n');
            htmlCODE.push('        <li class="NavigationNext">'+(DOPTG_URL+data['NavigationNext'] || DOPTG_URL+'doptg/assets/gui/images/Next.png')+'</li>\n');
            htmlCODE.push('        <li class="NavigationNextHover">'+(DOPTG_URL+data['NavigationNextHover'] || DOPTG_URL+'doptg/assets/gui/images/NextHover.png')+'</li>\n');
            htmlCODE.push('        <li class="NavigationLightbox">'+(DOPTG_URL+data['NavigationLightbox'] || DOPTG_URL+'doptg/assets/gui/images/Lightbox.png')+'</li>\n');
            htmlCODE.push('        <li class="NavigationLightboxHover">'+(DOPTG_URL+data['NavigationLightboxHover'] || DOPTG_URL+'doptg/assets/gui/images/LightboxHover.png')+'</li>\n');
            htmlCODE.push('        <li class="NavigationTouchDeviceSwipeEnabled">'+(data['NavigationTouchDeviceSwipeEnabled'] || 'true')+'</li>\n');

            htmlCODE.push('        <li class="CaptionWidth">'+(parseInt(data['CaptionWidth']))+'</li>\n');
            htmlCODE.push('        <li class="CaptionHeight">'+(parseInt(data['CaptionHeight']))+'</li>\n');
            htmlCODE.push('        <li class="CaptionTitleColor">'+(data['CaptionTitleColor'] || '000000')+'</li>\n');
            htmlCODE.push('        <li class="CaptionTextColor">'+(data['CaptionTextColor'] || '000000')+'</li>\n');
            htmlCODE.push('        <li class="CaptionBgColor">'+(data['CaptionBgColor'] || 'ffffff')+'</li>\n');
            htmlCODE.push('        <li class="CaptionBgAlpha">'+(parseInt(data['CaptionBgAlpha']))+'</li>\n');
            htmlCODE.push('        <li class="CaptionPosition">'+(data['CaptionPosition'] || 'bottom')+'</li>\n');
            htmlCODE.push('        <li class="CaptionOverImage">'+(data['CaptionOverImage'] || 'true')+'</li>\n');
            htmlCODE.push('        <li class="CaptionScrollScrubColor">'+(data['CaptionScrollScrubColor'] || '777777')+'</li>\n');
            htmlCODE.push('        <li class="CaptionScrollBgColor">'+(data['CaptionScrollBgColor'] || 'e0e0e0')+'</li>\n');
            htmlCODE.push('        <li class="CaptionMarginTop">'+(parseInt(data['CaptionMarginTop']))+'</li>\n');
            htmlCODE.push('        <li class="CaptionMarginRight">'+(parseInt(data['CaptionMarginRight']))+'</li>\n');
            htmlCODE.push('        <li class="CaptionMarginBottom">'+(parseInt(data['CaptionMarginBottom']))+'</li>\n');
            htmlCODE.push('        <li class="CaptionMarginLeft">'+(parseInt(data['CaptionMarginLeft']))+'</li>\n');
            htmlCODE.push('        <li class="CaptionPaddingTop">'+(parseInt(data['CaptionPaddingTop']))+'</li>\n');
            htmlCODE.push('        <li class="CaptionPaddingRight">'+(parseInt(data['CaptionPaddingRight']))+'</li>\n');
            htmlCODE.push('        <li class="CaptionPaddingBottom">'+(parseInt(data['CaptionPaddingBottom']))+'</li>\n');
            htmlCODE.push('        <li class="CaptionPaddingLeft">'+(parseInt(data['CaptionPaddingLeft']))+'</li>\n');

            htmlCODE.push('        <li class="LightboxEnabled">'+(data['LightboxEnabled'] || 'true')+'</li>\n');
            htmlCODE.push('        <li class="LightboxWindowColor">'+(data['LightboxWindowColor'] || '000000')+'</li>\n');
            htmlCODE.push('        <li class="LightboxWindowAlpha">'+(parseInt(data['LightboxWindowAlpha']))+'</li>\n');
            htmlCODE.push('        <li class="LightboxLoader">'+(DOPTG_URL+data['LightboxLoader'] || DOPTG_URL+'doptg/assets/gui/images/LightboxLoader.gif')+'</li>\n');
            htmlCODE.push('        <li class="LightboxBgColor">'+(data['LightboxBgColor'] || '000000')+'</li>\n');
            htmlCODE.push('        <li class="LightboxBgAlpha">'+(parseInt(data['LightboxBgAlpha']))+'</li>\n');
            htmlCODE.push('        <li class="LightboxMarginTop">'+(parseInt(data['LightboxMarginTop']))+'</li>\n');
            htmlCODE.push('        <li class="LightboxMarginRight">'+(parseInt(data['LightboxMarginRight']))+'</li>\n');
            htmlCODE.push('        <li class="LightboxMarginBottom">'+(parseInt(data['LightboxMarginBottom']))+'</li>\n');
            htmlCODE.push('        <li class="LightboxMarginLeft">'+(parseInt(data['LightboxMarginLeft']))+'</li>\n');
            htmlCODE.push('        <li class="LightboxPaddingTop">'+(parseInt(data['LightboxPaddingTop']))+'</li>\n');
            htmlCODE.push('        <li class="LightboxPaddingRight">'+(parseInt(data['LightboxPaddingRight']))+'</li>\n');
            htmlCODE.push('        <li class="LightboxPaddingBottom">'+(parseInt(data['LightboxPaddingBottom']))+'</li>\n');
            htmlCODE.push('        <li class="LightboxPaddingLeft">'+(parseInt(data['LightboxPaddingLeft']))+'</li>\n');

            htmlCODE.push('        <li class="LightboxNavigationPrev">'+(DOPTG_URL+data['LightboxNavigationPrev'] || DOPTG_URL+'doptg/assets/gui/images/LightboxPrev.png')+'</li>\n');
            htmlCODE.push('        <li class="LightboxNavigationPrevHover">'+(DOPTG_URL+data['LightboxNavigationPrevHover'] || DOPTG_URL+'doptg/assets/gui/images/LightboxPrevHover.png')+'</li>\n');
            htmlCODE.push('        <li class="LightboxNavigationNext">'+(DOPTG_URL+data['LightboxNavigationNext'] || DOPTG_URL+'doptg/assets/gui/images/LightboxNext.png')+'</li>\n');
            htmlCODE.push('        <li class="LightboxNavigationNextHover">'+(DOPTG_URL+data['LightboxNavigationNextHover'] || DOPTG_URL+'doptg/assets/gui/images/LightboxNextHover.png')+'</li>\n');
            htmlCODE.push('        <li class="LightboxNavigationClose">'+(DOPTG_URL+data['LightboxNavigationClose'] || DOPTG_URL+'doptg/assets/gui/images/LightboxClose.png')+'</li>\n');
            htmlCODE.push('        <li class="LightboxNavigationCloseHover">'+(DOPTG_URL+data['LightboxNavigationCloseHover'] || DOPTG_URL+'doptg/assets/gui/images/LightboxCloseHover.png')+'</li>\n');
            htmlCODE.push('        <li class="LightboxNavigationInfoBgColor">'+(data['LightboxNavigationInfoBgColor'] || '000000')+'</li>\n');
            htmlCODE.push('        <li class="LightboxNavigationInfoTextColor">'+(data['LightboxNavigationInfoTextColor'] || 'dddddd')+'</li>\n');
            htmlCODE.push('        <li class="LightboxNavigationTouchDeviceSwipeEnabled">'+(data['LightboxNavigationTouchDeviceSwipeEnabled'] || 'true')+'</li>\n');

            htmlCODE.push('        <li class="SocialShareEnabled">'+(data['SocialShareEnabled'] || 'true')+'</li>\n');
            htmlCODE.push('        <li class="SocialShare">'+(DOPTG_URL+data['SocialShare'] || DOPTG_URL+'doptg/assets/gui/images/SocialShare.png')+'</li>\n');
            htmlCODE.push('        <li class="SocialShareLightbox">'+(DOPTG_URL+data['SocialShareLightbox'] || DOPTG_URL+'doptg/assets/gui/images/SocialShareLightbox.png')+'</li>\n');

            htmlCODE.push('        <li class="TooltipEnabled">'+(data['TooltipEnabled'] || 'false')+'</li>\n');
            htmlCODE.push('        <li class="TooltipBgColor">'+(data['TooltipBgColor'] || 'ffffff')+'</li>\n');
            htmlCODE.push('        <li class="TooltipStrokeColor">'+(data['TooltipStrokeColor'] || '000000')+'</li>\n');
            htmlCODE.push('        <li class="TooltipTextColor">'+(data['TooltipTextColor'] || '000000')+'</li>\n');

            htmlCODE.push('        <li class="Slideshow">'+(data['Slideshow'] || 'false')+'</li>\n');
            htmlCODE.push('        <li class="SlideshowTime">'+(parseInt(data['SlideshowTime']))+'</li>\n');
            htmlCODE.push('        <li class="SlideshowAutostart">'+(data['SlideshowAutostart'] || 'true')+'</li>\n');
            htmlCODE.push('        <li class="SlideshowLoop">'+(data['SlideshowLoop'] || 'true')+'</li>\n');
            htmlCODE.push('        <li class="SlideshowPlay">'+(DOPTG_URL+data['SlideshowPlay'] || DOPTG_URL+'doptg/assets/gui/images/Play.png')+'</li>\n');
            htmlCODE.push('        <li class="SlideshowPlayHover">'+(DOPTG_URL+data['SlideshowPlayHover'] || URL+'doptg/assets/gui/images/PlayHover.png')+'</li>\n');
            htmlCODE.push('        <li class="SlideshowPause">'+(DOPTG_URL+data['SlideshowPause'] || DOPTG_URL+'doptg/assets/gui/images/Pause.png')+'</li>\n');
            htmlCODE.push('        <li class="SlideshowPauseHover">'+(DOPTG_URL+data['SlideshowPauseHover'] || DOPTG_URL+'doptg/assets/gui/images/PauseHover.png')+'</li>\n');

            htmlCODE.push('        <li class="AutoHide">'+(data['AutoHide'] || 'false')+'</li>\n');
            htmlCODE.push('        <li class="AutoHideTime">'+(parseInt(data['AutoHideTime']))+'</li>\n');            
            htmlCODE.push('    </ul>\n');   
            
            $jDOPTG.getJSON(doptgACAOBuster(DOPTG_URL+'doptg/data/content'+$jDOPTG('#gallery_id').val()+'.json'), {}, function(data){
                htmlCODE.push('    <ul class="Content" style="display:none;">\n');
                
                $jDOPTG.each(data, function(index){
                    if (data[index]['Enabled'] == 'true'){
                        htmlCODE.push('        <li>\n');
                        htmlCODE.push('            <span class="Image">'+(DOPTG_URL+data[index]['Image'])+'</span>\n');
                        htmlCODE.push('            <span class="Thumb">'+(DOPTG_URL+data[index]['Thumb'])+'</span>\n');
                        htmlCODE.push('            <span class="CaptionTitle">'+(doptgStripslashes(data[index]['CaptionTitle']))+'</span>\n');
                        htmlCODE.push('            <span class="CaptionText">'+(doptgStripslashes(data[index]['CaptionText']))+'</span>\n');
                        htmlCODE.push('            <span class="Media">'+(doptgStripslashes(data[index]['Media']))+'</span>\n');
                        htmlCODE.push('            <span class="LightboxMedia">'+(doptgStripslashes(data[index]['LightboxMedia']))+'</span>\n');
                        htmlCODE.push('        </li>\n');                                 
                    }
                });
                htmlCODE.push('    </ul>\n');
                
                CODE.push('<script type="text/JavaScript">\n');
                CODE.push('    $(document).ready(function(){\n');

                if ($jDOPTG('#gallery_fullscreen').prop('checked')){    
                    CODE.push('         $(\'#DOPThumbnailGalleryContainer'+$jDOPTG('#gallery_id').val()+'\').width($(window).width());\n');
                    CODE.push('         $(\'#DOPThumbnailGalleryContainer'+$jDOPTG('#gallery_id').val()+'\').height($(window).height());\n');
                    CODE.push('         $(window).resize(function(){\n');
                    CODE.push('              $(\'#DOPThumbnailGalleryContainer'+$jDOPTG('#gallery_id').val()+'\').width($(window).width());\n');
                    CODE.push('              $(\'#DOPThumbnailGalleryContainer'+$jDOPTG('#gallery_id').val()+'\').height($(window).height());\n');
                    CODE.push('         });\n');
                }
                CODE.push('        $(\'#DOPThumbnailGalleryContainer'+$jDOPTG('#gallery_id').val()+'\').DOPThumbnailGallery({\'DataType\': \'HTML\'});\n');
                CODE.push('    });\n');
                CODE.push('</script>\n');
                CODE.push('<div id="DOPThumbnailGalleryContainer'+$jDOPTG('#gallery_id').val()+'">');
                CODE.push(htmlCODE.join(''));
                CODE.push('</div>');

                $jDOPTG('#code_area').val(CODE.join(''));
            });
        });
    }
    else{
        CODE.push('<script type="text/JavaScript">\n');
        CODE.push('    $(document).ready(function(){\n');

        if ($jDOPTG('#gallery_fullscreen').prop('checked')){    
            CODE.push('         $(\'#DOPThumbnailGalleryContainer'+$jDOPTG('#gallery_id').val()+'\').width($(window).width());\n');
            CODE.push('         $(\'#DOPThumbnailGalleryContainer'+$jDOPTG('#gallery_id').val()+'\').height($(window).height());\n');
            CODE.push('         $(window).resize(function(){\n');
            CODE.push('              $(\'#DOPThumbnailGalleryContainer'+$jDOPTG('#gallery_id').val()+'\').width($(window).width());\n');
            CODE.push('              $(\'#DOPThumbnailGalleryContainer'+$jDOPTG('#gallery_id').val()+'\').height($(window).height());\n');
            CODE.push('         });\n');
        }
        CODE.push('        $(\'#DOPThumbnailGalleryContainer'+$jDOPTG('#gallery_id').val()+'\').DOPThumbnailGallery({\'URL\': \''+DOPTG_URL+'\', \'SettingsFilePath\': \''+DOPTG_URL+'doptg/data/settings'+$jDOPTG('#gallery_id').val()+'.json\', \'ContentFilePath\': \''+DOPTG_URL+'doptg/data/content'+$jDOPTG('#gallery_id').val()+'.json\'});\n');
        CODE.push('    });\n');
        CODE.push('</script>\n');
        CODE.push('<div id="DOPThumbnailGalleryContainer'+$jDOPTG('#gallery_id').val()+'"></div>');
        
        $jDOPTG('#code_area').val(CODE.join(''));
    }
}

function doptgSettingsForm(data, column){// Settings Form.
    var HTML = new Array();

    HTML.push('<form method="post" class="settings" action="" onsubmit="return false;">');

// General Styles & Settings
    HTML.push('    <h3 class="settings">'+DOPTG_GENERAL_STYLES_SETTINGS+'</h3>');
    if ($jDOPTG('#gallery_id').val() != '0'){
        HTML.push(doptgSettingsFormInput('name', data['Name'], DOPTG_GALLERY_NAME, '', '', '', 'help', DOPTG_GALLERY_NAME_INFO));
    }
    HTML.push(doptgSettingsFormInput('width', data['Width'], DOPTG_WIDTH, '', 'px', 'small', 'help-small', DOPTG_WIDTH_INFO));
    HTML.push(doptgSettingsFormInput('height', data['Height'], DOPTG_HEIGHT, '', 'px', 'small', 'help-small', DOPTG_HEIGHT_INFO));
    HTML.push(doptgSettingsFormInput('bg_color', data['BgColor'], DOPTG_BG_COLOR, '#', '', 'small', 'help-small', DOPTG_BG_COLOR_INFO));
    HTML.push(doptgSettingsFormInput('bg_alpha', data['BgAlpha'], DOPTG_BG_ALPHA, '', '', 'small', 'help-small', DOPTG_BG_ALPHA_INFO));
    HTML.push(doptgSettingsFormSelect('images_order', data['ImagesOrder'], DOPTG_IMAGES_ORDER, '', '', '', 'help', DOPTG_IMAGES_ORDER_INFO, 'normal;;random'));
    HTML.push(doptgSettingsFormSelect('responsive_enabled', data['ResponsiveEnabled'], DOPTG_RESPONSIVE_ENABLED, '', '', '', 'help', DOPTG_RESPONSIVE_ENABLED_INFO, 'true;;false'));
       
// Thumbnails Styles & Settings
    HTML.push('    <a href="javascript:doptgMoveTop()" class="go-top">'+DOPTG_GO_TOP+'</a><h3 class="settings">'+DOPTG_THUMBNAILS_STYLES_SETTINGS+'</h3>');
    HTML.push(doptgSettingsFormSelect('thumbnails_position', data['ThumbnailsPosition'], DOPTG_THUMBNAILS_POSITION, '', '', '', 'help', DOPTG_THUMBNAILS_POSITION_INFO, 'top;;right;;bottom;;left'));
    HTML.push(doptgSettingsFormSelect('thumbnails_over_image', data['ThumbnailsOverImage'], DOPTG_THUMBNAILS_OVER_IMAGE, '', '', '', 'help', DOPTG_THUMBNAILS_OVER_IMAGE_INFO, 'true;;false'));
    HTML.push(doptgSettingsFormInput('thumbnails_bg_color', data['ThumbnailsBgColor'], DOPTG_THUMBNAILS_BG_COLOR, '#', '', 'small', 'help-small', DOPTG_THUMBNAILS_BG_COLOR_INFO));
    HTML.push(doptgSettingsFormInput('thumbnails_bg_alpha', data['ThumbnailsBgAlpha'], DOPTG_THUMBNAILS_BG_ALPHA, '', '', 'small', 'help-small', DOPTG_THUMBNAILS_BG_ALPHA_INFO));
    HTML.push(doptgSettingsFormInput('thumbnails_spacing', data['ThumbnailsSpacing'], DOPTG_THUMBNAILS_SPACING, '', 'px', 'small', 'help-small', DOPTG_THUMBNAILS_SPACING_INFO));
    HTML.push(doptgSettingsFormInput('thumbnails_padding_top', data['ThumbnailsPaddingTop'], DOPTG_THUMBNAILS_PADDING_TOP, '', 'px', 'small', 'help-small', DOPTG_THUMBNAILS_PADDING_TOP_INFO));
    HTML.push(doptgSettingsFormInput('thumbnails_padding_right', data['ThumbnailsPaddingRight'], DOPTG_THUMBNAILS_PADDING_RIGHT, '', 'px', 'small', 'help-small', DOPTG_THUMBNAILS_PADDING_RIGHT_INFO));
    HTML.push(doptgSettingsFormInput('thumbnails_padding_bottom', data['ThumbnailsPaddingBottom'], DOPTG_THUMBNAILS_PADDING_BOTTOM, '', 'px', 'small', 'help-small', DOPTG_THUMBNAILS_PADDING_BOTTOM_INFO));
    HTML.push(doptgSettingsFormInput('thumbnails_padding_left', data['ThumbnailsPaddingLeft'], DOPTG_THUMBNAILS_PADDING_LEFT, '', 'px', 'small', 'help-small', DOPTG_THUMBNAILS_PADDING_LEFT_INFO));

// Thumbnails Navigation Styles & Settings
    HTML.push('    <a href="javascript:doptgMoveTop()" class="go-top">'+DOPTG_GO_TOP+'</a><h3 class="settings">'+DOPTG_THUMBNAILS_NAVIGATION_STYLES_SETTINGS+'</h3>');
    HTML.push(doptgSettingsFormSelect('thumbnails_navigation', data['ThumbnailsNavigation'], DOPTG_THUMBNAILS_NAVIGATION, '', '', '', 'help', DOPTG_THUMBNAILS_NAVIGATION_INFO, 'mouse;;arrows'));
    HTML.push(doptgSettingsFormImage('thumbnails_navigation_prev', data['ThumbnailsNavigationPrev'], DOPTG_THUMBNAILS_NAVIGATION_PREV, 'help-image', DOPTG_THUMBNAILS_NAVIGATION_PREV_INFO));
    HTML.push(doptgSettingsFormImage('thumbnails_navigation_prev_hover', data['ThumbnailsNavigationPrevHover'], DOPTG_THUMBNAILS_NAVIGATION_PREV_HOVER, 'help-image', DOPTG_THUMBNAILS_NAVIGATION_PREV_HOVER_INFO));
    HTML.push(doptgSettingsFormImage('thumbnails_navigation_next', data['ThumbnailsNavigationNext'], DOPTG_THUMBNAILS_NAVIGATION_NEXT, 'help-image', DOPTG_THUMBNAILS_NAVIGATION_NEXT_INFO));
    HTML.push(doptgSettingsFormImage('thumbnails_navigation_next_hover', data['ThumbnailsNavigationNextHover'], DOPTG_THUMBNAILS_NAVIGATION_NEXT_HOVER, 'help-image', DOPTG_THUMBNAILS_NAVIGATION_NEXT_HOVER_INFO));
        
// Styles & Settings for a Thumbnail
    HTML.push('    <a href="javascript:doptgMoveTop()" class="go-top">'+DOPTG_GO_TOP+'</a><h3 class="settings">'+DOPTG_THUMBNAIL_STYLES_SETTINGS+'</h3>');
    HTML.push(doptgSettingsFormImage('thumbnail_loader', data['ThumbnailLoader'], DOPTG_THUMBNAIL_LOADER, 'help-image', DOPTG_THUMBNAIL_LOADER_INFO));
    HTML.push(doptgSettingsFormInput('thumbnail_width', data['ThumbnailWidth'], DOPTG_THUMBNAIL_WIDTH, '', 'px', 'small', 'help-small', DOPTG_THUMBNAIL_WIDTH_INFO));
    HTML.push(doptgSettingsFormInput('thumbnail_height', data['ThumbnailHeight'], DOPTG_THUMBNAIL_HEIGHT, '', 'px', 'small', 'help-small', DOPTG_THUMBNAIL_HEIGHT_INFO));
    HTML.push(doptgSettingsFormInput('thumbnail_width_mobile', data['ThumbnailWidthMobile'], DOPTG_THUMBNAIL_WIDTH_MOBILE, '', 'px', 'small', 'help-small', DOPTG_THUMBNAIL_WIDTH_MOBILE_INFO));
    HTML.push(doptgSettingsFormInput('thumbnail_height_mobile', data['ThumbnailHeightMobile'], DOPTG_THUMBNAIL_HEIGHT_MOBILE, '', 'px', 'small', 'help-small', DOPTG_THUMBNAIL_HEIGHT_MOBILE_INFO));
    HTML.push(doptgSettingsFormInput('thumbnail_alpha_hover', data['ThumbnailAlphaHover'], DOPTG_THUMBNAIL_ALPHA_HOVER, '', '', 'small', 'help-small', DOPTG_THUMBNAIL_ALPHA_HOVER_INFO));
    HTML.push(doptgSettingsFormInput('thumbnail_alpha_selected', data['ThumbnailAlphaSelected'], DOPTG_THUMBNAIL_ALPHA_SELECTED, '', '', 'small', 'help-small', DOPTG_THUMBNAIL_ALPHA_SELECTED_INFO));
    HTML.push(doptgSettingsFormInput('thumbnail_bg_color', data['ThumbnailBgColor'], DOPTG_THUMBNAIL_BG_COLOR, '#', '', 'small', 'help-small', DOPTG_THUMBNAIL_BG_COLOR_INFO));
    HTML.push(doptgSettingsFormInput('thumbnail_bg_color_hover', data['ThumbnailBgColorHover'], DOPTG_THUMBNAIL_BG_COLOR_HOVER, '#', '', 'small', 'help-small', DOPTG_THUMBNAIL_BG_COLOR_HOVER_INFO));
    HTML.push(doptgSettingsFormInput('thumbnail_bg_color_selected', data['ThumbnailBgColorSelected'], DOPTG_THUMBNAIL_BG_COLOR_SELECTED, '#', '', 'small', 'help-small', DOPTG_THUMBNAIL_BG_COLOR_SELECTED_INFO));
    HTML.push(doptgSettingsFormInput('thumbnail_border_size', data['ThumbnailBorderSize'], DOPTG_THUMBNAIL_BORDER_SIZE, '', 'px', 'small', 'help-small', DOPTG_THUMBNAIL_BORDER_SIZE_INFO));
    HTML.push(doptgSettingsFormInput('thumbnail_border_color', data['ThumbnailBorderColor'], DOPTG_THUMBNAIL_BORDER_COLOR, '#', '', 'small', 'help-small', DOPTG_THUMBNAIL_BORDER_COLOR_INFO));
    HTML.push(doptgSettingsFormInput('thumbnail_border_color_hover', data['ThumbnailBorderColorHover'], DOPTG_THUMBNAIL_BORDER_COLOR_HOVER, '#', '', 'small', 'help-small', DOPTG_THUMBNAIL_BORDER_COLOR_HOVER_INFO));
    HTML.push(doptgSettingsFormInput('thumbnail_border_color_selected', data['ThumbnailBorderColorSelected'], DOPTG_THUMBNAIL_BORDER_COLOR_SELECTED, '#', '', 'small', 'help-small', DOPTG_THUMBNAIL_BORDER_COLOR_SELECTED_INFO));
    HTML.push(doptgSettingsFormInput('thumbnail_padding_top', data['ThumbnailPaddingTop'], DOPTG_THUMBNAIL_PADDING_TOP, '', 'px', 'small', 'help-small', DOPTG_THUMBNAIL_PADDING_TOP_INFO));
    HTML.push(doptgSettingsFormInput('thumbnail_padding_right', data['ThumbnailPaddingRight'], DOPTG_THUMBNAIL_PADDING_RIGHT, '', 'px', 'small', 'help-small', DOPTG_THUMBNAIL_PADDING_RIGHT_INFO));
    HTML.push(doptgSettingsFormInput('thumbnail_padding_bottom', data['ThumbnailPaddingBottom'], DOPTG_THUMBNAIL_PADDING_BOTTOM, '', 'px', 'small', 'help-small', DOPTG_THUMBNAIL_PADDING_BOTTOM_INFO));
    HTML.push(doptgSettingsFormInput('thumbnail_padding_left', data['ThumbnailPaddingLeft'], DOPTG_THUMBNAIL_PADDING_LEFT, '', 'px', 'small', 'help-small', DOPTG_THUMBNAIL_PADDING_LEFT_INFO));

// Image Styles & Settings
    HTML.push('    <a href="javascript:doptgMoveTop()" class="go-top">'+DOPTG_GO_TOP+'</a><h3 class="settings">'+DOPTG_IMAGE_STYLES_SETTINGS+'</h3>');
    HTML.push(doptgSettingsFormImage('image_loader', data['ImageLoader'], DOPTG_IMAGE_LOADER, 'help-image', DOPTG_IMAGE_LOADER_INFO));
    HTML.push(doptgSettingsFormInput('image_bg_color', data['ImageBgColor'], DOPTG_IMAGE_BG_COLOR, '#', '', 'small', 'help-small', DOPTG_IMAGE_BG_COLOR_INFO));
    HTML.push(doptgSettingsFormInput('image_bg_alpha', data['ImageBgAlpha'], DOPTG_IMAGE_BG_ALPHA, '', '', 'small', 'help-small', DOPTG_IMAGE_BG_ALPHA_INFO));
    HTML.push(doptgSettingsFormSelect('image_display_type', data['ImageDisplayType'], DOPTG_IMAGE_DISPLAY_TYPE, '', '', '', 'help', DOPTG_IMAGE_DISPLAY_TYPE_INFO, 'fit;;full'));
    HTML.push(doptgSettingsFormInput('image_display_time', data['ImageDisplayTime'], DOPTG_IMAGE_DISPLAY_TIME, '', '', 'small', 'help-small', DOPTG_IMAGE_DISPLAY_TIME_INFO));
    HTML.push(doptgSettingsFormInput('image_margin_top', data['ImageMarginTop'], DOPTG_IMAGE_MARGIN_TOP, '', 'px', 'small', 'help-small', DOPTG_IMAGE_MARGIN_TOP_INFO));
    HTML.push(doptgSettingsFormInput('image_margin_right', data['ImageMarginRight'], DOPTG_IMAGE_MARGIN_RIGHT, '', 'px', 'small', 'help-small', DOPTG_IMAGE_MARGIN_RIGHT_INFO));
    HTML.push(doptgSettingsFormInput('image_margin_bottom', data['ImageMarginBottom'], DOPTG_IMAGE_MARGIN_BOTTOM, '', 'px', 'small', 'help-small', DOPTG_IMAGE_MARGIN_BOTTOM_INFO));
    HTML.push(doptgSettingsFormInput('image_margin_left', data['ImageMarginLeft'], DOPTG_IMAGE_MARGIN_LEFT, '', 'px', 'small', 'help-small', DOPTG_IMAGE_MARGIN_LEFT_INFO));
    HTML.push(doptgSettingsFormInput('image_padding_top', data['ImagePaddingTop'], DOPTG_IMAGE_PADDING_TOP, '', 'px', 'small', 'help-small', DOPTG_IMAGE_PADDING_TOP_INFO));
    HTML.push(doptgSettingsFormInput('image_padding_right', data['ImagePaddingRight'], DOPTG_IMAGE_PADDING_RIGHT, '', 'px', 'small', 'help-small', DOPTG_IMAGE_PADDING_RIGHT_INFO));
    HTML.push(doptgSettingsFormInput('image_padding_bottom', data['ImagePaddingBottom'], DOPTG_IMAGE_PADDING_BOTTOM, '', 'px', 'small', 'help-small', DOPTG_IMAGE_PADDING_BOTTOM_INFO));
    HTML.push(doptgSettingsFormInput('image_padding_left', data['ImagePaddingLeft'], DOPTG_IMAGE_PADDING_LEFT, '', 'px', 'small', 'help-small', DOPTG_IMAGE_PADDING_LEFT_INFO));

// Navigation Styles & Settings
    HTML.push('    <a href="javascript:doptgMoveTop()" class="go-top">'+DOPTG_GO_TOP+'</a><h3 class="settings">'+DOPTG_NAVIGATION_STYLES_SETTINGS+'</h3>');
    HTML.push(doptgSettingsFormSelect('navigation_enabled', data['NavigationEnabled'], DOPTG_NAVIGATION_ENABLED, '', '', '', 'help', DOPTG_NAVIGATION_ENABLED_INFO, 'true;;false'));
    HTML.push(doptgSettingsFormSelect('navigation_over_image', data['NavigationOverImage'], DOPTG_NAVIGATION_OVER_IMAGE, '', '', '', 'help', DOPTG_NAVIGATION_OVER_IMAGE_INFO, 'true;;false'));
    HTML.push(doptgSettingsFormImage('navigation_prev', data['NavigationPrev'], DOPTG_NAVIGATION_PREV, 'help-image', DOPTG_NAVIGATION_PREV_INFO));
    HTML.push(doptgSettingsFormImage('navigation_prev_hover', data['NavigationPrevHover'], DOPTG_NAVIGATION_PREV_HOVER, 'help-image', DOPTG_NAVIGATION_PREV_HOVER_INFO));
    HTML.push(doptgSettingsFormImage('navigation_next', data['NavigationNext'], DOPTG_NAVIGATION_NEXT, 'help-image', DOPTG_NAVIGATION_NEXT_INFO));
    HTML.push(doptgSettingsFormImage('navigation_next_hover', data['NavigationNextHover'], DOPTG_NAVIGATION_NEXT_HOVER, 'help-image', DOPTG_NAVIGATION_NEXT_HOVER_INFO));
    HTML.push(doptgSettingsFormImage('navigation_lightbox', data['NavigationLightbox'], DOPTG_NAVIGATION_LIGHTBOX, 'help-image', DOPTG_NAVIGATION_LIGHTBOX_INFO));
    HTML.push(doptgSettingsFormImage('navigation_lightbox_hover', data['NavigationLightboxHover'], DOPTG_NAVIGATION_LIGHTBOX_HOVER, 'help-image', DOPTG_NAVIGATION_LIGHTBOX_HOVER_INFO));    
    HTML.push(doptgSettingsFormSelect('navigation_touch_device_swipe_enabled', data['NavigationTouchDeviceSwipeEnabled'], DOPTG_NAVIGATION_TOUCH_DEVICE_SWIPE_ENABLED, '', '', '', 'help', DOPTG_NAVIGATION_TOUCH_DEVICE_SWIPE_ENABLED_INFO, 'true;;false'));
    
// Image Caption Styles & Settings
    HTML.push('    <a href="javascript:doptgMoveTop()" class="go-top">'+DOPTG_GO_TOP+'</a><h3 class="settings">'+DOPTG_CAPTION_STYLES_SETTINGS+'</h3>');
    HTML.push(doptgSettingsFormInput('caption_width', data['CaptionWidth'], DOPTG_CAPTION_WIDTH, '', 'px', 'small', 'help-small', DOPTG_CAPTION_WIDTH_INFO));
    HTML.push(doptgSettingsFormInput('caption_height', data['CaptionHeight'], DOPTG_CAPTION_HEIGHT, '', 'px', 'small', 'help-small', DOPTG_CAPTION_HEIGHT_INFO));
    HTML.push(doptgSettingsFormInput('caption_title_color', data['CaptionTitleColor'], DOPTG_CAPTION_TITLE_COLOR, '#', '', 'small', 'help-small', DOPTG_CAPTION_TITLE_COLOR_INFO));
    HTML.push(doptgSettingsFormInput('caption_text_color', data['CaptionTextColor'], DOPTG_CAPTION_TEXT_COLOR, '#', '', 'small', 'help-small', DOPTG_CAPTION_TEXT_COLOR_INFO));
    HTML.push(doptgSettingsFormInput('caption_bg_color', data['CaptionBgColor'], DOPTG_CAPTION_BG_COLOR, '#', '', 'small', 'help-small', DOPTG_CAPTION_BG_COLOR_INFO));
    HTML.push(doptgSettingsFormInput('caption_bg_alpha', data['CaptionBgAlpha'], DOPTG_CAPTION_BG_ALPHA, '', '', 'small', 'help-small', DOPTG_CAPTION_BG_ALPHA_INFO));
    HTML.push(doptgSettingsFormSelect('caption_position', data['CaptionPosition'], DOPTG_CAPTION_POSITION, '', '', '', 'help', DOPTG_CAPTION_POSITION_INFO, 'top;;right;;bottom;;left;;top-left;;top-right;;bottom-left;;bottom-right'));
    HTML.push(doptgSettingsFormSelect('caption_over_image', data['caption_over_image'], DOPTG_CAPTION_OVER_IMAGE, '', '', '', 'help', DOPTG_CAPTION_OVER_IMAGE_INFO, 'true;;false'));
    HTML.push(doptgSettingsFormInput('caption_scroll_scrub_color', data['CaptionScrollScrubColor'], DOPTG_CAPTION_SCROLL_SCRUB_COLOR, '#', '', 'small', 'help-small', DOPTG_CAPTION_SCROLL_SCRUB_COLOR_INFO));
    HTML.push(doptgSettingsFormInput('caption_scroll_bg_color', data['CaptionScrollBgColor'], DOPTG_CAPTION_SCROLL_BG_COLOR, '#', '', 'small', 'help-small', DOPTG_CAPTION_SCROLL_BG_COLOR_INFO));
    HTML.push(doptgSettingsFormInput('caption_margin_top', data['CaptionMarginTop'], DOPTG_CAPTION_MARGIN_TOP, '', 'px', 'small', 'help-small', DOPTG_CAPTION_MARGIN_TOP_INFO));
    HTML.push(doptgSettingsFormInput('caption_margin_right', data['CaptionMarginRight'], DOPTG_CAPTION_MARGIN_RIGHT, '', 'px', 'small', 'help-small', DOPTG_CAPTION_MARGIN_RIGHT_INFO));
    HTML.push(doptgSettingsFormInput('caption_margin_bottom', data['CaptionMarginBottom'], DOPTG_CAPTION_MARGIN_BOTTOM, '', 'px', 'small', 'help-small', DOPTG_CAPTION_MARGIN_BOTTOM_INFO));
    HTML.push(doptgSettingsFormInput('caption_margin_left', data['CaptionMarginLeft'], DOPTG_CAPTION_MARGIN_LEFT, '', 'px', 'small', 'help-small', DOPTG_CAPTION_MARGIN_LEFT_INFO));
    HTML.push(doptgSettingsFormInput('caption_padding_top', data['CaptionPaddingTop'], DOPTG_CAPTION_PADDING_TOP, '', 'px', 'small', 'help-small', DOPTG_CAPTION_PADDING_TOP_INFO));
    HTML.push(doptgSettingsFormInput('caption_padding_right', data['CaptionPaddingRight'], DOPTG_CAPTION_PADDING_RIGHT, '', 'px', 'small', 'help-small', DOPTG_CAPTION_PADDING_RIGHT_INFO));
    HTML.push(doptgSettingsFormInput('caption_padding_bottom', data['CaptionPaddingBottom'], DOPTG_CAPTION_PADDING_BOTTOM, '', 'px', 'small', 'help-small', DOPTG_CAPTION_PADDING_BOTTOM_INFO));
    HTML.push(doptgSettingsFormInput('caption_padding_left', data['CaptionPaddingLeft'], DOPTG_CAPTION_PADDING_LEFT, '', 'px', 'small', 'help-small', DOPTG_CAPTION_PADDING_LEFT_INFO));

// Lightbox Styles & Settings
    HTML.push('    <a href="javascript:doptgMoveTop()" class="go-top">'+DOPTG_GO_TOP+'</a><h3 class="settings">'+DOPTG_LIGHTBOX_STYLES_SETTINGS+'</h3>');
    HTML.push(doptgSettingsFormSelect('lightbox_enabled', data['LightboxEnabled'], DOPTG_LIGHTBOX_ENABLED, '', '', '', 'help', DOPTG_LIGHTBOX_ENABLED_INFO, 'true;;false'));
    HTML.push(doptgSettingsFormInput('lightbox_window_color', data['LightboxWindowColor'], DOPTG_LIGHTBOX_WINDOW_COLOR, '#', '', 'small', 'help-small', DOPTG_LIGHTBOX_WINDOW_COLOR_INFO));
    HTML.push(doptgSettingsFormInput('lightbox_window_alpha', data['LightboxWindowAlpha'], DOPTG_LIGHTBOX_WINDOW_ALPHA, '', '', 'small', 'help-small', DOPTG_LIGHTBOX_WINDOW_ALPHA_INFO));
    HTML.push(doptgSettingsFormImage('lightbox_loader', data['LightboxLoader'], DOPTG_LIGHTBOX_LOADER, 'help-image', DOPTG_LIGHTBOX_LOADER_INFO));
    HTML.push(doptgSettingsFormInput('lightbox_bg_color', data['LightboxBgColor'], DOPTG_LIGHTBOX_BACKGROUND_COLOR, '#', '', 'small', 'help-small', DOPTG_LIGHTBOX_BACKGROUND_COLOR_INFO));
    HTML.push(doptgSettingsFormInput('lightbox_bg_alpha', data['LightboxBgAlpha'], DOPTG_LIGHTBOX_BACKGROUND_ALPHA, '', '', 'small', 'help-small', DOPTG_LIGHTBOX_BACKGROUND_ALPHA_INFO));
    HTML.push(doptgSettingsFormInput('lightbox_margin_top', data['LightboxMarginTop'], DOPTG_LIGHTBOX_MARGIN_TOP, '', 'px', 'small', 'help-small', DOPTG_LIGHTBOX_MARGIN_TOP_INFO));
    HTML.push(doptgSettingsFormInput('lightbox_margin_right', data['LightboxMarginRight'], DOPTG_LIGHTBOX_MARGIN_RIGHT, '', 'px', 'small', 'help-small', DOPTG_LIGHTBOX_MARGIN_RIGHT_INFO));
    HTML.push(doptgSettingsFormInput('lightbox_margin_bottom', data['LightboxMarginBottom'], DOPTG_LIGHTBOX_MARGIN_BOTTOM, '', 'px', 'small', 'help-small', DOPTG_LIGHTBOX_MARGIN_BOTTOM_INFO));
    HTML.push(doptgSettingsFormInput('lightbox_margin_left', data['LightboxMarginLeft'], DOPTG_LIGHTBOX_MARGIN_LEFT, '', 'px', 'small', 'help-small', DOPTG_LIGHTBOX_MARGIN_LEFT_INFO));
    HTML.push(doptgSettingsFormInput('lightbox_padding_top', data['LightboxPaddingTop'], DOPTG_LIGHTBOX_PADDING_TOP, '', 'px', 'small', 'help-small', DOPTG_LIGHTBOX_PADDING_TOP_INFO));
    HTML.push(doptgSettingsFormInput('lightbox_padding_right', data['LightboxPaddingRight'], DOPTG_LIGHTBOX_PADDING_RIGHT, '', 'px', 'small', 'help-small', DOPTG_LIGHTBOX_PADDING_RIGHT_INFO));
    HTML.push(doptgSettingsFormInput('lightbox_padding_bottom', data['LightboxPaddingBottom'], DOPTG_LIGHTBOX_PADDING_BOTTOM, '', 'px', 'small', 'help-small', DOPTG_LIGHTBOX_PADDING_BOTTOM_INFO));
    HTML.push(doptgSettingsFormInput('lightbox_padding_left', data['LightboxPaddingLeft'], DOPTG_LIGHTBOX_PADDING_LEFT, '', 'px', 'small', 'help-small', DOPTG_LIGHTBOX_PADDING_LEFT_INFO));
    
// Lightbox Navigation Styles & Settings
    HTML.push('    <a href="javascript:doptgMoveTop()" class="go-top">'+DOPTG_GO_TOP+'</a><h3 class="settings">'+DOPTG_LIGHTBOX_NAVIGATION_STYLES_SETTINGS+'</h3>');
    HTML.push(doptgSettingsFormImage('lightbox_navigation_prev', data['LightboxNavigationPrev'], DOPTG_LIGHTBOX_NAVIGATION_PREV, 'help-image', DOPTG_LIGHTBOX_NAVIGATION_PREV_INFO));
    HTML.push(doptgSettingsFormImage('lightbox_navigation_prev_hover', data['LightboxNavigationPrevHover'], DOPTG_LIGHTBOX_NAVIGATION_PREV_HOVER, 'help-image', DOPTG_LIGHTBOX_NAVIGATION_PREV_HOVER_INFO));
    HTML.push(doptgSettingsFormImage('lightbox_navigation_next', data['LightboxNavigationNext'], DOPTG_LIGHTBOX_NAVIGATION_NEXT, 'help-image', DOPTG_LIGHTBOX_NAVIGATION_NEXT_INFO));
    HTML.push(doptgSettingsFormImage('lightbox_navigation_next_hover', data['LightboxNavigationNextHover'], DOPTG_LIGHTBOX_NAVIGATION_NEXT_HOVER, 'help-image', DOPTG_LIGHTBOX_NAVIGATION_NEXT_HOVER_INFO));
    HTML.push(doptgSettingsFormImage('lightbox_navigation_close', data['LightboxNavigationClose'], DOPTG_LIGHTBOX_NAVIGATION_CLOSE, 'help-image', DOPTG_LIGHTBOX_NAVIGATION_CLOSE_INFO));
    HTML.push(doptgSettingsFormImage('lightbox_navigation_close_hover', data['LightboxNavigationCloseHover'], DOPTG_LIGHTBOX_NAVIGATION_CLOSE_HOVER, 'help-image', DOPTG_LIGHTBOX_NAVIGATION_CLOSE_HOVER_INFO));    
    HTML.push(doptgSettingsFormInput('lightbox_navigation_info_bg_color', data['LightboxNavigationInfoBgColor'], DOPTG_LIGHTBOX_NAVIGATION_INFO_BG_COLOR, '#', '', 'small', 'help-small', DOPTG_LIGHTBOX_NAVIGATION_INFO_BG_COLOR_INFO));
    HTML.push(doptgSettingsFormInput('lightbox_navigation_info_text_color', data['LightboxNavigationInfoTextColor'], DOPTG_LIGHTBOX_NAVIGATION_INFO_TEXT_COLOR, '#', '', 'small', 'help-small', DOPTG_LIGHTBOX_NAVIGATION_INFO_TEXT_COLOR_INFO));
    HTML.push(doptgSettingsFormSelect('lightbox_navigation_touch_device_swipe_enabled', data['LightboxNavigationTouchDeviceSwipeEnabled'], DOPTG_LIGHTBOX_NAVIGATION_TOUCH_DEVICE_SWIPE_ENABLED, '', '', '', 'help', DOPTG_LIGHTBOX_NAVIGATION_TOUCH_DEVICE_SWIPE_ENABLED_INFO, 'true;;false'));
    
// Social Share Styles & Settings 
    HTML.push('    <a href="javascript:doptgMoveTop()" class="go-top">'+DOPTG_GO_TOP+'</a><h3 class="settings">'+DOPTG_SOCIAL_SHARE_STYLES_SETTINGS+'</h3>');
    HTML.push(doptgSettingsFormSelect('social_share_enabled', data['SocialShareEnabled'], DOPTG_SOCIAL_SHARE_ENABLED, '', '', '', 'help', DOPTG_SOCIAL_SHARE_ENABLED_INFO, 'true;;false'));
    HTML.push(doptgSettingsFormImage('social_share', data['SocialShare'], DOPTG_SOCIAL_SHARE, 'help-image', DOPTG_SOCIAL_SHARE_INFO));
    HTML.push(doptgSettingsFormImage('social_share_lightbox', data['SocialShareLightbox'], DOPTG_SOCIAL_SHARE_LIGHTBOX, 'help-image', DOPTG_SOCIAL_SHARE_LIGHTBOX_INFO)); 
    
// Tooltip Styles & Settings
    HTML.push('    <a href="javascript:doptgMoveTop()" class="go-top">'+DOPTG_GO_TOP+'</a><h3 class="settings">'+DOPTG_TOOLTIP_STYLES_SETTINGS+'</h3>');
    HTML.push(doptgSettingsFormSelect('tooltip_enabled', data['TooltipEnabled'], DOPTG_TOOLTIP_ENABLED, '', '', '', 'help', DOPTG_TOOLTIP_ENABLED_INFO, 'true;;false'));
    HTML.push(doptgSettingsFormInput('tooltip_bg_color', data['TooltipBgColor'], DOPTG_TOOLTIP_BG_COLOR, '#', '', 'small', 'help-small', DOPTG_TOOLTIP_BG_COLOR_INFO));
    HTML.push(doptgSettingsFormInput('tooltip_stroke_color', data['TooltipStrokeColor'], DOPTG_TOOLTIP_STROKE_COLOR, '#', '', 'small', 'help-small', DOPTG_TOOLTIP_STROKE_COLOR_INFO));
    HTML.push(doptgSettingsFormInput('tooltip_text_color', data['TooltipTextColor'], DOPTG_TOOLTIP_TEXT_COLOR, '#', '', 'small', 'help-small', DOPTG_TOOLTIP_TEXT_COLOR_INFO));

// Slideshow Settings
    HTML.push('    <a href="javascript:doptgMoveTop()" class="go-top">'+DOPTG_GO_TOP+'</a><h3 class="settings">'+DOPTG_SLIDESHOW_SETTINGS+'</h3>');
    HTML.push(doptgSettingsFormSelect('slideshow', data['Slideshow'], DOPTG_SLIDESHOW, '', '', '', 'help', DOPTG_SLIDESHOW_INFO, 'true;;false'));
    HTML.push(doptgSettingsFormInput('slideshow_time', data['SlideshowTime'], DOPTG_SLIDESHOW_TIME, '', '', 'small', 'help-small', DOPTG_SLIDESHOW_TIME_INFO));
    HTML.push(doptgSettingsFormSelect('slideshow_autostart', data['SlideshowAutostart'], DOPTG_SLIDESHOW_AUTOSTART, '', '', '', 'help', DOPTG_SLIDESHOW_AUTOSTART_INFO, 'true;;false'));
    HTML.push(doptgSettingsFormSelect('slideshow_loop', data['SlideshowLoop'], DOPTG_SLIDESHOW_LOOP, '', '', '', 'help', DOPTG_SLIDESHOW_LOOP_INFO, 'true;;false'));
    HTML.push(doptgSettingsFormImage('slideshow_play', data['SlideshowPlay'], DOPTG_SLIDESHOW_PLAY, 'help-image', DOPTG_SLIDESHOW_PLAY_INFO));
    HTML.push(doptgSettingsFormImage('slideshow_play_hover', data['SlideshowPlayHover'], DOPTG_SLIDESHOW_PLAY_HOVER, 'help-image', DOPTG_SLIDESHOW_PLAY_HOVER_INFO));
    HTML.push(doptgSettingsFormImage('slideshow_pause', data['SlideshowPause'], DOPTG_SLIDESHOW_PAUSE, 'help-image', DOPTG_SLIDESHOW_PAUSE_INFO));
    HTML.push(doptgSettingsFormImage('slideshow_pause_hover', data['SlideshowPauseHover'], DOPTG_SLIDESHOW_PAUSE_HOVER, 'help-image', DOPTG_SLIDESHOW_PAUSE_HOVER_INFO));
    
// Auto Hide Settings
    HTML.push('    <a href="javascript:doptgMoveTop()" class="go-top">'+DOPTG_GO_TOP+'</a><h3 class="settings">'+DOPTG_AUTO_HIDE_SETTINGS+'</h3>');
    HTML.push(doptgSettingsFormSelect('auto_hide', data['AutoHide'], DOPTG_AUTO_HIDE, '', '', '', 'help', DOPTG_AUTO_HIDE_INFO, 'true;;false'));
    HTML.push(doptgSettingsFormInput('auto_hide_time', data['AutoHideTime'], DOPTG_AUTO_HIDE_TIME, '', '', 'small', 'help-small', DOPTG_AUTO_HIDE_TIME_INFO));
    
    HTML.push('</form>');

    $jDOPTG('.column-content', '.column'+column, '.DOPTG-admin').html(HTML.join(''));
    setTimeout(function(){
        doptgResize();
        setTimeout(function(){
           doptgResize();
        }, 10000);
    }, 5000);
    
    $jDOPTG('#bg_color,\n\
             #thumbnails_bg_color,\n\
             #thumbnail_bg_color,\n\
             #thumbnail_bg_color_hover,\n\
             #thumbnail_bg_color_selected,\n\
             #thumbnail_border_color,\n\
             #thumbnail_border_color_hover,\n\
             #thumbnail_border_color_selected,\n\
             #image_bg_color,\n\
             #caption_title_color,\n\
             #caption_text_color,\n\
             #caption_bg_color,\n\
             #caption_scroll_scrub_color,\n\
             #caption_scroll_bg_color,\n\
             #lightbox_window_color,\n\
             #lightbox_bg_color,\n\
             #lightbox_navigation_info_bg_color,\n\
             #lightbox_navigation_info_text_color,\n\
             #tooltip_bg_color,\n\
             #tooltip_stroke_color,\n\
             #tooltip_text_color').ColorPicker({
        onSubmit:function(hsb, hex, rgb, el){
            $jDOPTG(el).val(hex);
            $jDOPTG(el).ColorPickerHide();
        },
        onBeforeShow:function(){
            $jDOPTG(this).ColorPickerSetColor(this.value);
        },
        onShow:function(colpkr){
            $jDOPTG(colpkr).fadeIn(500);
            return false;
        },
        onHide:function(colpkr){
            $jDOPTG(colpkr).fadeOut(500);
            return false;
        }
    })
    .bind('keyup', function(){
        $jDOPTG(this).ColorPickerSetColor(this.value);
    });
    
    doptgSettingsImageUpload('thumbnails_navigation_prev', 'uploads/settings/thumbnails-navigation-prev/', DOPTG_ADD_THUMBNAILS_NAVIGATION_PREV_SUBMITED, DOPTG_ADD_THUMBNAILS_NAVIGATION_PREV_SUCCESS);
    doptgSettingsImageUpload('thumbnails_navigation_prev_hover', 'uploads/settings/thumbnails-navigation-prev-hover/', DOPTG_ADD_THUMBNAILS_NAVIGATION_PREV_HOVER_SUBMITED, DOPTG_ADD_THUMBNAILS_NAVIGATION_PREV_HOVER_SUCCESS);
    doptgSettingsImageUpload('thumbnails_navigation_next', 'uploads/settings/thumbnails-navigation-next/', DOPTG_ADD_THUMBNAILS_NAVIGATION_NEXT_SUBMITED, DOPTG_ADD_THUMBNAILS_NAVIGATION_NEXT_SUCCESS);
    doptgSettingsImageUpload('thumbnails_navigation_next_hover', 'uploads/settings/thumbnails-navigation-next-hover/', DOPTG_ADD_THUMBNAILS_NAVIGATION_NEXT_HOVER_SUBMITED, DOPTG_ADD_THUMBNAILS_NAVIGATION_NEXT_HOVER_SUCCESS);
    
    doptgSettingsImageUpload('thumbnail_loader', 'uploads/settings/thumb-loader/', DOPTG_ADD_THUMBNAIL_LOADER_SUBMITED, DOPTG_ADD_THUMBNAIL_LOADER_SUCCESS);
    doptgSettingsImageUpload('image_loader', 'uploads/settings/image-loader/', DOPTG_ADD_IMAGE_LOADER_SUBMITED, DOPTG_ADD_IMAGE_LOADER_SUCCESS);
    
    doptgSettingsImageUpload('navigation_prev', 'uploads/settings/navigation-prev/', DOPTG_ADD_NAVIGATION_PREV_SUBMITED, DOPTG_ADD_NAVIGATION_PREV_SUCCESS);
    doptgSettingsImageUpload('navigation_prev_hover', 'uploads/settings/navigation-prev-hover/', DOPTG_ADD_NAVIGATION_PREV_HOVER_SUBMITED, DOPTG_ADD_NAVIGATION_PREV_HOVER_SUCCESS);
    doptgSettingsImageUpload('navigation_next', 'uploads/settings/navigation-next/', DOPTG_ADD_NAVIGATION_NEXT_SUBMITED, DOPTG_ADD_NAVIGATION_NEXT_SUCCESS);
    doptgSettingsImageUpload('navigation_next_hover', 'uploads/settings/navigation-next-hover/', DOPTG_ADD_NAVIGATION_NEXT_HOVER_SUBMITED, DOPTG_ADD_NAVIGATION_NEXT_HOVER_SUCCESS);
    doptgSettingsImageUpload('navigation_lightbox', 'uploads/settings/navigation-lightbox/', DOPTG_ADD_NAVIGATION_LIGHTBOX_SUBMITED, DOPTG_ADD_NAVIGATION_LIGHTBOX_SUCCESS);
    doptgSettingsImageUpload('navigation_lightbox_hover', 'uploads/settings/navigation-lightbox-hover/', DOPTG_ADD_NAVIGATION_LIGHTBOX_HOVER_SUBMITED, DOPTG_ADD_NAVIGATION_LIGHTBOX_HOVER_SUCCESS);
        
    doptgSettingsImageUpload('lightbox_loader', 'uploads/settings/lightbox-loader/', DOPTG_ADD_LIGHTBOX_LOADER_SUBMITED, DOPTG_ADD_LIGHTBOX_LOADER_SUCCESS);
    doptgSettingsImageUpload('lightbox_navigation_prev', 'uploads/settings/lightbox-navigation-prev/', DOPTG_ADD_LIGHTBOX_NAVIGATION_PREV_SUBMITED, DOPTG_ADD_LIGHTBOX_NAVIGATION_PREV_SUCCESS);
    doptgSettingsImageUpload('lightbox_navigation_prev_hover', 'uploads/settings/lightbox-navigation-prev-hover/', DOPTG_ADD_LIGHTBOX_NAVIGATION_PREV_HOVER_SUBMITED, DOPTG_ADD_LIGHTBOX_NAVIGATION_PREV_HOVER_SUCCESS);
    doptgSettingsImageUpload('lightbox_navigation_next', 'uploads/settings/lightbox-navigation-next/', DOPTG_ADD_LIGHTBOX_NAVIGATION_NEXT_SUBMITED, DOPTG_ADD_LIGHTBOX_NAVIGATION_NEXT_SUCCESS);
    doptgSettingsImageUpload('lightbox_navigation_next_hover', 'uploads/settings/lightbox-navigation-next-hover/', DOPTG_ADD_LIGHTBOX_NAVIGATION_NEXT_HOVER_SUBMITED, DOPTG_ADD_LIGHTBOX_NAVIGATION_NEXT_HOVER_SUCCESS);
    doptgSettingsImageUpload('lightbox_navigation_close', 'uploads/settings/lightbox-navigation-close/', DOPTG_ADD_LIGHTBOX_NAVIGATION_CLOSE_SUBMITED, DOPTG_ADD_LIGHTBOX_NAVIGATION_CLOSE_SUCCESS);
    doptgSettingsImageUpload('lightbox_navigation_close_hover', 'uploads/settings/lightbox-navigation-close-hover/', DOPTG_ADD_LIGHTBOX_NAVIGATION_CLOSE_HOVER_SUBMITED, DOPTG_ADD_LIGHTBOX_NAVIGATION_CLOSE_HOVER_SUCCESS);
    
    doptgSettingsImageUpload('social_share', 'uploads/settings/social-share/', DOPTG_SOCIAL_SHARE_SUBMITED, DOPTG_SOCIAL_SHARE_SUCCESS);
    doptgSettingsImageUpload('social_share_lightbox', 'uploads/settings/social-share-lightbox/', DOPTG_SOCIAL_SHARE_LIGHTBOX_SUBMITED, DOPTG_SOCIAL_SHARE_LIGHTBOX_SUCCESS);
        
    doptgSettingsImageUpload('slideshow_play', 'uploads/settings/slideshow-play/', DOPTG_SLIDESHOW_PLAY_SUBMITED, DOPTG_SLIDESHOW_PLAY_SUCCESS);
    doptgSettingsImageUpload('slideshow_play_hover', 'uploads/settings/slideshow-play-hover/', DOPTG_SLIDESHOW_PLAY_HOVER_SUBMITED, DOPTG_SLIDESHOW_PLAY_HOVER_SUCCESS);
    doptgSettingsImageUpload('slideshow_pause', 'uploads/settings/slideshow-pause/', DOPTG_SLIDESHOW_PAUSE_SUBMITED, DOPTG_SLIDESHOW_PAUSE_SUCCESS);
    doptgSettingsImageUpload('slideshow_pause_hover', 'uploads/settings/slideshow-pause-hover/', DOPTG_SLIDESHOW_PAUSE_HOVER_SUBMITED, DOPTG_SLIDESHOW_PAUSE_HOVER_SUCCESS);
}

function doptgSettingsFormInput(id, value, label, pre, suf, input_class, help_class, help){// Create an Input Field.
    var inputHTML = new Array();

    inputHTML.push('    <div class="setting-box">');
    inputHTML.push('        <label for="'+id+'">'+label+'</label>');
    inputHTML.push('        <span class="pre">'+pre+'</span><input type="text" class="'+input_class+'" name="'+id+'" id="'+id+'" value="'+value+'" /><span class="suf">'+suf+'</span>');
    inputHTML.push('        <a href="javascript:void()" class="'+help_class+'" title="'+help+'"></a>');
    inputHTML.push('        <br class="DOPTG-clear" />');
    inputHTML.push('    </div>');

    return inputHTML.join('');
}

function doptgSettingsFormSelect(id, value, label, pre, suf, input_class, help_class, help, values){// Create a Combo Box.
    var selectHTML = new Array(), i,
    valuesList = values.split(';;');

    selectHTML.push('    <div class="setting-box">');
    selectHTML.push('        <label for="'+id+'">'+label+'</label>');
    selectHTML.push('        <span class="pre">'+pre+'</span>');
    selectHTML.push('            <select name="'+id+'" id="'+id+'">');
    for (i=0; i<valuesList.length; i++){
        if (valuesList[i] == value){
            selectHTML.push('        <option value="'+valuesList[i]+'" selected="selected">'+valuesList[i]+'</option>');
        }
        else{
            selectHTML.push('        <option value="'+valuesList[i]+'">'+valuesList[i]+'</option>');
        }
    }
    selectHTML.push('            </select>');
    selectHTML.push('        <span class="suf">'+suf+'</span>');
    selectHTML.push('        <a href="javascript:void()" class="'+help_class+'" title="'+help+'"></a>');
    selectHTML.push('        <br class="DOPTG-clear" />');
    selectHTML.push('    </div>');

    return selectHTML.join('');
}

function doptgSettingsFormImage(id, value, label, help_class, help){// Create an Image Field.
    var imageHTML = new Array();
    
    imageHTML.push('    <div class="setting-box">');
    imageHTML.push('        <label for="'+id+'">'+label+'</label>');
    imageHTML.push('        <span class="pre"></span>');
    imageHTML.push('        <div class="uploadifyContainer" style="float:left; margin:0; width:120px;">');
    imageHTML.push('            <div><input type="file" name="'+id+'" id="'+id+'" style="width:120px;" /></div>');
    imageHTML.push('            <div id="fileQueue_'+id+'"></div>');
    imageHTML.push('        </div>');
    imageHTML.push('        <a href="javascript:void()" class="'+help_class+'" title="'+help+'"></a>');
    imageHTML.push('        <br class="DOPTG-clear" />');
    imageHTML.push('        <label for=""></label>');
    imageHTML.push('        <span class="pre"></span>');
    imageHTML.push('        <div class="uploadifyContainer" id="'+id+'_image" style="float:left; margin:5px 0 0 0; padding:0 0 10px 0;">');
    imageHTML.push('            <img src="'+DOPTG_URL+value+'?cacheBuster='+doptgRandomString(64)+'" alt="" />');
    imageHTML.push('        </div>');
    imageHTML.push('        <br class="DOPTG-clear" />');
    imageHTML.push('    </div>');

    return imageHTML.join('');
}

function doptgSettingsImageUpload(id, path, submitMessage, successMessage){
    $jDOPTG('#'+id).uploadify({
        'uploader'       : DOPTG_URL+'doptg/libraries/swf/uploadify.swf',
        'script'         : DOPTG_URL+'doptg/libraries/php/uploadify-settings.php?data='+DOPTG_ABSOLUTE_PATH+'doptg/;;'+path+';;'+$jDOPTG('#gallery_id').val(),
        'cancelImg'      : DOPTG_URL+'doptg/libraries/gui/images/uploadify/cancel.png',
        'folder'         : '',
        'queueID'        : 'fileQueue_'+id,
        'buttonText'     : DOPTG_SELECT_FILE,
        'auto'           : true,
        'multi'          : false,
        'onInit'         : function(){
                               doptgResize();
                           },
        'onCancel'         : function(event,ID,fileObj,data){
                               doptgResize();
                           },
        'onSelect'       : function(event, ID, fileObj){
                               clearClick = false;
                               doptgToggleMessage('show', submitMessage);
                               
                               setTimeout(function(){
                                   doptgResize();
                               }, 100);
                           },
        'onComplete'     : function(event, ID, fileObj, response, data){
                               if (response != -1){
                                   setTimeout(function(){
                                       doptgResize();
                                   }, 1000);
                                   
                                   $jDOPTG.post(ajaxurl, {action: 'doptg_update_settings_image', item:id, gallery_id:$jDOPTG('#gallery_id').val(), path:response}, function(data){
                                       $jDOPTG('#'+id+'_image').html('<img src="'+DOPTG_URL+'doptg/'+response+'?cacheBuster='+doptgRandomString(64)+'" alt="" />');
                                       doptgToggleMessage('hide', successMessage);
                                   });
                               }
                           }
    });
}

function doptgInitHelp(){
    if (clearClick){
        var HTML = new Array(), i;
        $jDOPTG('li', '.column1', '.DOPTG-admin').removeClass('item-selected');

        HTML.push('<div class="DOPTG-faq">');
        for (i=0; i<DOPTG_help_info.length; i++){
            HTML.push('<div class="DOPTG-question" id="DOPTG-question_'+i+'">'+DOPTG_help_info[i]['question']+'</div>');
            HTML.push('<div class="DOPTG-answer" id="DOPTG-answer_'+i+'">'+DOPTG_help_info[i]['answer']+'</div>');
        }
        HTML.push('</div>');

        doptgRemoveColumns(2);
        $jDOPTG('.column-content', '.column2', '.DOPTG-admin').html(HTML.join(''));
        doptgResize();

        $jDOPTG('.DOPTG-question').unbind('click');
        $jDOPTG('.DOPTG-question').bind('click', function(){
            var no = $jDOPTG(this).attr('id').split('_')[1],
            id = '#DOPTG-answer_'+no;

            if ($jDOPTG(id).css('display') == 'none'){
                $jDOPTG('.DOPTG-answer').css('display', 'none');
                $jDOPTG('.DOPTG-answer').html('');
                $jDOPTG(id).html(DOPTG_help_info[no]['answer']);
                $jDOPTG(id).css('display', 'block');
                doptgResize();
            }
            else{
                $jDOPTG(id).css('display', 'none');
                doptgResize();
            }
        });
    }
}

function doptgMoveTop(){
    jQuery('html').stop(true, true).animate({'scrollTop':'0'}, 300);
    jQuery('body').stop(true, true).animate({'scrollTop':'0'}, 300);
}

function doptgStripslashes(str) {
    return (str + '').replace(/\\(.?)/g, function (s, n1) {
        switch (n1){
            case '\\':
                return '\\';
            case '0':
                return '\u0000';
            case '':
                return '';
            default:
                return n1;
        }
    });
}
                        
function doptgACAOBuster(dataURL){
    var topURL = window.location.href;

    if (topURL.indexOf('https') != -1){
        if (topURL.indexOf('https://www.') != -1 && dataURL.indexOf('https://www.') == -1){
            return 'https://www.'+dataURL.split('https://')[1];
        }
        else if (topURL.indexOf('https://www.') == -1 && dataURL.indexOf('https://www.') != -1){
            return 'https://'+dataURL.split('https://www.')[1];
        }
        else{
            return dataURL;
        }                                
    }
    else{
        if (topURL.indexOf('http://www.') != -1 && dataURL.indexOf('http://www.') == -1){
            return 'http://www.'+dataURL.split('http://')[1];
        }
        else if (topURL.indexOf('http://www.') == -1 && dataURL.indexOf('http://www.') != -1){
            return 'http://'+dataURL.split('http://www.')[1];
        }
        else{
            return dataURL;
        }
    }
}