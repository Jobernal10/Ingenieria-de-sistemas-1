const form1 = document.getElementById("montoIngresado");
form1.addEventListener("submit",function(event) {
  event.preventDefault();
  let transactionFormData1 = new FormData(form1);
})

const form2 = document.getElementById("flujodecajaprevio"); //PREVIO

form2.addEventListener("submit",function(event) {
  event.preventDefault();
  let transactionFormData = new FormData(form2);
  let transactionObj = convertFormDataToTransactionObj(transactionFormData)
  saveTransactionObj(transactionObj)
  insertRowInTransactionTable(transactionObj)
  form2.reset();
})

document.addEventListener("DOMContentLoaded", function(event) {
  let transactionObjArr = JSON.parse(localStorage.getItem("storage"))
  transactionObjArr.forEach(
    function(arrayElement){
      insertRowInTransactionTable(arrayElement)
  });
})

function getNewTransactionId(){
  let lastTransactionIdPrev = localStorage.getItem("lastTransactionIdPrev") || "0"
  let newTransactionId = JSON.parse(lastTransactionIdPrev) + 1;
  localStorage.setItem("lastTransactionIdPrev", JSON.stringify(newTransactionId))
  return newTransactionId; 
}

function convertFormDataToTransactionObj(transactionFormData){
  let typeGasto = transactionFormData.get("typeGasto")
  let typeFecha = transactionFormData.get("typeFecha")
  let typeCategoria = transactionFormData.get("typeCategoria")
  let typeCantidad = transactionFormData.get("typeCantidad")
  let transactionId = getNewTransactionId();

  return {"typeGasto": typeGasto,
          "typeFecha": typeFecha,
          "typeCategoria":typeCategoria,
          "typeCantidad":typeCantidad,
          "transactionId":transactionId
        }

}

function insertRowInTransactionTable(transactionObj){
  
  let transactionTableRef = document.getElementById("tablaPresupuesto");
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

  deleteButton.addEventListener("click", (event) => {
    let transactionRow = event.target.parentNode.parentNode;
    let transactionId = transactionRow.getAttribute("data-transaction-id");
    transactionRow.remove();
    deleteTransactionObj(transactionId);
  })
}

//Le paso como parametro el transactionId de la transaccion que quiero eliminar
function deleteTransactionObj(transactionId){
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

function saveTransactionObj(transactionObj){
  let myTransactionArray = JSON.parse(localStorage.getItem("storagePrev")) || [];
  myTransactionArray.push(transactionObj);
  //Convierto mi arrat de transacciones a Json
  let transactionArrayJSON = JSON.stringify(myTransactionArray);
  //guardar mi array de transacciones a Local Storage
  localStorage.setItem("storagePrev", transactionArrayJSON);
}
////////////////////////////////////////////////////////////////
/*
const form3 = document.getElementById("flujodecajareal");

form3.addEventListener("submit",function(event) {
  event.preventDefault();
  let transactionFormData = new FormData(form2);
  let transactionObj = convertFormDataToTransactionObj(transactionFormData)
  saveTransactionObj(transactionObj)
  insertRowInTransactionTable(transactionObj)
  form2.reset();
})

document.addEventListener("DOMContentLoaded", function(event) {
  let transactionObjArr = JSON.parse(localStorage.getItem("storage2"))
  transactionObjArr.forEach(
    function(arrayElement){
      insertRowInTransactionTable(arrayElement)
  });
})

function getNewTransactionId2(){
  let lastTransactionId = localStorage.getItem("lastTransactionId") || "0"
  let newTransactionId = JSON.parse(lastTransactionId) + 1;
  localStorage.setItem("lastTransactionId", JSON.stringify(newTransactionId))
  return newTransactionId; 
}

function convertFormDataToTransactionObj2(transactionFormData){
  let typeGasto = transactionFormData.get("typeGasto")
  let typeFecha = transactionFormData.get("typeFecha")
  let typeCategoria = transactionFormData.get("typeCategoria")
  let typeCantidad = transactionFormData.get("typeCantidad")
  let transactionId = getNewTransactionId();

  return {"typeGasto": typeGasto,
          "typeFecha": typeFecha,
          "typeCategoria":typeCategoria,
          "typeCantidad":typeCantidad,
          "transactionId":transactionId
        }

}

function insertRowInTransactionTable2(transactionObj){
  
  let transactionTableRef = document.getElementById("tablaPresupuesto");
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

  deleteButton.addEventListener("click", (event) => {
    let transactionRow = event.target.parentNode.parentNode;
    let transactionId = transactionRow.getAttribute("data-transaction-id");
    transactionRow.remove();
    deleteTransactionObj(transactionId);
  })
}

//Le paso como parametro el transactionId de la transaccion que quiero eliminar
function deleteTransactionObj2(transactionId){
  //Obtengo las transacciones de mi "base de datos"
  let transactionObjArr = JSON.parse(localStorage.getItem("storage2"))
  //Busco el indice / la posicion de la transacion que quiero eliminar
  let transactionIndexInArray = transactionObjArr.findIndex(element => element.transactionId === transactionId);
  //Elimino el elemento de esa posicion
  transactionObjArr.splice(transactionIndexInArray, 1)
  //Convierto a objeto JSON
  let transactionArrayJSON = JSON.stringify(transactionObjArr);
  //guardar mi array de transacciones a Local Storage
  localStorage.setItem("storage3", transactionArrayJSON);

}

function saveTransactionObj2(transactionObj){
  let myTransactionArray = JSON.parse(localStorage.getItem("storage2")) || [];
  myTransactionArray.push(transactionObj);
  //Convierto mi arrat de transacciones a Json
  let transactionArrayJSON = JSON.stringify(myTransactionArray);
  //guardar mi array de transacciones a Local Storage
  localStorage.setItem("storage2", transactionArrayJSON);
}*/