// select any element with an id of `user-form`
var userFormEl = document.querySelector("#user-form");
// select any element with an id of `username`
var nameInputEl = document.querySelector("#username");

var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url (then is asynchronous)
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

var formSubmitHandler = function(event) {
    // prevent the page from browser from refreshing/submitting the form
    event.preventDefault();

    // get and trim the value of whatever the user input in the form
    var username = nameInputEl.value.trim();

    // if username returns true, i.e. there is a name there...
    if (username) {
        // perform the `getUserRepos` function with `username` as the parameter
        getUserRepos(username);
        // empty the input field in the form
        nameInputEl.value = "";
    // if there is no username when the form is submitted, alert the user
    } else {
        alert("Please enter a GitHub username.");
    };
};

// when the userFormEl is submitted, perform the `formSubmitHandler` function.
userFormEl.addEventListener("submit", formSubmitHandler);