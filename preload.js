const {ipcRenderer, contextBridge} = require('electron')

contextBridge.exposeInMainWorld(
    'transmision',
    {
        enviaFecha: (fecha) => ipcRenderer.send('enviaFecha', fecha),
        //enviaResultado:(datos) => ipcRenderer.on('enviaResultado', datos),
        recibeFecha: (regresaFecha) => ipcRenderer.on('recibeFecha', regresaFecha),
        recibeTemperatura: (temperatura) => ipcRenderer.on('recibeTemperatura', temperatura),
        recibeClimaManana: (cliManana) => ipcRenderer.on('recibeClimaManana', cliManana),
        recibeClimaTarde: (cliTarde) => ipcRenderer.on('recibeClimaTarde', cliTarde),
        recibeClimaNoche: (cliNoche) => ipcRenderer.on('recibeClimaNoche', cliNoche),
        recibeOtroDia: (cliOtro) => ipcRenderer.on('recibeOtroDia', cliOtro),
        recibeComparaFecha: (mismo) => ipcRenderer.on('recibeComparaFecha', mismo)
    }
)