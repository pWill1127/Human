var zipArray =  ["80203"];

//api key = HBsx5MFBfKeBhf3OIRkGr2Gpixr5JjbI


var apiKey = '97539589e8683273163bc2ab1d295f57e572ec46';
// Perfoming an AJAX GET request to our queryURL
var search;

queryUrl = "https://api.census.gov/data/2016/acs/acs5?get=B05002_021E,NAME&for=zip+code+tabulation+area:" + search + "&key=" + apiKey;

let recentClick;
// queryUrl += apiKey




$.ajax({
    url: queryUrl,
    method: 'GET',
}).done(function(result) {
    // console.log(result.response.docs[0].headline.main);
    console.log(result);
}).fail(function(err) {
    throw err;
});
// After the data from the AJAX request comes back

for (var i = 0; i < zipArray.length; i++) { 
    var buttons = $(`<button id ="${zipArray[i]}" value="${i}">${zipArray[i]}</button>`) 
    buttons.appendTo('#zipButtons'); 
} 

function myClick(event) {
    $("#response").empty();
    recentClick = ($(this).val());
    search = zipArray[recentClick];
    queryUrl = "https://api.census.gov/data/2016/acs/acs5?get=B05002_021E,NAME&for=zip+code+tabulation+area:" + search + "&key=" + apiKey;
    resultArray =[];
    var submitClicked = false;

    $.ajax({
        url: queryUrl,
        method: 'GET',
    }).done(function(result) {      
        // console.log(result.response.docs[0].headline.main);
        console.log(result[1][0]);
        resultArray.push(result[1][0]);
        console.log(resultArray);
        for (var j = 0; j < resultArray.length; j++) { 
    
            var myString = `<div class = 'stuff'><p>Estimated number of Non-US Citizens in ${search}:  <strong> ${resultArray[j]} </strong> </p></div>`;
          

            $("#response").append(myString);

        
        }
    });
};

        $("button").click(myClick); 
        $("#addButton").submit(function(event){
            $('html, body').animate({ scrollTop: 0 }, 'fast');
            event.preventDefault();
            console.log("clicked");
            var userInput = $("form input:text").val();
            zipArray.push(userInput);
            var buttons = $(`<button id ="${zipArray.length-1}" value="${zipArray.length-1}">${zipArray[zipArray.length-1]}</button>`);
            buttons.appendTo('#zipButtons'); 
            buttons.click(myClick);
            $("#timelapse-input").val("");
           


        });



