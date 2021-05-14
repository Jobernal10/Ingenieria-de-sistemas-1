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
  let transactionObjArr = JSON.parse(localStorage.getItem("storagePrev"))
  transactionObjArr.forEach(
    function(arrayElement){
      insertRowInTransactionTable(arrayElement)
  });
})

function getNewTransactionIdPrev(){ //REDITAR NOMAS ESTO
  let lastTransactionIdPrev = localStorage.getItem("lastTransactionIdPrev") || "0"
  let newTransactionIdPrev = JSON.parse(lastTransactionIdPrev) + 1;
  localStorage.setItem("lastTransactionIdPrev", JSON.stringify(newTransactionIdPrev))
  return newTransactionIdPrev; 
}

function convertFormDataToTransactionObj(transactionFormData){
  let typeGasto = transactionFormData.get("typeGasto")
  let typeFecha = transactionFormData.get("typeFecha")
  let typeCategoria = transactionFormData.get("typeCategoria")
  let typeCantidad = transactionFormData.get("typeCantidad")
  let transactionId = getNewTransactionIdPrev();

  return {"typeGasto": typeGasto,
          "typeFecha": typeFecha,
          "typeCategoria":typeCategoria,
          "typeCantidad":typeCantidad,
          "transactionId":transactionId
        }

}

function insertRowInTransactionTable(transactionObj){
  
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
  let myTransactionArray = JSON.parse(localStorage.getItem("storagPrev")) || [];
  myTransactionArray.push(transactionObj);
  //Convierto mi arrat de transacciones a Json
  let transactionArrayJSON = JSON.stringify(myTransactionArray);
  //guardar mi array de transacciones a Local Storage
  localStorage.setItem("storagePrev", transactionArrayJSON);
}