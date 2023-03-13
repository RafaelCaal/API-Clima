var leerConsulta = document.getElementById('consulta')
var leerFecha = document.getElementById('fecha')
var labelTitulo = document.getElementById('tituloFecha')
var labelFecha = document.getElementById('fechaConsulta')
var labelTemperatura = document.getElementById('temperatura')
var labelHoyManana = document.getElementById('climaHoyManana')
var labelHoyTarde = document.getElementById('climaHoyTarde')
var labelHoyNoche = document.getElementById('climaHoyNoche')
var labelOtroDia = document.getElementById('climaOtroDia')

var formatoFecha = new Date (leerFecha.value)

/* 
Funcion Asincronica de Callback, se comunicara con 
el servidor enviando la fecha seleccionada por el usuario
*/
leerConsulta.addEventListener('submit', function(operafecha){
    //en cada solicitud limpiamos las etiquetas
    labelFecha.innerHTML = ""
    labelTemperatura.innerHTML = ""
    labelHoyManana.innerHTML = ""
    labelHoyTarde.innerHTML = ""
    labelHoyNoche.innerHTML = ""
    labelOtroDia.innerHTML = ""
    
    //pausamos el formulario
    operafecha.preventDefault();
    console.log(leerFecha.value);
    
    //enviamos la fecha a al servidor
    window.transmision.enviaFecha(leerFecha.value)
})

//Funcion asincronica para simular tiempo de respuesta del servidor
setTimeout(()=>{
    /*
Chromium imprime en pantalla una fecha incorrecta substrayendo 1 dia
por esto se ha realizado el sguiente modulo para reparar 
este inconveniente. 
*/
window.transmision.recibeFecha(function(event,args){
    var fech = new Date(args)
    var temp = fech.getDate()
    var fech2 = fech.setDate(temp+1)
    //labelTitulo.innerHTML = "FECHA"
    labelFecha.innerHTML = fech
})

window.transmision.recibeComparaFecha(function(event,args){
    if(args == true){
        labelTitulo.innerHTML = "HOY"
    }else{
        labelTitulo.innerHTML = "FECHA"
    }
})

//llenamos las etiquetas
window.transmision.recibeTemperatura(function(event,args){
    labelTemperatura.innerHTML = args + " Grados Celcius"
})
window.transmision.recibeClimaManana(function(event,args){
    labelHoyManana.innerHTML = " Por la manana &ensp;" + args  
})
window.transmision.recibeClimaTarde(function(event,args){
    labelHoyTarde.innerHTML =  " Por la tarde &ensp;" + args  
})
window.transmision.recibeClimaNoche(function(event,args){
    labelHoyNoche.innerHTML = " Por la noche &ensp;" + args  
})
window.transmision.recibeOtroDia(function(event,args){
    labelOtroDia.innerHTML = args 
    var divImagen = document.getElementById('imagen');
    divImagen.innerHTML = ""
    
    if(args == "Despejado"){
        var elem = document.createElement("img");
        elem.setAttribute("src", "https://images.pexels.com/photos/96622/pexels-photo-96622.jpeg");
        elem.setAttribute("height", "60");
        elem.setAttribute("width", "350");
        elem.setAttribute("alt", "Flower");
        document.getElementById("imagen").appendChild(elem);
    }
    if(args == "Nublado"){
        var elem = document.createElement("img");
        elem.setAttribute("src", "https://images.pexels.com/photos/3816393/pexels-photo-3816393.jpeg");
        elem.setAttribute("height", "60");
        elem.setAttribute("width", "350");
        elem.setAttribute("alt", "Flower");
        document.getElementById("imagen").appendChild(elem);
    } 
    if(args == "Lluvioso"){
        var elem = document.createElement("img");
        elem.setAttribute("src", "https://images.pexels.com/photos/4297438/pexels-photo-4297438.jpeg");
        elem.setAttribute("height", "60");
        elem.setAttribute("width", "350");
        elem.setAttribute("alt", "Flower");
        document.getElementById("imagen").appendChild(elem);
    } 

})



},3000)
