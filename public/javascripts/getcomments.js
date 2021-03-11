function getComments()
{
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://us-central1-goosey-app.cloudfunctions.net/getcomment');

// Track the state changes of the request.
xhr.onreadystatechange = function () {
    var DONE = 4; // readyState 4 means the request is done.
    var OK = 200; // status 200 is a successful return.
    if (xhr.readyState === DONE) {
        if (xhr.status === OK) {
	var sHTML = "";
	var data = JSON.parse(xhr.responseText);
	for(var i=0; i<data.length; i++)
	{
	 sHTML += "<p> Handle: " + data[i].handle+ "</p>";
	 sHTML += "<p> Comment: " + data[i].comment+ "</p>";
	 sHTML += "<button onclick=deleteComment(" + "'" + data[i].id + "'" + ")>Delete Comment</button>";

	 comments.innerHTML = sHTML;
	}			
        } else {
            console.log('Error: ' + xhr.status); // An error occurred during the request.
        }}};
// Send the request to https://us-central1-my-cool-web-app-37271.cloudfunctions.net/getcomments
xhr.send(null);
}

setInterval(getComments, 60000);