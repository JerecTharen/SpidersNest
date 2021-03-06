

var test = $("#Alert1").html();

console.log(test);

// $.get("https://theowlhouse.fandom.com/wiki/Season_2", function(data, status){
//     console.log("data: ", data);
//     console.log("status", status);
// });

$.get( "http://localhost:3000/test", function( data ) {
    // $( ".result" ).html( data );
    console.log("here is result: ", JSON.parse(data), data);
});