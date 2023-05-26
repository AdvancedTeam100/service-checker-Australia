import { ReactiveVar } from 'meteor/reactive-var';
import { UtilityService } from '../../js/utility-service';
import { Template } from 'meteor/templating';
import moment from "moment";
import net from 'net';
import XLSX from "xlsx";
import 'jquery';
import 'bootstrap';
import "./home.html";

Template.home.onCreated(function() {
    const templateObject = Template.instance();
    templateObject.datatablerecords = new ReactiveVar([]);
    templateObject.tableheaderrecords = new ReactiveVar([]);
    templateObject.selectedFile = new ReactiveVar();
    templateObject.dataList = new Array();
    templateObject.adminList = new Array();

    let headerStruct = [
        { index: 0, label: 'ID', class: 'colID', active: false, display: true, width: "10" },
        { index: 1, label: 'Machine Name', class: 'colMachineName', active: true, display: true, width: "150" },
        { index: 2, label: 'Service Name', class: 'colServiceName', active: true, display: true, width: "150" },
        { index: 3, label: 'IP Address', class: 'colIPAddress', active: true, display: true, width: "100" },
        { index: 4, label: 'Port Number', class: 'colPortNumber', active: true, display: true, width: "80" },
        { index: 5, label: 'Status', class: 'colStatus', active: true, display: true, width: "120" },
        { index: 6, label: 'Description', class: 'colDescription', active: true, display: true, width: "250" },
        { index: 7, label: 'Description', class: 'colDesc', active: false, display: true, width: "250" },
        { index: 8, label: 'Action', class: 'colAction', active: true, display: true, width: "150" },
    ];
    templateObject.tableheaderrecords.set(headerStruct);

    templateObject.getDataTableList = function (data) {
    }

    templateObject.getServiceList = async function (page = 1) {
        await HTTP.call('GET', '/api/machines?num=' + page, (error, response) => {
            if (error) {
            } else {
                for(i = 0; i < response.data.length; i ++) {
                    let res = [
                        response.data[i].id,
                        response.data[i].name,
                        response.data[i].service_name,
                        response.data[i].ip,
                        response.data[i].port,
                        response.data[i].description.length > 35 ? response.data[i].description.substring(0, 34) + "..." : response.data[i].description,
                        response.data[i].description,
                        response.data[i].status,
                        `<button class='btn btn-warning btnServiceCheck' type='button'>Checks</button>
                        <button class='btn btn-danger btnServiceRestart' type='button'>Restart</button>
                        <button class='btn btn-success btnServiceEdit' type='button'>Edit</button>`
                    ];
                    templateObject.dataList.push(res);
                }
            }
        });
    };

    templateObject.getAdminList = async function (page) {
        await HTTP.call('GET', '/api/admin?num=' + page, (error, response) => {
            if (error) {
                swal({
                    title: "Oooops...",
                    text: error,
                    type: "error",
                    showCancelButton: false,
                    confirmButtonText: "Try Again",
                }).then((result) => {
                    if (result.value) {
                        window.open("/home", "_self");
                    } else if (result.dismiss === "cancel") {
                        
                    }
                });
            } else {
                for(i = 0; i < response.data.length; i ++) {
                    let res = [
                        response.data[i].id,
                        response.data[i].name,
                        response.data[i].email,
                        response.data[i].password,
                        response.data[i].sms_number,
                    ];
                    templateObject.adminList.push(res);
                }
            }
        });
    };
});

Template.home.onRendered(function() {
    const templateObject = Template.instance();
    templateObject.getServiceList();

    $('.fullScreenSpin').css('display', 'inline-block');
    let DataCount = templateObject.dataList.length;

    $('.fullScreenSpin').css('display', 'none');
    setTimeout(function() {
        DataCount = templateObject.dataList.length;
        $('#tblServicesList').DataTable({
            dom: 'BRlfrtip',
            data: templateObject.dataList,
            "sDom": "<'row'><'row'<'col-sm-12 col-md-8'f><'col-sm-12 col-md-4'l>r>t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>B",
            columnDefs: [
                {
                    className: "colID hiddenColumn",
                    targets: 0,
                    width:'10'
                },
                {
                    className: "colMachineName",
                    targets: 1,
                    width:'150'
                },
                {
                    className: "colServiceName",
                    targets: 2,
                    width:'150'
                },
                {
                    className: "colIPAddress",
                    targets: 3,
                    width:'100',
                },
                {
                    className: "colPortNumber",
                    targets: 4,
                    width:'80',
                },
                {
                    className: "colDescription",
                    targets: 5,
                    width:'250',
                },
                {
                    className: "colDesc hiddenColumn",
                    targets: 6,
                    width:'250',
                },
                {
                    className: "colStatus",
                    targets: 7,
                    width:'120',
                },
                {
                    className: "colAction",
                    targets: 8,
                    width:'250',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).addClass("td-button");
                    }
                }
            ],
            'select': {
                'style': 'multi'
            },
            buttons: [{
                    extend: 'csvHtml5',
                    text: '',
                    download: 'open',
                    className: "btntabletocsv hiddenColumn",
                    filename: "Service List",
                    orientation: 'portrait',
                    exportOptions: {
                        columns: ':visible'
                    }
                }, {
                    extend: 'print',
                    download: 'open',
                    className: "btntabletopdf hiddenColumn",
                    text: '',
                    title: 'Service List',
                    filename: "Service List",
                    exportOptions: {
                        columns: ':visible',
                        stripHtml: false
                    }
                },
                {
                    extend: 'excelHtml5',
                    title: '',
                    download: 'open',
                    className: "btntabletoexcel hiddenColumn",
                    filename: "Service List",
                    orientation: 'portrait',
                    exportOptions: {
                        columns: ':visible'
                    }
                }
            ],
            select: true,
            destroy: true,
            colReorder: true,
            pageLength: initialDatatableLoad,
            lengthMenu: [
                [initialDatatableLoad, -1],
                [initialDatatableLoad, "All"]
            ],
            info: true,
            responsive: true,
            "order": [
                [1, "asc"]
            ],
            "autoWidth": false,
            action: function() {
                $('#tblServicesList').DataTable().ajax.reload();
            },
            "fnDrawCallback": function(oSettings) {
                $('.paginate_button.page-item').removeClass('disabled');
                $('#tblServicesList' + '_ellipsis').addClass('disabled');
                if (oSettings._iDisplayLength == -1) {
                    if (oSettings.fnRecordsDisplay() > 150) {
                    }
                } else {
                }
                if (oSettings.fnRecordsDisplay() < initialDatatableLoad) {
                    $('.paginate_button.page-item.next').addClass('disabled');
                }
                $('.paginate_button.next:not(.disabled)', this.api().table().container()).on('click', function() {
                    $('.fullScreenSpin').css('display', 'inline-block');

                });
            },
            language: { search: "", searchPlaceholder: "Search..." },
            "fnInitComplete": function(oSettings) {
                $("<button class='btn btn-primary' id='NewMachineBtn' name='NewMachineBtn' data-dismiss='modal' data-toggle='modal' type='button' style='padding: 4px 10px; font-size: 16px; margin-left: 12px !important;'><i class='fas fa-plus'></i></button>").insertAfter('#tblServicesList_filter');
                $("<button class='btn btn-primary btnRefreshList' type='button' id='btnRefreshList' style='padding: 4px 10px; font-size: 16px; margin-left: 14px !important;'><i class='fas fa-search-plus' style='margin-right: 5px'></i>Search</button>").insertAfter('#tblServicesList' + '_filter');
            },
            "fnInfoCallback": function(oSettings, iStart, iEnd, iMax, iTotal, sPre) {
                let countTableData = DataCount || 0; //get count from API data
                return 'Showing ' + iStart + " to " + iEnd + " of " + countTableData;
            }
        }).on('page', function() {
            
        }).on('column-reorder', function() {
        }).on('length.dt', function(e, settings, len) {
            $(".fullScreenSpin").css("display", "inline-block");
            let dataLenght = settings._iDisplayLength;
            if (dataLenght == -1) {
                if (settings.fnRecordsDisplay() > initialDatatableLoad) {
                    $(".fullScreenSpin").css("display", "none");
                } else {
                    $(".fullScreenSpin").css("display", "none");
                }
            } else {
                $(".fullScreenSpin").css("display", "none");
            }
        });
        tableResize();
        $(".fullScreenSpin").css("display", "none");
        if(DataCount > 0) {
            var elements = document.querySelectorAll('.btnServiceCheck');
            // Add a click event listener to each element
            elements.forEach(function(element) {
                element.click();
            });
        }
    }, 3000);
    setTimeout(function() {
        $('div.dataTables_filter input').addClass('form-control form-control-sm');
        $('#tblServicesList_filter .form-control-sm').focus();
        $('#tblServicesList_filter .form-control-sm').trigger("input");
    }, 10);

    templateObject.resetData = function(dataVal) {
        Meteor._reload.reload();
    }

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

Template.home.events({
    'click #NewMachineBtn': function (event) {
        $('#edtFlag').val('0');
        $('#add-account-title').text('Add Machine');
        $("#edtMachineName").val('');
        $("#edtMachineDescription").val('');
        $("#edtIPAddress").val('');
        $("#edtPort").val('');
        $("#edtStatus").val('');
        // $('#edtDBName').val('');
        // $('#edtUserName').val('');
        // $('#edtPassword').val('');
        $("#edtServiceName").val('');
        $('.button-group').removeClass('d-flex');
        $('.button-group').hide();
        $("#editServiceChecker").modal("toggle");
    },
    'click .btnServiceEdit': function(event) {
        let status = $(event.target).closest("tr").find('.colStatus').hasClass('bgcolor-green') ? 'on' : 'off';
        location.href ="/editdetail?id="+$(event.target).closest("tr").find('.colID').text()+"&status="+status;
    },
    'click .btnSaveMachine': function(event) {
        $('.fullScreenSpin').css('display', 'inline-block');
        // Update
        if($('#edtFlag').val() == '1') {
            let update_data = {
                id: $('#edtID').val(),
                name: $("#edtMachineName").val(),
                description: $("#edtMachineDescription").val(),
                ip: $("#edtIPAddress").val(),
                port: $("#edtPort").val(),
                status: 'Checking...',
                // database_name: $('#edtDBName').val(),
                // username: $('#edtUserName').val(),
                // password: $('#edtPassword').val(),
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
        } else if ($('#edtFlag').val() == '0') {
            let add_data = {
                name: $("#edtMachineName").val(),
                description: $("#edtMachineDescription").val(),
                ip: $("#edtIPAddress").val(),
                port: $("#edtPort").val(),
                status: 'Checking...',
                // database_name: $('#edtDBName').val(),
                // username: $('#edtUserName').val(),
                // password: $('#edtPassword').val(),
                service_name: $("#edtServiceName").val(),
            };
            HTTP.call('post', '/api/machines', {
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
                            $('#editServiceChecker').modal('toggle');
                        } else if (result.dismiss === "cancel") {
                            $('#editServiceChecker').modal('toggle');
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
        }
    },
    'click .help-button': function(event) {
        $("#helpViewModal").modal("toggle");
    },
    'click .btntest': function(event){
        $(this).hide();
    },
    'click .btnAdmin': function(event) {
        $("#adminService").modal("toggle");
    },
    'click .btnServiceCheck': function (event) {
        let ipAddress = $(event.target).closest("tr").find('.colIPAddress').text();
        let portNumber = $(event.target).closest("tr").find('.colPortNumber').text();
        let CurDate = moment(new Date()).format("DD/MM/YYYY HH:mm:ss")

        Meteor.call('checkService', ipAddress, portNumber, function(error, result) {
            if (error) {
                $(event.target).closest("tr").find('.colStatus').removeClass('bgcolor-green');
                $(event.target).closest("tr").find('.colStatus').addClass('bgcolor-red');
                $(event.target).closest("tr").find('.colStatus').text(CurDate);
            } else {
                $(event.target).closest("tr").find('.colStatus').removeClass('bgcolor-red');
                $(event.target).closest("tr").find('.colStatus').addClass('bgcolor-green');
                $(event.target).closest("tr").find('.colStatus').text(CurDate);
            }
        });
    },
    'click .btnServiceRestart': function (event) {
        let ipAddress = $(event.target).closest("tr").find('.colIPAddress').text();

        if (Meteor.isClient) {
            for(var i = 0; i < templateObject.adminList.length; i ++) {
        Meteor.call('sendEmail', {
                    from: "noreply@vs1cloud.com",
                    to: templateObject.adminList[i].email,
                    subject: "Service Checker",
                    text: "Restart request, " + ipAddress,
                    html: "",
            attachments: undefined
        }, function(error, result) {
            if (error && error.error === "error") {
                        console.log(error);              
            } else {
                        console.log("Email were sent to ");
            }
        });
            }
        }
    },
    'click .templateDownloadXLSX': function (e) {
        e.preventDefault(); //stop the browser from following
        window.location.href = "sample_imports/SampleServices.xlsx";
    },
    "click .templateDownload": function () {
        let utilityService = new UtilityService();
        let rows = [];
        const filename = "SampleServices" + ".csv";
        rows[0] = [
            "Machine-1",
            "110.145.181.218",
            "4434",
            "VS1_Cloud_DB_caca_aj_ac_OUxFnK",
            "dene@vs1cloud.com",
            "dene@123",
            "This machine is ...",
            "06/03/2023 20:30:30",
        ];
        utilityService.exportToCsv(rows, filename, "csv");
    },
    'click .new_attachment_btn': function() {
        $('#attachment-upload').trigger('click');
    },
    'change #attachment-upload': function (e) {
        let templateObj = Template.instance();
        var filename = $("#attachment-upload")[0].files[0]["name"];
        var fileExtension = filename.split(".").pop().toLowerCase();
        var validExtensions = ["csv", "txt", "xlsx"];
        var validCSVExtensions = ["csv", "txt"];

        if (validExtensions.indexOf(fileExtension) == -1) {
            swal("Invalid Format", "formats allowed are :" + validExtensions.join(", "), "error");
            $(".file-name").text("");
            $(".btnImport").Attr("disabled");
        } else if (validCSVExtensions.indexOf(fileExtension) != -1) {
            $(".file-name").text(filename);
            let selectedFile = event.target.files[0];
            templateObj.selectedFile.set(selectedFile);
            if ($(".file-name").text() != "") {
                $(".btnImport").removeAttr("disabled");
            } else {
                $(".btnImport").Attr("disabled");
            }
        } else if (fileExtension == "xlsx") {
            $(".file-name").text(filename);
            let selectedFile = event.target.files[0];
            var oFile = selectedFile;
            var reader = new FileReader();
            // Ready The Event For When A File Gets Selected
            reader.onload = function (e) {
                var data = e.target.result;
                data = new Uint8Array(data);
                var workbook = XLSX.read(data, { type: "array" });
                var result = {};
                workbook.SheetNames.forEach(function (sheetName) {
                var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
                    header: 1,
                });
                var sCSV = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
                templateObj.selectedFile.set(sCSV);

                if (roa.length) result[sheetName] = roa;
                });
                // see the result, caution: it works after reader event is done.
            };
            reader.readAsArrayBuffer(oFile);

            if ($(".file-name").text() != "") {
                $(".btnImport").removeAttr("disabled");
            } else {
                $(".btnImport").Attr("disabled");
            }
        }
    },
    "click .btnImport": function () {
        $(".fullScreenSpin").css("display", "inline-block");
        let templateObject = Template.instance();
        let objDetails;
    
        Papa.parse(templateObject.selectedFile.get(), {
            complete: function (results) {
                if (results.data.length > 0) {
                    if (
                        results.data[0][0] == "ID" &&
                        results.data[0][1] == "Machine Name" &&
                        results.data[0][2] == "Service Name" &&
                        results.data[0][3] == "IP Address" &&
                        results.data[0][4] == "Port Number" &&
                        results.data[0][5] == "Database Name" &&
                        results.data[0][6] == "User Name" &&
                        results.data[0][7] == "Password" &&
                        results.data[0][8] == "Description"&&
                        results.data[0][9] == "Status"
                    ) {
                        
                        let dataLength = results.data.length * 3000;
                        setTimeout(async function () {
                            window.open("/home", "_self");
                            $(".fullScreenSpin").css("display", "none");
                        }, parseInt(dataLength));

                        for (let i = 0; i < results.data.length - 1; i++) {
                            objDetails = [
                                results.data[i + 1][0],
                                results.data[i + 1][1],
                                results.data[i + 1][2],
                                results.data[i + 1][3],
                                results.data[i + 1][4],
                                results.data[i + 1][5],
                                results.data[i + 1][6],
                                results.data[i + 1][7],
                                results.data[i + 1][8],
                                results.data[i + 1][9]
                            ];
                            if (results.data[i + 1][1]) {
                                if (results.data[i + 1][1] !== "") {
                                
                                    swal({
                                        title: "Oooops...",
                                        text: err,
                                        type: "error",
                                        showCancelButton: false,
                                        confirmButtonText: "Try Again",
                                    }).then((result) => {
                                        if (result.value) {
                                            window.open("/home", "_self");
                                        } else if (result.dismiss === "cancel") {
                                            window.open("/home", "_self");
                                        }
                                    });
                                }
                            }
                        }
                    } else {
                        $(".fullScreenSpin").css("display", "none");
                        swal(
                            "Invalid Data Mapping fields ",
                            "Please check that you are importing the correct file with the correct column headers.",
                            "error"
                        );
                    }
                } else {
                    $(".fullScreenSpin").css("display", "none");
                    swal(
                        "Invalid Data Mapping fields ",
                        "Please check that you are importing the correct file with the correct column headers.",
                        "error"
                    );
                }
            },
        });
    },
    'click .btnRefresh': function () {
        Meteor._reload.reload();
        window.history.go(0);
    },
});

Template.home.helpers({

});

Template.registerHelper("equals", function(a, b) {
    return a === b;
});