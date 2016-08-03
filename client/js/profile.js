
Template.Profile.events({
	


});


Template.Profile.helpers({
	dataPengguna:function(){
		var datapengguna = Meteor.users.find({_id:Meteor.userId()});
		console.log(datapengguna);

		return datapengguna;
	}


});