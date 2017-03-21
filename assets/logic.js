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
  var projDate = $("#date-input").val().trim();
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


  //grabs manager input 
  var managerInputPaintPayroll = $("#totalPaintshopPayroll-input").val().trim();
  var managerInputBodyshopPayroll = $("#totalBodyshopPayroll-input").val().trim();


  //grabs vendors input 

  var projDate = $("#date-input").val().trim();


  // Creates local "temporary" object for holding employee data

	var newCarJob = {
    projectDate: projDate,
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
  $("#date-input").val("");
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
  var projDate = childSnapshot.val().projectDate;
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

  $("#employee-table").append("<tr><td>" + projDate + "</td><td>" + projNumb + "</td><td>" + projMetalLabor + "</td><td>" + projFrameLabor + "</td><td>" +
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

    //panel 1

    //panel 2 



    //panel 3 

  $("#paintshopLabor").text(sumPaintLabor);
  $("#bodyshopLabor").text(sumMetalLabor + sumFrameLabor + sumMechLabor);
  $("#gpDollarPaintshop").text(sumPaintLabor + ); // we need work on 
  // $("#gpPercentPaintshop").text(something here * 100);
  // $("#gpDollarBodyshop").text(something);
  // $("#GP % Bodyshop").text(something here * 100);
  // $("#gpPaintDollar").text(sumPaintAndMaterial -);
  $("#gpDollarParts").text(sumPartSales - sumPartsCost);
  $("#gpPercentParts").text(gpDollarParts / sumPartSales  * 100);

  // ////////////////////////////////////////////////////


  //panel 4 

  $("#costOfSublet").sumSublet
  subletDollarGP = ?
  subletPercentGP = ?
  totalSales = sumMetalLabor + sumFrameLabor + sumMechLabor + sumPaintLabor + sumPartSales + sumPartsCost + sumPaintAndMaterial + sumSublet + sumTowAndStorage;

  totalDollarGP = gpPaintDollar + gpDollarBodyshop + gpPaintDollar + gpDollarParts + subletDollarGP + sumTowAndStorage

  totalPercentGP = totalDollarGP / totalSales



});

  