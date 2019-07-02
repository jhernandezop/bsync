

let transform = () =>{
  return new Promise((res,rej) =>{
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1;
    var yyyy = hoy.getFullYear();
    var HH = hoy.getHours();
    var MM = hoy.getMinutes();
    var SS = hoy.getSeconds();
    if(mm.toString().length == 1){
      mm="0"+mm;
    }
    if(dd.toString().length == 1){
      dd="0"+dd;
    }
    if(HH.toString().length == 1){
      HH="0"+HH;
    }
    if(MM.toString().length == 1){
      MM="0"+MM;
    }
    if(SS.toString().length == 1){
      SS="0"+SS;
    }

      if(hoy != '' || hoy != undefined){
        fecha = yyyy+'-'+mm+'-'+dd+' '+HH+':'+MM+':'+SS;
        //res(prueba);
        res(fecha);
      }
      else{
        rej("error al procesar");
      }
      
    });
  }




exports.transform=transform;


