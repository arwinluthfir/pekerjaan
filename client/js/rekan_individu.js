import { Absen } from '../main.js';

Template.Rekap_individu.events({
	'click .hapusAbsenMasuk': function(){
		// var absenID = Absen.findOne({id_pengguna:"AR162450"});
		// Absen.remove({_id:'eedpavFMuPFmZ6MZ6'});
		console.log(this._id);
        event.preventDefault();
		// var hideidVar = event.closest('td').data('name');
		// console.log(Meteor.userId());
		// console.log(hideidVar);
		



	}


});

Template.Rekap_individu.helpers({
	data_absen: function(){
		// return Absen.find({});
		// console.log(Meteor.user().username);
		return Absen.find({'username':Meteor.user().username});
	},
});