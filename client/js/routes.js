import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import '../main.html';
// if(! Meteor.user()){
// 	Router.route('/', function () {
// 	  this.render('Login');
// 	});
// 	// Router.route('/Register', function () {
// 	//   this.render('Register');
// 	// });
// 	Router.route('/Register');
// 	console.log('not found');
// }
// else{
// 	Router.route('/', function () {
// 	  this.render('Home');
// 	});

// 	Router.route('/Rekap_individu', function () {
// 	  this.render('Rekap_individu');
// 	});
// }

Router.route('/', function () {
  	this.render('Home')
},{
	name: 'Home'
});

Router.route('/Login', function () {
 	this.render('Login')
});

Router.route('/Pendaftaran', function () {
	this.render('Pendaftaran')
});

Router.route('/Rekap_individu', function () {
  this.render('Rekap_individu');
});

Router.route('/Rekap_masal', function () {
  this.render('Rekap_masal');
});


Router.route('/Profile', function () {
  this.render('Profile');
});


Router.route('/Pengguna', function () {
  this.render('Pengguna');
});

Router.route('/Penilaian', function () {
  this.render('Penilaian');
});

Router.onBeforeAction(function () {
    if (!Meteor.user() && !Meteor.loggingIn()) {
        this.redirect('/Login');
    } else {
        // required by Iron to process the route handler
        // this.next();
        // Router.go('Home');
        this.next();
    }
}, {
    except: ['Login','Pendaftaran']
});


