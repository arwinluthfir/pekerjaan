import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
export const Absen = new Mongo.Collection('absen');
export const Pekerjaan = new Mongo.Collection('pekerjaan');
import './main.html';

// Template.hello.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });

// Template.hello.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });

// Template.hello.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });
var settingFoto = {
	width: 240,
  	height: 240,
  	quality: 100
}

Template.takePhoto.events ({
	'click .capture': function () {
			MeteorCamera.getPicture (settingFoto, function (error, hasilFoto) {
			Session.set('capturePhoto',hasilFoto);
		});
	}
});

Template.takePhoto.helpers({
	hasilFoto: function (){
		return Session.get('capturePhoto');
	}
})