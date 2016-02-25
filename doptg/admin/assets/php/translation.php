<?php

/*
* Title                   : Thumbnail Gallery (with PHP Admin)
* Version                 : 1.3
* File                    : translation.php
* File Version            : 1.2
* Created / Last Modified : 20 January 2013
* Author                  : Dot on Paper
* Copyright               : © 2012 Dot on Paper
* Website                 : http://www.dotonpaper.net
* Description             : Admin translation.
*/
    
    if (!isset($DOPTG_load_scripts)){
        exit('<h2 style="color:#aaaaaa; font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:bold;">Warning! No direct script access allowed.</h2>');
    }

    define('DOPTG_TITLE', 'Thumbnail Gallery Admin');
    
    // Sign In
    define('DOPTG_LOGIN_USERNAME', 'Username');
    define('DOPTG_LOGIN_PASSWORD', 'Password');
    define('DOPTG_LOGIN_SUBMIT', 'Sign In');
    
    define('DOPTG_LOGIN_INFO', 'Enter your user and password to login.');
    define('DOPTG_LOGIN_SUCCESS', 'Success! Your user and password are valid.');
    define('DOPTG_LOGIN_ERROR', 'Error! Your user or password are invalid.');
    define('DOPTG_LOGIN_PROCESSING', 'Processing ...');
    
    // Sign Out
    define('DOPTG_LOGOUT_SUBMIT', 'Sign Out');
    
    // Loading ...
    define('DOPTG_LOAD', "Load data ...");
    define('DOPTG_GALLERIES_LOADED', "Galleries list loaded.");
    define('DOPTG_IMAGES_LOADED', "Images list loaded.");
    define('DOPTG_NO_GALLERIES', "No galleries.");
    define('DOPTG_NO_IMAGES', "No images.");
    define('DOPTG_GALLERY_LOADED', "Gallery data loaded.");
    define('DOPTG_IMAGE_LOADED', "Image loaded.");

    // Save ...
    define('DOPTG_SAVE', "Save data ...");
    define('DOPTG_SELECT_FILE', "Select File");

    // Help
    define('DOPTG_GALLERIES_HELP', "Click on the 'plus' icon to add a gallery. Click on a gallery item to open the editing area. Click on the 'pencil' icon to edit galleries default settings.");
    define('DOPTG_GALLERIES_EDIT_INFO_HELP', "Click 'Submit Button' to save changes.");
    define('DOPTG_GALLERY_EDIT_HELP', "Click on the 'plus' icon to add images. Click on an image to open the editing area. You can drag images to sort them. Click on the 'pencil' icon to edit gallery settings.");
    define('DOPTG_GALLERY_EDIT_INFO_HELP', "Click 'Submit Button' to save changes. Images are saved automaticaly. Click 'Delete Button' to delete the gallery. Click 'Use Default Settings' to use the default settings; the current settings will be deleted.");
    define('DOPTG_ADD_IMAGES_HELP', "You have 3 upload types (AJAX, Uploadify, FTP). At least one should work.");
    define('DOPTG_ADD_IMAGES_HELP_AJAX', "Just a simple AJAX upload. Just select an image and the upload will start automatically.");
    define('DOPTG_ADD_IMAGES_HELP_UPLOADIFY', "You can use this option if you want to upload a single or multiple images to your gallery. Just select the images and the upload will start automatically. Uploadify will not display the progress bar and image processing will go slower if you have a firewall enabled.");
    define('DOPTG_ADD_IMAGES_HELP_FTP', "Copy all the images in ftp-uploads in Thumbnail Gallery plugin folder. Press Add Images to add the content of the folder to your gallery. This will take some time depending on the number and size of the images. On some servers the images' names that contain other characters different from alphanumeric ones will not be uploaded. Change the names for them to work.");
    define('DOPTG_IMAGE_EDIT_HELP', "Drag the mouse over the big image to select a new thumbnail. Click 'Submit Button' to save the thumbnail, title, caption, media, lightbox media or enable/disable the image. Click 'Delete Button' to delete the image.");

    // Form
    define('DOPTG_SUBMIT', "Submit");
    define('DOPTG_DELETE', "Delete");
    define('DOPTG_DEFAULT', "Use Default Settings");

    // Add Gallery
    define('DOPTG_ADD_GALLERY_NAME', "New Gallery");
    define('DOPTG_ADD_GALLERY_SUBMIT', "Add Gallery");
    define('DOPTG_ADD_GALLERY_SUBMITED', "Adding gallery ...");
    define('DOPTG_ADD_GALERRY_SUCCESS', "You have succesfully added a new gallery.");

    // Edit Galleries
    define('DOPTG_EDIT_GALLERIES_SUBMIT', "Edit Galleries Default Settings");
    define('DOPTG_EDIT_GALLERIES_SUCCESS', "You have succesfully edited the default settings.");

    // Edit Gallery
    define('DOPTG_EDIT_GALLERY_SUBMIT', "Edit Gallery");
    define('DOPTG_EDIT_GALLERY_SUCCESS', "You have succesfully edited the gallery.");
    define('DOPTG_EDIT_GALLERY_USE_DEFAULT_CONFIRMATION', "Are you sure you want to use the default settings. Current settings are going to be deleted?");
    
    // Generate Gallery Code
    define('DOPTG_EDIT_GALLERY_CODE', "Generate HTML Code");
    define('DOPTG_EDIT_GALLERY_CODE_HELP', "Select the files you want included, generate the code and copy it into your page.");
    define('DOPTG_EDIT_GALLERY_CODE_INCLUDE_JQUERY', "Include jQuery file (uncheck if already used).");
    define('DOPTG_EDIT_GALLERY_CODE_INCLUDE_SCROLL', "Include Scroll Pane files (uncheck if already used).");
    define('DOPTG_EDIT_GALLERY_CODE_INCLUDE_MOUSE', "Include Mouse Wheel file (uncheck if already used).");
    define('DOPTG_EDIT_GALLERY_CODE_INCLUDE_GALLERY', "Include Gallery files (uncheck if already used).");
    define('DOPTG_EDIT_GALLERY_CODE_GALLERY_FULLSCREEN', "Enable Fullscreen Gallery option.");
    define('DOPTG_EDIT_GALLERY_CODE_GALLERY_EMBED', "Embed the code on other websites (check it if you what to use the gallery on another domain than the one you have the admin area).");
    define('DOPTG_EDIT_GALLERY_CODE_COPY', "Copy the code below into your page.");
    define('DOPTG_EDIT_GALLERY_CODE_LINK', "A link to your gallery (preview).");
    
    // Delete Gallery
    define('DOPTG_DELETE_GALLERY_CONFIRMATION', "Are you sure you want to delete this gallery?");
    define('DOPTG_DELETE_GALLERY_SUBMIT', "Delete Gallery");
    define('DOPTG_DELETE_GALLERY_SUBMITED', "Deleting gallery ...");
    define('DOPTG_DELETE_GALERRY_SUCCESS', "You have succesfully deleted the gallery.");

    // Add Image
    define('DOPTG_ADD_IMAGE_SUBMIT', "Add Images");
    define('DOPTG_ADD_IMAGE_SIMPLE_UPLOAD', "Simple AJAX file upload");
    define('DOPTG_ADD_IMAGE_MULTIPLE_UPLOAD', "Multiple files upload (Uploadify jQuery Plugin)");
    define('DOPTG_ADD_IMAGE_FTP_UPLOAD', "FTP file upload");
    define('DOPTG_ADD_IMAGE_SUBMITED', "Adding images ...");
    define('DOPTG_ADD_IMAGE_SUCCESS', "You have succesfully added a new image.");
    define('DOPTG_SELECT_IMAGES', "Select Images");
    define('DOPTG_SELECT_FTP_IMAGES', "Add Images");

    // Sort Image
    define('DOPTG_SORT_IMAGES_SUBMITED', "Sorting images ...");
    define('DOPTG_SORT_IMAGES_SUCCESS', "You have succesfully sorted the images.");

    // Edit Image
    define('DOPTG_EDIT_IMAGE_SUBMIT', "Edit Image");
    define('DOPTG_EDIT_IMAGE_SUCCESS', "You have succesfully edited the image.");
    define('DOPTG_EDIT_IMAGE_CROP_THUMBNAIL', "Crop Thumbnail");
    define('DOPTG_EDIT_IMAGE_CURRENT_THUMBNAIL', "Current Thumbnail");
    define('DOPTG_EDIT_IMAGE_TITLE', "Title");
    define('DOPTG_EDIT_IMAGE_CAPTION', "Caption");
    define('DOPTG_EDIT_IMAGE_MEDIA', "Media: Add videos (YouTube, Vimeo, ...), HTML, Flash, ...<br />IMPORTANT: Make sure that all the code is in one html tag. Iframe embedding code will work :).");
    define('DOPTG_EDIT_IMAGE_LIGHTBOX_MEDIA', "Lightbox Media: Add Media that will appear in lightbox. It will appear instead of Image or Default Media.<br />IMPORTANT: Make sure that all the code is in one html tag.");
    define('DOPTG_EDIT_IMAGE_ENABLED', "Enabled");

    // Delete Image
    define('DOPTG_DELETE_IMAGE_CONFIRMATION', "Are you sure you want to delete this image?");
    define('DOPTG_DELETE_IMAGE_SUBMIT', "Delete Image");
    define('DOPTG_DELETE_IMAGE_SUBMITED', "Deleting image ...");
    define('DOPTG_DELETE_IMAGE_SUCCESS', "You have succesfully deleted the image.");
    
    // Settings
    define('DOPTG_GENERAL_STYLES_SETTINGS', "General Styles & Settings");
    define('DOPTG_GALLERY_NAME', "Name");
    define('DOPTG_WIDTH', "Width");
    define('DOPTG_HEIGHT', "Height");
    define('DOPTG_BG_COLOR', "Background Color");
    define('DOPTG_BG_ALPHA', "Background Alpha");
    define('DOPTG_IMAGES_ORDER', "Images Order");
    define('DOPTG_RESPONSIVE_ENABLED', "Responsive Enabled");    

    define('DOPTG_THUMBNAILS_STYLES_SETTINGS', "Thumbnails Styles & Settings");
    define('DOPTG_THUMBNAILS_POSITION', "Thumbnails Position");
    define('DOPTG_THUMBNAILS_OVER_IMAGE', "Thumbnails Over Image");
    define('DOPTG_THUMBNAILS_BG_COLOR', "Thumbnails Background Color");
    define('DOPTG_THUMBNAILS_BG_ALPHA', "Thumbnails Background Alpha");
    define('DOPTG_THUMBNAILS_SPACING', "Thumbnails Spacing");
    define('DOPTG_THUMBNAILS_PADDING_TOP', "Thumbnails Padding Top");
    define('DOPTG_THUMBNAILS_PADDING_RIGHT', "Thumbnails Padding Right");
    define('DOPTG_THUMBNAILS_PADDING_BOTTOM', "Thumbnails Padding Bottom");
    define('DOPTG_THUMBNAILS_PADDING_LEFT', "Thumbnails Padding Left");
    
    define('DOPTG_THUMBNAILS_NAVIGATION_STYLES_SETTINGS', "Thumbnails Navigation Styles & Settings");
    define('DOPTG_THUMBNAILS_NAVIGATION', "Thumbnails Navigation Type");
    define('DOPTG_THUMBNAILS_NAVIGATION_PREV', "Thumbnails Navigation Previous Button Image");
    define('DOPTG_ADD_THUMBNAILS_NAVIGATION_PREV_SUBMITED', "Uploading previous button image ...");
    define('DOPTG_ADD_THUMBNAILS_NAVIGATION_PREV_SUCCESS', "Previous button image uploaded.");
    define('DOPTG_THUMBNAILS_NAVIGATION_PREV_HOVER', "Thumbnails Navigation Previous Button Hover Image");
    define('DOPTG_ADD_THUMBNAILS_NAVIGATION_PREV_HOVER_SUBMITED', "Uploading previous button hover image ...");
    define('DOPTG_ADD_THUMBNAILS_NAVIGATION_PREV_HOVER_SUCCESS', "Previous button hover image uploaded.");
    define('DOPTG_THUMBNAILS_NAVIGATION_NEXT', "Thumbnails Navigation Next Button Image");
    define('DOPTG_ADD_THUMBNAILS_NAVIGATION_NEXT_SUBMITED', "Uploading next button image ...");
    define('DOPTG_ADD_THUMBNAILS_NAVIGATION_NEXT_SUCCESS', "Next button image uploaded.");
    define('DOPTG_THUMBNAILS_NAVIGATION_NEXT_HOVER', "Thumbnails Navigation Next Button Hover Image");
    define('DOPTG_ADD_THUMBNAILS_NAVIGATION_NEXT_HOVER_SUBMITED', "Uploading next button hover image ...");
    define('DOPTG_ADD_THUMBNAILS_NAVIGATION_NEXT_HOVER_SUCCESS', "Next button hover image uploaded.");
        
    define('DOPTG_THUMBNAIL_STYLES_SETTINGS', "Styles & Settings for a Thumbnail");
    define('DOPTG_THUMBNAIL_LOADER', "Thumbnail Loader");
    define('DOPTG_ADD_THUMBNAIL_LOADER_SUBMITED', "Adding thumbnail loader...");
    define('DOPTG_ADD_THUMBNAIL_LOADER_SUCCESS', "Thumbnail loader added.");
    define('DOPTG_THUMBNAIL_WIDTH', "Thumbnail Width");
    define('DOPTG_THUMBNAIL_HEIGHT', "Thumbnail Height");
    define('DOPTG_THUMBNAIL_WIDTH_MOBILE', "Mobile Thumbnail Width");
    define('DOPTG_THUMBNAIL_HEIGHT_MOBILE', "Mobile Thumbnail Height");
    define('DOPTG_THUMBNAIL_ALPHA', "Thumbnail Alpha");
    define('DOPTG_THUMBNAIL_ALPHA_HOVER', "Thumbnail Alpha Hover");
    define('DOPTG_THUMBNAIL_ALPHA_SELECTED', "Thumbnail Alpha Selected");
    define('DOPTG_THUMBNAIL_BG_COLOR', "Thumbnail Background Color");
    define('DOPTG_THUMBNAIL_BG_COLOR_HOVER', "Thumbnail Background Color Hover");
    define('DOPTG_THUMBNAIL_BG_COLOR_SELECTED', "Thumbnail Background Color Selected");
    define('DOPTG_THUMBNAIL_BORDER_SIZE', "Thumbnail Border Size");
    define('DOPTG_THUMBNAIL_BORDER_COLOR', "Thumbnail Border Color");
    define('DOPTG_THUMBNAIL_BORDER_COLOR_HOVER', "Thumbnail Border Color Hover");
    define('DOPTG_THUMBNAIL_BORDER_COLOR_SELECTED', "Thumbnail Border Color Selected");
    define('DOPTG_THUMBNAIL_PADDING_TOP', "Thumbnail Padding Top");
    define('DOPTG_THUMBNAIL_PADDING_RIGHT', "Thumbnail Padding Right");
    define('DOPTG_THUMBNAIL_PADDING_BOTTOM', "Thumbnail Padding Bottom");
    define('DOPTG_THUMBNAIL_PADDING_LEFT', "Thumbnail Padding Left");

    define('DOPTG_IMAGE_STYLES_SETTINGS', "Image Styles & Settings");
    define('DOPTG_IMAGE_LOADER', "Image Loader");
    define('DOPTG_ADD_IMAGE_LOADER_SUBMITED', "Uploading image loader...");
    define('DOPTG_ADD_IMAGE_LOADER_SUCCESS', "Image loader uploaded.");
    define('DOPTG_IMAGE_BG_COLOR', "Image Background Color");
    define('DOPTG_IMAGE_BG_ALPHA', "Image Background Alpha");
    define('DOPTG_IMAGE_DISPLAY_TYPE', "Image Display Type");
    define('DOPTG_IMAGE_DISPLAY_TIME', "Image Display Time");
    define('DOPTG_IMAGE_MARGIN_TOP', "Image Margin Top");
    define('DOPTG_IMAGE_MARGIN_RIGHT', "Image Margin Right");
    define('DOPTG_IMAGE_MARGIN_BOTTOM', "Image Margin Bottom");
    define('DOPTG_IMAGE_MARGIN_LEFT', "Image Margin Left");
    define('DOPTG_IMAGE_PADDING_TOP', "Image Padding Top");
    define('DOPTG_IMAGE_PADDING_RIGHT', "Image Padding Right");
    define('DOPTG_IMAGE_PADDING_BOTTOM', "Image Padding Bottom");
    define('DOPTG_IMAGE_PADDING_LEFT', "Image Padding Left");

    define('DOPTG_NAVIGATION_STYLES_SETTINGS', "Navigation Styles & Settings");
    define('DOPTG_NAVIGATION_ENABLED', "Navigation Buttons Enabled");
    define('DOPTG_NAVIGATION_OVER_IMAGE', "Navigation Over Image");
    define('DOPTG_NAVIGATION_PREV', "Navigation Previous Button Image");
    define('DOPTG_ADD_NAVIGATION_PREV_SUBMITED', "Uploading previous button image ...");
    define('DOPTG_ADD_NAVIGATION_PREV_SUCCESS', "Previous button image uploaded.");
    define('DOPTG_NAVIGATION_PREV_HOVER', "Navigation Previous Button Hover Image");
    define('DOPTG_ADD_NAVIGATION_PREV_HOVER_SUBMITED', "Uploading previous button hover image ...");
    define('DOPTG_ADD_NAVIGATION_PREV_HOVER_SUCCESS', "Previous button hover image uploaded.");
    define('DOPTG_NAVIGATION_NEXT', "Navigation Next Button Image");
    define('DOPTG_ADD_NAVIGATION_NEXT_SUBMITED', "Uploading next button image ...");
    define('DOPTG_ADD_NAVIGATION_NEXT_SUCCESS', "Next button image uploaded.");
    define('DOPTG_NAVIGATION_NEXT_HOVER', "Navigation Next Button Hover Image");
    define('DOPTG_ADD_NAVIGATION_NEXT_HOVER_SUBMITED', "Uploading next button hover image ...");
    define('DOPTG_ADD_NAVIGATION_NEXT_HOVER_SUCCESS', "Next button hover image uploaded.");
    define('DOPTG_NAVIGATION_LIGHTBOX', "Navigation Lightbox Button Image");
    define('DOPTG_ADD_NAVIGATION_LIGHTBOX_SUBMITED', "Uploading lightbox button image ...");
    define('DOPTG_ADD_NAVIGATION_LIGHTBOX_SUCCESS', "Lightbox button image uploaded.");
    define('DOPTG_NAVIGATION_LIGHTBOX_HOVER', "Navigation Lightbox Button Hover Image");
    define('DOPTG_ADD_NAVIGATION_LIGHTBOX_HOVER_SUBMITED', "Uploading lightbox button hover image ...");
    define('DOPTG_ADD_NAVIGATION_LIGHTBOX_HOVER_SUCCESS', "Lightbox button hover image uploaded.");
    define('DOPTG_NAVIGATION_TOUCH_DEVICE_SWIPE_ENABLED', "Swipe Navigation Enabled");
    
    define('DOPTG_CAPTION_STYLES_SETTINGS', "Image Caption Styles & Settings");
    define('DOPTG_CAPTION_WIDTH', "Caption Width");
    define('DOPTG_CAPTION_HEIGHT', "Caption Height");
    define('DOPTG_CAPTION_TITLE_COLOR', "Caption Title Color");
    define('DOPTG_CAPTION_TEXT_COLOR', "Caption Text Color");
    define('DOPTG_CAPTION_BG_COLOR', "Caption Background Color");
    define('DOPTG_CAPTION_BG_ALPHA', "Caption Background Alpha");
    define('DOPTG_CAPTION_POSITION', "Caption Position");
    define('DOPTG_CAPTION_OVER_IMAGE', "Caption Over Image");
    define('DOPTG_CAPTION_SCROLL_SCRUB_COLOR', "Caption Scroll Scrub Color");
    define('DOPTG_CAPTION_SCROLL_BG_COLOR', "Caption Scroll Background Color");
    define('DOPTG_CAPTION_MARGIN_TOP', "Caption Margin Top");
    define('DOPTG_CAPTION_MARGIN_RIGHT', "Caption Margin Right");
    define('DOPTG_CAPTION_MARGIN_BOTTOM', "Caption Margin Bottom");
    define('DOPTG_CAPTION_MARGIN_LEFT', "Caption Margin Left");
    define('DOPTG_CAPTION_PADDING_TOP', "Caption Padding Top");
    define('DOPTG_CAPTION_PADDING_RIGHT', "Caption Padding Right");
    define('DOPTG_CAPTION_PADDING_BOTTOM', "Caption Padding Bottom");
    define('DOPTG_CAPTION_PADDING_LEFT', "Caption Padding Left");
    
    define('DOPTG_LIGHTBOX_STYLES_SETTINGS', "Lightbox Styles & Settings");
    define('DOPTG_LIGHTBOX_ENABLED', "Lightbox Enabled");
    define('DOPTG_LIGHTBOX_WINDOW_COLOR', "Lightbox Window Color");
    define('DOPTG_LIGHTBOX_WINDOW_ALPHA', "Lightbox Window Alpha");
    define('DOPTG_LIGHTBOX_LOADER', "Lightbox Loader");
    define('DOPTG_ADD_LIGHTBOX_LOADER_SUBMITED', "Adding lightbox loader...");
    define('DOPTG_ADD_LIGHTBOX_LOADER_SUCCESS', "Lightbox loader added.");
    define('DOPTG_LIGHTBOX_BACKGROUND_COLOR', "Lightbox Background Color");
    define('DOPTG_LIGHTBOX_BACKGROUND_ALPHA', "Lightbox Background Alpha");
    define('DOPTG_LIGHTBOX_MARGIN_TOP', "Lightbox Margin Top");
    define('DOPTG_LIGHTBOX_MARGIN_RIGHT', "Lightbox Margin Right");
    define('DOPTG_LIGHTBOX_MARGIN_BOTTOM', "Lightbox Margin Bottom");
    define('DOPTG_LIGHTBOX_MARGIN_LEFT', "Lightbox Margin Left");
    define('DOPTG_LIGHTBOX_PADDING_TOP', "Lightbox Padding Top");
    define('DOPTG_LIGHTBOX_PADDING_RIGHT', "Lightbox Padding Right");
    define('DOPTG_LIGHTBOX_PADDING_BOTTOM', "Lightbox Padding Bottom");
    define('DOPTG_LIGHTBOX_PADDING_LEFT', "Lightbox Padding Left");
    
    define('DOPTG_LIGHTBOX_NAVIGATION_STYLES_SETTINGS', "Lightbox Navigation Styles & Settings");
    define('DOPTG_LIGHTBOX_NAVIGATION_PREV', "Lightbox Navigation Previous Button Image");
    define('DOPTG_ADD_LIGHTBOX_NAVIGATION_PREV_SUBMITED', "Uploading previous button image ...");
    define('DOPTG_ADD_LIGHTBOX_NAVIGATION_PREV_SUCCESS', "Previous button image uploaded.");
    define('DOPTG_LIGHTBOX_NAVIGATION_PREV_HOVER', "Lightbox Navigation Previous Button Hover Image");
    define('DOPTG_ADD_LIGHTBOX_NAVIGATION_PREV_HOVER_SUBMITED', "Uploading previous button hover image ...");
    define('DOPTG_ADD_LIGHTBOX_NAVIGATION_PREV_HOVER_SUCCESS', "Previous button hover image uploaded.");
    define('DOPTG_LIGHTBOX_NAVIGATION_NEXT', "Lightbox Navigation Next Button Image");
    define('DOPTG_ADD_LIGHTBOX_NAVIGATION_NEXT_SUBMITED', "Uploading next button image ...");
    define('DOPTG_ADD_LIGHTBOX_NAVIGATION_NEXT_SUCCESS', "Next button image uploaded.");
    define('DOPTG_LIGHTBOX_NAVIGATION_NEXT_HOVER', "Lightbox Navigation Next Button Hover Image");
    define('DOPTG_ADD_LIGHTBOX_NAVIGATION_NEXT_HOVER_SUBMITED', "Uploading next button hover image ...");
    define('DOPTG_ADD_LIGHTBOX_NAVIGATION_NEXT_HOVER_SUCCESS', "Next button hover image uploaded.");
    define('DOPTG_LIGHTBOX_NAVIGATION_CLOSE', "Lightbox Navigation Close Button Image");
    define('DOPTG_ADD_LIGHTBOX_NAVIGATION_CLOSE_SUBMITED', "Uploading close button image ...");
    define('DOPTG_ADD_LIGHTBOX_NAVIGATION_CLOSE_SUCCESS', "Close button image uploaded.");
    define('DOPTG_LIGHTBOX_NAVIGATION_CLOSE_HOVER', "Lightbox Navigation Close Button Hover Image");
    define('DOPTG_ADD_LIGHTBOX_NAVIGATION_CLOSE_HOVER_SUBMITED', "Uploading close button hover image ...");
    define('DOPTG_ADD_LIGHTBOX_NAVIGATION_CLOSE_HOVER_SUCCESS', "Close button hover image uploaded.");
    define('DOPTG_LIGHTBOX_NAVIGATION_INFO_BG_COLOR', "Lightbox Navigation Info Background Color");
    define('DOPTG_LIGHTBOX_NAVIGATION_INFO_TEXT_COLOR', "Lightbox Navigation Info Text Color");
    define('DOPTG_LIGHTBOX_NAVIGATION_TOUCH_DEVICE_SWIPE_ENABLED', "Swipe Lightbox Navigation Enabled");
    
    define('DOPTG_SOCIAL_SHARE_STYLES_SETTINGS', "Social Share Styles & Settings");
    define('DOPTG_SOCIAL_SHARE_ENABLED', "Social Share Enabled");
    define('DOPTG_SOCIAL_SHARE', "Social Share Button Image");
    define('DOPTG_SOCIAL_SHARE_SUBMITED', "Uploading social share button image ...");
    define('DOPTG_SOCIAL_SHARE_SUCCESS', "Social share button image uploaded.");
    define('DOPTG_SOCIAL_SHARE_LIGHTBOX', "Lightbox Social Share Button Image");
    define('DOPTG_SOCIAL_SHARE_LIGHTBOX_SUBMITED', "Uploading lightbox social share button image ...");
    define('DOPTG_SOCIAL_SHARE_LIGHTBOX_SUCCESS', "Lightbox social share button image uploaded.");
    
    define('DOPTG_TOOLTIP_STYLES_SETTINGS', "Tooltip Styles & Settings");
    define('DOPTG_TOOLTIP_ENABLED', "Tooltip Enabled");
    define('DOPTG_TOOLTIP_BG_COLOR', "Tooltip Background Color");
    define('DOPTG_TOOLTIP_STROKE_COLOR', "Tooltip Stroke Color");
    define('DOPTG_TOOLTIP_TEXT_COLOR', "Tooltip Text Color");

    define('DOPTG_SLIDESHOW_SETTINGS', "Slideshow Settings");
    define('DOPTG_SLIDESHOW', "Slideshow Enabled");
    define('DOPTG_SLIDESHOW_TIME', "Slideshow Time");
    define('DOPTG_SLIDESHOW_AUTOSTART', "Slideshow Autostart");
    define('DOPTG_SLIDESHOW_LOOP', "Slideshow Loop");
    define('DOPTG_SLIDESHOW_PLAY', "Slideshow Play Button Image");
    define('DOPTG_SLIDESHOW_PLAY_SUBMITED', "Uploading slideshow play button image ...");
    define('DOPTG_SLIDESHOW_PLAY_SUCCESS', "Slideshow play button image uploaded.");
    define('DOPTG_SLIDESHOW_PLAY_HOVER', "Slideshow Play Button Hover Image");
    define('DOPTG_SLIDESHOW_PLAY_HOVER_SUBMITED', "Uploading slideshow play button hover image ...");
    define('DOPTG_SLIDESHOW_PLAY_HOVER_SUCCESS', "Slideshow play button hover image uploaded.");
    define('DOPTG_SLIDESHOW_PAUSE', "Slideshow Pause Button Image");
    define('DOPTG_SLIDESHOW_PAUSE_SUBMITED', "Uploading slideshow pause button image ...");
    define('DOPTG_SLIDESHOW_PAUSE_SUCCESS', "Slideshow pause button image uploaded.");
    define('DOPTG_SLIDESHOW_PAUSE_HOVER', "Slideshow Pause Button Hover Image");
    define('DOPTG_SLIDESHOW_PAUSE_HOVER_SUBMITED', "Uploading slideshow pause button hover image ...");
    define('DOPTG_SLIDESHOW_PAUSE_HOVER_SUCCESS', "Slideshow pause button hover image uploaded.");
    
    define('DOPTG_AUTO_HIDE_SETTINGS', "Auto Hide Settings");
    define('DOPTG_AUTO_HIDE', "Auto Hide Thumbnails and Buttons");
    define('DOPTG_AUTO_HIDE_TIME', "Auto Hide Time");
    
    define('DOPTG_GO_TOP', "go top");

    define('DOPTG_GALLERY_NAME_INFO', "Change gallery name.");
    define('DOPTG_WIDTH_INFO', "Width (value in pixels, 100%). Default value: 900. Set the width of the gallery. Use 100% for fullscreen option.");
    define('DOPTG_HEIGHT_INFO', "Height (value in pixels, 100%). Default value: 600. Set the height of the gallery. Use 100% for fullscreen option.");
    define('DOPTG_BG_COLOR_INFO', "Background Color (color hex code). Default value: f1f1f1. Set gallery backgrund color.");
    define('DOPTG_BG_ALPHA_INFO', "Background Alpha (value from 0 to 100). Default value: 100. Set gallery alpha.");
    define('DOPTG_IMAGES_ORDER_INFO', "Images Order (normal, random). Default value: normal. Set images order.");
    define('DOPTG_RESPONSIVE_ENABLED_INFO', "Responsive Enabled (true, false). Default value: true. Enable responsive layout.");

    define('DOPTG_THUMBNAILS_POSITION_INFO', "Thumbnails Position (top, right, bottom, left). Default value: bottom. Set the position of the thumbnails in the gallery.");
    define('DOPTG_THUMBNAILS_OVER_IMAGE_INFO', "Thumbnails Over Image (true, false). Default value: false. If the value is true the thumbnails will be displayed over the big image.");
    define('DOPTG_THUMBNAILS_BG_COLOR_INFO', "Thumbnails Background Color (color hex code). Default value: f1f1f1. Set the color for the thumbnails background.");
    define('DOPTG_THUMBNAILS_BG_ALPHA_INFO', "Thumbnails Background Alpha (value from 0 to 100). Default value: 100. Set the transparancy for the thumbnails background.");
    define('DOPTG_THUMBNAILS_SPACING_INFO', "Thumbnails Spacing (value in pixels). Default value: 5. Set the space between thumbnails.");
    define('DOPTG_THUMBNAILS_PADDING_TOP_INFO', "Thumbnails Padding Top (value in pixels). Default value: 0. Set the top padding for the thumbnails.");
    define('DOPTG_THUMBNAILS_PADDING_RIGHT_INFO', "Thumbnails Padding Right (value in pixels). Default value: 5. Set the right padding for the thumbnails.");
    define('DOPTG_THUMBNAILS_PADDING_BOTTOM_INFO', "Thumbnails Padding Bottom (value in pixels). Default value: 5. Set the bottom padding for the thumbnails.");
    define('DOPTG_THUMBNAILS_PADDING_LEFT_INFO', "Thumbnails Padding Left (value in pixels). Default value: 5. Set the left padding for the thumbnails.");
    
    define('DOPTG_THUMBNAILS_NAVIGATION_INFO', "Thumbnails Navigation Type (mouse, arrows). Default value: mouse. Set the thumbnails navigation type.");
    define('DOPTG_THUMBNAILS_NAVIGATION_PREV_INFO', "Thumbnails Navigation Previous Button Image (path to image). Upload the image for thumbnails navigation's previous button.");
    define('DOPTG_THUMBNAILS_NAVIGATION_PREV_HOVER_INFO', "Thumbnails Navigation Previous Button Hover Image (path to image). Upload the image for thumbnails navigation's previous hover button.");
    define('DOPTG_THUMBNAILS_NAVIGATION_NEXT_INFO', "Thumbnails Navigation Next Button Image (path to image). Upload the image for thumbnails navigation's next button.");
    define('DOPTG_THUMBNAILS_NAVIGATION_NEXT_HOVER_INFO', "Thumbnails Navigation Next Button Hover Image (path to image). Upload the image for thumbnails navigation's next hover button.");
    
    define('DOPTG_THUMBNAIL_LOADER_INFO', "Thumbnail Loader (path to image). Set the loader for the thumbnails.");
    define('DOPTG_THUMBNAIL_WIDTH_INFO', "Thumbnail Width (the size in pixels). Default value: 60. Set the width of a thumbnail.");
    define('DOPTG_THUMBNAIL_HEIGHT_INFO', "Thumbnail Height (the size in pixels). Default value: 60. Set the height of a thumbnail.");
    define('DOPTG_THUMBNAIL_WIDTH_MOBILE_INFO', "Mobile Thumbnail Width (the size in pixels). Default value: 60. Set the width of a thumbnail on mobile devices.");
    define('DOPTG_THUMBNAIL_HEIGHT_MOBILE_INFO', "Mobile Thumbnail Height (the size in pixels). Default value: 60. Set the height of a thumbnail on mobile devices.");
    define('DOPTG_THUMBNAIL_ALPHA_INFO', "Thumbnail Alpha (value from 0 to 100). Default value: 50. Set the transparancy of a thumbnail.");
    define('DOPTG_THUMBNAIL_ALPHA_HOVER_INFO', "Thumbnail Alpha Hover (value from 0 to 100). Default value: 100. Set the transparancy of a thumbnail when hover.");
    define('DOPTG_THUMBNAIL_ALPHA_SELECTED_INFO', "Thumbnail Alpha Selected (value from 0 to 100). Default value: 100. Set the transparancy of a thumbnail when selected.");
    define('DOPTG_THUMBNAIL_BG_COLOR_INFO', "Thumbnail Background Color (color hex code). Default value: f1f1f1. Set the color of a thumbnail's background.");
    define('DOPTG_THUMBNAIL_BG_COLOR_HOVER_INFO', "Thumbnail Background Color Hover (color hex code). Default value: 000000. Set the color of a thumbnail's background when hover.");
    define('DOPTG_THUMBNAIL_BG_COLOR_SELECTED_INFO', "Thumbnail Background Color Selected (color hex code). Default value: 000000. Set the color of a thumbnail's background when selected.");
    define('DOPTG_THUMBNAIL_BORDER_SIZE_INFO', "Thumbnail Border Size (value in pixels). Default value: 2. Set the size of a thumbnail's border.");
    define('DOPTG_THUMBNAIL_BORDER_COLOR_INFO', "Thumbnail Border Color (color hex code). Default value: f1f1f1. Set the color of a thumbnail's border.");
    define('DOPTG_THUMBNAIL_BORDER_COLOR_HOVER_INFO', "Thumbnail Border Color Hover (color hex code). Default value: 000000. Set the color of a thumbnail's border when hover.");
    define('DOPTG_THUMBNAIL_BORDER_COLOR_SELECTED_INFO', "Thumbnail Border Color Selected (color hex code). Default value: 000000. Set the color of a thumbnail's border when selected.");
    define('DOPTG_THUMBNAIL_PADDING_TOP_INFO', "Thumbnail Padding Top (value in pixels). Default value: 0. Set top padding value of a thumbnail.");
    define('DOPTG_THUMBNAIL_PADDING_RIGHT_INFO', "Thumbnail Padding Right (value in pixels). Default value: 0. Set right padding value of a thumbnail.");
    define('DOPTG_THUMBNAIL_PADDING_BOTTOM_INFO', "Thumbnail Padding Bottom (value in pixels). Default value: 0. Set bottom padding value of a thumbnail.");
    define('DOPTG_THUMBNAIL_PADDING_LEFT_INFO', "Thumbnail Padding Left (value in pixels). Default value: 0. Set left padding value of a thumbnail.");

    define('DOPTG_IMAGE_LOADER_INFO', "Image Loader (path to image). Set the loader for the big image.");
    define('DOPTG_IMAGE_BG_COLOR_INFO', "Image Background Color (color hex code). Default value: afafaf. Set the color for the image background.");
    define('DOPTG_IMAGE_BG_ALPHA_INFO', "Image Background Alpha (value from 0 to 100). Default value: 100. Set the transparancy for the image background.");
    define('DOPTG_IMAGE_DISPLAY_TYPE_INFO', "Image Display Type (fit, full). Default value: fit. Set image display type. The fit value will display the all image. The full value will display the image on the all stage, padding and margin values will not be taken into consideration.");
    define('DOPTG_IMAGE_DISPLAY_TIME_INFO', "Image Display Time (time in miliseconds). Default value: 1000. Set image display duration.");
    define('DOPTG_IMAGE_MARGIN_TOP_INFO', "Image Margin Top (value in pixels). Default value: 20. Set top margin value for the image.");
    define('DOPTG_IMAGE_MARGIN_RIGHT_INFO', "Image Margin Right (value in pixels). Default value: 20. Set right margin value for the image.");
    define('DOPTG_IMAGE_MARGIN_BOTTOM_INFO', "Image Margin Bottom (value in pixels). Default value: 20. Set bottom margin value for the image.");
    define('DOPTG_IMAGE_MARGIN_LEFT_INFO', "Image Margin Left (value in pixels). Default value: 20. Set top left value for the image.");
    define('DOPTG_IMAGE_PADDING_TOP_INFO', "Image Padding Top (value in pixels). Default value: 5. Set top padding value for the image.");
    define('DOPTG_IMAGE_PADDING_RIGHT_INFO', "Image Padding Right (value in pixels). Default value: 5. Set right padding value for the image.");
    define('DOPTG_IMAGE_PADDING_BOTTOM_INFO', "Image Padding Bottom (value in pixels). Default value: 5. Set bottom padding value for the image.");
    define('DOPTG_IMAGE_PADDING_LEFT_INFO', "Image Padding Left (value in pixels). Default value: 5. Set left padding value for the image.");

    define('DOPTG_NAVIGATION_ENABLED_INFO', "Enable Navigation (true, false). Default value: true. Enable navigation buttons.");    
    define('DOPTG_NAVIGATION_OVER_IMAGE_INFO', "Navigation Over Image (true, false). Default value: true. Show navigation buttons over or outside the image.");
    define('DOPTG_NAVIGATION_PREV_INFO', "Navigation Previous Button Image (path to image). Upload the image for navigation's previous button.");
    define('DOPTG_NAVIGATION_PREV_HOVER_INFO', "Navigation Previous Button Hover Image (path to image). Upload the image for navigation's previous hover button.");
    define('DOPTG_NAVIGATION_NEXT_INFO', "Navigation Next Button Image (path to image). Upload the image for navigation's next button.");
    define('DOPTG_NAVIGATION_NEXT_HOVER_INFO', "Navigation Next Button Hover Image (path to image). Upload the image for navigation's next hover button.");
    define('DOPTG_NAVIGATION_LIGHTBOX_INFO', "Navigation Lightbox Button Image (path to image). Upload the image for navigation's lightbox button.");
    define('DOPTG_NAVIGATION_LIGHTBOX_HOVER_INFO', "Navigation Lightbox Button Hover Image (path to image). Upload the image for navigation's lightbox hover button.");
    define('DOPTG_NAVIGATION_TOUCH_DEVICE_SWIPE_ENABLED_INFO', "Swipe Navigation Enabled (true, false). Default value: true. Enable swipe navigation on touch devices.");

    define('DOPTG_CAPTION_WIDTH_INFO', "Caption Width (value in pixels). Default value: 900. Set caption width.");
    define('DOPTG_CAPTION_HEIGHT_INFO', "Caption Height (value in pixels). Default value: 75. Set caption height.");
    define('DOPTG_CAPTION_TITLE_COLOR_INFO', "Caption Title Color (color hex code). Default value: 000000. Set caption title color.");
    define('DOPTG_CAPTION_TEXT_COLOR_INFO', "Caption Text Color (color hex code). Default value: 000000. Set caption text color.");
    define('DOPTG_CAPTION_BG_COLOR_INFO', "Caption Background Color (color hex code). Default value: ffffff. Set caption background color.");
    define('DOPTG_CAPTION_BG_ALPHA_INFO', "Caption Background Alpha (value from 0 to 100). Default value: 50. Set caption alpha color.");
    define('DOPTG_CAPTION_POSITION_INFO', "Caption Position (top, right, bottom, left, top-left, top-right, bottom-left, bottom-right). Default value: bottom. Set caption position.");
    define('DOPTG_CAPTION_OVER_IMAGE_INFO', "Caption Over Image (true, false). Default value: true. Display caption over image, or not.");
    define('DOPTG_CAPTION_SCROLL_SCRUB_COLOR_INFO', "Caption Scroll Scrub Color (color hex code). Default value: 777777. Set scroll scrub color.");
    define('DOPTG_CAPTION_SCROLL_BG_COLOR_INFO', "Caption Scroll Background Color (color hex code). Default value: e0e0e0. Set scroll background color.");
    define('DOPTG_CAPTION_MARGIN_TOP_INFO', "Caption Margin Top (value in pixels). Default value: 0. Set caption top margin.");
    define('DOPTG_CAPTION_MARGIN_RIGHT_INFO', "Caption Margin Right (value in pixels). Default value: 0. Set caption right margin.");
    define('DOPTG_CAPTION_MARGIN_BOTTOM_INFO', "Caption Margin Bottom (value in pixels). Default value: 0. Set caption bottom margin.");
    define('DOPTG_CAPTION_MARGIN_LEFT_INFO', "Caption Margin Left (value in pixels). Default value: 0. Set caption left margin.");
    define('DOPTG_CAPTION_PADDING_TOP_INFO', "Caption Padding Top (value in pixels). Default value: 10. Set caption top padding.");
    define('DOPTG_CAPTION_PADDING_RIGHT_INFO', "Caption Padding Right (value in pixels). Default value: 10. Set caption right padding.");
    define('DOPTG_CAPTION_PADDING_BOTTOM_INFO', "Caption Padding Bottom (value in pixels). Default value: 10. Set caption bottom padding.");
    define('DOPTG_CAPTION_PADDING_LEFT_INFO', "Caption Padding Left (value in pixels). Default value: 10. Set caption left padding.");
    
    define('DOPTG_LIGHTBOX_ENABLED_INFO', "Enable Lightbox (true, false). Default value: true. Enable the lightbox.");
    define('DOPTG_LIGHTBOX_WINDOW_COLOR_INFO', "Lightbox Window Color (color hex code). Default value: 000000. Set the color for the lightbox window.");
    define('DOPTG_LIGHTBOX_WINDOW_ALPHA_INFO', "Lightbox Window Alpha (value from 0 to 100). Default value: 80. Set the transparancy for the lightbox window.");
    define('DOPTG_LIGHTBOX_LOADER_INFO', "Lightbox Loader (path to image). Set the loader for the lightbox image.");
    define('DOPTG_LIGHTBOX_BACKGROUND_COLOR_INFO', "Lightbox Background Color (color hex code). Default value: 000000. Set the color for the lightbox background.");
    define('DOPTG_LIGHTBOX_BACKGROUND_ALPHA_INFO', "Lightbox Background Alpha (value from 0 to 100). Default value: 100. Set the transparancy for the lightbox background.");
    define('DOPTG_LIGHTBOX_MARGIN_TOP_INFO', "Lightbox Margin Top (value in pixels). Default value: 70. Set top margin value for the lightbox.");
    define('DOPTG_LIGHTBOX_MARGIN_RIGHT_INFO', "Lightbox Margin Right (value in pixels). Default value: 70. Set right margin value for the lightbox.");
    define('DOPTG_LIGHTBOX_MARGIN_BOTTOM_INFO', "Lightbox Margin Bottom (value in pixels). Default value: 70. Set bottom margin value for the lightbox.");
    define('DOPTG_LIGHTBOX_MARGIN_LEFT_INFO', "Lightbox Margin Left (value in pixels). Default value: 70. Set top left value for the lightbox.");
    define('DOPTG_LIGHTBOX_PADDING_TOP_INFO', "Lightbox Padding Top (value in pixels). Default value: 10. Set top padding value for the lightbox.");
    define('DOPTG_LIGHTBOX_PADDING_RIGHT_INFO', "Lightbox Padding Right (value in pixels). Default value: 10. Set right padding value for the lightbox.");
    define('DOPTG_LIGHTBOX_PADDING_BOTTOM_INFO', "Lightbox Padding Bottom (value in pixels). Default value: 10. Set bottom padding value for the lightbox.");
    define('DOPTG_LIGHTBOX_PADDING_LEFT_INFO', "Lightbox Padding Left (value in pixels). Default value: 10. Set left padding value for the lightbox.");
    
    define('DOPTG_LIGHTBOX_NAVIGATION_PREV_INFO', "Lightbox Navigation Previous Button Image (path to image). Upload the image for lightbox navigation's previous button.");
    define('DOPTG_LIGHTBOX_NAVIGATION_PREV_HOVER_INFO', "Lightbox Navigation Previous Button Hover Image (path to image). Upload the image for lightbox navigation's previous hover button.");
    define('DOPTG_LIGHTBOX_NAVIGATION_NEXT_INFO', "Lightbox Navigation Next Button Image (path to image). Upload the image for lightbox navigation's next button.");
    define('DOPTG_LIGHTBOX_NAVIGATION_NEXT_HOVER_INFO', "Lightbox Navigation Next Button Hover Image (path to image). Upload the image for lightbox navigation's next hover button.");
    define('DOPTG_LIGHTBOX_NAVIGATION_CLOSE_INFO', "Lightbox Navigation Close Button Image (path to image). Upload the image for lightbox navigation's close button.");
    define('DOPTG_LIGHTBOX_NAVIGATION_CLOSE_HOVER_INFO', "Lightbox Navigation Close Button Hover Image (path to image). Upload the image for lightbox navigation's close hover button.");
    define('DOPTG_LIGHTBOX_NAVIGATION_INFO_BG_COLOR_INFO', "Lightbox Navigation Info Background Color (color hex code). Default value: 000000. Set the color for the lightbox info background.");
    define('DOPTG_LIGHTBOX_NAVIGATION_INFO_TEXT_COLOR_INFO', "Lightbox Navigation Info Text Color (color hex code). Default value: dddddd. Set the color for the lightbox info text.");
    define('DOPTG_LIGHTBOX_NAVIGATION_TOUCH_DEVICE_SWIPE_ENABLED_INFO', "Swipe Lightbox Navigation Enabled (true, false). Default value: true. Enable swipe lightbox navigation on touch devices.");

    define('DOPTG_SOCIAL_SHARE_ENABLED_INFO', "Social Share Enabled (true, false). Default value: true. Enable AddThis Social Share.");
    define('DOPTG_SOCIAL_SHARE_INFO', "Social Share Button Image (path to image). Upload the image for social share button.");
    define('DOPTG_SOCIAL_SHARE_LIGHTBOX_INFO', "Lightbox Social Share Button Image (path to image). Upload the image for lightbox social share button.");

    define('DOPTG_TOOLTIP_ENABLED_INFO', "Tooltip Enabled (true, false). Default value: false. Enable the tooltip. The gallery item needs to have a title for tooltip to work.");
    define('DOPTG_TOOLTIP_BG_COLOR_INFO', "Tooltip Background Color (color hex code). Default value: ffffff. Set tooltip background color.");
    define('DOPTG_TOOLTIP_STROKE_COLOR_INFO', "Tooltip Stroke Color (color hex code). Default value: 000000. Set tooltip stroke color.");
    define('DOPTG_TOOLTIP_TEXT_COLOR_INFO', "Tooltip Text Color (color hex code). Default value: 000000. Set tooltip text color.");

    define('DOPTG_SLIDESHOW_INFO', "Slideshow (true, false). Default value: false. Enable or disable the slideshow.");
    define('DOPTG_SLIDESHOW_TIME_INFO', "Slideshow Time (time in miliseconds). Default: 5000. How much time an image stays until it passes to the next one.");
    define('DOPTG_SLIDESHOW_AUTOSTART_INFO', "Slideshow Autostart (true, false). Default: true. Set it to true if you want the slideshow to start after imediatly after gallery is displayed.");
    define('DOPTG_SLIDESHOW_LOOP_INFO', "Slideshow Loop (true, false). Default: true. Set it to false if you want the slideshow to stop when it reaches the last image.");
    define('DOPTG_SLIDESHOW_PLAY_INFO', "Slideshow Play Button Image (path to image). Upload the image for slideshow's play button.");
    define('DOPTG_SLIDESHOW_PLAY_HOVER_INFO', "Slideshow Play Button Hover Image (path to image). Upload the image for slideshow's play hover button.");
    define('DOPTG_SLIDESHOW_PAUSE_INFO', "Slideshow Pause Button Image (path to image). Upload the image for slideshow's pause button.");
    define('DOPTG_SLIDESHOW_PAUSE_HOVER_INFO', "Slideshow Pause Button Hover Image (path to image). Upload the image for slideshow's pause hover button.");

    define('DOPTG_AUTO_HIDE_INFO', "Auto Hide Thumbnails and Buttons (true, false). Default: false. Hide the thumbnails and buttons and display them when you hover the gallery.");
    define('DOPTG_AUTO_HIDE_TIME_INFO', "Auto Hide Time (time in miliseconds). Default: 2000. Set the time after which the thumbnails and buttons hide.");

    // Help
    define('DOPTG_TITLE_HELP', 'Help');
    
    $DOPTG_help_info = array(
        array(
            'question' => 'How do I install the gallery?',
            'answer' => '<iframe width="640" height="360" src="http://www.youtube.com/embed/_QcJ2lUPuts?hl=en_US&emp;vq=hd1080" frameborder="0" allowfullscreen></iframe>'
        ),
        array(
            'question' => 'How do I create a gallery and add images to it?',
            'answer' => '<iframe width="640" height="360" src="http://www.youtube.com/embed/P09WcHXQJr4?hl=en_US&emp;vq=hd1080" frameborder="0" allowfullscreen></iframe>'
        ),
        array(
            'question' => 'How do I create a new thumbnail?',
            'answer' => '<iframe width="640" height="360" src="http://www.youtube.com/embed/jx9XsA9-XwU?hl=en_US&emp;vq=hd1080" frameborder="0" allowfullscreen></iframe>'
        ),
        array(            
            'question' => 'How do I add media to a gallery item? Embed videos (YouTube, Vimeo, ...), add HTML code, ...',
            'answer' => '<iframe width="640" height="360" src="http://www.youtube.com/embed/ncQIPdYUNXc?hl=en_US&emp;vq=hd1080" frameborder="0" allowfullscreen></iframe>'
        ),
        array(
            'question' => 'How do I change gallery settings? (Some examples)',
            'answer' => '<iframe width="640" height="360" src="http://www.youtube.com/embed/OKv4WpOFZjg?hl=en_US&emp;vq=hd1080" frameborder="0" allowfullscreen></iframe>'
        ),
        array(
            'question' => 'How can I integrate this admin into my own CMS?',
            'answer' => 'You change the session condition in <strong>doptg/admin/index.php</strong>.'
        ),
        array(
            'question' => 'Why I can\'t upload images to my gallery?',
            'answer' => 'Make sure that folders <strong>doptg/uploads/</strong> with <strong>all subfolders</strong> inside it & <strong>doptg/data/</strong> have the permissions set to <strong>777</strong>. If the folder has the right permissions try another upload method from the ones provided (AJAX, Uploadify, FTP).'
        ),
        array(
            'question' => 'Why don\'t the images appear after upload is complete?',
            'answer' => 'Make sure that you have the GD Library enabled in PHP.'
        ),
        array(
            'question' => 'Why I receive an IO Error when I upload images using Uploadify?',
            'answer' => 'The IO Error is a Flash error caused when the upload connection gets cut short. Usually happens with slow internet connections.'
        ),
        array(
            'question' => 'Why doesn\'t the gallery show in my website?',
            'answer' => '1. If the gallery doesn\'t show it might be because there is a problem with the JavaScript in your website. If you can\'t identify the problem <a href="mailto:me@mariuscristiandonea.com">contact me</a> with a link. I will identify the problem for you, but I will not fix the problems that aren\'t caused by this plugin.<br />
                         2. Another reason might be that you load more than one jQuery file into your theme. The proper way to load jQuery into your theme or plugin is:<br />
                         &nbsp;&nbsp;&nbsp;&nbsp;<font style="font-size:11px; font-weight:bold;"> if (!wp_script_is(\'jquery\', \'queue\')){<br />
                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;wp_enqueue_script(\'jquery\');<br />
                         &nbsp;&nbsp;&nbsp;&nbsp;} </font>'
        ),
        array(
            'question' => 'How do I change the language?',
            'answer' => 'You can change the translation in the file <strong>doptg/admin/assets/php/translation.php</strong>.'
        ),
        array(
            'question' => 'Known issues',
            'answer' => '1. On <strong>localhost</strong> servers, depending on the configuration admin might be slow, you will not be able to upload pictures, ...<br />
                         2. Uploadify will not display the progress bar and image processing will go slower if you have a firewall enabled.<br />
                         3. On some servers the images names that contain other characters different from alphanumeric ones will not be uploaded. Change the names for them to work.<br />
                         4. The Back End section has some display issues in IE 7 (please update to a new version).'
        ),
        array(
            'question' => 'What I can do when nothing works?',
            'answer' => '<a href="mailto:support@dotonpaper.zendesk.com">Contact our Support Team :)</a><br />
                         <br />
                         Before we can offer support we will need to <strong>confirm your purchase</strong>. The reason for this is because we receive a lot of support requests from people that get the items from other sites and is a great way to sort the tickets and offer faster support to the actual buyers.<br />
                         <br />
                         There are 2 ways to do this:<br>
                         1. Send us a Private Message from our <a href="http://bit.ly/TJUoXX" target="_blank">Profile Page</a> ... the right-bottom form. If you don’t see it you need to Sign In into your Envato Account.<br>
                         2. Send your Envato Username &amp; Item Purchase Code that came with the Licence Certificate when you bought the item to our <a href="mailto:support@dotonpaper.zendesk.com">Support Team</a>. You can get it from CodeCanyon -&gt; Sign In into your Account -&gt; Downloads -&gt; Licence Certificate on the purchased item.<br />
                         <br />
                         <strong>Please add in your message</strong> a link were you use the item, admin and/or FTP log in info, or any other stuff that might be relevant.<br />
                         <br />
                         We will try to answer your questions in less than 48 hours. If you don’t receive an answer in 48 hours please view our <a href="http://bit.ly/TJUoXX" target="_blank">Profile Page</a> for a reason.'
        )
    )

?>