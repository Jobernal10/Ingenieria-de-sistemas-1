
botonAñadir.onclick = function(){
    var tabla=  document.getElementById("tablaPresupuesto");
    alert("SE ACTIVO ESTA MONDA5: "+ tabla.rows.length)
    alert(parseInt(tabla.rows[2].cells[3].innerText) + parseInt(tabla.rows[1].cells[3].innerText) )
    var suma=0;
    for (let i = 0; i < tabla.rows.length; i++) {
        str = str + i;
      valor= parseInt(tabla.rows[i].cells[3].innerText)
    suma=suma+valor;
    }
    var divsaludar=document.getElementById("Ttabla")
  divsaludar.innerText= ("Total: "+suma)
alert("Total es: "+ suma)
}