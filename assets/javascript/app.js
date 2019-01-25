//Global
let comedy = ['Dave Chapelle', 'Will Ferrell', 'Aziz Ansari', 'Sarah Silverman', 'Stephen Colbert', 'Danny McBride', 'Seth Rogan', 'Terry Crews'];
let stillImg = "";
let animateImg = "";
let stillGif = "";
let animateGif = "";


//API Variables
// let queryUrl = "https://api.giphy.com/v1/gifs/search?q=";
// let apiKey = "j9FXfLpusMtwoO373uYUB8djAOtzZVOa&limit=10";

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
    //Elements
    let gifDiv = $("<div>");
    let p = $("<h3>").text("Rating: " + ratings);
    let gifImg = $("<img>");
    //Giving GIFS settings
    gifDiv.addClass("gif");
    gifDiv.attr("data-state", "still");
    gifImg.attr("src", stillImg, "data-still");
    gifImg.attr("data-animate", animateGif);
    gifDiv.append(p, gifImg);
    // gifDiv.append(gifImg);
    $(".gif-area").prepend(gifDiv);
    console.log("animate GIF: ", animateGif);
    console.log("Still GIF: ", stillImg);
        
    }
    $(document).on("click", ".gif", function () {
    let state = $(this).attr("data-state");
    console.log("Atribute: ", state);
    if (state === "still") {
        $(this).attr("src", $(this).attr(animateGif));
        $(this).attr("data-state", "animate");
        console.log("this: ", this);
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
    
})

});

//End of click function
});
}
// $(document).on("click", ".gif", function () {
//     let state = $(this).attr("data-state");
//     console.log("Atribute: ", state);
//     if (state === "still") {
//         $(this).attr("src", animateGif, "data-state", "animate");
//         // $(this).attr("data-state", "animate");
//         console.log("this: ", this);
//     } else {
//         $(this).attr("src", $(this).attr("data-still"));
//         $(this).attr("data-state", "still");
//     }
    
// })

//Submit Button
$("#user-input").on("click", function (event) {
    submit();
})
let submit = function () {
    event.preventDefault();
    let userInput = $(".form-control").val();
    comedy.push(userInput);
    $(".btn-area").empty();
    createButtons();
    console.log("BUTTON INFO: ", userInput);
    console.log(event);
    // $("#searchBar").html("");
}
//Main Process
createButtons();    
