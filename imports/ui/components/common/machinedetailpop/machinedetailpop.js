import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';
import "./machinedetailpop.html";
import moment from 'moment';

Template.machinedetailpop.onCreated(function() {
    const templateObject = Template.instance();
    templateObject.tableheaderrecords = new ReactiveVar([]);
    templateObject.datatablerecords = new ReactiveVar([]);
    templateObject.detailslist = new Array();

    let headerStruct = [
        { index: 0, label: 'ID', class: 'colID', active: false, display: true, width: "10" },
        { index: 1, label: 'Date Time', class: 'colDateTime', active: true, display: true, width: "150" },
        { index: 2, label: 'Status', class: 'colStatus', active: true, display: true, width: "120" },
    ];
    templateObject.tableheaderrecords.set(headerStruct);

    templateObject.getDataTableList = function (data) {
        let dataList = [
            
        ];
        return dataList;
    }

    templateObject.getDetails = async function (page = 1) {
        const queryString = window.location.search; // Returns "?param1=value1&param2=value2"
        const urlParams = new URLSearchParams(queryString);
        const param1Value = urlParams.get('id'); // Returns "value1"
        var id = param1Value;
        HTTP.call('post', '/api/detail?machine_id=' + id, (error, response) => {
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
                for(i = 0; i < response.data.length; i += 5) {
                    let res = [
                        response.data[i].id,
                        moment(response.data[i].created_at).format('DD/MM/YYYY HH:mm:ss'),
                        response.data[i].status,
                    ];
                    templateObject.detailslist.push(res);
                }
            }
        });
    };
});

Template.machinedetailpop.onRendered(function() {
    $('.fullScreenSpin').css('display', 'inline-block');
    let templateObject = Template.instance();
    templateObject.getDetails();
    let DataCount = templateObject.detailslist.length;

    $('.fullScreenSpin').css('display', 'none');
    setTimeout(function() {
        DataCount = templateObject.detailslist.length;
        $('#tblMachineDetailList').DataTable({
            dom: 'BRlfrtip',
            data: templateObject.detailslist,
            "sDom": "<'row'><'row'<'col-sm-12 col-md-8'f><'col-sm-12 col-md-4'l>r>t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>B",
            columnDefs: [
                {
                    className: "colID hiddenColumn",
                    targets: 0,
                    width:'10'
                },
                {
                    className: "colDateTime",
                    targets: 1,
                    width:'150'
                },
                {
                    className: "colStatus",
                    targets: 2,
                    width:'120'
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
                $('#tblMachineDetailList').DataTable().ajax.reload();
            },
            "fnDrawCallback": function(oSettings) {
                $('.paginate_button.page-item').removeClass('disabled');
                $('#tblMachineDetailList' + '_ellipsis').addClass('disabled');
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
                $("<button class='btn btn-primary' id='NewAdminBtn' name='NewAdminBtn' type='button' style='padding: 4px 10px; font-size: 16px; margin-left: 12px !important;'><i class='fas fa-plus'></i></button>").insertAfter('#tblMachineDetailList_filter');
                $("<button class='btn btn-primary btnRefreshList' type='button' id='btnRefreshList' style='padding: 4px 10px; font-size: 16px; margin-left: 14px !important;'><i class='fas fa-search-plus' style='margin-right: 5px'></i>Search</button>").insertAfter('#tblMachineDetailList' + '_filter');
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
        $('#tblMachineDetailList_filter .form-control-sm').focus();
        $('#tblMachineDetailList_filter .form-control-sm').trigger("input");
    }, 10);

    templateObject.resetData = function(dataVal) {
        Meteor._reload.reload();
    }
});

Template.machinedetailpop.events({

});

Template.machinedetailpop.helpers({});

Template.registerHelper("equals", function(a, b) {
    return a === b;
});