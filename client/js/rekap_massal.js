import { Absen } from '../main.js';


Template.Rekap_masal.events({
	'click .hapusAbsenMasuk': function(){
		// var absenID = Absen.findOne({id_pengguna:"AR162450"});
		Absen.remove({_id:this._id});
		// console.log(this._id);
        event.preventDefault();
		// var hideidVar = event.closest('td').data('name');
		// console.log(Meteor.userId());
		// console.log(hideidVar);
// 		var excelbuilder = require('msexcel-builder');
// var workbook = excelbuilder.createWorkbook('./', 'sample.xlsx')
  
//   // Create a new worksheet with 10 columns and 12 rows 
//   var sheet1 = workbook.createSheet('sheet1', 10, 12);
  
//   // Fill some data 
//   sheet1.set(1, 1, 'I am title');
//   for (var i = 2; i < 5; i++)
//     sheet1.set(i, 1, 'test'+i);
  
//   // Save it 
//   workbook.save(function(ok){
//     if (!ok) 
//       workbook.cancel();
//     else
//       console.log('congratulations, your workbook created');
//   });



	}


});

Template.Rekap_masal.helpers({
	data_absen: function(){
		// return Absen.find({});
    var absenMasal = Absen.find({});
    // console.log(absenMasal);
    return absenMasal;
		// return Absen.find({});
	},

  
});

Template.showListRekapanMasal.events({

  'click .tambahProfile': function(){
		// var absenID = Absen.findOne({id_pengguna:"AR162450"});
		// Absen.remove({_id:'eedpavFMuPFmZ6MZ6'});
		// console.log(this._id);
		var dataProfile = {
                npk: "NPK FA123123",
                nama: "Nama FA123123",
                jabatan: "jabatan FA123123"
            };
            console.log(dataProfile);
		// Meteor.users.update({_id:this._id},{$push:{"profile":dataProfile}});

		console.log(this._id);
        event.preventDefault();

	}
});

Template.showListRekapanMasal.helpers({
    data_nama: function(){
	    // return Absen.find({});
	    var dataNama = Meteor.users.find({}).fetch();
	    console.log(dataNama);
	    return dataNama;
  	}
});