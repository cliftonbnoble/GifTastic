$( document ).ready(function() {
    console.log( "ready!" );

//Global Variables
let comedy = ['Dave Chapelle', 'Will Ferrell', 'Terry Crews', 'Aziz Ansari', 'Stephen Colbert', 'Danny McBride', 'Seth Rogan'];
let stillImg = "";
let animateImg = "";
let stillGif = "";
let animateGif = "";

//Function to create buttons from comedy array
let createButtons = function () {
    for (let i = 0; i < comedy.length; i++) {
        let btnDiv = $("<button>");
        btnDiv.addClass("btn btn-outline-secondary searchBtn");
        btnDiv.attr("data-person", comedy[i]);
        btnDiv.text(comedy[i]);
        $(".btn-area").append(btnDiv);
    }

//Create on click function
$(".searchBtn").on("click", function() {
//Empty out instructions area for Gifs
$(".instructions").empty();
let btnName = $(this).attr("data-person");
console.log(this);
console.log("button name: ", btnName);
//Query url + Click + API Key
let queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + btnName + "&api_key=j9FXfLpusMtwoO373uYUB8djAOtzZVOa&limit=10";
//Ajax call to Giphy API
$.ajax({
    url: queryUrl,
    method: "GET"
  })
  //Waits for the data to arrive
  .then(function (response) {
      //Storing the results
    let results = response.data;
    // console.log("results: ", results);
    //For loop to grab each gif from the object
    for (let j = 0; j < results.length; j++) {
        //Still Image
    stillImg = results[j].images.fixed_height_still.url;
        //Animated Gif
    animateGif = results[j].images.fixed_height.url;
        //Ratings
    let ratings = results[j].rating;
    //Create Elements
    let gifDiv = $("<div>");
    let p = $("<h3>").text("Rating: " + ratings);
    let gifImg = $("<img>");
    //Add class to P tag for styling purposes
    p.addClass("imdb");
    //Give animate attributes
    gifImg.attr("data-still", stillImg);
    gifImg.attr("data-animate", animateGif);
    gifImg.attr("src", stillImg);
    gifImg.attr("data-type", "still");
    gifImg.addClass("gif");
    //Append to Div
    gifDiv.append(gifImg, p);
    // gifDiv.append(gifImg);
    $(".gif-area").prepend(gifDiv);
    console.log("animate GIF: ", animateGif);
    console.log("Still GIF: ", stillImg);   
    }
//     $(document).on("click", ".gif", function () {
//         animateImg = $(this).data("animate");
//         stillGif = $(this).data("still")
//     let state = $(this).data("type");
//     console.log("Atribute: ", state);
//     console.log("this: ", this);
//     if (state === "still") {
//         $(this).attr("src", animateImg);
//         $(this).data("type", "animate");
//         console.log("this in If statement: ", this);
//     } else if (state === "animate"){
//         $(this).attr("src", stillGif);
//         $(this).data("type", "still");
//     }  
// })
});
});

}
$(document).on("click", ".gif", function () {
    animateImg = $(this).data("animate");
    stillGif = $(this).data("still")
let state = $(this).data("type");
console.log("Atribute: ", state);
console.log("this: ", this);
if (state === "still") {
    $(this).attr("src", animateImg);
    $(this).data("type", "animate");
    console.log("this in If statement: ", this);
} else if (state === "animate"){
    $(this).attr("src", stillGif);
    $(this).data("type", "still");
}  
})
//Submit Button
$("#user-input").on("click", function (event) {
    submit();
    $('.form-control').val("");
    // return false
})
let submit = function () {
    event.preventDefault();
    let userInput = $(".form-control").val().trim().toLowerCase();
    if (comedy.includes(userInput)) {
        return
    }
    comedy.push(userInput.toLowerCase());
    $(".btn-area").empty();
    createButtons();
    console.log("BUTTON INFO: ", userInput);
    console.log(event);
    // return false
}
//When Enter is pressed.....
$(".form-control").keydown(function(event){
    if(event.keyCode == 13){
        console.log("working");
        submit();
        $('.form-control').val("");
        // return false
    }
});
//Main Process
createButtons();
});