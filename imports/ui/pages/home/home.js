import { ReactiveVar } from 'meteor/reactive-var';
import { SideBarService } from '../../js/sidebar-service';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import 'jquery';
import 'bootstrap';
import "./home.html";


// Define services
let sideBarService = new SideBarService();
Template.home.onCreated(function() {
    const templateObject = Template.instance();
    templateObject.datatablerecords = new ReactiveVar([]);
    templateObject.tableheaderrecords = new ReactiveVar([]);

    let headerStruct = [
        { index: 0, label: 'Machine Name', class: 'colMachineName', active: true, display: true, width: "" },
        { index: 1, label: 'IP Address', class: 'colIPAddress', active: true, display: true, width: "" },
        { index: 2, label: 'Status', class: 'colStatus', active: true, display: true, width: "" },
        { index: 3, label: 'Check', class: 'colCheck', active: true, display: true, width: "" },
        { index: 4, label: 'Restart', class: 'colRestart', active: true, display: true, width: "" },
        { index: 5, label: 'Edit', class: 'colEdit', active: true, display: true, width: "" },
    ];
    templateObject.tableheaderrecords.set(headerStruct);

    templateObject.getDataTableList = function (data) {
        console.log(data)
        data = splashArrayTimeSheetList;
        let dataList = [
            data[0],
            data[1],
            data[2],
            data[3],
            data[4],
            data[5],
        ];
        return dataList;
    }

    let splashArrayTimeSheetList = new Array();
    let cssclass = '';
    cssclass = "bgcolor-green";
    var dataTimeSheetList = [
        "Machine-1",
        "100.100.100.100",
        "06/03/2023 20:30:30",
        "<button class='btn btn-warning btnServiceCheck' type='button'>Checks</button>",
        "<button class='btn btn-danger btnServiceRestart' type='button'>Restarts</button>",
        "<button class='btn btn-success btnServiceEdit' type='button'>Edit</button>",
        cssclass
    ];
    splashArrayTimeSheetList.push(dataTimeSheetList);

    cssclass = "bgcolor-red";
    var dataTimeSheetList = [
        "Machine-2",
        "100.100.100.101",
        "04/03/2023 10:30:30",
        "<button class='btn btn-warning btnServiceCheck' type='button'>Checks</button>",
        "<button class='btn btn-danger btnServiceRestart' type='button'>Restarts</button>",
        "<button class='btn btn-success btnServiceEdit' type='button'>Edit</button>",
        cssclass
    ];
    splashArrayTimeSheetList.push(dataTimeSheetList);
});

Template.home.onRendered(function() {

    $('.fullScreenSpin').css('display', 'inline-block');
    let templateObject = Template.instance();

    function MakeNegative() {
        $('td').each(function() {
            if ($(this).text().indexOf('-' + Currency) >= 0) $(this).addClass('text-danger')
        });

        $("td.colStatus").each(function() {
            if ($(this).text() == "In-Active") $(this).addClass("text-deleted");
            if ($(this).text() == "Deleted") $(this).addClass("text-deleted");
            if ($(this).text() == "Full") $(this).addClass("text-fullyPaid");
            if ($(this).text() == "Part") $(this).addClass("text-partialPaid");
            if ($(this).text() == "Rec") $(this).addClass("text-reconciled");
        });
    }

    Meteor.call('readPrefMethod', localStorage.getItem('mycloudLogonID'), 'tblSerialNumberList', function(error, result) {
        if (error) {

        } else {
            if (result) {

                for (let i = 0; i < result.customFields.length; i++) {
                    let customcolumn = result.customFields;
                    let columData = customcolumn[i].label;
                    let columHeaderUpdate = customcolumn[i].thclass.replace(/ /g, ".");
                    let hiddenColumn = customcolumn[i].hidden;
                    let columnClass = columHeaderUpdate.split('.')[1];
                    let columnWidth = customcolumn[i].width;
                    // let columnindex = customcolumn[i].index + 1;
                    $("th." + columnClass + "").html(columData);
                    $("th." + columnClass + "").css('width', "" + columnWidth + "px");

                }
            }

        }
    });

    let splashArrayTimeSheetList = new Array();
        var url = FlowRouter.current().path;
        
        let cssclass = '';
        cssclass = "bgcolor-green";
        var dataTimeSheetList = [
            "Machine-1",
            "100.100.100.100",
            "06/03/2023 20:30:30",
            "<button class='btn btn-warning btnServiceCheck' type='button'>Checks</button>",
            "<button class='btn btn-danger btnServiceRestart' type='button'>Restarts</button>",
            "<button class='btn btn-success btnServiceEdit' type='button'>Edit</button>",
            cssclass
        ];

        splashArrayTimeSheetList.push(dataTimeSheetList);

        cssclass = "bgcolor-red";
        var dataTimeSheetList = [
            "Machine-2",
            "100.100.100.101",
            "04/03/2023 10:30:30",
            "<button class='btn btn-warning btnServiceCheck' type='button'>Checks</button>",
            "<button class='btn btn-danger btnServiceRestart' type='button'>Restarts</button>",
            "<button class='btn btn-success btnServiceEdit' type='button'>Edit</button>",
            cssclass
        ];

        splashArrayTimeSheetList.push(dataTimeSheetList);

        templateObject.datatablerecords.set(splashArrayTimeSheetList);
        if (templateObject.datatablerecords.get()) {
            setTimeout(function() {
                MakeNegative();
            }, 100);
        }
        $('.fullScreenSpin').css('display', 'none');
        setTimeout(function() {
            $('#tblServicesList').DataTable({
                data: splashArrayTimeSheetList,
                "sDom": "<'row'><'row'<'col-sm-12 col-md-8'f><'col-sm-12 col-md-4'l>r>t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>B",
                columnDefs: [
                    {
                        className: "colMachineName",
                        targets: 0,
                        width:'8%'
                    },
                    {
                        className: "colIPAddress",
                        targets: 1,
                        width:'14%',
                    },
                    {
                        className: "colStatus",
                        targets: 2,
                        width:'14%',
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).addClass("td-text-color");
                            $(td).addClass(rowData[6]);
                        }
                    },
                    {
                        className: "colCheck",
                        targets: 3,
                        width:'8%',
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).addClass("td-button");
                        }
                    },
                    {
                        className: "colRestart",
                        targets: 4,
                        width:'8%',
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).addClass("td-button");
                        }
                    },
                    {
                        className: "colEdit",
                        targets: 5,
                        width:'8%',
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).addClass("td-button");
                        }
                    },
                ],
                buttons: [{
                        extend: 'csvHtml5',
                        text: '',
                        download: 'open',
                        className: "btntabletocsv hiddenColumn",
                        filename: "STP List",
                        orientation: 'portrait',
                        exportOptions: {
                            columns: ':visible'
                        }
                    }, {
                        extend: 'print',
                        download: 'open',
                        className: "btntabletopdf hiddenColumn",
                        text: '',
                        title: 'STP List',
                        filename: "STP List",
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
                        filename: "STP List",
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
            //   "order": [
            //       [1, "asc"]
            //   ],
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
                    });
                    setTimeout(function() {
                        MakeNegative();
                    }, 100);
                },
                language: { search: "", searchPlaceholder: "Search..." },
                "fnInitComplete": function(oSettings) {
                    // if (deleteFilter == true) {
                    //     $("<button class='btn btn-danger btnHideDeleted' type='button' id='btnHideDeleted' style='padding: 4px 10px; font-size: 16px; margin-left: 14px !important;'><i class='far fa-check-circle' style='margin-right: 5px'></i>Hide Sold</button>").insertAfter('#tblServicesList' + '_filter');
                    // } else {
                    //     $("<button class='btn btn-primary btnViewDeleted' type='button' id='btnViewDeleted' style='padding: 4px 10px; font-size: 16px; margin-left: 14px !important;'><i class='fa fa-trash' style='margin-right: 5px'></i>Show Sold</button>").insertAfter('#tblServicesList' + '_filter');
                    // }
                    $("<button class='btn btn-primary btnRefreshList' type='button' id='btnRefreshList' style='padding: 4px 10px; font-size: 16px; margin-left: 14px !important;'><i class='fas fa-search-plus' style='margin-right: 5px'></i>Search</button>").insertAfter('#tblServicesList' + '_filter');
                },
                "fnInfoCallback": function(oSettings, iStart, iEnd, iMax, iTotal, sPre) {
                    let countTableData = 2 || 0; //get count from API data
                    return 'Showing ' + iStart + " to " + iEnd + " of " + countTableData;
                }
            }).on('page', function() {
                setTimeout(function() {
                    MakeNegative();
                }, 100);
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
                setTimeout(function() {
                    MakeNegative();
                }, 100);
            });
            $(".fullScreenSpin").css("display", "none");
        }, 0);
        setTimeout(function() {$('div.dataTables_filter input').addClass('form-control form-control-sm');}, 0);

    templateObject.resetData = function(dataVal) {
        Meteor._reload.reload();
    }
});

Template.home.events({
    'click .btnServiceEdit': function(event) {
        $("#edtMachineName").val("Machine-1");
        $("#edtMachineDescription").val("Machine-1");
        $("#edtMachineDescription").val("Machine-1");
        $("#edtIPAddress").val("100.100.100.100");
        $("#edtPort").val("80");
        $("#edtStatus").val("on");
        $("#edtServiceName").val("API service");
        $("#editServiceChecker").modal("toggle");
    },
    'click .help-button': function(event) {
        $("#helpViewModal").modal("toggle");
    },
    'click .btntest': function(event){
        $(this).hide();
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
    'click .btnAdmin': function(event) {
        $("#adminService").modal("toggle");
    },

    'click .close': function(event){
        $("#editServiceChecker").modal("hide");
        $("#adminService").modal("hide");
        $("#copyFrequencyModal").modal("hide");
        $("#machineSummaryList").modal("hide");
        $("#machineDetailList").modal("hide");
        $("#helpViewModal").modal("hide");
        $("#tblServicesList_Modal").modal("hide");
        
    },

    'click .btn-secondary': function(event){
        $("#editServiceChecker").modal("hide");
        $("#adminService").modal("hide");
        $("#copyFrequencyModal").modal("hide");
        $("#machineSummaryList").modal("hide");
        $("#machineDetailList").modal("hide");
        $("#helpViewModal").modal("hide");
        $("#tblServicesList_Modal").modal("hide");
    },    
    'click .btn-light': function(event){
        $("#helpViewModal").modal("hide");
    },
    'click .chkDatatable': function(event) {
        var columns = $('#tblSerialNumberList th');
        let columnDataValue = $(event.target).closest("div").find(".divcolumn").text();

        $.each(columns, function(i, v) {
            let className = v.classList;
            let replaceClass = className[1];

            if (v.innerText == columnDataValue) {
                if ($(event.target).is(':checked')) {
                    $("." + replaceClass + "").css('display', 'table-cell');
                    $("." + replaceClass + "").css('padding', '.75rem');
                    $("." + replaceClass + "").css('vertical-align', 'top');
                } else {
                    $("." + replaceClass + "").css('display', 'none');
                }
            }
        });
    },
    'click .resetTable': function(event) {
        var getcurrentCloudDetails = CloudUser.findOne({ _id: localStorage.getItem('mycloudLogonID'), clouddatabaseID: localStorage.getItem('mycloudLogonDBID') });
        if (getcurrentCloudDetails) {
            if (getcurrentCloudDetails._id.length > 0) {
                var clientID = getcurrentCloudDetails._id;
                var clientUsername = getcurrentCloudDetails.cloudUsername;
                var clientEmail = getcurrentCloudDetails.cloudEmail;
                var checkPrefDetails = CloudPreference.findOne({ userid: clientID, PrefName: 'tblSerialNumberList' });
                if (checkPrefDetails) {
                    CloudPreference.remove({ _id: checkPrefDetails._id }, function(err, idTag) {
                        if (err) {

                        } else {
                            Meteor._reload.reload();
                        }
                    });

                }
            }
        }
    },
    'click .saveTable': function(event) {
        let lineItems = [];
        $('.columnSettings').each(function(index) {
            var $tblrow = $(this);
            var colTitle = $tblrow.find(".divcolumn").text() || '';
            var colWidth = $tblrow.find(".custom-range").val() || 0;
            var colthClass = $tblrow.find(".divcolumn").attr("valueupdate") || '';
            var colHidden = false;
            if ($tblrow.find(".custom-control-input").is(':checked')) {
                colHidden = false;
            } else {
                colHidden = true;
            }
            let lineItemObj = {
                index: index,
                label: colTitle,
                hidden: colHidden,
                width: colWidth,
                thclass: colthClass
            }

            lineItems.push(lineItemObj);
        });

        var getcurrentCloudDetails = CloudUser.findOne({ _id: localStorage.getItem('mycloudLogonID'), clouddatabaseID: localStorage.getItem('mycloudLogonDBID') });
        if (getcurrentCloudDetails) {
            if (getcurrentCloudDetails._id.length > 0) {
                var clientID = getcurrentCloudDetails._id;
                var clientUsername = getcurrentCloudDetails.cloudUsername;
                var clientEmail = getcurrentCloudDetails.cloudEmail;
                var checkPrefDetails = CloudPreference.findOne({ userid: clientID, PrefName: 'tblSerialNumberList' });
                if (checkPrefDetails) {
                    CloudPreference.update({ _id: checkPrefDetails._id }, {
                        $set: {
                            userid: clientID,
                            username: clientUsername,
                            useremail: clientEmail,
                            PrefGroup: 'salesform',
                            PrefName: 'tblSerialNumberList',
                            published: true,
                            customFields: lineItems,
                            updatedAt: new Date()
                        }
                    }, function(err, idTag) {
                        if (err) {
                            $('#myModal2').modal('toggle');
                        } else {
                            $('#myModal2').modal('toggle');
                        }
                    });

                } else {
                    CloudPreference.insert({
                        userid: clientID,
                        username: clientUsername,
                        useremail: clientEmail,
                        PrefGroup: 'salesform',
                        PrefName: 'tblSerialNumberList',
                        published: true,
                        customFields: lineItems,
                        createdAt: new Date()
                    }, function(err, idTag) {
                        if (err) {
                            $('#myModal2').modal('toggle');
                        } else {
                            $('#myModal2').modal('toggle');

                        }
                    });

                }
            }
        }
    },
    'blur .divcolumn': function(event) {
        let columData = $(event.target).text();

        let columnDatanIndex = $(event.target).closest("div.columnSettings").attr('id');

        var datable = $('#tblSerialNumberList').DataTable();
        var title = datable.column(columnDatanIndex).header();
        $(title).html(columData);

    },
    'change .rngRange': function(event) {
        let range = $(event.target).val();
        // $(event.target).closest("div.divColWidth").find(".spWidth").html(range+'px');

        // let columData = $(event.target).closest("div.divColWidth").find(".spWidth").attr("value");
        let columnDataValue = $(event.target).closest("div").prev().find(".divcolumn").text();
        var datable = $('#tblSerialNumberList th');
        $.each(datable, function(i, v) {

            if (v.innerText == columnDataValue) {
                let className = v.className;
                let replaceClass = className.replace(/ /g, ".");
                $("." + replaceClass + "").css('width', range + 'px');

            }
        });

    },
    'click .btnOpenSettings': function(event) {
        let templateObject = Template.instance();
        var columns = $('#tblSerialNumberList th');

        const tableHeaderList = [];
        let sTible = "";
        let sWidth = "";
        let sIndex = "";
        let sVisible = "";
        let columVisible = false;
        let sClass = "";
        $.each(columns, function(i, v) {
            if (v.hidden == false) {
                columVisible = true;
            }
            if ((v.className.includes("hiddenColumn"))) {
                columVisible = false;
            }
            sWidth = v.style.width.replace('px', "");

            let datatablerecordObj = {
                sTitle: v.innerText || '',
                sWidth: sWidth || '',
                sIndex: v.cellIndex || 0,
                sVisible: columVisible || false,
                sClass: v.className || ''
            };
            tableHeaderList.push(datatablerecordObj);
        });

        templateObject.tableheaderrecords.set(tableHeaderList);
    }
});
Template.home.helpers({

});

Template.registerHelper("equals", function(a, b) {
    return a === b;
});