// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new job labor - then update the html + update the database
// 3. Create a way to retrieve job labors from the employee database.
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

// Creates and initializes a Firebase app instance
firebase.initializeApp(config);

// Gets the Database service for the default app or a given app
var database = firebase.database();


// Authentication
var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    console.log(provider);
  });


//PANEL 3
// 2. Submit Button for adding job labors
$("#add-job-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input elements and reduces excess space
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

  // Creates local "temporary" object for holding labors data
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
    towAndStorage: projTowAndStorage,
  }

  database.ref('newCarJob').push({
    newCarJob
  });

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
var sumMetalLabor = 0;
var sumFrameLabor = 0;
var sumMechLabor = 0;
var sumPaintLabor = 0;
var sumPartSales = 0;
var sumPartsCost = 0;
var sumPaintAndMaterial = 0;
var sumSublet = 0;
var sumTowAndStorage = 0;
//PANEL 3
// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref('newCarJob').on("child_added", function(childSnapshot, prevChildKey) {
  var lastJob = childSnapshot.val();
  var jobToAdd = lastJob.newCarJob;
  console.log(jobToAdd);

  //Store everything into a variable.
  projDate = jobToAdd.projectDate;
  projNumb = jobToAdd.projectNumber;
  projMetalLabor = jobToAdd.metalLabor;
  projFrameLabor = jobToAdd.frameLabor;
  projMechLabor = jobToAdd.mechLabor;
  projPaintLabor = jobToAdd.paintLabor;
  projPartSales = jobToAdd.partSales;
  projPartsCost = jobToAdd.partsCost;
  projPaintAndMaterial = jobToAdd.paintAndMaterial;
  projSublet = jobToAdd.sublet;
  projTowAndStorage = jobToAdd.towAndStorage;

  //Computing all the sums 
  sumMetalLabor += parseFloat(projMetalLabor);
  sumFrameLabor += parseFloat(projFrameLabor);
  sumMechLabor += parseFloat(projMechLabor);
  sumPaintLabor += parseFloat(projPaintLabor);
  sumPartSales += parseFloat(projPartSales);
  sumPartsCost += parseFloat(projPartsCost);
  sumPaintAndMaterial += parseFloat(projPaintAndMaterial);
  sumSublet += parseFloat(projSublet);
  sumTowAndStorage += parseFloat(projTowAndStorage);



  $("#employee-table").append("<tr><td>" + projDate + "</td><td>" + projNumb + "</td><td>" + projMetalLabor + "</td><td>" + projFrameLabor + "</td><td>" +
    projMechLabor + "</td><td>" + projPaintLabor + "</td><td>" + projPartSales + "</td><td>" + projPartsCost + "</td><td>" + projPaintAndMaterial + "</td><td>" + projSublet + "</td><td>" + projTowAndStorage + "</td></tr>");

});

// PANEL 1

$("#add-total-btn").on("click", function(event) {
  event.preventDefault();

  //grabs manager input 
  var managerInputPaintPayroll = $("#totalPaintshopPayroll-input").val().trim();
  var managerInputBodyshopPayroll = $("#totalBodyshopPayroll-input").val().trim();

  // Creates local "temporary" object for holding manager input data

  var managerTotalWork = {
    managerPaintPay: managerInputPaintPayroll,
    managerBodyShopPay: managerInputBodyshopPayroll
  }

  database.ref('managerTotalWork').push({
      managerTotalWork
    })
    // Prevents moving to new page
  return false;
});

//PANEL 1
var sumManagerPayRoll = 0;
var sumManagerBodyRoll = 0;
//Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref('managerTotalWork').on("child_added", function(childSnapshot, prevChildKey) {
  var managerJob = childSnapshot.val();
  // console.log(managerJob);
  var managerToAdd = managerJob.managerTotalWork;

  var managerInputPaintPayroll = managerToAdd.managerPaintPay;
  var managerInputBodyshopPayroll = managerToAdd.managerBodyShopPay;
  sumManagerPayRoll += parseFloat(managerInputPaintPayroll);
  sumManagerBodyRoll += parseFloat(managerInputBodyshopPayroll);
});

//PANEL 2

$("#add-vendor-btn").on("click", function(event) {
  event.preventDefault();

  //grabs labels vendors input 
  var managerLabelVendor1 = $("#vendor1-label").val().trim();
  var managerLabelVendor2 = $("#vendor2-label").val().trim();
  var managerLabelVendor3 = $("#vendor3-label").val().trim();
  var managerLabelVendor4 = $("#vendor4-label").val().trim();
  var managerLabelVendor5 = $("#vendor5-label").val().trim();

  //grabs manager vendors input 
  var managerInputVendor1 = $("#vendor1-input").val().trim();
  var managerInputVendor2 = $("#vendor2-input").val().trim();
  var managerInputVendor3 = $("#vendor3-input").val().trim();
  var managerInputVendor4 = $("#vendor4-input").val().trim();
  var managerInputVendor5 = $("#vendor5-input").val().trim();

  // Creates local "temporary" object for holding vendor input data

  var vendorTotalWork = {
    inputVendor1: managerInputVendor1,
    inputVendor2: managerInputVendor2,
    inputVendor3: managerInputVendor3,
    inputVendor4: managerInputVendor4,
    inputVendor5: managerInputVendor5

  }

  // database.ref().push(vendorTotalWork);
  database.ref('vendorTotalWork').push({
    vendorTotalWork
  });

  // Prevents moving to new page
  return false;

});

//PANEL 2
var sumInputVendor1 = 0;
var sumInputVendor2 = 0;
var sumInputVendor3 = 0;
var sumInputVendor4 = 0;
var sumInputVendor5 = 0;

database.ref('vendorTotalWork').on("child_added", function(childSnapshot, prevChildKey) {
  var vendorJob = childSnapshot.val();
  console.log(vendorJob);
  var vendorToAdd = vendorJob.vendorTotalWork;

  // // Panel 2
  var managerInputVendor1 = vendorToAdd.inputVendor1;
  var managerInputVendor2 = vendorToAdd.inputVendor2;
  var managerInputVendor3 = vendorToAdd.inputVendor3;
  var managerInputVendor4 = vendorToAdd.inputVendor4;
  var managerInputVendor5 = vendorToAdd.inputVendor5;
  sumInputVendor1 += parseFloat(managerInputVendor1);
  sumInputVendor2 += parseFloat(managerInputVendor2);
  sumInputVendor3 += parseFloat(managerInputVendor3);
  sumInputVendor4 += parseFloat(managerInputVendor4);
  sumInputVendor5 += parseFloat(managerInputVendor5);

});

function renderDataToScreen(data) {
  //do stuff
  console.log(data);
  console.log(sumMechLabor);
    // Add each sum labor data into the table
  $("#metalLabor").text((sumMetalLabor).toFixed(2));
  $("#frameLabor").text((sumFrameLabor).toFixed(2));
  $("#mechLabor").text((sumMechLabor).toFixed(2));
  $("#paintLabor").text((sumPaintLabor).toFixed(2));
  $("#partSales").text((sumPartSales).toFixed(2));
  $("#partsCost").text((sumPartsCost).toFixed(2));
  $("#paintMaterial").text((sumPaintAndMaterial).toFixed(2));
  $("#sublet").text((sumSublet).toFixed(2));
  $("#towStorage").text((sumTowAndStorage).toFixed(2));

  // Panel 3 Calculation
  $("#paintshopLabor").text((sumPaintLabor).toFixed(2));
  $("#bodyshopLabor").text((sumMetalLabor + sumFrameLabor + sumMechLabor).toFixed(2));
  $("#gpDollarPaintshop").text((sumPaintLabor + sumManagerPayRoll).toFixed(2));
  $("#gpPercentPaintshop").text(((sumPaintLabor + sumManagerPayRoll) / sumPaintLabor * 100).toFixed(0) + '%');
  $("#gpDollarBodyshop").text(((sumMetalLabor + sumFrameLabor + sumMechLabor) - sumManagerBodyRoll).toFixed(2));
  $("#gpPercentBodyshop").text(((((sumMetalLabor + sumFrameLabor + sumMechLabor) - sumManagerBodyRoll)) / sumManagerBodyRoll * 100).toFixed(2) + '%');
  $("#gpPaintDollar").text((sumPaintAndMaterial - (sumInputVendor1 + sumInputVendor2 + sumInputVendor3 + sumInputVendor4 + sumInputVendor5)).toFixed(2));
  $("#gpPercentPM").text(((sumPaintAndMaterial - (sumInputVendor1 + sumInputVendor2 + sumInputVendor3 + sumInputVendor4 + sumInputVendor5)) / sumPaintAndMaterial * 100).toFixed(0) + '%');
  $("#gpDollarParts").text((sumPartSales - sumPartsCost).toFixed(2));
  $("#gpPercentParts").text(((sumPartSales - sumPartsCost) / sumPartSales * 100).toFixed(0) + '%');

  // PANEL 4 CALCULATION
  $("#costOfSublet").text((sumSublet).toFixed(2));
  $("#subletDollarGP").text(((sumSublet - sumSublet)).toFixed(2));
  $("#subletPercentGP").text(((sumSublet - sumSublet) / sumSublet * 100).toFixed(0) + '%');
  $("#totalSales").text(((sumMetalLabor + sumFrameLabor + sumMechLabor + sumPaintLabor + sumPartSales + sumPartsCost + sumPaintAndMaterial + sumSublet + sumTowAndStorage)).toFixed(2));
  $("#totalDollarGP").text(((sumPaintLabor + sumManagerPayRoll) + ((sumMetalLabor + sumFrameLabor + sumMechLabor) - sumManagerBodyRoll) + (sumPaintAndMaterial - (sumInputVendor1 + sumInputVendor2 + sumInputVendor3 + sumInputVendor4 + sumInputVendor5)) + (sumPartSales - sumPartsCost) + ((sumSublet - sumSublet)) + sumTowAndStorage).toFixed(2));
  $("#totalPercentGP").text(((sumPartSales - sumPartsCost) + ((sumSublet - sumSublet)) + sumTowAndStorage) / ((sumMetalLabor + sumFrameLabor + sumMechLabor + sumPaintLabor + sumPartSales + sumPartsCost + sumPaintAndMaterial + sumSublet + sumTowAndStorage)).toFixed(2));

}

function getDatabaseData() {
  //do stuff
  firebase.database().ref().once('value').then(function(snapshot) {
    renderDataToScreen(snapshot.val())
  })
}

getDatabaseData();

// NEW CODE ENTERED HERE 

// this is used to dispaly and hide entry fields when add new button clicked.

$(".showbutton").click(function() {
  event.preventDefault();   
  $("#add-new-record").removeClass("hidden");
});

$(".hidebutton").click(function() {
  event.preventDefault();   
  $("#add-new-record").addClass("hidden");
});

// this is the code for the print button on the top right, opens print dialog box to print the window.

function printMe() {
  window.print();
}