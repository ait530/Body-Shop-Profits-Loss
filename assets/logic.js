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

// Creates and initializes a Firebase app instance
firebase.initializeApp(config);

// Gets the Database service for the default app or a given app
var database = firebase.database();

// 2. Submit Button for adding Employees
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
  var projPaintPay = $("#paintPay-input").val().trim();


  //grabs manager input 
  var managerInputPaintPayroll = $("#totalPaintshopPayroll-input").val().trim();
  var managerInputBodyshopPayroll = $("#totalBodyshopPayroll-input").val().trim();


  //grabs manager vendors input 

  var managerInputVendor1 = $("#vendor1-input").val().trim();
  var managerInputVendor2 = $("#vendor2-input").val().trim();
  var managerInputVendor3 = $("#vendor3-input").val().trim();
  var managerInputVendor4 = $("#vendor4-input").val().trim();
  var managerInputVendor5 = $("#vendor5-input").val().trim();


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

  // Creates local "temporary" object for holding manager input data

  var managerTotalWork = {
    managerPaintPay: managerInputPaintPayroll,
    managerBodyShopPay: managerInputBodyshopPayroll
  }


  // Creates local "temporary" object for holding vendor input data

 var vendorTotalWork = {
    vendor1: managerInputVendor1,
    vendor2: managerInputVendor2,
    vendor3: managerInputVendor3,
    vendor4: managerInputVendor4,
    vendor5: managerInputVendor5

  }
  
  // Uploads employee and manager data to the database
  database.ref().push(newCarJob);
  database.ref().push(managerTotalWork);
  database.ref().push(vendorTotalWork);
  // Logs everything to console
  console.log(newCarJob);
  console.log(managerTotalWork);
  console.log(vendorTotalWork); 

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
  $("#paintPay-input").val("");

  // Prevents moving to new page
  return false;
});

  //counter
  var sumMetalLabor= 0;
  var sumFrameLabor= 0;
  var sumMechLabor= 0;
  var sumPaintLabor= 0;
  var sumPartSales= 0;
  var sumPartsCost= 0;
  var sumPaintAndMaterial= 0;
  var sumSublet= 0;
  var sumTowAndStorage= 0;
  var sumPaintPay= 0;


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Panel 1
  var managerInputPaintPayroll = childSnapshot.val().managerPaintPay;
  var managerInputBodyshopPayroll = childSnapshot.val().managerBodyShopPay;


  // Panel 2
  var managerInputVendor1 = childSnapshot.val().vendor1;
  var managerInputVendor2 = childSnapshot.val().vendor2;
  var managerInputVendor3 = childSnapshot.val().vendor3;
  var managerInputVendor4 = childSnapshot.val().vendor4;
  var managerInputVendor5 = childSnapshot.val().vendor5;

  // Panel 3: Store everything into a variable.
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
  var projPaintPay = childSnapshot.val().paintPay;

  //Computing all the sums 
  sumMetalLabor += parseInt(projMetalLabor);
  sumFrameLabor += parseInt(projFrameLabor);
  sumMechLabor += parseInt(projMechLabor);
  sumPaintLabor += parseInt(projPaintLabor);
  sumPartSales += parseInt(projPartSales);
  sumPartsCost += parseInt(projPartsCost);
  sumPaintAndMaterial += parseInt(projPaintAndMaterial);
  sumSublet += parseInt(projSublet);
  sumTowAndStorage += parseInt(projTowAndStorage);
  sumPaintPay += parseInt(projPaintPay);
  



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
  $("#paintPay").text(sumPaintPay);


  // // 4. Create a way to calculate the sum for all the work  

  // $("#paintshopLabor").text(sumPaintLabor);
  // $("#bodyshopLabor").text(sumMetalLabor + sumFrameLabor + sumMechLabor);
  // // $("#gpDollarPaintshop").text(sumPaintLabor + ); // we need work on 
  // // $("#gpPercentPaintshop").text(something here * 100);
  // // $("#gpDollarBodyshop").text(something);
  // // $("#GP % Bodyshop").text(something here * 100);
  // // $("#gpPaintDollar").text(sumPaintAndMaterial -);
  // $("#gpDollarParts").text(sumPartSales - sumPartsCost);
  // $("#gpPercentParts").text(gpDollarParts / sumPartSales  * 100);

  // // ////////////////////////////////////////////////////



  // $("#costOfSublet").sumSublet
  // subletDollarGP = ?
  // subletPercentGP = ?
  // totalSales = sumMetalLabor + sumFrameLabor + sumMechLabor + sumPaintLabor + sumPartSales + sumPartsCost + sumPaintAndMaterial + sumSublet + sumTowAndStorage;

  // totalDollarGP = gpPaintDollar + gpDollarBodyshop + gpPaintDollar + gpDollarParts + subletDollarGP + sumTowAndStorage

  // totalPercentGP = totalDollarGP / totalSales

});

$("#paintshopLabor").text(sumPaintLabor);
$("#bodyshopLabor").text(sumMetalLabor + sumFrameLabor + sumMechLabor);


