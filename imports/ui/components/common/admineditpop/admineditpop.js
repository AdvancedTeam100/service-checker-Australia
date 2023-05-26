import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';
import "./admineditpop.html";


Template.admineditpop.onCreated(function() {

});

Template.admineditpop.onRendered(function() {

});

Template.admineditpop.events({
    "click #btnSaveAdmin": function () {
        // Add
        if($('#edtAdminFlag').val() == '0') {
            let add_data = {
                name: $('#edtName').val(),
                email: $('#edtEmail').val(),
                password: $('#edtPsw').val(),
                sms_number: $('#edtSMSNumber').val()
            };

            HTTP.call('post', '/api/admin', {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: add_data,
            }, (error, result) => {
                $('.fullScreenSpin').css('display', 'none');
                if (error) {
                    swal({
                        title: "Oooops...",
                        text: error,
                        type: "error",
                        showCancelButton: false,
                        confirmButtonText: "Try Again",
                    }).then((result) => {
                        $('.fullScreenSpin').css('display', 'none');
                        if (result.value) {
                            $('#editAdminModal').modal('toggle');
                        } else if (result.dismiss === "cancel") {
                            $('#editAdminModal').modal('toggle');
                        }
                    });
                } else {
                    $('.fullScreenSpin').css('display', 'none');
                    swal({
                        title: "Succees",
                        text: "Add Success",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonText: "OK",
                    }).then((result) => {
                        $('.fullScreenSpin').css('display', 'none');
                        if (result.value) {
                            window.open("/home", "_self");
                        } else if (result.dismiss === "cancel") {
                            window.open("/home", "_self");
                        }
                    });
                }
            });
        } else if ($('#edtAdminFlag').val() == '1') {
            let updaet_data = {
                id: $('#edtID').val(),
                name: $('#edtName').val(),
                email: $('#edtEmail').val(),
                password: $('#edtPsw').val(),
                sms_number: $('#edtSMSNumber').val(),
            };

            HTTP.call('post', '/api/admin/update', {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: updaet_data,
            }, (error, result) => {
                $('.fullScreenSpin').css('display', 'none');
                if (error) {
                    swal({
                        title: "Oooops...",
                        text: error,
                        type: "error",
                        showCancelButton: false,
                        confirmButtonText: "Try Again",
                    }).then((result) => {
                        $('.fullScreenSpin').css('display', 'none');
                        if (result.value) {
                            $('#editAdminModal').modal('toggle');
                        } else if (result.dismiss === "cancel") {
                            $('#editAdminModal').modal('toggle');
                        }
                    });
                } else {
                    $('.fullScreenSpin').css('display', 'none');
                    swal({
                        title: "Succees",
                        text: "Update Success",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonText: "OK",
                    }).then((result) => {
                        $('.fullScreenSpin').css('display', 'none');
                        if (result.value) {
                            window.open("/home", "_self");
                        } else if (result.dismiss === "cancel") {
                            window.open("/home", "_self");
                        }
                    });
                }
            });
        }
    }
});

Template.admineditpop.helpers({

});

Template.registerHelper("equals", function(a, b) {
    return a === b;
});