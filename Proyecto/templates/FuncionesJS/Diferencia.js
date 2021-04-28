botonAñadir1.onclick = function(){
  var resultado = typeEstimado.value-typeReal.value;
  var divsaludar=document.getElementById("hola")
  divsaludar.innerText= ("Total: "+resultado)
}
