import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';
import moment from 'moment/moment';
import "./machinesummarypop.html";

Template.machinesummarypop.onCreated(function() {
    const templateObject = Template.instance();
    templateObject.tableheaderrecords = new ReactiveVar([]);
    templateObject.datatablerecords = new ReactiveVar([]);
    templateObject.summaryList = new Array();

    let headerStruct = [
        { index: 0, label: 'ID', class: 'colID', active: false, display: true, width: "10" },
        { index: 1, label: 'Date', class: 'colDate', active: true, display: true, width: "150" },
        { index: 2, label: 'Count', class: 'colCount', active: true, display: true, width: "120" },
    ];
    templateObject.tableheaderrecords.set(headerStruct);

    templateObject.getDataTableList = function (data) {
        let dataList = [
            
        ];
        return dataList;
    }

    
    templateObject.getSummaryList = function (page = 1) {
        const queryString = window.location.search; // Returns "?param1=value1&param2=value2"
        const urlParams = new URLSearchParams(queryString);
        const param1Value = urlParams.get('id'); // Returns "value1"
        var id = param1Value;
        HTTP.call('post', '/api/summery?machine_id=' + id, (error, response) => {
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
                let OnCount = 0;
                let OffCount = 0;
                let Status = '';
                let curDate = '';
                for(i = 0; i < response.data.length; i ++) {
                    response.data[i].created_at = moment(response.data[i].created_at).format('DD/MM/YYYY');
                    if(i == 0) {
                        Status = response.data[0].status;
                        curDate = response.data[0].created_at;
                        Status == 'on' ? OnCount += 1 : OffCount += 1;
                    }
                    if(response.data[i].status != Status && response.data[i].created_at == curDate) {
                        if(Status == 'on') {
                            OnCount ++;
                            Status = response.data[i].status;
                            templateObject.summaryList.push()
                        } else {
                            OffCount ++;
                            Status = response.data[i].status;
                        }
                    } else if((response.data[i].status == Status && response.data[i].created_at != curDate) || i + 1 == response.data.length) {
                        let res = [
                            response.data[i - 1].id,
                            curDate,
                            OnCount,
                            'bgcolor-green'
                        ];
                        templateObject.summaryList.push(res);
                        res = [
                            response.data[i - 1].id,
                            curDate,
                            OffCount,
                            'bgcolor-red'
                        ];
                        templateObject.summaryList.push(res);
                        Status = response.data[i].status;
                        curDate = response.data[i].created_at;
                        Status == 'on' ? OnCount += 1 : OffCount += 1;
                    }
                }

            }
        });
    };
});

Template.machinesummarypop.onRendered(function() {
    $('.fullScreenSpin').css('display', 'inline-block');
    let templateObject = Template.instance();
    templateObject.getSummaryList();
    let DataCount = templateObject.summaryList.length;

    $('.fullScreenSpin').css('display', 'none');
    setTimeout(function() {
        DataCount = templateObject.summaryList.length;
        $('#tblMachineSummaryList').DataTable({
            dom: 'BRlfrtip',
            data: templateObject.summaryList,
            "sDom": "<'row'><'row'<'col-sm-12 col-md-8'f><'col-sm-12 col-md-4'l>r>t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>B",
            columnDefs: [
                {
                    className: "colID hiddenColumn",
                    targets: 0,
                    width:'10'
                },
                {
                    className: "colDate",
                    targets: 1,
                    width:'150'
                },
                {
                    className: "colCount",
                    targets: 2,
                    width:'120',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).addClass(rowData[3]);
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
                $('#tblMachineSummaryList').DataTable().ajax.reload();
            },
            "fnDrawCallback": function(oSettings) {
                $('.paginate_button.page-item').removeClass('disabled');
                $('#tblMachineSummaryList' + '_ellipsis').addClass('disabled');
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
                $("<button class='btn btn-primary btnRefreshList' type='button' id='btnRefreshList' style='padding: 4px 10px; font-size: 16px; margin-left: 14px !important;'><i class='fas fa-search-plus' style='margin-right: 5px'></i>Search</button>").insertAfter('#tblMachineSummaryList' + '_filter');
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
        $('#tblMachineSummaryList_filter .form-control-sm').focus();
        $('#tblMachineSummaryList_filter .form-control-sm').trigger("input");
    }, 10);

    templateObject.resetData = function(dataVal) {
        Meteor._reload.reload();
    }
});

Template.machinesummarypop.events({

});

Template.machinesummarypop.helpers({});

Template.registerHelper("equals", function(a, b) {
    return a === b;
});