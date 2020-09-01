// select the element with an id of `user-form`
var userFormEl = document.querySelector("#user-form");
// select the element with an id of `username`
var nameInputEl = document.querySelector("#username");
// select the element with an id of `repos-container`
var repoContainerEl = document.querySelector("#repos-container");
// select the element with an id of `repo-search-term`
var repoSearchTerm = document.querySelector("#repo-search-term");

var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url (`then()` is asynchronous)
    fetch(apiUrl)
    // request was successful
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
            // call displayRepos with `data` being the returned JSON...
            // and `user` being the name searched as it's parameters
            displayRepos(data, user);
            });
        } else {
            alert("Error: " + response.statusText);
        };
    })

    // request failed
    .catch(function(error) {
        // Notice this `.catch()` getting chained onto the end of the `.then()` method
        alert("Unable to connect to GitHub");
    });
};

var displayRepos = function(repos, searchTerm) {
    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    };

    // clears the repoContainerEl
    repoContainerEl.textContent = "";
    // sets the span element in the HTML to equal whatever name was input in the form
    repoSearchTerm.textContent = searchTerm;

    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name as <repoowner>/<reponame>
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a container for each repo and declare all of it's classes
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        // create a span element to hold repository name (<repoowner>/<reponame>)
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append title to container
        repoEl.appendChild(titleEl);

        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        };

        // append status to container
        repoEl.appendChild(statusEl);

        // append container to the DOM
        repoContainerEl.appendChild(repoEl);
    };
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