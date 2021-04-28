botonAñadir.onclick = function(){
  var resultado = typeMontoEstimado.value-typeMontoReal.value;
  alert("esto es algo de "+resultado);
  var divsaludar=document.getElementById("hola")
  divsaludar.innerText= ("Total: "+resultado)
}
