botonAñadir1.onclick = function(){
  var te=typeEstimado.value;
  var tr=typeReal.value;
  var resultado=0;
  if(te>tr){
     resultado = te-tr;
     if(resultado<0){
       resultado=resultado*(-1);
     }
     
  }
  else if(te<tr){ 
     resultado = tr-te;
     if(resultado<0){
      resultado=resultado*(-1);
    }
     
  } 
  else if(te==tr){
    resultado=0;
  }
  var divsaludar=document.getElementById("hola")
  divsaludar.innerText= ("Total: "+resultado)
}
