const form3 = document.getElementById("flujodecajareal");

form3.addEventListener("submit", function (event) {
  event.preventDefault();
  let transactionFormDataReal = new FormData(form3);
  let transactionObjReal = convertFormDataToTransactionObjReal(transactionFormDataReal)
  saveTransactionObjReal(transactionObjReal)
  insertRowInTransactionTableReal(transactionObjReal)
  form3.reset();
})

document.addEventListener("DOMContentLoaded", function (event) {
  let transactionObjArrReal = JSON.parse(localStorage.getItem("storageReal"))
  transactionObjArrReal.forEach(
    function (arrayElement) {
      insertRowInTransactionTableReal(arrayElement)
    });
})

function getNewTransactionIdReal() { //REDITAR NOMAS ESTO
  let lastTransactionIdReal = localStorage.getItem("lastTransactionIdReal") || "0"
  let newTransactionIdReal = JSON.parse(lastTransactionIdReal) + 1;
  localStorage.setItem("lastTransactionIdReal", JSON.stringify(newTransactionIdReal))
  return newTransactionIdReal;
}

function convertFormDataToTransactionObjReal(transactionFormDataReal) {
  let typeGasto = transactionFormDataReal.get("typeGasto")
  let typeFecha = transactionFormDataReal.get("typeFecha")
  let typeCategoria = transactionFormDataReal.get("typeCategoria")
  let typeCantidad = transactionFormDataReal.get("typeCantidad")
  let transactionIdReal = getNewTransactionIdReal();

  return {
    "typeGasto": typeGasto,
    "typeFecha": typeFecha,
    "typeCategoria": typeCategoria,
    "typeCantidad": typeCantidad,
    "transactionIdReal": transactionIdReal
  }

}

function insertRowInTransactionTableReal(transactionObjReal) {

  let transactionTableRef = document.getElementById("tablaPresupuestoReal");
  let newTransactionRowRef = transactionTableRef.insertRow(-1);
  newTransactionRowRef.setAttribute("data-transaction-id", transactionObjReal["transactionIdReal"]);

  let newTypeCellRef = newTransactionRowRef.insertCell(0);
  newTypeCellRef.textContent = transactionObjReal["typeGasto"];

  newTypeCellRef = newTransactionRowRef.insertCell(1);
  newTypeCellRef.textContent = transactionObjReal["typeFecha"];


  newTypeCellRef = newTransactionRowRef.insertCell(2);
  newTypeCellRef.textContent = transactionObjReal["typeCategoria"];


  newTypeCellRef = newTransactionRowRef.insertCell(3);
  newTypeCellRef.textContent = transactionObjReal["typeCantidad"]

  let newDeleteCell = newTransactionRowRef.insertCell(4);
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Eliminar";
  newDeleteCell.appendChild(deleteButton);

  deleteButton.addEventListener("click", (event) => {
    let transactionRow = event.target.parentNode.parentNode;
    let transactionIdReal = transactionRow.getAttribute("data-transaction-id");
    transactionRow.remove();
    deleteTransactionObjReal(transactionIdReal);
  })
}

//Le paso como parametro el transactionIdReal de la transaccion que quiero eliminar
function deleteTransactionObjReal(transactionIdReal) {
  //Obtengo las transacciones de mi "base de datos"
  let transactionObjArrReal = JSON.parse(localStorage.getItem("storageReal"))
  //Busco el indice / la posicion de la transacion que quiero eliminar
  let transactionIndexInArray = transactionObjArrReal.findIndex(element => element.transactionIdReal === transactionIdReal);
  //Elimino el elemento de esa posicion
  transactionObjArrReal.splice(transactionIndexInArray, 1)
  //Convierto a objeto JSON
  let transactionArrayJSON = JSON.stringify(transactionObjArrReal);
  //guardar mi array de transacciones a Local Storage
  localStorage.setItem("storageReal", transactionArrayJSON);

}

function saveTransactionObjReal(transactionObjReal) {
  let myTransactionArray = JSON.parse(localStorage.getItem("storageReal")) || [];
  myTransactionArray.push(transactionObjReal);
  //Convierto mi arrat de transacciones a Json
  let transactionArrayJSON = JSON.stringify(myTransactionArray);
  //guardar mi array de transacciones a Local Storage
  localStorage.setItem("storageReal", transactionArrayJSON);
}