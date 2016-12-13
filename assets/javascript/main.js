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
var total = ("29");
database.ref().on("child_added", function(childSnapshot) {
	var now = moment();
    var start = moment(childSnapshot.val().start_db);
    var difference = moment().fromNow().diff(moment(childSnapshot.val().start_db,"minutes"));
    console.log(difference);
	$('.table').append("<tr style='padding: 5%'><td>" +childSnapshot.val().name_db +"</td><td>"
	 +childSnapshot.val().destination_db +"</td><td>" +childSnapshot.val().frequency_db +"</td><td>" +total +"</td></tr>");
	
	});
});