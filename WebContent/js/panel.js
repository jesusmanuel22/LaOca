function ranking(){
limpiar();
$('#ranking').css("display","block");
$('#boton_ranking').css("background","#333333");
}
function cambiar_contraseña(){
limpiar();
$('#cambiar_contraseña').css("display","block");
$('#boton_cambiar').css("background","#333333");
}
function limpiar(){
    var button = $('.login100-form-btn');
    for(var i=0; i<button.length; i++) {
        $(button[i]).css("background", "#57b846")
    }
    $('#ranking').css("display","none");
    $('#cambiar_contraseña').css("display","none");
}