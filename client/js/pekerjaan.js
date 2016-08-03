
import { Pekerjaan } from '../main.js';

Template.kerjaanHariIni.events({
	// 'click .tambahPekerjaanHariIni': function () {
			// MeteorCamera.getPicture ({}, function (error, hasilFotoPulang) {
			// Session.set('captureFotoPulang',hasilFotoPulang);
			// var tanggal = new Date();
			// Session.set('tanggalAbsen',tanggal);
			// console.log(Meteor.userId());
			// console.log(Meteor.user().username)
			// console.log('pencet tambah');
		// });
	// },

	'click .showTambahKerjaan': function (){
        $('#inputKerjaanHariIni').fadeIn();
        $('.hideTambahKerjaan').fadeIn();
        $('.showTambahKerjaan').fadeOut();
    },

    'click .hideTambahKerjaan':function(){
        $('#inputKerjaanHariIni').fadeOut();
        $('.hideTambahKerjaan').fadeOut();
        $('.showTambahKerjaan').fadeIn();
    },
	'click .hapusKerjaan':function(){
		Pekerjaan.remove({});
        event.preventDefault();
	}
});

Template.kerjaanHariIni.helpers({
	tanggalHariIni: function(){
		var tanggal = new Date();
		return moment(tanggal).format("DD MMMM YYYY")
		// return moment(tanggal).add(-1,'days')
	}
});

Template.templateTambahKerjaanHariIni.events({
	'click .TambahKerjaan':function(){
		event.preventDefault();

		var judul_kerjaan = $('[name=judulKerjaan]').val();
		var detil_kerjaan = $('[name=detilKerjaan]').val();
		// var status_kerjaan = $('[name=statusKerjaan]').val();
        var getstatus_kerjaan = document.getElementById("statusKerjaan");
        var status_kerjaan = getstatus_kerjaan.options[getstatus_kerjaan.selectedIndex].value;
		var keterangan_kerjaan = $('[name=keteranganKerjaan]').val();
		var tanggal = new Date();
		var tanggalHariIni = moment(tanggal).format("MM/DD/YYYY");
		// var tanggalHariKemarin = moment(tanggal).add(-3, 'days')
		var idDetilKerjaan = new Meteor.Collection.ObjectID();
		console.log(idDetilKerjaan);
		var dataKerjaan = {
			username : Meteor.user().username,
			nama_pekerja : Meteor.user().profile.nama,
			posisi_pekerja : Meteor.user().profile.posisi,
			bidang_pekerja : Meteor.user().profile.bidang,
			tanggal_kerjaan : tanggalHariIni,
			detil_kerjaan :[{
				id : idDetilKerjaan,
				judul_kerjaan : judul_kerjaan,
        		detil_kerjaan : detil_kerjaan,
        		status_kerjaan : status_kerjaan,
        		keterangan_kerjaan : keterangan_kerjaan
			}]
		};
        if(judul_kerjaan == "" || detil_kerjaan == "" || detil_kerjaan == "" || keterangan_kerjaan == ""){
            alert('Masukkan data pekerjaan dengan lengkap');
        }
        else{
        	var konfirmasi = confirm('Apakah data anda sudah benar?');
        	if (konfirmasi == true) {
        		var cekPekerjaanHariIni = Pekerjaan.findOne({"username":Meteor.user().username,"tanggal_kerjaan":tanggalHariIni});
        		if(!cekPekerjaanHariIni)
					Pekerjaan.insert(dataKerjaan, function(err){
						if (err)
		            		console.log(err);
		          		else
		            		console.log('pekerjaan tersimpan');
					});
				else{
					Pekerjaan.update(
					{"_id":cekPekerjaanHariIni._id},
						{ $addToSet :
							{
								detil_kerjaan : {$each:[
								{
								id : idDetilKerjaan,
								judul_kerjaan : judul_kerjaan,
				        		detil_kerjaan : detil_kerjaan,
				        		status_kerjaan : status_kerjaan,
				        		keterangan_kerjaan : keterangan_kerjaan
								}
								]}
							}
						}
					, function(err){
						if (err)
		            		console.log(err);
		          		else
		            		console.log('pekerjaan tersimpan');
					});
					console.log(cekPekerjaanHariIni._id);
				};
        	}
        	else{
            	alert("Silahkan masukkan data pekerjaan dengan benar");
        	}

        }
		
        // Session.set('dataKerjaan',dataKerjaan)
	}
});


Template.detilKerjaanHariIni.helpers({
	dataKerjaanHariIni: function(){
		var tanggal = new Date();
		var tanggalHariIni = moment(tanggal).format("MM/DD/YYYY");
		return Pekerjaan.find({"username":Meteor.user().username,"tanggal_kerjaan":tanggalHariIni});
		// return Pekerjaan.find({"username":Meteor.user().username});
	}
});

Template.detilKerjaanBelumSelesai.events({

	'click .idPekerjaanBelumSelesai': function(){
		console.log(this.id);
		var kerja = Pekerjaan.findOne({"detil_kerjaan.id":this.id});
		Pekerjaan.update({"_id":kerja._id},{$pull:{"detil_kerjaan":{"id":this.id}}});
		
	},
});

Template.detilKerjaanBelumSelesai.helpers({
	dataKerjaanBelumSelesai: function(){
		var tanggal = new Date();
		var tanggalHariIni = moment(tanggal).format("MM/DD/YYYY");
		// var tes = Pekerjaan.find({"username":Meteor.user().username,"tanggal_kerjaan":{$lt:tanggalHariIni},"detil_kerjaan.status_kerjaan":"PENDING"});
		
		var result_arr = Pekerjaan.find(
			{
				"username":Meteor.user().username,
				"tanggal_kerjaan":{$lt:tanggalHariIni},
				"detil_kerjaan.status_kerjaan":"PENDING"
			}
			,
			{
				"detil_kerjaan":{
					$elemMatch:{
						"status_kerjaan": "PENDING"
					}
				}


			// 	// "id":1
			}
		);
		
		var filter_arr = [];
		// filter_arr = Meteor.call('getPekerjaanBelumSelesai');
		// console.log(result_arr[0].detil_kerjaan);
		// for(var i = 0; i < result_arr.length; i ++){
		// 	console.log(result_arr[i]._id);
		//       // If( result_arr[i]._id = "WWETRQIR5Y4T6BGBW")
		//       //       filter_arr.push(result_arr[i].data);
		// };
		// console.log(filter_arr);

		// var tes = Pekerjaan.find({"_id":kerja._id},{"detil_kerjaan":{"id":this.id}});
		
		// var tes = Pekerjaan.find({"detil_kerjaan":{$elemMatch:{"status_kerjaan":"PENDING"}}},{"detil_kerjaan.$":1});
		// return Pekerjaan.find({"detil_kerjaan":{"$elemMatch":{"status_kerjaan":'PENDING'}}});
		// console.log(tes);
		// var tes2 = db.Pekerjaan.aggregate({});
		return result_arr;
	},
});

Template.kerjaanKemarin.helpers({
	tanggalHariKemarin: function(){
		var tanggal = new Date();
		var tanggalHariIni = moment(tanggal).format("MM/DD/YYYY");
		var tanggalKerjaanKemarin = Pekerjaan.findOne({"username":Meteor.user().username,"tanggal_kerjaan":{$lt:tanggalHariIni}},{sort:{tanggal_kerjaan:-1},limit:1})
		// console.log(tanggalKerjaanKemarin.tanggal_kerjaan);
		// console.log(tanggalKerjaanKemarin.tanggal_kerjaan);
		return tanggalKerjaanKemarin.tanggal_kerjaan;
	}
});

Template.detilKerjaanKemarin.helpers({
	dataKerjaanKemarin: function(){
		var tanggal = new Date();
		var tanggalHariIni = moment(tanggal).format("MM/DD/YYYY");
		var tanggalKerjaanKemarin = Pekerjaan.findOne({"username":Meteor.user().username,"tanggal_kerjaan":{$lt:tanggalHariIni}},{sort:{tanggal_kerjaan:-1},limit:1})
		// console.log(tanggalKerjaanKemarin);
		return Pekerjaan.find({"username":Meteor.user().username,"tanggal_kerjaan":tanggalKerjaanKemarin.tanggal_kerjaan},{"tanggal_kerjaan":{$lt:tanggalHariIni}},{sort:{tanggal_kerjaan:-1},limit:1});
		// return Pekerjaan.find({"username":Meteor.user().username});
	}
});

Template.kerjaanBesok.events({
	// 'click #showCalendar':function(){
 //                $('#datetimepicker3').datetimepicker();
 //                console.log(moment($('#datetimepicker3').value).toDate());
 //            },
 //    'click .showValueTanggal':function(){
 //    	console.log(moment($('#datetimepicker3').value).toDate());
 //    }

	'click .showTambahKerjaanBesok': function (){
        $('#inputKerjaanBesok').fadeIn();
        $('.hideTambahKerjaanBesok').fadeIn();
        $('.showTambahKerjaanBesok').fadeOut();
    },

    'click .hideTambahKerjaanBesok':function(){
        $('#inputKerjaanBesok').fadeOut();
        $('.hideTambahKerjaanBesok').fadeOut();
        $('.showTambahKerjaanBesok').fadeIn();
    },

    'click .TambahKerjaanBesok':function(){
		event.preventDefault();

		var tanggal_kerjaan_besok = $('[name=tanggalKerjaanBesok]').val();
		var judul_kerjaan = $('[name=judulKerjaanBesok]').val();
		var detil_kerjaan = $('[name=detilKerjaanBesok]').val();
		var status_kerjaan = $('[name=statusKerjaanBesok]').val();
		var keterangan_kerjaan = $('[name=keteranganKerjaanBesok]').val();
		// var tanggal = new Date();
		// var tanggalHariIni = moment(tanggal).format("MM/DD/YYYY");
		// var tanggalHariKemarin = moment(tanggal).add(-3, 'days')
		var idDetilKerjaan = new Meteor.Collection.ObjectID();
		console.log(idDetilKerjaan);
		var dataKerjaan = {
			username : Meteor.user().username,
			nama_pekerja : Meteor.user().profile.nama,
			posisi_pekerja : Meteor.user().profile.posisi,
			bidang_pekerja : Meteor.user().profile.bidang,
			tanggal_kerjaan : tanggal_kerjaan_besok,
			detil_kerjaan :[{
				id : idDetilKerjaan,
				judul_kerjaan : judul_kerjaan,
        		detil_kerjaan : detil_kerjaan,
        		status_kerjaan : status_kerjaan,
        		keterangan_kerjaan : keterangan_kerjaan
			}]
		};
		var cekPekerjaanBesok = Pekerjaan.findOne({"username":Meteor.user().username,"tanggal_kerjaan":tanggal_kerjaan_besok})
		console.log(cekPekerjaanBesok);
		if(!cekPekerjaanBesok)
			Pekerjaan.insert(dataKerjaan, function(err){
				if (err)
            		console.log(err);
          		else
            		console.log('pekerjaan tersimpan baru');
			});
		else{
			Pekerjaan.update(
			{"_id":cekPekerjaanBesok._id},
				{ $addToSet :
					{
						detil_kerjaan :
						{
						id : idDetilKerjaan,
						judul_kerjaan : judul_kerjaan,
		        		detil_kerjaan : detil_kerjaan,
		        		status_kerjaan : status_kerjaan,
		        		keterangan_kerjaan : keterangan_kerjaan
						}
					}
				}
			, function(err){
				if (err)
            		console.log(err);
          		else
            		console.log('pekerjaan tersimpan tambah');
			});
			console.log(cekPekerjaanBesok._id);
        	// $('.inputKerjaanHariIni').fadeOut();
		};
        // Session.set('dataKerjaan',dataKerjaan)
	}

});

Template.detilKerjaanBesok.helpers({
	dataKerjaanBesok: function(){
		var tanggal = new Date();
		var tanggalHariIni = moment(tanggal).format("MM/DD/YYYY");
		var tanggalKerjaanKemarin = Pekerjaan.findOne({"username":Meteor.user().username,"tanggal_kerjaan":{$gt:tanggalHariIni}},{sort:{tanggal_kerjaan:1},limit:1})
		return Pekerjaan.find({"username":Meteor.user().username,"tanggal_kerjaan":tanggalKerjaanKemarin.tanggal_kerjaan},{"tanggal_kerjaan":{$gt:tanggalHariIni}},{sort:{tanggal_kerjaan:1},limit:1});
		// return Pekerjaan.find({"username":Meteor.user().username});

	}
});

Template.kerjaanBesok.helpers({
	tanggalBesok: function(){
		var tanggal = new Date();
		var tanggalHariIni = moment(tanggal).format("MM/DD/YYYY");
		var tanggalKerjaanBesok = Pekerjaan.findOne({"username":Meteor.user().username,"tanggal_kerjaan":{$gt:tanggalHariIni}},{sort:{tanggal_kerjaan:1},limit:1})
		// console.log(tanggalKerjaanKemarin.tanggal_kerjaan);
		// console.log(tanggalKerjaanKemarin.tanggal_kerjaan);
		return tanggalKerjaanBesok.tanggal_kerjaan;
	}
});
