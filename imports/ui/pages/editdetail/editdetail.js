import { Template } from 'meteor/templating';
import './editdetail.html';

Template.editdetail.onCreated(async function () {
    const templateObject = Template.instance();
    const queryString = window.location.search; // Returns "?param1=value1&param2=value2"
    const urlParams = new URLSearchParams(queryString);
    const param1Value = urlParams.get('id'); // Returns "value1"
    const param2Value = urlParams.get('status'); // Returns "value2"
    templateObject.getEditList = async function (id = param1Value) {
        await HTTP.call('GET', '/api/editMachines?id=' + id, (error, response) => {
            if (error) {
            } else {
                $("#edtMachineName").val(response.data[0].name);      
                $("#edtMachineDescription").val(response.data[0].description);
                $("#edtIPAddress").val(response.data[0].ip);
                $("#edtPort").val(response.data[0].port);
                $("#edtStatus").val(param2Value);
                $("#edtServiceName").val(response.data[0].service_name);
            }
        });
    }
});

Template.editdetail.onRendered(function () {

    const templateObject = Template.instance();
    templateObject.getEditList();

    $(".btn-secondary").click(function(){
        // Get the id of the closest parent element with an id
        const parentId = $(this).closest('[id]').attr('id');
        $("#"+parentId).modal("hide");
    });

    $(".close").click(function(){
        // Get the id of the closest parent element with an id
        const parentId = $(this).closest('[id]').attr('id');
        $("#"+parentId).modal("hide");
    });
    
});

Template.editdetail.events({
    'click .btnMachineLogs': function (event) {
        let MachineID = $('#edtID').val();
        Session.set('MachineID', MachineID);
        $('#machineLogsList').modal('toggle');
    },
    'click .btnMachineSummary': function(event) {
        $("#machineSummaryList").modal("toggle");
    },
    'click .btnMachineDetail': function(event) {
        $("#machineDetailList").modal("toggle");
    },
    'click .btnMachineFrequency': function(event) {
        playCopyAudio();
        setTimeout(async function() {
            $("#basedOnFrequency").prop('checked', true);
            $('#edtFrequencyDetail').css('display', 'flex');
            $('#dailySettings #basic-addon2').text('Minutes');
            $(".ofMonthList input[type=checkbox]").each(function() {
                $(this).prop('checked', false);
            });
            $(".selectDays input[type=checkbox]").each(function() {
                $(this).prop('checked', false);
            });
            $("#copyFrequencyModal").modal("toggle");
        }, delayTimeAfterSound);
    },
    'click input[name="frequencyRadio"]': function(event) {
        if (event.target.id == "frequencyMonthly") {
            document.getElementById("monthlySettings").style.display = "block";
            document.getElementById("weeklySettings").style.display = "none";
            document.getElementById("dailySettings").style.display = "none";
            document.getElementById("oneTimeOnlySettings").style.display = "none";
        } else if (event.target.id == "frequencyWeekly") {
            document.getElementById("weeklySettings").style.display = "block";
            document.getElementById("monthlySettings").style.display = "none";
            document.getElementById("dailySettings").style.display = "none";
            document.getElementById("oneTimeOnlySettings").style.display = "none";
        } else if (event.target.id == "frequencyDaily") {
            document.getElementById("dailySettings").style.display = "block";
            document.getElementById("monthlySettings").style.display = "none";
            document.getElementById("weeklySettings").style.display = "none";
            document.getElementById("oneTimeOnlySettings").style.display = "none";
        } else if (event.target.id == "frequencyOnetimeonly") {
            document.getElementById("oneTimeOnlySettings").style.display = "block";
            document.getElementById("monthlySettings").style.display = "none";
            document.getElementById("weeklySettings").style.display = "none";
            document.getElementById("dailySettings").style.display = "none";
        } else {
            $("#copyFrequencyModal").modal('toggle');
        }
    },
    'click input[name="settingsMonthlyRadio"]': function(event) {
        if (event.target.id == "settingsMonthlyEvery") {
            $('.settingsMonthlyEveryOccurence').attr('disabled', false);
            $('.settingsMonthlyDayOfWeek').attr('disabled', false);
            $('.settingsMonthlySpecDay').attr('disabled', true);
        } else if (event.target.id == "settingsMonthlyDay") {
            $('.settingsMonthlySpecDay').attr('disabled', false);
            $('.settingsMonthlyEveryOccurence').attr('disabled', true);
            $('.settingsMonthlyDayOfWeek').attr('disabled', true);
        } else {
            $("#frequencyModal").modal('toggle');
        }
    },
    'click input[name="dailyRadio"]': function(event) {
        if (event.target.id == "dailyEveryDay") {
            $('.dailyEveryXDays').attr('disabled', true);
        } else if (event.target.id == "dailyWeekdays") {
            $('.dailyEveryXDays').attr('disabled', true);
        } else if (event.target.id == "dailyEvery") {
            $('.dailyEveryXDays').attr('disabled', false);
        } else {
            $("#frequencyModal").modal('toggle');
        }
    },
    'click .btnMachineCheck': function (event) {
        $('.fullScreenSpin').show();
        let ipAddress = $("#edtIPAddress").val();
        let portNumber = $("#edtPort").val();
        Meteor.call('checkService', ipAddress, portNumber, function(error, result) {
            $('.fullScreenSpin').hide();
            if (error) {
                $('#edtStatus').val('off');
                $('#edtStatus').focus();
            } else {
                $('#edtStatus').val('on');
                $('#edtStatus').focus();
            }
        });
    },
    'click .btnSaveMachine': function(event) {
        $('.fullScreenSpin').css('display', 'inline-block');
        // Update
        const queryString = window.location.search; // Returns "?param1=value1&param2=value2"
        const urlParams = new URLSearchParams(queryString);
        const param1Value = urlParams.get('id'); // Returns "value1"
            let update_data = {
                id: param1Value,
                name: $("#edtMachineName").val(),
                description: $("#edtMachineDescription").val(),
                ip: $("#edtIPAddress").val(),
                port: $("#edtPort").val(),
                status: 'Checking...',
                service_name: $("#edtServiceName").val(),
            };
            
            HTTP.call('post', '/api/machine/update', {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: update_data,
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
                            $('#editServiceChecker').modal('toggle');
                        } else if (result.dismiss === "cancel") {
                            $('#editServiceChecker').modal('toggle');
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
        
    },
});