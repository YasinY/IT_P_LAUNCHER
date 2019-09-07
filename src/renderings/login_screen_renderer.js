const { ipcRenderer } = require('electron')
const button = document
    .getElementsByClassName("btn btn-primary btn-lg")
    .item(0);



button.addEventListener('click', () => {
    //app.getCurrentWindow().loadFile()
   // const username = $('input[type=text]').val();
    //const password = $('input[type=password]').val();
    ipcRenderer.send('login', "test", "test")
   /// app.getCurrentWindow().loadFile(app.getGlobal("paths").views + "loading.html")
})

//$("logo").attr("src", "./assets/images/logo.png")




