var actual;
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
function cambiar_foto(){
limpiar();
$('#cambiar_foto').css("display","block");
$('#boton_foto').css("background","#333333");
}
function seleccionar_foto(f){
    actual=f;
    var button = $('.perfil');
    for(var i=0; i<button.length; i++) {
        $(button[i]).css("background", "#fff");
        $(button[i]).css("opacity", ".6");
    }
    $('#'+f).css("background", "#8eff8e");
    $('#'+f).css("opacity", "1");
}
function guardar_foto(){
    $('#'+actual).css("background", "#fff");
    limpiar();
}
function limpiar(){
    var button = $('.login100-form-btn');
    for(var i=0; i<button.length; i++) {
        $(button[i]).css("background", "#57b846")
    }
    $('#ranking').css("display","none");
    $('#cambiar_contraseña').css("display","none");
    $('#cambiar_foto').css("display","none");

}