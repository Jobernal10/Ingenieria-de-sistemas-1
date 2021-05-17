botonAñadir.onclick = function(){
    var tabla=  document.getElementById("tablaPresupuesto");
    //alert("SE ACTIVO ESTA MONDA9: "+ tabla.rows.length)
    //alert(parseInt(tabla.rows[2].cells[3].innerText) + parseInt(tabla.rows[1].cells[3].innerText) )
    var suma=0;
    for (let i =  1; i < tabla.rows.length; i++) {

      //alert("iteracion "+i+"valor "+ parseInt(tabla.rows[i].cells[3].innerText))
      valor= parseInt(tabla.rows[i].cells[3].innerText)
    suma=suma+valor;
    }
    //alert("Total es: "+ suma)
    var divsaludar=document.getElementById("SumaReal")
  divsaludar.innerText= ("Total: "+suma)
}