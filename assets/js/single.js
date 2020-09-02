var issuesContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

var getRepoName = function() {
    // search the url for it's `search` property
    var queryString = document.location.search
    // split `queryString` at the =, and use index 1
    var repoName = queryString.split("=")[1];

    // if no queryString is available, redirect to the homepage
    if (!queryString) {
        document.location.replace('./index.html');
    } else {
        // use `repoName` to display the repo's name in the header
        repoNameEl.textContent = repoName;
        // pass `repoName` to getRepoIssues();
        getRepoIssues(repoName);
    };
};

var getRepoIssues = function(repo) {
    // format the api request
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    // request issues for repo from github
    fetch(apiUrl).then(function(response) {
        // if the server request is successful...
        if (response.ok) {
            // return the request as json
            response.json().then(function(data) {
                // pass the data to the displayIssues function
                displayIssues(data);

                // check if api has paginated issues
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                };
            });
        // if the server request fails...
        } else {
            // redirect the user back to the homepage
            document.location.replace('./index.html');
        };
    });
};

var displayIssues = function(issues) {
    // checks if there are indeed any open issues
    if (issues.length === 0) {
        issuesContainerEl.textContent = "This repo has no open issues!";
        return;
    };

    for (var i = 0; i < issues.length; i++) {
        // create a link(<a>) element with several classes,
        // an href to this iteration's `html_url`
        // and open the link in a new window/tab
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        // create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        };

        // append to container
        issueEl.appendChild(typeEl);

        // append to HTML
        issuesContainerEl.appendChild(issueEl);
    };
};

var displayWarning = function(repo) {
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    // create a link to the issues page of the given repo
    linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    limitWarningEl.appendChild(linkEl);
};

getRepoName();