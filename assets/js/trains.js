
// $(document).ready(function(){

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBPfBI0PtLZPyNDhavWslosWOSxz0HRW48",
        authDomain: "train-schedule-7e80a.firebaseapp.com",
        databaseURL: "https://train-schedule-7e80a.firebaseio.com",
        projectId: "train-schedule-7e80a",
        storageBucket: "train-schedule-7e80a.appspot.com",
        messagingSenderId: "866916382695"
      };
    
    firebase.initializeApp(config);


    // Connecting to firebase
    var database = firebase.database();

    // Global variables
    var train = "";
    var destination = "";
    var time = 0;
    //moment({ // Options here }).format('HHmm')
    var frequency = 0;

    // Moment math
    
    // time = $("#time").val();
    // frequency = $("#frequency").val();



    // Submit button from form field
    $("#submit").on("click", function(event) {
        event.preventDefault();

        train = $("#train").val();
        destination = $("#destination").val();
        time = moment($("#time").val(), "HH:mm").subtract(10, "years").format("X");
        frequency = $("#frequency").val();
    
        // Firebase object
        var newTrain= {
            train: train,
            destination: destination,
            time: time,
            frequency: frequency
        };
        // sending data to firebase
        database.ref().push(newTrain);

        // Emptying the form fields
        clear();
    // Append the new row to the table
     });
    // ------------------------------------


    // ======================================
    database.ref().on("child_added", function(childSnapshot) {
        // console.log(childSnapshot.val());
      
        // Store everything into a variable.
        var train = childSnapshot.val().train;
        var destination = childSnapshot.val().destination;
        var frequency = childSnapshot.val().frequency;
        var time = childSnapshot.val().time;
      
        // moment.js
        var remainder = moment().diff(moment.unix(time), "minutes")%frequency;
        var minutesLeft = frequency-remainder;
        var arrival  = moment().add(minutesLeft, "m").format("hh:mm A");

        // console.log(remainder);
        // console.log(minutesLeft);
        // console.log(arrival);
      
        // Create the new row
       var newRow = $('<tr class="border">').append(
            $("<td>").text(train.toUpperCase()),
            $("<td>").text(destination.toUpperCase()),
            $("<td>").text(frequency),
            $("<td>").text(arrival),
            $("<td>").text(minutesLeft),
    );
  
    $("#table-body").append(newRow);
    
    });

    // ------------------------------------

    function clear() {
        $(".form-control").val("");
        }

  
   
// });