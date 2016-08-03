import { Absen } from '../main.js';


Template.Pengguna.events({
	'click .hapusAbsenMasuk': function(){
		// var absenID = Absen.findOne({id_pengguna:"AR162450"});
		console.log(this._id);
		Meteor.users.remove({_id:this._id});
		// console.log(this._id);
        event.preventDefault();
		// var hideidVar = event.closest('td').data('name');
		// console.log(Meteor.userId());
		// console.log(hideidVar);
		



	}


});

Template.Pengguna.helpers({
	data_absen: function(){
		// return Absen.find({});

		return Meteor.users.find({username:{$ne:"ADMIN"}},{sort:{'profile.bidang':1,'profile.posisi':1}});
	},
});