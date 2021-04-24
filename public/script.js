function myFunction() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else { 
    x.className = x.className.replace(" w3-show", "");
  }
  console.log("Hi");
}

function addMoreRow() {
  var table = document.getElementById("calculatorTable");

  var totalRows= table.rows.length;

  var row = table.insertRow(totalRows-1);

  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);

  cell1.innerHTML = '<input type="text" name="Weight" size="30">';
  cell2.innerHTML = '<input type="text" name="Weight" size="30">';
}

function calculate() {

  var errorMessage = document.getElementById("errorMessage");
  errorMessage.innerHTML = "";

  var table = document.getElementById("calculatorTable");
  var currentAverageText = document.getElementById("currentAverageText");
  var bestAverageText = document.getElementById("bestAverageText");
  var worstAverageText = document.getElementById("worstAverageText");

  var totalRows = table.rows.length;

  var totalWeight = 0;
  var missingWeight = 0;
  var totalMark = 0;
  var bestCase = 0;
  var worstCase = 0;
  var currentAverage = 0;
  var multiplierFactor = 0;


  for(var i = 1; i < totalRows-1; i++) {
    if(table.rows[i].cells[1].firstChild.value == "") {
      table.rows[i].cells[1].firstChild.value = 0;
    }

    if(table.rows[i].cells[0].firstChild.value == "") {
      table.rows[i].cells[0].firstChild.value = 0;
    }

    if(!Number.isFinite(parseInt(table.rows[i].cells[1].firstChild.value))) {
      errorMessage.innerHTML = "Error: Can't input symbols.";
    }
    if(!Number.isFinite(parseInt(table.rows[i].cells[0].firstChild.value))) {
      errorMessage.innerHTML = "Error: Can't input symbols and letters.";
    }
  }



  for(var i = 1; i < totalRows-1; i++) {
    totalWeight += parseInt(table.rows[i].cells[1].firstChild.value);
  }

  try {
    if(totalWeight > 100) {
      throw weightError();
    }
  } catch(err) {
    
    if(err.name == "WeightError") {
      errorMessage.innerHTML = "Error: You can't have a weight of more than 100%.";
    }

    return;
  }

  missingWeight = 100 - totalWeight;
  multiplierFactor = 100 / totalWeight;

  for(var i = 1; i < totalRows-1; i++) {
    totalMark += parseInt(table.rows[i].cells[0].firstChild.value) * parseInt(table.rows[i].cells[1].firstChild.value) * 0.01;
  }

  for(var i = 1; i < totalRows-1; i++) {
    currentAverage += parseInt(table.rows[i].cells[0].firstChild.value) * parseInt(table.rows[i].cells[1].firstChild.value) * multiplierFactor * 0.01;
  }

  worstCase = totalMark;
  bestCase = totalMark + missingWeight;

  currentAverageText.innerHTML = "Current Average: " + currentAverage.toFixed(2);
  bestAverageText.innerHTML = "Best Case Scenario Average: " + bestCase.toFixed(2);
  worstAverageText.innerHTML = "Worst Case Scenario Average: " + worstCase.toFixed(2);
}

function weightError() {
  var error = new Error("Weight above 100%");
  error.name = "WeightError";
  return error;
}