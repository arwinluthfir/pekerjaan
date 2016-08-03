import { Meteor } from 'meteor/meteor';
Absen = new Mongo.Collection('absen');
Pekerjaan = new Mongo.Collection('pekerjaan');
Router.route('/', function () {
  this.render('Home');
});


// Meteor.users.allow({
// 	remove: function (userId, doc) {
//     return true;
//   }
// });


Meteor.startup(() => {
  // code to run on server at startup
  Meteor.methods({
  //get server time in milliseconds
  	getServerTanggal: function () {
  		var tanggalServer = new Date();

		var tglHariIni = moment(tanggalServer).format("MM/DD/YYYY");
		// console.log(tglHariIni);
		return tglHariIni;
	  },
	  getServerJam: function () {
  		var waktuServer = new Date();

		var jamHariIni = moment(waktuServer).format("HH:mm");
		// console.log(tglHariIni);
		return jamHariIni;
	  },
});


});

