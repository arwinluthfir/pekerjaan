import { Absen } from '../main.js';
import { Pekerjaan } from '../main.js';

Template.Penilaian.events({
	'click .hapusPekerjaan': function(){
		// var absenID = Absen.findOne({id_pengguna:"AR162450"});
		// Absen.remove({_id:'eedpavFMuPFmZ6MZ6'});
		// console.log(this._id);
        // event.preventDefault();
		// var hideidVar = event.closest('td').data('name');
		// console.log(Meteor.userId());
		// console.log(hideidVar);
		// console.log(Meteor.user().profile.nama);
		Pekerjaan.remove({_id:this._id});
	},


});

Template.Penilaian.helpers({
	data_kerjaan: function(){
	// var dataKerjaan = db.Pekerjaan.aggregate({
	// 	$lookup:
 //        {
 //          from: Meteor.user(),
 //          localField: "username",
 //          foreignField: "username",
 //          as: "inventory_docs"
 //        }
	// });

	var dataKerjaan = Pekerjaan.find(
		{
			// "bidang_pekerja" : Meteor.user().profile.bidang,
		}
	);

	// var dataKerjaan = Pekerjaan.find({});
	console.log(dataKerjaan);
	return dataKerjaan;
	}
});