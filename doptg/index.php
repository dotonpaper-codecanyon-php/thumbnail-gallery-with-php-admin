<?php

    if (isset($_GET['gallery_id'])){
        $DOPTG_load_scripts = true;
    }
    include_once 'config.php';

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Thumbnail Gallery (with PHP Admin)</title>
        
        <link rel="stylesheet" type="text/css" href="<?php echo DOPTG_URL; ?>doptg/libraries/gui/css/jquery.jscrollpane.css" />
        <link rel="stylesheet" type="text/css" href="<?php echo DOPTG_URL; ?>doptg/assets/gui/css/jquery.dop.ThumbnailGallery.css" />
        
        <script type="text/JavaScript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
        <script type="text/JavaScript" src="<?php echo DOPTG_URL; ?>doptg/libraries/js/jquery.mousewheel.js"></script>
        <script type="text/JavaScript" src="<?php echo DOPTG_URL; ?>doptg/libraries/js/jquery.jscrollpane.min.js"></script>
        <script type="text/JavaScript" src="<?php echo DOPTG_URL; ?>doptg/assets/js/jquery.dop.ThumbnailGallery.js"></script>
        <script type="text/JavaScript">
            $(document).ready(function(){
                $('#DOPThumbnailGalleryContainer').DOPThumbnailGallery({'URL': '<?php echo DOPTG_URL; ?>', 'SettingsFilePath': '<?php echo DOPTG_URL; ?>doptg/data/settings<?php echo $_GET['gallery_id']; ?>.json', 'ContentFilePath': '<?php echo DOPTG_URL; ?>doptg/data/content<?php echo $_GET['gallery_id']; ?>.json'});
            });
        </script>
                         
        <script type="text/JavaScript">   
        //<!--
            function clickIE4(){ 
                if (event.button == 2){ 
                    return false; 
                } 
            } 
            
            function clickNS4(e){ 
                if (document.layers || document.getElementById && !document.all){ 
                    if (e.which==2||e.which==3){ 
                        return false; 
                    } 
                } 
            } 
            
            if (document.layers){
                document.captureEvents(Event.MOUSEDOWN); 
                document.onmousedown = clickNS4; 
            } 
            else if (document.all && !document.getElementById){ 
                document.onmousedown = clickIE4;
            } 
            
            document.oncontextmenu = new Function("return false") ;
        // --> 
        </script>
    </head>
    <body style="margin:0px; padding:0px;">
        <div id="DOPThumbnailGalleryContainer"></div>
    </body>
</html>