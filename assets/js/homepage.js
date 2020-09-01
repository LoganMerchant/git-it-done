var getUserRepos = function() {
    // fetch the repos under the octocat user...then pass response through a function
    var response = fetch("https://api.github.com/users/octocat/repos").then(function(response) {
        // the fetched response should be formatted as JSON, then passed data as a callback. 
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

getUserRepos();