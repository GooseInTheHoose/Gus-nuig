const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
admin.initializeApp();


// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

 

 exports.postcomment = functions.https.onRequest((request, response) => {
  //response.send(request.body);
  console.log("Request body", request.body);

  cors(request, response, () => {

    const currentTime = admin.firestore.Timestamp.now();
		request.body.timestamp = currentTime;


  admin.firestore().collection('comments').add(request.body).then(()=>{
    response.send("Saved in the database");
  });
  });
});

  exports.getcomment = functions.https.onRequest((request, response) => {
    // 1. Connect to our Firestore database
    console.log("Getting comments");
cors(request, response, () =>
 {
    let myData = []
    return admin.firestore().collection('comments').orderBy("timestamp").get().then((snapshot) =>
         {
          if (snapshot.empty) {
          console.log('No matching documents.');
          response.send('No data in database');
          return;
          }
          snapshot.forEach((doc) => {
            let docObj = {};
            docObj.id = doc.id;  
            myData.push(Object.assign(docObj, doc.data()));
          });
          // 2. Send data back to client
          response.send(myData);
          })
  })
    });


    exports.updatecomment = functions.https.onRequest((request, response) => {
      cors(request, response, () => {
      // your function body here - use the provided req and res from cors
      admin.firestore().collection("comments").doc(request.query.id).update(request.body).then(function()
      {
      response.send("Document successfully updated!");
      })
      });
      });



    exports.deletecomment = functions.https.onRequest((request, response) => {
      cors(request, response, () => {
      // your function body here - use the provided req and res from cors
      admin.firestore().collection("comments").doc(request.query.id).delete().then(function()
      {
      response.send("Document successfully deleted!");
      })
      });
      });
   


