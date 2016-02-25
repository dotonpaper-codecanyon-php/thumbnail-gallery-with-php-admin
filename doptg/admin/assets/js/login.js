
/*
* Title                   : Thumbnail Gallery (with PHP Admin)
* Version                 : 1.3
* File                    : login.js
* File Version            : 1.0
* Created / Last Modified : 15 April 2012
* Author                  : Dot on Paper
* Copyright               : © 2012 Dot on Paper
* Website                 : http://www.dotonpaper.net
* Description             : Login Scripts.
*/

$(document).ready(function(){
    $('#wrapper').css('height', $(window).height());
    $('#DOPTG_Login').css('margin-left', $(window).width());
    $('#DOPTG_Login').css('margin-top', ($(window).height()-$('#DOPTG_Login').height())/2-30);
    $('#DOPTG_Login').css('display', 'block');
    $('#DOPTG_Login').stop(true, true).animate({'margin-left':($(window).width()-$('#DOPTG_Login').width())/2}, 600, function(){
        $('#DOPTG_Info').stop(true, true).fadeIn(600);
    });

    $(window).resize(function(){
        $('#wrapper').css('height', $(window).height());
        $('#DOPTG_Login').css({'margin-left': ($(window).width()-$('#DOPTG_Login').width())/2,
                               'margin-top': ($(window).height()-$('#DOPTG_Login').height())/2-30});
    })
});

function login(){    
    disableForm(true);

    $('#DOPTG_Info').fadeOut(400, function(){ 
        $('#DOPTG_Info .info_icon .info').css('display', 'none');
        $('#DOPTG_Info .info_icon .loader').css('display', 'block');        
        $('#DOPTG_Info .info_message .info').css('display', 'none');
        $('#DOPTG_Info .info_message .success').css('display', 'none');
        $('#DOPTG_Info .info_message .error').css('display', 'none');
        $('#DOPTG_Info .info_message .processing').css('display', 'block');
        
        $('#DOPTG_Info').fadeIn(400, function(){
            $.post('assets/php/login.php', {username: $('#username').val(), password:$('#password').val()}, function(data){
                data = $.trim(data);
                
                if (data == 'success'){                    
                    $('#DOPTG_Info').fadeOut(400, function(){
                        $('#DOPTG_Info .info_icon .info').css('display', 'block');
                        $('#DOPTG_Info .info_icon .loader').css('display', 'none');        
                        $('#DOPTG_Info .info_message .info').css('display', 'none');
                        $('#DOPTG_Info .info_message .success').css('display', 'block');
                        $('#DOPTG_Info .info_message .error').css('display', 'none');
                        $('#DOPTG_Info .info_message .processing').css('display', 'none');
                        
                        $('#DOPTG_Info').fadeIn(400, function(){
                            location.reload();
                        });
                    });
                }
                else{
                    disableForm(false);

                    $('#DOPTG_Info').fadeOut(400, function(){
                        $('#username').val('');
                        $('#password').val('');
                        $('#DOPTG_Info .info_icon .info').css('display', 'block');
                        $('#DOPTG_Info .info_icon .loader').css('display', 'none');        
                        $('#DOPTG_Info .info_message .info').css('display', 'none');
                        $('#DOPTG_Info .info_message .success').css('display', 'none');
                        $('#DOPTG_Info .info_message .error').css('display', 'block');
                        $('#DOPTG_Info .info_message .processing').css('display', 'none');
                        $('#DOPTG_Info').fadeIn(400);
                    });
                }
            });
        });
    });

    return false;
}

function disableForm(val){
    $('#username').attr('disabled', val);
    $('#password').attr('disabled', val);
    if (val){
        $('#submit').css('cursor', 'default');
    }
    else{
        $('#submit').css('cursor', 'pointer');
    }
    $('#submit').attr('disabled', val);
}