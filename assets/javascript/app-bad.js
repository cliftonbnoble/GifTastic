
//Global
let comedy = ['Dave Chapelle', 'Will Ferrell', 'Aziz Ansari', 'Sarah Silverman', 'Stephen Colbert', 'Danny McBride', 'Seth Rogan', 'Terry Crews'];
let stillImg = "";
let animateImg = "";
let stillGif = "";
let animateGif = "";

//Create buttons from comedy array using for loop
let createButtons = function () {
    for (let i = 0; i < comedy.length; i++) {
        let btnDiv = $("<button>");
        btnDiv.addClass("btn btn-outline-secondary searchBtn");
        btnDiv.attr("data-person", comedy[i]);
        btnDiv.text(comedy[i]);
        $(".btn-area").append(btnDiv);
    }
}
//Submit Button
$("#user-input").on("click", function (event) {
    submit();
    $('.form-control').val("");
    return false
})
//When Enter is pressed.....
$(".form-control").keydown(function(event){
    if(event.keyCode == 13){
        console.log("working");
        submit();
        $('.form-control').val("");
        return false
    }
});
//Submit Function
let submit = function () {
    event.preventDefault();
    let userInput = $(".form-control").val();
    comedy.push(userInput);
    $(".btn-area").empty();
    createButtons();
    console.log("BUTTON INFO: ", userInput);
    console.log(event);
    return false
}

    //Create on click function
    $(".searchBtn").on("click", function() {
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
        p.addClass("imdb")
        //Giving GIFS settings
        gifImg.addClass("gif");
        // gifDiv.attr("data-state", "still");
        gifImg.attr("src", stillImg,);
        gifImg.attr("data-state", "still");
        // gifImg.attr("data-animate", animateGif);
        gifDiv.append(gifImg, p);
        // gifDiv.append(gifImg);
        $(".gif-area").prepend(gifDiv);
        console.log("animate GIF: ", animateGif);
        console.log("Still GIF: ", stillImg);   
        }
        $(document).on("click", ".gif", function () {
        let state = $(this).attr("data-state");
        console.log("Atribute: ", state);
        console.log("this: ", this);
        if (state === "still") {
            $(this).attr("src", animateGif);
            $(this).attr("data-state", "animate");
            console.log("this in If statement: ", this);
        } else {
            $(this).attr("src", stillImg);
            $(this).attr("data-state", "still");
        }  
    })
    });
    });
createButtons();




    
    
