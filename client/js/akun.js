Template.Pendaftaran.events({
    'submit form': function(event) {
        event.preventDefault();
        var daftarNpk = event.target.daftarNpk.value;
        var daftarUserName = event.target.daftarUserName.value;
        var daftarUserPassword = event.target.daftarUserPassword.value;
        var daftarNamaLengkap = event.target.daftarNamaLengkap.value;
        var daftarJabatan = event.target.daftarJabatan.value;
        var getDaftarPosisi = document.getElementById("daftarPosisi");
        var daftarPosisi = getDaftarPosisi.options[getDaftarPosisi.selectedIndex].value;
        var getDaftarBidang = document.getElementById("daftarBidang");
        var daftarBidang = getDaftarBidang.options[getDaftarBidang.selectedIndex].value;
        var konfirmasi = confirm('Apakah data anda sudah benar?');
        if (konfirmasi == true) {
            Accounts.createUser({
                username: daftarUserName,
                password: daftarUserPassword,
                profile:{
                    npk: daftarNpk,
                    nama: daftarNamaLengkap,
                    jabatan: daftarJabatan,
                    posisi: daftarPosisi,
                    bidang: daftarBidang
                }
            }, function(err) {
              if (err)
                console.log(err);
              else{
                console.log('success!');
                Meteor.logout();
                Router.go('Login');
              }
            });
        } else {
            console.log("You pressed Cancel!");
        }

    }
});

Template.Pendaftaran.helpers({
    pesan: function(){
        console.log(Meteor.userId());
        // return Meteor.users.find({});
    }
});

Template.Login.events({
    'submit form': function(event){
        event.preventDefault();
        var username = $('[name=userName]').val();
        var password = $('[name=userPassword]').val();
        if(username == "" || password == "")
            alert('Masukkan username dan password dengan lengkap');
        else{
            Meteor.loginWithPassword(username, password, function(err) {
              if (err)
                alert(err);
              else
                // console.log('success!');
                // console.log(Meteor.userId());
                Router.go('Home');
            });
        }
        // console.log("login")
    }
});

Template.Logout.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Session.clear();
    }
});