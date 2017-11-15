const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
var admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var db = admin.firestore();
exports.updateDB = functions.storage.bucket('amberbucket').object().onChange((event) => {
	const object = event.data;
	var tname = object.id.substr(object.id.lastIndexOf('/') + 1);
	if (object.resourceState == 'exists') {
		//added
		db
			.collection('video')
			.doc(tname)
			.set({
				user: object.id.substr(
					object.id.indexOf('/') + 1,
					object.id.indexOf('/', object.id.indexOf('/') + 1) - object.id.indexOf('/') - 1
				),
				name: object.id.substr(object.id.lastIndexOf('/') + 1),
				location: object.id.substr(0, object.id.lastIndexOf('/'))
			})
			.then(function(docRef) {
				console.log('Document written with ID: ', docRef.id);
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
			});
	} else {
		db
			.collection('video')
			.doc(tname)
			.delete()
			.then(function() {
				console.log('Document successfully deleted!');
			})
			.catch(function(error) {
				console.error('Error removing document: ', error);
			});
	}
});
