var redis = require('redis');
var client = redis.createClient(); // this creates a new client

function insertSession(session)
{
  console.log('insertSession ::redis_face::.');
  //console.log("Iniciando insert en REDIS:::::: ");
  //console.log(":::.. "+JSON.stringify(session));
  let sesionAGuardar=[];
  for (var i in session) {
    sesionAGuardar.push(i);
    sesionAGuardar.push(session[i]);    
  }
// inicio redis
  const key = sesionAGuardar[1];
  const result = client.set(key,JSON.stringify(session));
  //console.log("Finalizando insert en REDIS:::::: "+result);
 // fin redis
}


let getSessionLogin = (uniqueid,agente) =>{
  return new Promise((res,rej) =>{
    
    client.keys('*', function(err, object) {   
      console.log('getSessionLogin 1- ::redis_face::.' + JSON.stringify(object)+"\n");   
      for (var i in object) {
        getSession(object[i]).then((resultado)=>{                        
            var result = JSON.parse(resultado);       
            console.log('getSessionLogin 2- ::redis_face::.' + JSON.stringify(resultado));
            if(result.agente === agente){   
              console.log('getSessionLogin 3- ::redis_face::.' + JSON.stringify(resultado) + ' result.agente '+result.agente + ' result.ip '+result.ip +' uniqueid ' + uniqueid);
              if(result.ip !== undefined || result.ip !== '' || result.ip !== 'undefined'){
                client.del(result.ip);              
              }                       
              else{
                client.del(uniqueid);
              }
            }
            if(result.uniqueid == uniqueid){
              //console.log("getSessionLogin:::::: "+result.ip);
              var SendRedisSessionUpdate = {ip:result.ip, agente:agente,estado:'DISPONIBLE',idSocket:result.idSocket,fecha:fecha, campania:'',uniqueid:uniqueid};              
                return res(SendRedisSessionUpdate);
            }  
            
            
        },(error)=>{ return rej("error al procesar: error: "+error);
        });        
      }
    });
  });
}


let getSession = (ip) =>{
  return new Promise((res,rej) =>{
    client.get(ip, function(err, object) {
      console.log('getSession ::redis_face::.');
      if(object != '' || object != undefined){ 
       // var iprecibida=JSON.parse(object);
        console.log('\ngetSession parte1'+JSON.stringify(object))

        return res(object); 
      }
      else{ return rej("error al procesar"); }      
    });
  });
}

let getSessionAgente = (campania,agente) =>{
  return new Promise((res,rej) =>{
    client.keys('*', function(err, object) {
      for (var i in object) {                      
        getSession(object[i]).then((resultado)=>{                        
            var result = JSON.parse(resultado);          
            console.log('getSessionAgente ::redis_face::.'+agente);
            if(result.agente == agente){
              //console.log("getSessionAgente:::::: agente: "+agente + ' campania: '+campania);
              var SendRedisSessionUpdateAgente = {ip:result.ip, agente:agente,estado:result.estado,idSocket:result.idSocket,fecha:fecha, campania:result.campania,uniqueid:result.uniqueid};                            
              return res(SendRedisSessionUpdateAgente);
            }                                               
        },(error)=>{ return rej("error al procesar: error: "+error);
        });        
      }
    });
  });
}

let getSessionLogoff = (uniqueid, agente) =>{
  return new Promise((res,rej) =>{
    client.keys('*', function(err, object) {      
      for (var i in object) {
        getSession(object[i]).then((resultado)=>{                        
            var result = JSON.parse(resultado);           
            if(result.uniqueid == uniqueid){
            //  console.log("getSessionLogoff:::::: "+result.ip);
            console.log('getSessionLogoff ::redis_face::.');
            client.del(result.ip); 
            //SendRedisSessionUpdate='logoff';          
              var SendRedisSessionUpdate = {ip:result.ip, agente:agente,estado:'LOGOFF',idSocket:result.idSocket,fecha:result.fecha, campania:result.campania,uniqueid:uniqueid};              
                return res(SendRedisSessionUpdate);
            }                                               
        },(error)=>{ return rej("error al procesar: error: "+error);
        });        
      }
    });
  });
}

let getSessionAgenteLogin = (agente) =>{
  return new Promise((res,rej) =>{
    client.keys('*', function(err, object) {
      for (var i in object) {                      
        getSession(object[i]).then((resultado)=>{                        
            var result = JSON.parse(resultado);          
            console.log('getSessionAgenteLogin!. ::redis_face::.'+JSON.stringify(resultado));
            if(result.agente == agente){
              console.log("getSessionAgenteLogin!!!!!!!!!!!!!!!!!....:::::: agente: "+agente + ' campania: '+JSON.stringify(resultado));
              var SendRedisSessionUpdateAgente = {ip:result.ip, agente:agente,estado:result.estado,idSocket:result.idSocket,fecha:fecha, campania:result.campania,uniqueid:result.uniqueid};                            
              return res(SendRedisSessionUpdateAgente);
            }                                               
        },(error)=>{ return rej("error al procesar: error: "+error);
        });        
      }
    });
  });
}

function insertCall(call)
{
  console.log('insertCall ::redis_face::.');
  let llamadaAGuardar=[];
  for (var i in call) {
    llamadaAGuardar.push(i);
    llamadaAGuardar.push(call[i]);    
  }
// inicio redis
  const key = llamadaAGuardar[1];
  const result = client.set(key,JSON.stringify(call));

}

let getCall = (uniqueid) =>{
  return new Promise((res,rej) =>{
    client.get(uniqueid, function(err, object) {
      console.log('getCall ::redis_face::.'+uniqueid);
      if(object != '' || object != undefined){ 
       // var iprecibida=JSON.parse(object);
        console.log('\getCall parte1'+JSON.stringify(object))

        return res(object); 
      }
      else{ return rej("error al procesar"); }      
    });
  });
}

let delCall = (uniqueid) =>{
  return new Promise((res,rej) =>{
    let resultado = client.del(uniqueid);  
    console.log('delCall ::redis_face::.'); 
    res(resultado);

  });
}
let delSession = (ip) =>{
  return new Promise((res,rej) =>{
    let resul = client.del(ip);  
    console.log('delSession ::redis_face::. 1 '+ip); 
    console.log('delSession ::redis_face::. 2 '+resul); 
    res(resul);

  });
}


exports.insertCall=insertCall;
exports.getCall=getCall;
exports.delCall=delCall;
exports.delSession=delSession;
exports.insertSession=insertSession;
exports.getSessionAgenteLogin=getSessionAgenteLogin;
exports.getSession=getSession;
exports.getSessionAgente=getSessionAgente;
exports.getSessionLogin=getSessionLogin;
exports.getSessionLogoff=getSessionLogoff;

