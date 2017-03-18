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


  // Prevents moving to new page
  return false;
});

  // //counter
  var sumMetalLabor= 0;


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var projNumb = childSnapshot.val().projectNumber;
  var projMetalLabor = childSnapshot.val().metalLabor;

  //computing all the sum 
  sumMetalLabor += parseInt(projMetalLabor);

  // Employee Info
  console.log(projNumb);
  console.log(projMetalLabor);

  // Add each train's data into the table
  $("#employee-table").append("<tr><td>" + projNumb + "</td><td>" + projMetalLabor + "</td></tr>");
  console.log(sumMetalLabor);
  $("#metalLabor").text(sumMetalLabor);

});


// 4. Create a way to calculate the sum for all the work


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


//counter
var sumMetalLabor= 0;

// // the sum of all the job
$(".sumJob #metalLabor").append(sumMetalLabor);


