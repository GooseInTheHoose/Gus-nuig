function postComment() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://us-central1-goosey-app.cloudfunctions.net/postcomment');

    xhr.setRequestHeader("Content-type", "application/json");
    // Track the state changes of the request.
    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                getComments(); // 'Call get comments to retrieve the latest'
            } else {
                console.log('Error: ' + xhr.status); // An error occurred during the request.
            }
        }
    };
  
    xhr.send(JSON.stringify({"handle": document.getElementById('handle').value, "comment": 	document.getElementById('comment').value}));
}