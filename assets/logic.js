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

  // Uploads employee and manager data to the database
  // database.ref().push(newCarJob);

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
var sumMetalLabor= 0;
var sumFrameLabor= 0;
var sumMechLabor= 0;
var sumPaintLabor= 0;
var sumPartSales= 0;
var sumPartsCost= 0;
var sumPaintAndMaterial= 0;
var sumSublet= 0;
var sumTowAndStorage= 0;



var lastJob;



// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref('newCarJob').on("child_added", function(childSnapshot, prevChildKey) {
  lastJob = childSnapshot.val();
  // console.log(lastJob);
  var jobToAdd = lastJob.newCarJob;


  // Panel 3: Store everything into a variable.
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
  console.log(projDate);
  console.log(projNumb);


  // //Computing all the sums 
  sumMetalLabor += parseInt(projMetalLabor);
  sumFrameLabor += parseInt(projFrameLabor);
  sumMechLabor += parseInt(projMechLabor);
  sumPaintLabor += parseInt(projPaintLabor);
  sumPartSales += parseInt(projPartSales);
  sumPartsCost += parseInt(projPartsCost);
  sumPaintAndMaterial += parseInt(projPaintAndMaterial);
  sumSublet += parseInt(projSublet);
  sumTowAndStorage += parseInt(projTowAndStorage);

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



  $("#employee-table").append("<tr><td>" + projDate + "</td><td>" + projNumb + "</td><td>" + projMetalLabor + "</td><td>" + projFrameLabor + "</td><td>" +
  projMechLabor + "</td><td>" + projPaintLabor + "</td><td>" + projPartSales + "</td><td>"+ projPartsCost + "</td><td>" + projPaintAndMaterial + "</td><td>" + projSublet + "</td><td>" + projTowAndStorage + "</td></tr>");

});





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

  //database.ref().push(managerTotalWork);

  database.ref('managerTotalWork').push({
    managerTotalWork
  })


  $("#totalPaintshopPayroll-input").val("");
  $("#totalBodyshopPayroll-input").val("");

});



var managerJob;
// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref('managerTotalWork').on("child_added", function(childSnapshot, prevChildKey) {
  managerJob = childSnapshot.val();
  // console.log(managerJob);
  var managerToAdd = managerJob.managerTotalWork;

  // Panel 1
  var managerInputPaintPayroll = managerToAdd.managerPaintPay;
  var managerInputBodyshopPayroll = managerToAdd.managerBodyShopPay;
  
});





$("#add-vendor-btn").on("click", function(event) {
  event.preventDefault();


  //grabs manager vendors input 
  var managerInputVendor1 = $("#vendor1-input").val().trim();
  var managerInputVendor2 = $("#vendor2-input").val().trim();
  var managerInputVendor3 = $("#vendor3-input").val().trim();
  var managerInputVendor4 = $("#vendor4-input").val().trim();
  var managerInputVendor5 = $("#vendor5-input").val().trim();


  // Creates local "temporary" object for holding vendor input data

 var vendorTotalWork = {
    vendor1: managerInputVendor1,
    vendor2: managerInputVendor2,
    vendor3: managerInputVendor3,
    vendor4: managerInputVendor4,
    vendor5: managerInputVendor5

  }


  // database.ref().push(vendorTotalWork);
  database.ref('vendorTotalWork').push({
    vendorTotalWork
  });

  $("#vendor1-input").val("");
  $("#vendor2-input").val("");
  $("#vendor3-input").val("");
  $("#vendor4-input").val("");
  $("#vendor5-input").val("");
  
});


var vendorJob;

database.ref('vendorTotalWork').on("child_added", function(childSnapshot, prevChildKey) {
  vendorJob = childSnapshot.val();
  // console.log(vendorJob);
  var vendorToAdd = vendorJob.vendorTotalWork;

  // // Panel 2
  var managerInputVendor1 = vendorToAdd.vendor1;
  var managerInputVendor2 = vendorToAdd.vendor2;
  var managerInputVendor3 = vendorToAdd.vendor3;
  var managerInputVendor4 = vendorToAdd.vendor4;
  var managerInputVendor5 = vendorToAdd.vendor5;
  
});

// click add new will make the field appears

$(".showbutton").click(function(){
 event.preventDefault();   
 $("#add-new-record").removeClass("hidden");
});



// // //Computing all the sums 
// sumMetalLabor += parseInt(projMetalLabor);
// sumFrameLabor += parseInt(projFrameLabor);
// sumMechLabor += parseInt(projMechLabor);
// sumPaintLabor += parseInt(projPaintLabor);
// sumPartSales += parseInt(projPartSales);
// sumPartsCost += parseInt(projPartsCost);
// sumPaintAndMaterial += parseInt(projPaintAndMaterial);
// sumSublet += parseInt(projSublet);
// sumTowAndStorage += parseInt(projTowAndStorage);

//   // Add each sum labor data into the table
//   $("#metalLabor").text(sumMetalLabor);
//   $("#frameLabor").text(sumFrameLabor);
//   $("#mechLabor").text(sumMechLabor);
//   $("#paintLabor").text(sumPaintLabor);
//   $("#partSales").text(sumPartSales);
//   $("#partsCost").text(sumPartsCost);
//   $("#paintMaterial").text(sumPaintAndMaterial);
//   $("#sublet").text(sumSublet);
//   $("#towStorage").text(sumTowAndStorage);
//   $("#paintPay").text(sumPaintPay);


//   // // 4. Create a way to calculate the sum for all the work  

//   $("#paintshopLabor").text(sumPaintLabor);
//   $("#bodyshopLabor").text(sumMetalLabor + sumFrameLabor + sumMechLabor);
//   // $("#gpDollarPaintshop").text(sumPaintLabor + div for total paintshop payroll); // we need work on 
//   // $("#gpPercentPaintshop").text((sumPaintLabor + div for total paintshop payroll)/ sumPaintLabor * 100);
//   // $("#gpDollarBodyshop").text((sumMetalLabor + sumFrameLabor + sumMechLabor) - totalBodyShopPayroll;
//   // $("#GP % Bodyshop").text((sumMetalLabor + sumFrameLabor + sumMechLabor) - totalBodyShopPayroll)/paintShopBodyLabor * 100);
//   // $("#gpPaintDollar").text(sumPaintAndMaterial -);
//   $("#gpDollarParts").text(sumPartSales - sumPartsCost);
//   $("#gpPercentParts").text(gpDollarParts / sumPartSales  * 100);


//   // // ////////////////////////////////////////////////////



//   // $("#costOfSublet").sumSublet
//   // subletDollarGP = ?
//   // subletPercentGP = ?
//   // totalSales = sumMetalLabor + sumFrameLabor + sumMechLabor + sumPaintLabor + sumPartSales + sumPartsCost + sumPaintAndMaterial + sumSublet + sumTowAndStorage;

//   // totalDollarGP = gpPaintDollar + gpDollarBodyshop + gpPaintDollar + gpDollarParts + subletDollarGP + sumTowAndStorage

//   // totalPercentGP = totalDollarGP / totalSales

// // });



