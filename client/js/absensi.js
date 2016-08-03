import { Template } from 'meteor/templating';
// import { Mongo } from 'meteor/mongo';
import '../main.html';
import { Absen } from '../main.js';

var settingFoto = {
	width: 240,
  	height: 240,
  	quality: 100
}

var tglHariIni ="";
var tanggal = Meteor.call('getServerTanggal',function(err, response){
			// console.log(response);
			if(err){
				alert(err)
			}
			tglHariIni = response
});

var jamServer ="";
var getJamServer = Meteor.call('getServerJam',function(err, response){
			// console.log(response);
			if(err){
				alert(err)
			}
			jamServer = response
});

Template.tampilanMasuk.events ({
	'click .tombolAbsenMasuk': function () {
			MeteorCamera.getPicture (settingFoto, function (error, hasilFotoMasuk) {
				// console.log(hasilFotoMasuk);
			Session.set('captureFotoMasuk',hasilFotoMasuk);
			// var moment = require('moment');
			Session.set('tanggalAbsen',tglHariIni);
			Session.set('jamAbsen',getJamServer);
			// console.log(Meteor.userId());
			// console.log(Meteor.user().username);
			// console.log(moment(Session.get('tanggalAbsen')).format("dddd"));
			// console.log(Meteor.findOne({_id:Meteor.userId()}));
			// console.log(moment(tanggal).format("dddd"));
		});
	},
	'click .simpanAbsenMasuk': function(){

			// var waktu_absen = Session.get('tanggalAbsen');
			var dataAbsen = {
				username : Meteor.user().username,
				tanggal_absen : Session.get('tanggalAbsen'),
				jam_masuk : Session.get('jamAbsen'),
				foto_masuk : Session.get('captureFotoMasuk'),
				jam_pulang : '',
				foto_pulang : ''
			};
			Absen.insert(dataAbsen, function(err){
				if (err)
            		console.log(err);
          		else
            		console.log('success!');
			});
			// console.log(dataAbsen);
	},
	'click .hapusAbsenMasuk': function(){
		var absenID = Absen.findOne({username:"AR162450"});
		Absen.remove({_id:absenID._id});
	}
	
});


Template.tampilanMasuk.helpers({
	// records: function(){
	// 	return AbsenMasuk.find({});
	//  console.log('arwdddin');
	// },
	tombolSimpanAbsenMasuk: function(){
		var tanggal = Meteor.call('getServerTanggal');
		var tglHariIni = moment(tanggal).format("MM/DD/YYYY");
		var fotoAbsenMasukHariIni = Absen.findOne({username:Meteor.user().username,tanggal_absen:tglHariIni});
		// if(!Session.get('captureFotoMasuk'))
		return fotoAbsenMasukHariIni.foto_masuk;
		// else
		// 	return Session.get('captureFotoMasuk');
	},

	hasilFotoMasuk: function (){

		// var tglHariIni = moment(tanggal).format("MM/DD/YYYY");
		// console.log(tglHariIni);
		var fotoAbsenMasukHariIni = Absen.findOne({username:Meteor.user().username,tanggal_absen:tglHariIni});
		
		// console.log(fotoAbsenMasukHariIni.foto_masuk);
		// console.log(tglHariIni);
		if(!Session.get('captureFotoMasuk'))
			return fotoAbsenMasukHariIni.foto_masuk;
		else
			return Session.get('captureFotoMasuk');
	},

	username: function(){
		var tanggal = Meteor.call('getServerTanggal');
		var tglHariIni = moment(tanggal).format("MM/DD/YYYY");
		var fotoAbsenMasukHariIni = Absen.findOne({username:Meteor.user().username,tanggal_absen:tglHariIni});
		if(!fotoAbsenMasukHariIni)
			return Meteor.user().username;
		else{
			return fotoAbsenMasukHariIni.username;
		}
		// return "arwin";
	},
	// waktu: function(){
	// 	return Session.get('waktu');
	// }
	hari: function (){
		// absenMasuk = Session.get('tanggal');
		var tanggal = Meteor.call('getServerTanggal');
		var tglHariIni = moment(tanggal).format("MM/DD/YYYY");
		var fotoAbsenMasukHariIni = Absen.findOne({username:Meteor.user().username,tanggal_absen:tglHariIni});
		if(!fotoAbsenMasukHariIni)
			return moment(Session.get('tanggalAbsen')).format("MM/DD/YYYY");
		else	
			return fotoAbsenMasukHariIni.tanggal_absen;	
	},
	jam: function (){
		var tanggal = Meteor.call('getServerTanggal');
		var tglHariIni = moment(tanggal).format("MM/DD/YYYY");
		var fotoAbsenMasukHariIni = Absen.findOne({username:Meteor.user().username,tanggal_absen:tglHariIni});
		if(!fotoAbsenMasukHariIni)
			return moment(Session.get('tanggalAbsen')).format("HH:mm");
		else	
			return fotoAbsenMasukHariIni.jam_masuk;
	},
});



Template.tampilanPulang.events ({
	'click .tombolAbsenPulang': function () {
			MeteorCamera.getPicture (settingFoto, function (error, hasilFotoPulang) {
			Session.set('captureFotoPulang',hasilFotoPulang);
			var tanggal = Meteor.call('getServerTime');
			Session.set('tanggalAbsen',tanggal);
			// console.log(Meteor.userId());
			// console.log(Meteor.user().username)
		});
	},
	'click .simpanAbsenPulang': function(){
			var tanggalAbsen = moment(Session.get('tanggalAbsen')).format("MM/DD/YYYY");
			var get_id_absen_pulang = Absen.findOne({username:Meteor.user().username,tanggal_absen:tanggalAbsen});
			console.log(get_id_absen_pulang._id)
			var dataAbsenPulang = {
							jam_pulang : moment(Session.get('tanggalAbsen')).format("HH:mm"),
							foto_pulang : Session.get('captureFotoPulang')
						};
			Absen.update(
				{
					'_id':get_id_absen_pulang._id
				},
				{
					$set:
					{
						'jam_pulang':moment(Session.get('tanggalAbsen')).format("HH:mm"),
						'foto_pulang':Session.get('captureFotoPulang')
					}
				});
			console.log(dataAbsenPulang);
	},
	'click .hapusAbsenPulang': function(){
		var absenID = Absen.findOne({id_user:"AR162450"});
		Absen.remove({_id:absenID._id});
	}
	
});

Template.tampilanPulang.helpers({

	tombolSimpanAbsenPulang: function(){
		var fotoAbsenMasukHariIni = Absen.findOne({username:Meteor.user().username,tanggal_absen:tglHariIni});
		return fotoAbsenMasukHariIni.foto_pulang;
	},


	hasilFotoPulang: function (){
		var fotoAbsenMasukHariIni = Absen.findOne({username:Meteor.user().username,tanggal_absen:tglHariIni});
		if(!Session.get('captureFotoPulang'))
			return fotoAbsenMasukHariIni.foto_pulang;
		else
			return Session.get('captureFotoPulang');
	},

	username: function(){
		var fotoAbsenMasukHariIni = Absen.findOne({username:Meteor.user().username,tanggal_absen:tglHariIni});
		if(!fotoAbsenMasukHariIni)
			return Meteor.user().username;
		else{
			return fotoAbsenMasukHariIni.username;
		}
	},
	hari: function (){
		// absenMasuk = Session.get('tanggal');
		var fotoAbsenMasukHariIni = Absen.findOne({username:Meteor.user().username,tanggal_absen:tglHariIni});
		if(!fotoAbsenMasukHariIni)
			return moment(Session.get('tanggalAbsen')).format("MM/DD/YYYY");
		else	
			return fotoAbsenMasukHariIni.tanggal_absen;
	},
	jam: function (){
		var fotoAbsenMasukHariIni = Absen.findOne({username:Meteor.user().username,tanggal_absen:tglHariIni});
		if(!fotoAbsenMasukHariIni)
			return moment(Session.get('tanggalAbsen')).format("HH:mm");
		else	
			return fotoAbsenMasukHariIni.jam_pulang;
	},

});


