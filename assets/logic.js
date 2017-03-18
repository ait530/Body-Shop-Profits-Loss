// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the sum for all the work
// 5. Total weekly bill calculation
// 6. grab the weekly bill each week --> making a tab for them to revisit later 
// 7. Authorization!!!!!

// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyDyS6-PlzGVgp1Fyfr0Qn8bcGHICyEDiPM",
	authDomain: "autoshop-project.firebaseapp.com",
	databaseURL: "https://autoshop-project.firebaseio.com",
	storageBucket: "autoshop-project.appspot.com",
	messagingSenderId: "92989190932"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-job-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var projNumb = $("#projNumb-input").val().trim();
	var projMetalLabor = $("#metalLabor-input").val().trim();
	var projFrameLabor = $("#frameLabor-input").val().trim();
	var projMechLabor = $("#mechLabor-input").val().trim();
	var projPaintLabor = $("#paintLabor-input").val().trim();
	var projPartSales = $("#partSales-input").val().trim();
	var projPartsCost = $("#partsCost-input").val().trim();
	var projPaintAndMaterial = $("#paintAndMaterial-input").val().trim();
	var projSublet = $("#sublet-input").val().trim();
	var projTowAndStorage = $("#towAndStorage-input").val().trim();

  // Creates local "temporary" object for holding employee data
    var newCarJob = {
        projectNumber: projNumb,
        metalLabor: projMetalLabor,
        frameLabor: projFrameLabor,
        mechLabor: projMechLabor,
        paintLabor: projPaintLabor,
        partSales: projPartSales,
        partsCost: projPartsCost,   
        paintAndMaterial: projPaintAndMaterial,
        sublet: projSublet,
        towAndStorage: projTowAndStorage
    }

  // Uploads employee data to the database
  database.ref().push(newCarJob);

  // Logs everything to console
  console.log(newCarJob.projectNumber);
  console.log(newCarJob.metalLabor);
 

  // Clears all of the text-boxes
  $("#projNumb-input").val("");
  $("#metalLabor-input").val("");
  $("#frameLabor-input").val("");
  $("#mechLabor-input").val("");
  $("#paintLabor-input").val("");
  $("#partSales-input").val("");
  $("#partsCost-input").val("");
  $("#paintAndMaterial-input").val("");
  $("#sublet-input").val("");
  $("#towAndStorage-input").val("");

  // Prevents moving to new page
  return false;
});

  // //counter
  var sumMetalLabor= 0;
  var sumFrameLabor= 0;
  var sumMechLabor= 0;
  var sumPaintLabor= 0;
  var sumPartSales= 0;
  var sumPartsCost= 0;
  var sumPaintAndMaterial= 0;
  var sumSublet= 0;
  var sumTowAndStorage= 0


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var projNumb = childSnapshot.val().projectNumber;
  var projMetalLabor = childSnapshot.val().metalLabor;
  var projFrameLabor = childSnapshot.val().frameLabor;
  var projMechLabor = childSnapshot.val().mechLabor;
  var projPaintLabor = childSnapshot.val().paintLabor;
  var projPartSales = childSnapshot.val().partSales;
  var projPartsCost = childSnapshot.val().partsCost;
  var projPaintAndMaterial = childSnapshot.val().paintAndMaterial;
  var projSublet = childSnapshot.val().sublet;
  var projTowAndStorage = childSnapshot.val().towAndStorage;

  //computing all the sum 
  sumMetalLabor += parseInt(projMetalLabor);
  sumFrameLabor += parseInt(projFrameLabor);
  sumMechLabor += parseInt(projMechLabor);
  sumPaintLabor += parseInt(projPaintLabor);
  sumPartSales += parseInt(projPartSales);
  sumPartsCost += parseInt(projPartsCost);
  sumPaintAndMaterial += parseInt(projPaintAndMaterial);
  sumSublet += parseInt(projSublet);
  sumTowAndStorage += parseInt(projTowAndStorage);

  // Employee Info
  console.log(projNumb);
  console.log(projMetalLabor);


  // Add each labor data into the table

  $("#employee-table").append("<tr><td>" + projNumb + "</td><td>" + projMetalLabor + "</td><td>" + projFrameLabor + "</td><td>" +
  projMechLabor + "</td><td>" + projPaintLabor + "</td><td>" + projPartSales + "</td><td>"+ projPartsCost + "</td><td>" + projPaintAndMaterial + "</td><td>" + projSublet + "</td><td>" + projTowAndStorage + "</td></tr>");
  console.log(sumMetalLabor);

  // Add each sum labor data into the table
  $("#metalLabor").text(sumMetalLabor);
  $("#frameLabor").text(sumFrameLabor);
  $("#mechLabor").text(sumMechLabor);
  $("#paintLabor").text(sumPaintLabor);
  $("#partSales").text(sumPartSales);
  $("#partsCost").text(sumPartsCost);
  $("#paintMaterial").text(sumPaintAndMaterial);
  $("#sublet").text(sumSublet);
  $("#towStorage").text(sumTowAndStorage);

  // 4. Create a way to calculate the sum for all the work

  $("#paintshopLabor").text(sumPaintLabor);
  $("#bodyshopLabor").text(sumMetalLabor + sumFrameLabor);
  $("#gpDollarPaintshop").text(sumPartSales - sumFrameLabor);
  $("#gpPercentPaintshop").text(something here * 100);
  
  // gpDollarBodyshop = ?
  // GP % Bodyshop = ?
  // gpPaintDollar = sumPaintAndMaterial - 
  // gpDollarParts = sumPartSales - sumPartsCost
  // gpPercentParts = gpDollarParts / sumPartSales  * 100
  // ////////////////////////////////////////////////////
  // costOfSublet = sumSublet
  // subletDollarGP = ?
  // subletPercentGP = ?
  // totalSales = sumMetalLabor + sumFrameLabor + sumMechLabor + sumPaintLabor + sumPartSales + sumPartsCost + sumPaintAndMaterial + sumSublet + sumTowAndStorage;

  // totalDollarGP = gpPaintDollar + gpDollarBodyshop + gpPaintDollar + gpDollarParts + subletDollarGP + sumTowAndStorage

  // totalPercentGP = totalDollarGP / totalSales



});


paintShopLabor = sumPaintLabor;
bodyShopLabor = sumMetalLabor + sumFrameLabor
gpDollarPaintshop = sumPartSales - sumFrameLabor
gpPercentPaintshop = ?
gpDollarBodyshop = ?
GP % Bodyshop = ?
gpPaintDollar = sumPaintAndMaterial - 
gpDollarParts = sumPartSales - sumPartsCost
gpPercentParts = gpDollarParts / sumPartSales  * 100
////////////////////////////////////////////////////
costOfSublet = sumSublet
subletDollarGP = ?
subletPercentGP = ?
totalSales = sumMetalLabor + sumFrameLabor + sumMechLabor + sumPaintLabor + sumPartSales + sumPartsCost + sumPaintAndMaterial + sumSublet + sumTowAndStorage;

totalDollarGP = gpPaintDollar + gpDollarBodyshop + gpPaintDollar + gpDollarParts + subletDollarGP + sumTowAndStorage

totalPercentGP = totalDollarGP / totalSales



// Submit button Button
// <button class="btn btn-primary" id="add-job-btn" type="submit">Submit</button>

// User input
// var projMetalLabor = $("#metalLabor-input").val().trim();


// Make our variables global to the runtime of our application
//     var firstNumber;
//     var secondNumber;
//     var operator;
//     var result;
//     var isOperatorChosen;
//     var isCalculated;

//     // Use a function to initialize our calculator.
//     // This way when the user hits clear, we can guarantee a reset of the app.
//     function initializeCalculator() {
//       firstNumber = "";
//       secondNumber = "";
//       operator = "";
//       isOperatorChosen = false;
//       isCalculated = false;

//       $("#first-number, #second-number, #operator, #result").empty();
//     }

//     // Add an on click listener to all elements that have the class "number"
//     $(".number").on("click", function() {

//       // Check if we've already run a calculation, if so... we'll just.
//       if (isCalculated) return;

//       // If operator is chosen, we should be writing the secondNumber, otherwise, the firstNumber
//       if (isOperatorChosen) {
//         secondNumber += this.value;
//         $("#second-number").html(secondNumber);

//       }
//       else {
//         firstNumber += this.value;
//         $("#first-number").html(firstNumber);
//       }
//     });

//     // Add an on click listener to all elements that have the class "operator"
//     $(".operator").on("click", function() {

//       // Check if we've already run a calculation, if so... we'll just exit.
//       if (isCalculated) return;

//       // Set isOperatorChosen to true so we start writing to secondNumber
//       isOperatorChosen = true;

//       // Store off the operator
//       operator = this.value;

//       // Set the HTML of the #operator to the text of what was clicked
//       $("#operator").html($(this).text());

//     });


//     // Add an on click listener to all elements that have the class "equal"
//     $(".equal").on("click", function() {

//       // If we already clicked equal, don't do the calculation again
//       if (isCalculated) return;

//       // Set isCalculated to true so that we don't get in a weird UI state by clicking buttons again
//       isCalculated = true;

//       // Use parseInt to convert our string representation of numbers into actual integers
//       firstNumber = parseInt(firstNumber);
//       secondNumber = parseInt(secondNumber);

//       // Based on the operator that was chosen.
//       // Then run the operation and set the HTML of the result of that operation
//       if (operator === "plus") {
//         result = firstNumber + secondNumber;
//       }

//       $("#result").html(result);
//     });

//     // // Add an on click listener to all elements that have the class "clear"
//     // $(".clear").on("click", function() {

//       // Call initializeCalculater so we can reset the state of our app
//       initializeCalculator();

//     };

//     // Call initializeCalculater so we can set the state of our app
//     initializeCalculator();
//   };


