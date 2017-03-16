
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
	// var projFrameLabor = $("#frameLabor-input").val().trim();
	// var projMechLabor = $("#mechLabor-input").val().trim();
	// var projPaintLabor = $("#paintLabor-input").val().trim();
	// var projPartSales = $("#partSales-input").val().trim();
	// var projPartsCost = $("#partsCost-input").val().trim();
	// var projPaintAndMaterial = $("#paintAndMaterial-input").val().trim();
	// var projSublet = $("#sublet-input").val().trim();
	// var projTowAndStorage = $("#towAndStorage-input").val().trim();

  // Creates local "temporary" object for holding employee data
  	var newCarJob = {
        projectNumber: projNumb,
        metalLabor: projMetalLabor,
        // frameLabor: projFrameLabor,
        // mechLabor: projMechLabor,
        // paintLabor: projPaintLabor,
        // partSales: projPartSales,
        // partsCost: projPartsCost,   
        // paintAndMaterial: projPaintAndMaterial,
        // sublet: projSublet,
        // towAndStorage: projTowAndStorage
    }

  // Uploads employee data to the database
  database.ref().push(newCarJob);

  // Logs everything to console
  console.log(newCarJob.projectNumber);
  console.log(newCarJob.metalLabor);
 

  // Clears all of the text-boxes
  $("#projNumb-input").val("");
  $("#metalLabor-input").val("");

  // Prevents moving to new page
  return false;
});


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
});

// 4. Create a way to calculate the sum for all the work

//counter
var sumMetalLabor= 0;

// // the sum of all the job
$(".sumJob #metalLabor").append(sumMetalLabor);


