const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

var climaOtro;
var climaHoyManana;
var climaHoyTarde;
var climaHoyNoche;

let ventana;

function createWindow(){
    ventana = new BrowserWindow({
        width: 400,
        height: 500,
        webPreferences:{
            preload: path.join(app.getAppPath(),'preload.js')
        }
    })
    ventana.loadFile('index.html')
}

ipcMain.on('enviaFecha', function(event, args){
    var randomOtroDia = Math.floor(Math.random() * 3) + 1;
    var randomHoyManana = Math.floor(Math.random() * 3) + 1;
    var randomHoyTarde = Math.floor(Math.random() * 3) + 1;
    var randomHoyNoche = Math.floor(Math.random() * 3) + 1;
    var randomTemp = Math.floor(Math.random() * 30) + 5;
    console.log(randomTemp)

    var hoy = new Date ();
    let fechaUsuario = new Date(args);
    let mismaFecha = false;
    console.log(fechaUsuario)
  
    // IF que compara si es la fecha de hoy u otra fecha
    if(hoy.getDate() == fechaUsuario.getDate()+1){
        if(hoy.getFullYear() == fechaUsuario.getFullYear()){
            mismaFecha = true;
            console.log(mismaFecha)
            console.log('igual')
        }
        else{
            mismaFecha = false;
            console.log(mismaFecha)
            console.log('differente')
        }
    }else{
        mismaFecha = false;
        console.log(mismaFecha)
        console.log('differente')
    }


    //generamos climas aleatorios y los enviamos a la interfaz.
    if (mismaFecha){
        //generamos valor aleatorio para la manana de hoy
        switch(randomHoyManana){
            case 1:
                climaHoyManana = 'Despejado';
            break;
            case 2:
                climaHoyManana = 'Nublado';
            break;
            case 3:
                climaHoyManana = 'Lluvioso';
            break;
        }
        //generamos valor aleatorio para la tarde de hoy
        switch(randomHoyTarde){
            case 1:
                climaHoyTarde = 'Despejado';
            break;
            case 2:
                climaHoyTarde = 'Nublado';
            break;
            case 3:
                climaHoyTarde = 'Lluvioso';
            break;
        }
        //generamos valor aleatorio para la noche de hoy
        switch(randomHoyNoche){
            case 1:
                climaHoyNoche = 'Despejado';
            break;
            case 2:
                climaHoyNoche = 'Nublado';
            break;
            case 3:
                climaHoyNoche = 'Lluvioso';
            break;
        }   
        /* 
        -- se envia com un objeto?
        -- no hay una funcion similar a setConverter (java) en javascript
        ventana.webContents.send('enviaResultado',([climaHoyManana, climaHoyTarde, climaHoyManana ]))            
        */
        console.log(fechaUsuario)
        ventana.webContents.send('recibeFecha',fechaUsuario)
        ventana.webContents.send('recibeTemperatura', randomTemp)
        ventana.webContents.send('recibeClimaManana',climaHoyManana)
        ventana.webContents.send('recibeClimaTarde',climaHoyTarde)
        ventana.webContents.send('recibeClimaNoche',climaHoyNoche)
        ventana.webContents.send('recibeComparaFecha',mismaFecha)
        

    }else{
        switch(randomOtroDia){
            case 1:
                climaOtro = 'Despejado';
            break;
            case 2:
                climaOtro = 'Nublado';
            break;
            case 3:
                climaOtro = 'Lluvioso';
            break;
        }
        console.log(fechaUsuario)
        ventana.webContents.send('recibeFecha',fechaUsuario)
        ventana.webContents.send('recibeTemperatura', randomTemp)
        ventana.webContents.send('recibeOtroDia',climaOtro)
        ventana.webContents.send('recibeComparaFecha',mismaFecha)
    }
   
})

app.whenReady().then(createWindow);