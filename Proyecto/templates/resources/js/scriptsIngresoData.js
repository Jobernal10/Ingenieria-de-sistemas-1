const form1 = document.getElementById("montoIngresado");
form1.addEventListener("submit", function (event) {
  event.preventDefault();
  //let transactionFormData1 = new FormData(form1);
  form1.reset();
})

const form2 = document.getElementById("flujodecajaprevio"); //PREVIO

form2.addEventListener("submit", function (event1) {
  event1.preventDefault();
  let transactionFormData = new FormData(form2);
  let transactionObj = convertFormDataToTransactionObj(transactionFormData)
  saveTransactionObj(transactionObj)
  insertRowInTransactionTable(transactionObj)
  form2.reset();
})

document.addEventListener("DOMContentLoaded", function (event1) {
  let transactionObjArr = JSON.parse(localStorage.getItem("storagePrev"))
  transactionObjArr.forEach(
    function (arrayElement) {
      insertRowInTransactionTable(arrayElement)
    });
})

function getNewTransactionIdPrev() { //REDITAR NOMAS ESTO
  let lastTransactionIdPrev = localStorage.getItem("lastTransactionIdPrev") || "0"
  let newTransactionIdPrev = JSON.parse(lastTransactionIdPrev) + 1;
  localStorage.setItem("lastTransactionIdPrev", JSON.stringify(newTransactionIdPrev))
  return newTransactionIdPrev;
}

function convertFormDataToTransactionObj(transactionFormData) {
  let typeGasto = transactionFormData.get("typeGasto")
  let typeFecha = transactionFormData.get("typeFecha")
  let typeCategoria = transactionFormData.get("typeCategoria")
  let typeCantidad = transactionFormData.get("typeCantidad")
  let transactionId = getNewTransactionIdPrev();

  return {
    "typeGasto": typeGasto,
    "typeFecha": typeFecha,
    "typeCategoria": typeCategoria,
    "typeCantidad": typeCantidad,
    "transactionId": transactionId
  }

}

function insertRowInTransactionTable(transactionObj) {

  let transactionTableRef = document.getElementById("tablaPresupuestoPrevio");
  let newTransactionRowRef = transactionTableRef.insertRow(-1);
  newTransactionRowRef.setAttribute("data-transaction-id", transactionObj["transactionId"]);

  let newTypeCellRef = newTransactionRowRef.insertCell(0);
  newTypeCellRef.textContent = transactionObj["typeGasto"];

  newTypeCellRef = newTransactionRowRef.insertCell(1);
  newTypeCellRef.textContent = transactionObj["typeFecha"];


  newTypeCellRef = newTransactionRowRef.insertCell(2);
  newTypeCellRef.textContent = transactionObj["typeCategoria"];


  newTypeCellRef = newTransactionRowRef.insertCell(3);
  newTypeCellRef.textContent = transactionObj["typeCantidad"]

  let newDeleteCell = newTransactionRowRef.insertCell(4);
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Eliminar";
  newDeleteCell.appendChild(deleteButton);

  deleteButton.addEventListener("click", (event1) => {
    let transactionRow = event1.target.parentNode.parentNode;
    let transactionId = transactionRow.getAttribute("data-transaction-id");
    transactionRow.remove();
    deleteTransactionObj(transactionId);
  })
}

//Le paso como parametro el transactionId de la transaccion que quiero eliminar
function deleteTransactionObj(transactionId) {
  //Obtengo las transacciones de mi "base de datos"
  let transactionObjArr = JSON.parse(localStorage.getItem("storagePrev"))
  //Busco el indice / la posicion de la transacion que quiero eliminar
  let transactionIndexInArray = transactionObjArr.findIndex(element => element.transactionId === transactionId);
  //Elimino el elemento de esa posicion
  transactionObjArr.splice(transactionIndexInArray, 1)
  //Convierto a objeto JSON
  let transactionArrayJSON = JSON.stringify(transactionObjArr);
  //guardar mi array de transacciones a Local Storage
  localStorage.setItem("storagePrev", transactionArrayJSON);

}

function saveTransactionObj(transactionObj) {
  let myTransactionArray = JSON.parse(localStorage.getItem("storagePrev")) || [];
  myTransactionArray.push(transactionObj);
  //Convierto mi arrat de transacciones a Json
  let transactionArrayJSON = JSON.stringify(myTransactionArray);
  //guardar mi array de transacciones a Local Storage
  localStorage.setItem("storagePrev", transactionArrayJSON);
}
////////////////////////////////////////////////////////////////

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