import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';
import "./adminlistpop.html";

Template.adminListpop.onCreated(function() {
    const templateObject = Template.instance();
    templateObject.tableheaderrecords = new ReactiveVar([]);
    templateObject.datatablerecords = new ReactiveVar([]);
    templateObject.adminList = new Array();

    let headerStruct = [
        { index: 0, label: 'ID', class: 'colID', active: false, display: true, width: "10" },
        { index: 1, label: 'Name', class: 'colName', active: true, display: true, width: "150" },
        { index: 2, label: 'Email Address', class: 'colEmailAddress', active: true, display: true, width: "150" },
        { index: 3, label: 'Password', class: 'colPassword', active: true, display: true, width: "150" },
        { index: 4, label: 'SMS Number', class: 'colSMSNumber', active: true, display: true, width: "150" },
    ];
    templateObject.tableheaderrecords.set(headerStruct);

    templateObject.getDataTableList = function (data) {
        let dataList = [
            
        ];
        return dataList;
    }

    templateObject.getAdminList = async function (page = 1) {
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

Template.adminListpop.onRendered(function() {
    $('.fullScreenSpin').css('display', 'inline-block');
    let templateObject = Template.instance();
    templateObject.getAdminList();
    let DataCount = templateObject.adminList.length;

    $('.fullScreenSpin').css('display', 'none');
    setTimeout(function() {
        DataCount = templateObject.adminList.length;
        $('#tblAdminServiceList').DataTable({
            dom: 'BRlfrtip',
            data: templateObject.adminList,
            "sDom": "<'row'><'row'<'col-sm-12 col-md-8'f><'col-sm-12 col-md-4'l>r>t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>B",
            columnDefs: [
                {
                    className: "colID hiddenColumn",
                    targets: 0,
                    width:'10'
                },
                {
                    className: "colName",
                    targets: 1,
                    width:'150'
                },
                {
                    className: "colEmailAddress",
                    targets: 2,
                    width:'150'
                },
                {
                    className: "colPassword",
                    targets: 3,
                    width:'150'
                },
                {
                    className: "colSMSNumber",
                    targets: 4,
                    width:'150',
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
                $('#tblAdminServiceList').DataTable().ajax.reload();
            },
            "fnDrawCallback": function(oSettings) {
                $('.paginate_button.page-item').removeClass('disabled');
                $('#tblAdminServiceList' + '_ellipsis').addClass('disabled');
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
                $("<button class='btn btn-primary' id='NewAdminBtn' name='NewAdminBtn' type='button' style='padding: 4px 10px; font-size: 16px; margin-left: 12px !important;'><i class='fas fa-plus'></i></button>").insertAfter('#tblAdminServiceList_filter');
                $("<button class='btn btn-primary btnRefreshList' type='button' id='btnRefreshList' style='padding: 4px 10px; font-size: 16px; margin-left: 14px !important;'><i class='fas fa-search-plus' style='margin-right: 5px'></i>Search</button>").insertAfter('#tblAdminServiceList' + '_filter');
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
        $(".fullScreenSpin").css("display", "none");
    }, 2000);
    setTimeout(function() {
        $('div.dataTables_filter input').addClass('form-control form-control-sm');
        $('#tblAdminServiceList_filter .form-control-sm').focus();
        $('#tblAdminServiceList_filter .form-control-sm').trigger("input");
    }, 10);

    templateObject.resetData = function(dataVal) {
        Meteor._reload.reload();
    }
});

Template.adminListpop.events({
    "click #NewAdminBtn": function () {
        $('#edtAdminFlag').val('0');
        $('#modal-title').text("Add Administrator");
        $('#edtName').val('');
        $('#edtEmail').val('');
        $('#edtPsw').val('');
        $('#edtSMSNumber').val('');
        $('#editAdminModal').modal('toggle');
    },
    "click #tblAdminServiceList tbody tr": function (event) {
        $('#edtAdminFlag').val('1');
        $('#modal-title').text("Edit Administrator");
        $('#edtID').val($(event.target).closest('tr').find('.colID').text());
        $('#edtName').val($(event.target).closest('tr').find('.colName').text());
        $('#edtEmail').val($(event.target).closest('tr').find('.colEmailAddress').text());
        $('#edtPsw').val($(event.target).closest('tr').find('.colPassword').text());
        $('#edtSMSNumber').val($(event.target).closest('tr').find('.colSMSNumber').text());
        $('#editAdminModal').modal('toggle');
    }
});

Template.adminListpop.helpers({});

Template.registerHelper("equals", function(a, b) {
    return a === b;
});