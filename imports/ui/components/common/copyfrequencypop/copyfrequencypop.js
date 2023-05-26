import { Template } from 'meteor/templating';
import './copyfrequencypop.html';
import { J } from '@fullcalendar/resource/internal-common';
import { disableCursor } from '@fullcalendar/core/internal';

let day = [];
let mode_b = "onetime";
let mode_s = "";
let start_date = "";
let end_date = "";
let time = "";
let interval_time = ""

Template.copyfrequencypop.events({
    'click input[name="frequencyRadio"]': function (event) {
        if (event.target.id == "frequencyWeekly") {
            mode_b = "weekly";
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            var todayDate = today;
            today = yyyy + '-' + mm + '-' + dd;
            $(".chkBoxDays").prop("checked", false);
            document.getElementById('edtWeeklyStartDate').value = today;

            var finishdate = new Date();
            finishdate.setMonth(finishdate.getMonth() + 1);
            var dd = String(finishdate.getDate()).padStart(2, '0');
            var mm = String(finishdate.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = finishdate.getFullYear();

            finishdate = yyyy + '-' + mm + '-' + dd;

            document.getElementById('edtWeeklyFinishDate').value = finishdate;
        } else if (event.target.id == "frequencyDaily") {
            mode_b = "daily";
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = yyyy + '-' + mm + '-' + dd;

            document.getElementById('edtDailyStartDate').value = today;
            $("#dailyEveryDay").click();

            var finishdate = new Date();
            finishdate.setMonth(finishdate.getMonth() + 1);
            var dd = String(finishdate.getDate()).padStart(2, '0');
            var mm = String(finishdate.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = finishdate.getFullYear();
            finishdate = yyyy + '-' + mm + '-' + dd;

            document.getElementById('edtDailyFinishDate').value = finishdate;
        } else if (event.target.id == "frequencyOnetimeonly") {
            mode_b = "onetime"
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = yyyy + '-' + mm + '-' + dd;
            document.getElementById('edtOneTimeOnlyDate').value = today;
        }
    },

    'click .chkBoxDays': function (event) {
        if (event.target.id == "formCheck-monday") {
            pushUnique(day, 1);
        } else if (event.target.id == "formCheck-tuesday") {
            pushUnique(day, 2);
        } else if (event.target.id == "formCheck-wednesday") {
            pushUnique(day, 3);
        } else if (event.target.id == "formCheck-thursday") {
            pushUnique(day, 4);
        } else if (event.target.id == "formCheck-friday") {
            pushUnique(day, 5);
        }
    },
    
    'click .btnSaveFrequency': function (event) {
        if (mode_b == "weekly") {
            start_date = $('#edtWeeklyStartDate').val();
            end_date = $('#edtWeeklyFinishDate').val();
            time = $('#edtWeeklyStartTime').val();
            interval_time = $('#edtWeeklyTimeInterval').val();
            mode_s = "";
        }
        if(mode_b == "daily"){
            start_date = $('#edtDailyStartDate').val();
            end_date = $('#edtDailyFinishDate').val();
            if(mode_s == "dailyEveryDay"){
                time = $('#edtdailyStartTime').val();
                interval_time = $('#edtdailyTimeInterval').val();
            }
            else if(mode_s == "dailyEvery"){ 
                interval_time = $('#edtdailyTimeInterval').val();
            }
        }
        if(mode_b == "onetime"){
            start_date = $('#edtOneTimeOnlyDate').val();
            end_date = "";
            time = $('#edtonetimeStartTime').val();
            interval_time = "";
            mode_s = "";
        }

        const postData = {
            mode_b: mode_b,
            mode_s: mode_s,
            start_date: start_date,
            end_date: end_date,
            time_: time,
            interval_time: interval_time,
            day: day.join(', ')
        }

        fetch('/api/frequency', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            })
                .then(response => response.json())
                .then(data => {
                    alert(data);
                });
            window.location.reload(); 
    }
});

Template.copyfrequencypop.onRendered(() => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById('edtOneTimeOnlyDate').value = today;
})



$(document).ready(() => {
    $("#btnCopyInvoice").click(() => {
        $("#frequencyOnetimeonly").click();
    });

    $("input[name='dailyRadio']").click(()=>{
    mode_s = event.target.id;
    });

    $("#dailyEveryDay").click(() => {
        $("#edtdailyTimeInterval").prop('disabled', true);
        $("#edtdailyStartTime").prop('disabled', false);
    });
    
    $("#dailyEvery").click(() => {
        $("#edtdailyTimeInterval").prop('disabled', false);
        $("#edtdailyStartTime").prop('disabled', true);
    });

})

function pushUnique(array, element) {
    if (array.indexOf(element) === -1) {
        array.push(element);
    }
    else {
        removeAll(array, element);
    }
}

function removeAll(arr, val) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            arr.splice(i, 1);
            i--; // decrement i so that we don't skip the next element
        }
    }
}
