import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';
import moment from 'moment/moment';
import "./logspop.html";

Template.logspop.onCreated(function() {
    const templateObject = Template.instance();
    templateObject.tableheaderrecords = new ReactiveVar([]);
    templateObject.datatablerecords = new ReactiveVar([]);
    templateObject.logsList = new Array();

    let headerStruct = [
        { index: 0, label: 'ID', class: 'colID', active: false, display: true, width: "10" },
        { index: 1, label: 'Service Name', class: 'colServiceName', active: true, display: true, width: "150" },
        { index: 2, label: 'Account', class: 'colAccount', active: true, display: true, width: "250" },
        { index: 3, label: 'DateFrom', class: 'colDateFrom', active: true, display: true, width: "150" },
        { index: 4, label: 'DateTo', class: 'colDateTo', active: true, display: true, width: "150" },
        { index: 5, label: 'Hours', class: 'colHours', active: true, display: true, width: "50" },
        { index: 6, label: 'Status', class: 'colStatus', active: true, display: true, width: "120" }
    ];
    templateObject.tableheaderrecords.set(headerStruct);

    templateObject.getDataTableList = function (data) {
        let dataList = [

        ];
        return dataList;
    }

    templateObject.getLogs = function (page = 1) {
        const templateObject = Template.instance();
        const queryString = window.location.search; // Returns "?param1=value1&param2=value2"
        const urlParams = new URLSearchParams(queryString);
        const param1Value = urlParams.get('id'); // Returns "value1"
        const id = param1Value;
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
                let datefrom, dateto, hours, minutes, curStatus;
                for (i = 0; i < response.data.length; i++) {
                    if (i == 0) {
                        datefrom = new Date(response.data[0].created_at);
                        curStatus = response.data[0].status;
                    }
                    if (response.data[i].status != curStatus) {
                        dateto = new Date(response.data[i].created_at);
                        minutes = (dateto.getTime() - datefrom.getTime()) / 60000;
                        hours = minutes > 59 ? Math.floor(minutes / 60) + ' hour' : '';
                        if (minutes / 60 > 1) {
                            hours += minutes % 60 > 0 ? 's ' + Math.round(minutes % 60) + ' minutes' : 's ' + Math.round(minutes % 60) + 'minute';
                        } else {
                            hours += minutes % 60 > 0 ? ' ' + Math.round(minutes % 60) + ' minutes' : ' ' + Math.round(minutes % 60) + 'minute';
                        }
                        let res = [
                            response.data[i - 1].id,
                            response.data[i - 1].server_name,
                            response.data[i - 1].service_account,
                            moment(datefrom).format("DD/MM/YYYY HH:mm:ss"),
                            moment(dateto).format("DD/MM/YYYY HH:mm:ss"),
                            hours,
                            response.data[i - 1].status,
                        ];
                        templateObject.logsList.push(res);
                        datefrom = new Date(response.data[i].created_at);
                        curStatus = response.data[i].status;
                    }
                }
            }
        });
    };
});

Template.logspop.onRendered(function () {
    let templateObject = Template.instance();
    const logs = templateObject.getLogs();
    $('.fullScreenSpin').css('display', 'none');
    setTimeout(function () {
        let DataCount = templateObject.logsList.length;
        $('#tblServiceLogs').DataTable({
            dom: 'BRlfrtip',
            data: templateObject.logsList,
            "sDom": "<'row'><'row'<'col-sm-12 col-md-8'f><'col-sm-12 col-md-4'l>r>t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>B",
            columnDefs: [
                {
                    className: "colID hiddenColumn",
                    targets: 0,
                    width: '10'
                },
                {
                    className: "colServiceName",
                    targets: 1,
                    width: '150'
                },
                {
                    className: "colAccount",
                    targets: 2,
                    width: '250'
                },
                {
                    className: "colDateFrom",
                    targets: 3,
                    width: '150',
                },
                {
                    className: "colDateTo",
                    targets: 4,
                    width: '150',
                },
                {
                    className: "colHours",
                    targets: 5,
                    width: '100',
                },
                {
                    className: "colStatus",
                    targets: 6,
                    width: '120',
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
            action: function () {
                $('#tblServiceLogs').DataTable().ajax.reload();
            },
            "fnDrawCallback": function (oSettings) {
                $('.paginate_button.page-item').removeClass('disabled');
                $('#tblServiceLogs' + '_ellipsis').addClass('disabled');
                if (oSettings._iDisplayLength == -1) {
                    if (oSettings.fnRecordsDisplay() > 150) {
                    }
                } else {
                }
                if (oSettings.fnRecordsDisplay() < initialDatatableLoad) {
                    $('.paginate_button.page-item.next').addClass('disabled');
                }
                $('.paginate_button.next:not(.disabled)', this.api().table().container()).on('click', function () {
                    $('.fullScreenSpin').css('display', 'inline-block');

                });
            },
            language: { search: "", searchPlaceholder: "Search..." },
            "fnInitComplete": function (oSettings) {
                $("<button class='btn btn-primary btnRefreshList' type='button' id='btnRefreshList' style='padding: 4px 10px; font-size: 16px; margin-left: 14px !important;'><i class='fas fa-search-plus' style='margin-right: 5px'></i>Search</button>").insertAfter('#tblServiceLogs' + '_filter');
            },
            "fnInfoCallback": function (oSettings, iStart, iEnd, iMax, iTotal, sPre) {
                let countTableData = DataCount || 0; //get count from API data
                return 'Showing ' + iStart + " to " + iEnd + " of " + countTableData;
            }
        }).on('page', function () {

        }).on('column-reorder', function () {
        }).on('length.dt', function (e, settings, len) {
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
    setTimeout(function () {
        $('div.dataTables_filter input').addClass('form-control form-control-sm');
        $('#tblServiceLogs_filter .form-control-sm').focus();
        $('#tblServiceLogs_filter .form-control-sm').trigger("input");
    }, 10);

    templateObject.resetData = function (dataVal) {
        Meteor._reload.reload();
    }
});

Template.logspop.events({

});

Template.logspop.helpers({
    getlogs: async function () {
        
    }

});

Template.registerHelper("equals", function (a, b) {
    return a === b;
});