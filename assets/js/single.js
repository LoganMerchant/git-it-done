var getRepoIssues = function(repo) {
    // format the api request
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    // request issues for repo from github
    fetch(apiUrl).then(function(response) {
        // if the server request is successful...
        if (response.ok) {
            // return the request as json
            response.json().then(function(data) {
            console.log(data);
            });
        // if the server request fails...
        } else {
            // alert the user
            alert("There was a problem with your request!");
            };
    });
};

getRepoIssues('facebook/react');