// @ts-nocheck
import {SideBarService} from "../sidebar-service";
export default class TableHandler {
  constructor() {
    this.bindEvents();
  }

  async bindEvents() {
    // $(".dataTable").on("DOMSubtreeModified",  () => {
    //   this.refreshDatatableResizable();
    // });
    this.refreshDatatableResizable();

    $(".dataTable thead tr th").on("mousedown", () => {
      this.refreshDatatableResizable();
    });

    $(".dataTable thead tr th").on("mouseover", () => {
      this.refreshDatatableResizable();
    });

    $(".dataTable tbody tr td").on("mouseup", () => {
      this.refreshDatatableResizable();
    });

    $(".dataTable tbody tr td").on("mouseover", () => {
      this.refreshDatatableResizable();
    });

    $(".transactionLines tbody").on("mouseup", () => {
      this.disableTransDatatableResizable();
    });

    $(".transactionLines tbody").on("mouseover", () => {
      this.disableTransDatatableResizable();
    });

  }

  /**
     * this will refresh events related to resizing features
     */
  async refreshDatatableResizable() {
    await this.disableDatatableResizable();
    this.enableDatatableResizable();
  }

  /***
     * Then we need to add back the listeners
     *
     * By doing disabling and re-enabling, start fresh events
     * instead of cummulating multiple listeners which is causing issues
     */
  async enableDatatableResizable() {
    $(".dataTable").colResizable({
      liveDrag: true,
      gripInnerHtml: "<div class='grip JCLRgrips'></div>",
      draggingClass: "dragging",
      resizeMode: "overflow",
      passive: true,
      onResize: e => {
        var table = $(e.currentTarget); //reference to the resized table
        let tableName = table.attr("id");
        let tableClassName = $(e.currentTarget.className)?$(e.currentTarget)[0].className:'';
        if(tableClassName.includes("transactionLines")){
            //this.saveTableColumns(tableName);
        }else if (tableClassName.includes("dtTemplate")){
          this.saveTableColumnsDatatableList(tableName);
        }else{
          if ((tableName != "tblBasReturnList")) {
            this.saveTableColumns(tableName);
          };
        };

        let tableWidth = [];
        // $("#tblcontactoverview th").each(function () {
        //   tableWidth.push($(this).outerWidth());
        //   tableWidth.push($(this).index());
        // });
      }
      // disabledColumns: [2]
    });
  }

  /**
     * We first need to disable all previous events listeners related
     */
  async disableDatatableResizable() {
    $(".dataTable").colResizable({disable: true});
  }

  async disableTransDatatableResizable() {
    $(".transactionLines").colResizable({disable: true});
  }

  async saveTableColumnsDatatableList(tableName) {
    let lineItems = [];
    //$(".fullScreenSpin").css("display", "inline-block");
    let tableDisplay = $('#'+tableName).DataTable()||'';
    if(tableDisplay?.context[0]?.aoColumns != ""){
    $(tableDisplay?.context[0]?.aoColumns).each(function (index, value) {
      var fieldID = index || 0;
      var colTitle = value.title || "";
      var colWidth = value.nTh.style.width?.includes("px")?value.nTh.style.width.slice(0,-2):value.nTh.style.width || value.width;
      var colthClass = value.className || "";
      var showCol = value.bVisible||false;
      var colDisplay = value.orderable||false;

      if(colthClass.includes("hiddenColumn")) {
         colthClass = value.className.replace("hiddenColumn", "");
        showCol = false;
      } else {
        showCol = true;
      };
      if(colTitle.includes("<div class") > 0){
        colTitle = 'checkBoxHeader'
      }
      let lineItemObj = {
        index: parseInt(fieldID),
        label: colTitle,
        active: showCol,
        width: parseFloat(colWidth),
        class: colthClass,
        display: colDisplay
      };

      lineItems.push(lineItemObj);
    });

  }else{
    $(`#${tableName} thead tr th`).each(function (index) {
      var $tblrow = $(this);
      var fieldID = $tblrow.attr("data-column-index") || 0;
      var colTitle = $tblrow.text().replace(/^\s+|\s+$/g, "") || "";
      var colWidth = $tblrow.width() || 0;
      var colthClass = $tblrow[0].classList[0]!='th'?$tblrow[0].classList[0]:$tblrow[0].classList[1]||$tblrow.attr("data-class") || "";
       // shipdate:data.tinvoiceex[i].fields.ShipDate !=''? moment(data.tinvoiceex[i].fields.ShipDate).format("DD/MM/YYYY"): data.tinvoiceex[i].fields.ShipDate,

      let allClass = $tblrow[0].className ||$tblrow.attr("data-class") || "";
      var showCol = true;
      if (allClass.includes("hiddenColumn")) {
        showCol = false;
      } else {
        showCol = true;
      };
      if(colTitle.includes("<div class") > 0){
        colTitle = 'checkBoxHeader'
      };
      let lineItemObj = {
        index: parseInt(fieldID),
        label: colTitle,
        active: showCol,
        width: parseFloat(colWidth),
        class: colthClass,
        display: true
      };

      lineItems.push(lineItemObj);
    });

  };
    // lineItems.sort((a,b) => a.index - b.index);
    try {
      let erpGet = erpDb();
      let employeeId = parseInt(localStorage.getItem("mySessionEmployeeLoggedID")) || 0;
      let sideBarService = new SideBarService();
      let added = await sideBarService.saveNewCustomFields(erpGet, tableName, employeeId, lineItems);
      //$(".fullScreenSpin").css("display", "none");
      if (added) {
        sideBarService.getNewCustomFieldsWithQuery(parseInt(localStorage.getItem("mySessionEmployeeLoggedID")), "").then(function (dataCustomize) {
          addVS1Data("VS1_Customize", JSON.stringify(dataCustomize));
        }).catch(function (err) {});
      } else {
        // swal("Something went wrong!", "", "error");
      }

    } catch (error) {
      $(".fullScreenSpin").css("display", "none");
      swal("Something went wrong!", "", "error");
    }
  }

  async saveTableColumns(tableName) {
    let lineItems = [];
    //$(".fullScreenSpin").css("display", "inline-block");
    $(`#${tableName} thead tr th`).each(function (index) {
      var $tblrow = $(this);
      var fieldID = $tblrow.attr("data-column-index") || 0;
      var colTitle = $tblrow.text().replace(/^\s+|\s+$/g, "") || "";
      var colWidth = $tblrow.width() || 0;
      var colthClass = $tblrow[0].classList[0]!='th'?$tblrow[0].classList[0]:$tblrow[0].classList[1]||$tblrow.attr("data-class") || "";
       // shipdate:data.tinvoiceex[i].fields.ShipDate !=''? moment(data.tinvoiceex[i].fields.ShipDate).format("DD/MM/YYYY"): data.tinvoiceex[i].fields.ShipDate,

      let allClass = $tblrow[0].className ||$tblrow.attr("data-class") || "";
      var showCol = true;
      if (allClass.includes("hiddenColumn")) {
        showCol = false;
      } else {
        showCol = true;
      }
      let lineItemObj = {
        index: parseInt(fieldID),
        label: colTitle,
        active: showCol,
        width: parseFloat(colWidth),
        class: colthClass,
        display: true
      };

      lineItems.push(lineItemObj);
    });
    // lineItems.sort((a,b) => a.index - b.index);
    try {
      let erpGet = erpDb();
      let employeeId = parseInt(localStorage.getItem("mySessionEmployeeLoggedID")) || 0;
      let sideBarService = new SideBarService();

      let added = await sideBarService.saveNewCustomFields(erpGet, tableName, employeeId, lineItems);
      //$(".fullScreenSpin").css("display", "none");
      if (added) {
        sideBarService.getNewCustomFieldsWithQuery(parseInt(localStorage.getItem("mySessionEmployeeLoggedID")), "").then(function (dataCustomize) {
          addVS1Data("VS1_Customize", JSON.stringify(dataCustomize));
        }).catch(function (err) {});
      } else {
        // swal("Something went wrong!", "", "error");
      }

    } catch (error) {
      $(".fullScreenSpin").css("display", "none");
      swal("Something went wrong!", "", "error");
    }
  }
  static getDefaultTableConfiguration(selector = null, options = {
    pageLength: 25,
    initialReportDatatableLoad,
    showPlusButton: true,
    showSearchButton: true,
    info: true,
    responsive: true,
    select: true,
    destroy: true,
    colReorder: true,
  }) {
    return {
      sDom: "<'row'><'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6 colDateFilter'l>r>t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>B",
      pageLength: options.pageLength || 25,
      paging: true,
      // colReorder: {
      //   fixedColumnsLeft: 1
      // },
      // lengthChange: false,
      // lengthMenu: [
      //   [
      //     initialReportDatatableLoad, -1
      //   ],
      //   [
      //     initialReportDatatableLoad, "All"
      //   ]
      // ],
      info: options.info || true,
      responsive: options.responsive || true,
      select: options.select || true,
      destroy: options.destroy || true,
      colReorder: options.colReorder || true,
      language: {search: "",searchPlaceholder: "Search List..."},
      fnInitComplete: function () {
        if (options.showSearchButton)
          $(`<button class='btn btn-primary refresh-${selector}' type='button' id='refresh-${selector}' style='padding: 4px 10px; font-size: 16px; margin-left: 14px !important;'><i class='fas fa-search-plus' style='margin-right: 5px'></i>Search</button>`).insertAfter(`#${selector}_filter`);
        if (options.showPlusButton)
          $(`<button class='btn btn-primary add-${selector}' data-dismiss='modal' data-toggle='modal' data-target='#add-${selector}_modal' type='button' style='padding: 4px 10px; font-size: 16px; margin-left: 12px !important;'><i class='fas fa-plus'></i></button>`).insertAfter(`#${selector}_filter`);
        }
      };
  }
}
