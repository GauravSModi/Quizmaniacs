const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const admin = require("firebase-admin");
const firestore = require("firebase-admin/firestore");
admin.initializeApp();
const db = firestore.getFirestore();


// Test Functions

/*
exports.testFunction = functions.https.onCall(async (request, response) => {
//   functions.logger.info("Testing", {structuredData: true});
//   console.log('Testing logs');
    const data = {
        IsTeacher: request.IsTeacher,
    };

    // Have to write stuff to local db before you can read

    // Write stuff to db
    // const user = db.collection('User');
    // await user.doc('TestUser').set({
    //     IsTeacher: true,
    // });

    // Get stuff from db
    const user = db.collection('User').doc('TestUser');
    const doc = await user.get();
    if (!doc.exists) {
        console.log('No such document');
    } else {
        console.log('Document data:', doc.data());
    }

    return {
        text: doc.data()
    };

    // console.log(snapshot);
    // snapshot.forEach((doc) => {
    //     console.log(doc.id, '=>', doc.data());
    //     return doc;
    // });
});

exports.writeName = functions.https.onCall(async (request, response) => {
    // Request should contain fname and lname with 'fn' and 'ln' keys
    // else you can return error?
    console.log(request)
    
    // Get collection which will store the new document
    const users = db.collection('User')
    
    // Write new document with a key
    // or I think you can leave key empty and 
    // get ID of the new user which you can return 
    // to the webpage?
    await users.doc('some key').set({
        fn: request.fn,
        ln: request.ln
    })

});

exports.readName = functions.https.onCall(async (request, response) => {
    // Initialize values
    let fname = 'Some';
    let lname = 'Name';

    // Get document from database
    const user = db.collection('User').doc('some key')
    const doc = await user.get();

    // Get data from document
    if (!doc.exists) {
        console.log('No such user');
    } else {
        fname = doc.data().fn;
        lname = doc.data().ln;
    }

    // Return data
    return {
        fn: fname,
        ln: lname
    }
});


*/


// Quiz functions

exports.getQuiz = functions.https.onCall(async (request, response) => {
    if (!response.auth) {
        return { message: 'Authentication Required!', code: 401 };
    }
    console.log(request)
    const quizID = request.quizId;
    const quizzes = db.collection("quiz");
    const quizDoc = await quizzes.doc(quizID).get();
    if (!quizDoc.exists) {
        console.log("No such quiz");
        return {
            error: "No such quiz",
            code: 404
        }
    } else {
        return {
            quiz: quizDoc.data()
        }
    }
});

exports.createQuiz = functions.https.onCall(async (request, response) => {
    if (!response.auth) {
        return { message: 'Authentication Required!', code: 401 };
    }
    // const userID = request.userID;
    const quizzes = db.collection("quiz");
    let quizId;

    // const uid = quizzes.doc().id
    // await quizzes.doc().set({
    //     // quizName: 
    // })

    console.log(request)

    await quizzes.add(request)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        quizId = docRef.id
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

    return {
        quizId: quizId
    }
});





// User profile functions



exports.updateUser = functions.https.onCall(async(request, response) => {
    if (!response.auth) {
        return { message: 'Authentication Required!', code: 401 };
    }
    const user = db.collection('User');

    const res = await user.doc(request.userID).set({
        isTeacher: request.userType,
    }).then(function() {
        return request
    }).catch(function(error) {
        return {
            error: "No such user",
            code: 404
        }
    });

    console.log(res)
    return res
});

exports.readUser = functions.https.onCall(async(request, context) => {

    if (!context.auth) {
        return { message: 'Authentication Required!', code: 401 };
    }
    const User = db.collection('User');
    const docsRef = await User.doc(request.userID).get();

    if (docsRef.exists) {
        console.log("Document data:", docsRef.data());
        return docsRef.data();
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return {
            error: "No such document",
            code: 404
        }
    }

});

