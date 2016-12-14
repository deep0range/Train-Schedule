 var config = {
    apiKey: "AIzaSyChmDkS2vzTUUapbnvsFAOOCPb5p1KPS9k",
    authDomain: "train-schecule.firebaseapp.com",
    databaseURL: "https://train-schecule.firebaseio.com",
    storageBucket: "train-schecule.appspot.com",
    messagingSenderId: "654132748832"
  };
  firebase.initializeApp(config);

 var database = firebase.database();

 $(document).ready(function(e) {
     $('.submit').click(function() {
         var name = $('.trainName').val().trim();
         var destination = $('.destination').val().trim();
         var start = $('.start').val().trim();
         var frequency = $('.frequency').val().trim();
           database.ref().push({
         	name_db: name,
            destination_db: destination,
            start_db: start,
         	frequency_db: frequency,
         	});
         return false;
     })

database.ref().on("child_added", function(childSnapshot) {
	var now = moment();
    var start = moment().startOf("day").hour(childSnapshot.val().start_db.substring(0,2)).minute(childSnapshot.val().start_db.substring(3,5));
    var difference = start.diff(now,"minutes");
    console.log(difference);
    var next = Math.ceil(difference/childSnapshot.val().frequency_db)*childSnapshot.val().frequency_db-difference
	if (next < 0){
        var next2 = (childSnapshot.val().frequency_db)-next;
    }
    else{
        var next2 = next;
    }
    var time = moment().add(next2,"minutes");
    var hours = time.hours();
    var minutes = time.minutes();
    $('.table').append("<tr style='padding: 5%'><td>" +childSnapshot.val().name_db +"</td><td>"
	 +childSnapshot.val().destination_db +"</td><td>" +childSnapshot.val().frequency_db +"</td><td>" + hours +": "+ minutes + "</td><td>" + next2 +"</td></tr>");

	
	});
});