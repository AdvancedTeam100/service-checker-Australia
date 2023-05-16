import { BaseService } from "./base-service.js";
import { HTTP } from "meteor/http";
export class SideBarService extends BaseService {


  getRegionalOptionInfo() {

    let options = {
      ListType:"Detail",
      select: "[Region]=" + localStorage.getItem('ERPLoggedCountry'),
    };

    return this.getList(this.ERPObjects.TRegionalOptions, options);
  }

  getNewProductListVS1(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        select: "[Active]=true",
      };
    } else {
      options = {
        orderby: '"PARTSID desc"',
        ListType: "Detail",
        select: "[Active]=true",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
        return this.getList(this.ERPObjects.TProductVS1, options);
  }

  getAllProductClassQtyData() {
      let options = {
          PropertyList: "ID,ProductID,DepartmentID,DepartmentName,InStockQty,AvailableQty,OnOrderQty,SOQty,SOBOQty,POBOQty",
      };
      return this.getList(this.ERPObjects.TProductClassQuantity, options);
  }

  getAllBOMProducts(limitcount, limitfrom) {
      let options = "";
      if (limitcount == "All") {
          options = {
            PropertyList: "ID, Caption, CustomInputClass, Description, Details, Info, ProcStepItemRef, QtyVariation, TotalQtyOriginal, Value",
            select: "[ProcStepItemRef]='vs1BOM'",
              // orderby: '"Description asc"',
          };
      } else {
          options = {
              // orderby: '"Description asc"',
              PropertyList: "ID, Caption, CustomInputClass, Description, Details, Info, ProcStepItemRef, QtyVariation, TotalQtyOriginal, Value",
              LimitCount: parseInt(limitcount)||initialReportLoad,
              LimitFrom: parseInt(limitfrom)||0,
              select: "[ProcStepItemRef]='vs1BOM'",
          };
      }

      return this.getList(this.ERPObjects.TProcTree, options);
  }

  getProductListVS1(limitcount, limitfrom, deleteFilter) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
      };
    } else {
      options = {
        IgnoreDates: true,
        OrderBy: "PARTSID desc",
        ListType: "Detail",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    if (!deleteFilter) options.Search = "Active = true"
    return this.getList(this.ERPObjects.TProductQtyList, options);
  }

  getProductListVS1ByName(dataSearchName) {
    let options = {
      IgnoreDates: true,
      OrderBy: "PARTSID desc",
      ListType: "Detail",
      Search: "ProductName like '%" + dataSearchName + "%' OR SalesDescription like '%" + dataSearchName + "%'"
    };

    return this.getList(this.ERPObjects.TProductQtyList, options);
  }



  getNewGroupListVS1(limitcount, limitfrom) {
    let options = "";

    if(limitcount == 'All'){
       options = {
         ListType: "Detail",

        };
    }else{
      options = {

         ListType: "Detail",

     };
    }
    return this.getList(this.ERPObjects.TPayrollHolidayGroup, options);
  }



  getAllFundType() {
    let options = {};
    return this.getList(this.ERPObjects.TSuperType, options);
  }
  getRateTypes() {
    let options = {
      //PropertyList: "ID,Description",
      ListType: "Detail",
      //select: "[Active]=true",
    };
    return this.getList(this.ERPObjects.TPayRateType, options);
  }
  getPayrollinformation(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
      };
    } else {
      options = {
        ListType: "Detail",
      };
    }
    return this.getList(this.ERPObjects.TPayrollOrganization, options);
  }


  getTemplateInformation() {

    let options = {
      ListType:"Detail",
      select: "[EmployeeID]=" + localStorage.getItem('mySessionEmployeeLoggedID'),
    };

    return this.getList(this.ERPObjects.TTemplateSettings, options);
  }

  saveGroupType(data)
  {

    return this.POST(this.ERPObjects.TPayrollHolidayGroup,data);

  }

  saveSerialNumber(data)
  {
    return this.POST(this.ERPObjects.TSerialNumberListCurrentReport, data);
  }

  savePayRunHistory(data)
  {
    return this.POST(this.ERPObjects.TPayRunHistory, data);
  }

  removeTempateData(data)
  {
    return this.POST(this.ERPObjects.TTemplateSettings,data);
  }

  getTemplateNameandEmployeId(name,employeeID,template)
  {
    let options = {
      ListType:"Detail",
      select: "[SettingName] = '" +name + "' and [EmployeeID]=" + employeeID + " and Template="+template+"",
    };
    return this.getList(this.ERPObjects.TTemplateSettings, options);
  }
  saveTemplateSetting(data)
  {
      return this.POST(this.ERPObjects.TTemplateSettings,data);
  }
  getOneGroupTypeByName(dataSearchName){
    let options = {
      ListType:"Detail",
      select: '[Description]="'+dataSearchName+'"'
    };
    return this.getList(this.ERPObjects.TPayrollHolidayGroup, options);
 }
  getOrdinarytimeEarning(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        select: "[OrdinaryTimeEarningsActive]=true",
      };
    } else {
      options = {
        ListType: "Detail",
        select: "[OrdinaryTimeEarningsActive]=true",
      };
    }
    return this.getList(this.ERPObjects.TOrdinaryTimeEarnings, options);
  }

  getAllCurrencies() {
    HTTP.call(
      "GET",
      "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/aud.json",
      { options: "" },
      function (error, response) {
        return response;
      }
    );
  }

  getExemptReportableTermnination(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        select: "[EmployeeTerminationPaymentsActive]=true",
      };
    } else {
      options = {
        ListType: "Detail",
        select: "[EmployeeTerminationPaymentsActive]=true",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TTerminationSimple, options);
  }

  getExemptReportableOvertime(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        select: "[OverTimeEarningsActive]=true",
      };
    } else {
      options = {
        ListType: "Detail",
        select: "[OverTimeEarningsActive]=true",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TOverTimeEarnings, options);
  }
  getExemptReportableLumpSumE(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        select: "[LumpSumEActive]=true",
      };
    } else {
      options = {
        ListType: "Detail",
        select: "[LumpSumEActive]=true",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TLumpSumE, options);
  }

  getNewHolidayGroup(datasearch)
  {
      let options = "";

      options = {
          ListType: "Detail",
          select:  "[PayrollHolidaysGroupName]='" + datasearch + "'",
        };

      return this.getList(this.ERPObjects.TPayrollHolidays, options);

  }

  getsuperannuationBonusesCommissions(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        select: "[EarningBonusesCommisionsActive]=true",
      };
    } else {
      options = {
        ListType: "Detail",
        select: "[EarningBonusesCommisionsActive]=true",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TEarningsBonusesCommissions, options);
  }

  getLumpSumW(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        select: "[LumpSumWActive]=true",
      };
    } else {
      options = {
        ListType: "Detail",
        select: "[LumpSumWActive]=true",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TLumpSumW, options);
  }

  getDirectorFee(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        select: "[DirectorsFeesActive]=true",
      };
    } else {
      options = {
        ListType: "Detail",
        select: "[DirectorsFeesActive]=true",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TDirectorsFees, options);
  }
  getProductServiceListVS1(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        orderby: '"PARTSID desc"',
        ListType: "Detail",
        select: "[Active]=true and [ProductType]!='INV'",
      };
    } else {
      options = {
        orderby: '"PARTSID desc"',
        ListType: "Detail",
        select: "[Active]=true and [ProductType]!='INV'",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TProductVS1, options);
  }

  //Add for JS
  getProductQTYServiceListVS1(limitcount, limitfrom, deleteFilter) {
    let options = "";
    if (limitcount == "All") {
      options = {
        IgnoreDates: true,
        OrderBy: '"PARTSID desc"',
        Search:"Active=true & ProductTypeCode='INV'",
      };
    } else {
      options = {
        IgnoreDates: true,
        OrderBy: '"PARTSID desc"',
        Search:"Active=true & ProductTypeCode='INV'",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    if (deleteFilter) options.Search = ""
    return this.getList(this.ERPObjects.TProductQtyList, options);
  }

  getHolidayData(limitcount, limitfrom, deleteFilter = false) {
    let options = "";
    if (deleteFilter == true) {
      if (limitcount == "All") {
        options = {
          ListType: "Detail",
        };
      } else {
        options = {
          ListType: "Detail",
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
    } else {
      if (limitcount == "All") {
        options = {
          ListType: "Detail",
          select: "[PayrollHolidaysActive]=true",
        };
      } else {
        options = {
          ListType: "Detail",
          select: "[PayrollHolidaysActive]=true",
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }
    return this.getList(this.ERPObjects.TPayrollHolidays, options);
  }

  getAllCustomFields() {
    let options = {
      ListType: "Detail",
    };
    return this.getList(this.ERPObjects.TCustomFieldList, options);
  }

  getCustomFieldsDropDownByNameOrID(dataSearchName) {
    let options = {
      ListType: "Detail",
      select:'[Text] f7like "' +dataSearchName +'" OR [ID] f7like "' +dataSearchName +'"',
    };
    return this.getList(this.ERPObjects.TCustomFieldListDropDown, options);
  }

  getAllCustomFieldsDropDown() {
    let options = {
      ListType: "Detail",
    };
    return this.getList(this.ERPObjects.TCustomFieldListDropDown, options);
  }

  getProductServiceListVS1ByName(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      select:'[ProductName] f7like "' +dataSearchName +'" OR [BARCODE] f7like "' +dataSearchName +'" and [ProductType]!="INV"',
    };
    return this.getList(this.ERPObjects.TProductVS1, options);
  }

  getGroupTypeByName(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      // select: '[ProductName] f7like "'+dataSearchName+'" OR [BARCODE] f7like "'+dataSearchName+'" and [ProductType]!="INV"'
    };
    return this.getList(this.ERPObjects.TVs1TabGroups, options);
  }

  getSelectedProducts(limitCount, limitFrom, deleteFilter) {
    // getSelectedProducts(employeeID) {
    let options = {
      ListType: "Detail",
      //PropertyList: "ID,EmployeeName,PayRate,Rate, ServiceDesc, ProductId",
      // select: "[Active]=true and [EmployeeID]=" + employeeID + "",
      LimitCount: parseInt(limitCount)||initialReportLoad,
      LimitFrom: parseInt(limitFrom)||0,
      select: "[Active]=true",
    };
    if(deleteFilter)
      options.select = "";
    return this.getList(this.ERPObjects.TRepServices, options);
  }

  getSelectedProductsByEmployeeName(employeeName) {
    let options = {
      ListType: "Detail",
      select: "[Active]=true and [EmployeeName] f7like '"  + employeeName + "'",
    }
    return this.getList(this.ERPObjects.TRepServices, options);
  }

  getNewProductListVS1ByName(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      select:'[ProductName] f7like "' +dataSearchName +'" OR [BARCODE] f7like "' +dataSearchName +  '"',
    };
    return this.getList(this.ERPObjects.TProductVS1, options);
  }

  getProductListVS1BySearch(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      OrderBy: '"PARTSID desc"',
      select: '[ProductName] f7like "'+ dataSearchName+ '" OR [BARCODE] f7like "' + dataSearchName + '"',
    };
    return this.getList(this.ERPObjects.TProductQtyList, options);
  }

  getNewInvoiceByNameOrID(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      select:'[ClientName] f7like "' +dataSearchName +'" OR [ID] f7like "' +dataSearchName +'"',
    };
    return this.getList(this.ERPObjects.TInvoiceEx, options);
  }

  getNewCalenderByNameOrPayPeriod(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      select:'[PayrollCalendarName] f7like "' +dataSearchName +'" OR [PayrollCalendarPayPeriod] f7like "' +dataSearchName +'"',
    };
    return this.getList(this.ERPObjects.TPayrollCalendars, options);
  }

  getNewHolidayByName(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      select: '[PayrollHolidaysName] f7like "' + dataSearchName + '"',
    };
    return this.getList(this.ERPObjects.TPayrollHolidays, options);
  }

  getPaidLeaveByName(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      select: '[LeavePaidName] f7like "' + dataSearchName + '"',
    };
    return this.getList(this.ERPObjects.TPaidLeave, options);
  }

  getEarningByName(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      select: '[OrdinaryTimeEarningsName] f7like "' + dataSearchName + '"',
    };
    return this.getList(this.ERPObjects.TOrdinaryTimeEarnings, options);
  }

  getSuperannuationByName(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      select: '[Superfund] f7like "' + dataSearchName + '"',
    };
    return this.getList(this.ERPObjects.TVS1Superannuation, options);
  }

  getAllowanceByName(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      select:'[Description] f7like "' +dataSearchName +'" OR [DisplayName] f7like "' +dataSearchName +'"',
    };
    return this.getList(this.ERPObjects.TAllowance, options);
  }

  getDeductionByName(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      select:'[Description] f7like "' +dataSearchName +'" OR [Displayin] f7like "' +dataSearchName +'"',
    };
    return this.getList(this.ERPObjects.TDeduction, options);
  }

  getReimbursementByName(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      select: '[ReimbursementName] f7like "' + dataSearchName + '"',
    };
    return this.getList(this.ERPObjects.TReimbursement, options);
  }
  getNewInvoiceBoByNameOrID(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      select:'[ClientName] f7like "' +dataSearchName +'" OR [ID] f7like "' +dataSearchName +'"',
    };
    return this.getList(this.ERPObjects.BackOrderSalesList, options);
  }

  getNewQuoteByNameOrID(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      select:'[ClientName] f7like "' + dataSearchName +'" OR [ID] f7like "' +dataSearchName +'"',
    };
    return this.getList(this.ERPObjects.TQuoteEx, options);
  }

  getNewSalesOrderByNameOrID(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      select: '[ClientName] f7like "' + dataSearchName +'" OR [ID] f7like "' + dataSearchName +'"',
    };
    return this.getList(this.ERPObjects.TSalesOrderEx, options);
  }

  getNewPoByNameOrID(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      select:'[ClientName] f7like "' +dataSearchName +'" OR [ID] f7like "' +dataSearchName +'" AND [Deleted]=false',
    };
    return this.getList(this.ERPObjects.TPurchaseOrderEx, options);
  }

  getNewBillByNameOrID(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      select:'[SupplierName] f7like "' +dataSearchName +'" OR [ID] f7like "' +dataSearchName +'" AND [Deleted]=false',
    };
    return this.getList(this.ERPObjects.TBillEx, options);
  }

  getNewCreditByNameOrID(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      select:'[SupplierName] f7like "' +dataSearchName +'" OR [ID] f7like "' +dataSearchName +'" AND [Deleted]=false',
    };
    return this.getList(this.ERPObjects.TCredit, options);
  }

  getNewCustomerPaymentByNameOrID(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      select:'[CompanyName] f7like "' +dataSearchName +'" OR [ID] f7like "' +dataSearchName +'" AND [Deleted]=false',
    };
    return this.getList(this.ERPObjects.TCustomerPayment, options);
  }

  getNewSupplierPaymentByNameOrID(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      select:'[CompanyName] f7like "' +dataSearchName +'" OR [ID] f7like "' +dataSearchName +'" AND [Deleted]=false',
    };
    return this.getList(this.ERPObjects.TSupplierPayment, options);
  }



  getNewEmployeeByNameOrID(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      orderby: '"EmployeeName asc"',
      select:'[EmployeeName] f7like "' +dataSearchName +'" OR [ID] f7like "' +dataSearchName +'"',
    };
    return this.getList(this.ERPObjects.TEmployee, options);
  }

  getLeadByNameOrID(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      orderby: '"PrintName asc"',
      select:'[ClientName] f7like "' +dataSearchName +'" OR [ID] f7like "' +dataSearchName +'"',
    };
    return this.getList(this.ERPObjects.TProspect, options);
  }
  getNewSupplierByNameOrID(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      orderby: '"PrintName asc"',
      select:'[ClientName] f7like "' +dataSearchName +'" OR [ID] f7like "' +dataSearchName +'"',
    };
    return this.getList(this.ERPObjects.TSupplierVS1, options);
  }

  getAllJobssDataVS1(limitcount, limitfrom, deleteFitler) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        orderby: '"PrintName asc"',
        Search: "Active=true",
      };
    } else {
      options = {
        orderby: '"PrintName asc"',
        ListType: "Detail",
        Search: 'Active = true',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    if(deleteFitler) options.Search = "";
    return this.getList(this.ERPObjects.TJobVS1List, options);
  }


  getJobByCompanyOrName(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      orderby: '"PrintName asc"',
      Search: 'Company="' + dataSearchName + '" or JobName="' + dataSearchName + '"',
    };
    return this.getList(this.ERPObjects.TJobVS1List, options);
  }

  getAllExpenseCliamExDataVS1() {
    return this.GET(this.erpGet.ERPTExpenseEx);
  }

  getAllExpenseClaimExData(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        select: "[Active]=true",
      };
    } else {
      options = {
        // orderby: '"ClientID desc"',
        ListType: "Detail",
        select: "[Active]=true",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TExpenseClaimEx, options);
  }

  getExpenseClaimList(dateFrom, dateTo, ignoreDate, limitcount, limitfrom) {
    let options = "";
    if (ignoreDate == true) {
      options = {
        ListType: "Detail",
        select: "[Active]=true",
        IgnoreDates: true,
        OrderBy: "ExpenseClaimID desc",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    } else {
      options = {
        ListType: "Detail",
        select: "[Active]=true",
        OrderBy: "ExpenseClaimID desc",
        IgnoreDates: false,
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TExpenseClaimList, options);
  }

  getTPaymentList(dateFrom, dateTo, ignoreDate, limitcount, limitfrom, isDeleted) {
    let options = "";
    if(isDeleted == "" || isDeleted == false || isDeleted == null || isDeleted == undefined){
        if (ignoreDate == true) {
          options = {
            IgnoreDates: true,
            IsDetailReport: true,
            OrderBy: "PaymentDate desc",
            Search: "Deleted != true",
            LimitCount: parseInt(limitcount)||initialReportLoad,
            LimitFrom: parseInt(limitfrom)||0,
          };
        } else {
          options = {
            orderby: '"PaymentDate desc"',
            ListType: "Detail",
            IgnoreDates: false,
            IsDetailReport: true,
            Search: "Deleted != true",
            // OrderBy: "PaymentDate desc",
            DateFrom: '"' + dateFrom + '"',
            DateTo: '"' + dateTo + '"',
            LimitCount: parseInt(limitcount)||initialReportLoad,
            LimitFrom: parseInt(limitfrom)||0,
          };
        }
    }else{
      if (ignoreDate == true) {
        options = {
          IgnoreDates: true,
          IsDetailReport: true,
          OrderBy: "PaymentDate desc",
          // Search: "Deleted != true",
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }else{
        options = {
          orderby: '"PaymentDate desc"',
          ListType: "Detail",
          IgnoreDates: false,
          IsDetailReport: true,
          DateFrom: '"' + dateFrom + '"',
          DateTo: '"' + dateTo + '"',
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }
    return this.getList(this.ERPObjects.TPaymentList, options);
  }

  getPaymentByNameOrID(dataSearchName) {
    let options = "";
    options = {
      orderby: '"PaymentDate desc"',
      ListType: "Detail",
      IgnoreDates: true,
      IsDetailReport: true,
      OrderBy: "PaymentDate desc",
      LimitCount: parseInt(initialReportLoad),
      Search: 'ClientName = "' + dataSearchName + '" OR ReceiptNo = "' + dataSearchName + '" OR BankAccount = "' + dataSearchName + '"',
    };
    return this.getList(this.ERPObjects.TPaymentList, options);
  }

  getTCustomerPaymentList(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        select: "[Deleted]=false",
      };
    } else {
      options = {
        orderby: '"PaymentDate desc"',
        ListType: "Detail",
        select: "[Deleted]=false",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TCustomerPayment, options);
  }

  getAllTCustomerPaymentListData(dateFrom,dateTo,ignoreDate,limitcount,limitfrom) {
    let options = "";

    if (ignoreDate == true) {
      options = {
        IgnoreDates: true,
        IsDetailReport: true,
        OrderBy: "PaymentDate desc",
        Search: "Deleted != true",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    } else {
      options = {
        IgnoreDates: false,
        IsDetailReport: true,
        OrderBy: "PaymentDate desc",
        Search: "Deleted != true",
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TCustomerPaymentList, options);
  }

  getAllTCustomerPaymentListDataByPaymentID(customername) {
    let options = "";

    options = {
      IgnoreDates: true,
      IsDetailReport: true,
      OrderBy: "PaymentDate desc",
      Search: 'CompanyName = "' + customername + '"',
    };

    return this.getList(this.ERPObjects.TCustomerPaymentList, options);
  }

  getTSupplierPaymentList(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        select: "[Deleted]=false",
      };
    } else {
      options = {
        orderby: '"PaymentDate desc"',
        ListType: "Detail",
        select: "[Deleted]=false",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TSupplierPayment, options);
  }

  getAllTSupplierPaymentListDataByPaymentID(suppliername) {
    let options = "";

    options = {
      IgnoreDates: true,
      IsDetailReport: true,
      OrderBy: "PaymentDate desc",
      Search: 'CompanyName = "' + suppliername + '"',
    };

    return this.getList(this.ERPObjects.TSupplierPaymentList, options);
  }

  getAllTSupplierPaymentListData(dateFrom,dateTo,ignoreDate,limitcount,limitfrom) {
    let options = "";

    if (ignoreDate == true) {
      options = {
        IgnoreDates: true,
        IsDetailReport: true,
        OrderBy: "PaymentDate desc",
        Search: 'Deleted != true',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    } else {
      options = {
        IgnoreDates: false,
        IsDetailReport: true,
        OrderBy: "PaymentDate desc",
        Search: 'Deleted != true',
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TSupplierPaymentList, options);
  }

  getAllCustomersDataVS1(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        orderby: "PrintName asc",
        select: "[Active]=true",
      };
    } else {
      options = {
        ListType: "Detail",
        orderby: '"PrintName asc"',
        select: "[Active]=true",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TCustomerVS1, options);
  }
  getAllCustomersDataVS1ByName(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      orderby: '"PrintName asc"',
      select: '[ClientName] f7like "' + dataSearchName + '"',
    };
    return this.getList(this.ERPObjects.TCustomerVS1, options);
  }

  getNewCustomerByNameOrID(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      orderby: '"PrintName asc"',
      select:'[Companyname] f7like "' +dataSearchName +'" OR [ID] f7like "' +dataSearchName +'"',
    };
    return this.getList(this.ERPObjects.TCustomerVS1, options);
  }

  checkAllowanceByName(earningName) {
    let options = {
      ListType: "Detail",
      select: "[Description]='" + earningName + "'",
    };
    return this.getList(this.ERPObjects.TAllowance, options);
  }

  getAllContactCombineVS1ByName(dataSearchName) {
    let options = "";
    options = {
      //ListType: "Detail",
      //select: '[name] f7like "' + dataSearchName + '"',
      orderby: '"name asc"',
      IgnoreDates:true,
      search: 'name="'+ dataSearchName+ '"',
    };
    return this.getList(this.ERPObjects.TERPCombinedContactsVS1, options);
  }

  getAllContactOverviewVS1ByName(dataSearchName) {
    let options = "";
    if(dataSearchName.toLowerCase().indexOf("supplier") >= 0){
      options = {
        IgnoreDates:true,
        orderby: '"name asc"',
        search: 'issupplier=true',
      };
    }else if(dataSearchName.toLowerCase().indexOf("customer") >= 0){
      options = {
        IgnoreDates:true,
        orderby: '"name asc"',
        search: 'iscustomer=true',
      };
    }else if(dataSearchName.toLowerCase().indexOf("employee") >= 0){
      options = {
        IgnoreDates:true,
        orderby: '"name asc"',
        search: 'isemployee=true',
      };
    }else if(dataSearchName.toLowerCase().indexOf("lead") >= 0){
      options = {
        IgnoreDates:true,
        orderby: '"name asc"',
        search: 'isprospect=true',
      };
    }else{
      if($.isNumeric(dataSearchName)){
        options = {
          IgnoreDates:true,
          orderby: '"name asc"',
          search: 'ID='+ dataSearchName+ ' OR name="' + dataSearchName + '"',
        };
      }else{
        options = {
          IgnoreDates:true,
          orderby: '"name asc"',
          // search: 'email="'+ dataSearchName+ '"',
          search: 'name="' + dataSearchName + '"',
          // search: "name='"+ dataSearchName+ ' OR email=' + dataSearchName + "'",
          // search: 'name="' + dataSearchName + '" OR email="' +  dataSearchName + '"',
          //search: 'name="' + dataSearchName + '" OR street="' + dataSearchName + '" OR suburb="' + dataSearchName + '" OR state="' + dataSearchName + '" OR postcode="' + dataSearchName + '"',
        };
      }

    }
    return this.getList(this.ERPObjects.TERPCombinedContactsVS1, options);
  }

  getAllEmployeesDataVS1ByName(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      orderby: '"EmployeeName asc"',
      //select: '[EmployeeName] f7like "' + dataSearchName + '"',
      Search: 'EmployeeName="' + dataSearchName + '"',
    };
    return this.getList(this.ERPObjects.TEmployeeList, options);
  }

  getAllAccountDataVS1ByName(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      Search: 'AccountName like "%' + dataSearchName + '%"',
    };
    return this.getList(this.ERPObjects.TAccountVS1List, options);
  }

  getAllSuppliersDataVS1ByName(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      orderby: '"PrintName asc"',
      //select: '[ClientName] f7like "' + dataSearchName + '"',
      Search: 'Company = "' + dataSearchName + '"',
    };
    return this.getList(this.ERPObjects.TSupplierVS1List, options);
  }

  getAllSuppliersDataVS1List(limitcount, limitfrom, deleteFilter) {
    let options = "";
    if(deleteFilter == "" || deleteFilter == false || deleteFilter == null || deleteFilter == undefined){
      if (limitcount == "All") {
        options = {
          IgnoreDates:true,
          orderby: '"PrintName asc"',
          Search: "Active = true",
        };
      } else {
        options = {
          IgnoreDates:true,
          orderby: '"PrintName asc"',
          Search: "Active = true",
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }else{
      if (limitcount == "All") {
        options = {
          orderby: '"PrintName asc"',
          IgnoreDates:true,
        };
      } else {
        options = {
          IgnoreDates:true,
          orderby: '"PrintName asc"',
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }

    return this.getList(this.ERPObjects.TSupplierVS1List, options);
  }

  getNewLeadByNameOrID(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      orderby: '"PrintName asc"',
      //select: '[Company] f7like "' + dataSearchName + '"',
      Search: 'Company="' + dataSearchName + '" or Notes="' + dataSearchName + '"'
    };
    return this.getList(this.ERPObjects.TProspectList, options);
  }

  getAllLeadDataList(limitcount, limitfrom, deleteFilter) {
    let options = "";
    if(deleteFilter == "" || deleteFilter == false || deleteFilter == null || deleteFilter == undefined){
      if (limitcount == "All") {
        options = {
          IgnoreDates:true,
          orderby: '"PrintName asc"',
          Search: "Active = true",
        };
      } else {
        options = {
          IgnoreDates:true,
          orderby: '"PrintName asc"',
          Search: "Active = true",
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }else{
      if (limitcount == "All") {
        options = {
          orderby: '"PrintName asc"',
          IgnoreDates:true,
        };
      } else {
        options = {
          IgnoreDates:true,
          orderby: '"PrintName asc"',
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }

    return this.getList(this.ERPObjects.TProspectList, options);
  }

  getSingleTouchPayrollByName(dataSearchName){
    var options = "";
    options = {
      select: '[Earnings] = "' + dataSearchName + '"',
    };
    return this.getList(this.ERPObjects.TProspectList, options);
  }

  getCustomersDataByName(dataSearchName) {
    var options = "";
    options = {
      PropertyList:"ClientName,Email,Abn,Street,Street2,Street3,Suburb,State,Postcode,Country,TermsName,FirstName,LastName,TaxCodeName,ClientTypeName,Discount",
      orderby: '"PrintName asc"',
      select: '[ClientName] = "' + dataSearchName + '"',
    };
    return this.getList(this.ERPObjects.TCustomerVS1, options);
  }

  getClientVS1() {
    let options = {
      PropertyList:"ClientName,Email,Abn,Street,Street2,Street3,Suburb,State,Postcode,Country,TermsName,FirstName,LastName,TaxCodeName,ClientTypeName,Discount,BillStreet,BillStreet2,BillState,BillPostcode,Billcountry",
      orderby: '"PrintName asc"',
      select: "[Active]=true",
    };
    return this.getList(this.ERPObjects.TCustomerVS1, options);
  }

  getAllSuppliersDataVS1(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        orderby: '"PrintName asc"',
        select: "[Active]=true",
      };
    } else {
      options = {
        orderby: '"PrintName asc"',
        ListType: "Detail",
        select: "[Active]=true",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TSupplierVS1, options);
  }
  getAccountListVS1() {
    let options = "";
    //if(limitcount == 'All'){
    options = {
      ListType: "Detail",
      select: "[Active]=true",
    };
    return this.getList(this.ERPObjects.TAccountVS1, options);
  }

  // Alex: add for bank rec {
  getTAccountVS1ListForBankCCard(limitcount, limitfrom, deleteFilter) {
    return this.getAllTAccountVS1List(limitcount, limitfrom, deleteFilter, 'Bank,CCard');
  }
  // @}

  getAllTAccountVS1List(limitcount, limitfrom, deleteFilter, typeFilter = 'all', useReceiptClaim) {
    // Alex: add for bank rec {
    let typeFilterList = typeFilter.split(',');
    // @}
    let options = {};
    if(deleteFilter == "" || deleteFilter == false || deleteFilter == null || deleteFilter == undefined){
      if (limitcount == "All") {
        options = {
          IgnoreDates:true,
          orderby: '"AccountName asc"',
          Search: "Active = true",
        };
      } else {
        options = {
          IgnoreDates:true,
          orderby: '"AccountName asc"',
          Search: "Active = true",
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
      if(typeFilter != 'all') {
        options.Search = options.Search + ` and AccountType IN (${"'" + typeFilterList.join("','") + "'"})`
      }
      if (useReceiptClaim) {
        options.Search = options.Search + ` and AllowExpenseClaim=true`
      }
    } else {
      if (limitcount == "All") {
        options = {
          orderby: '"AccountName asc"',
          IgnoreDates:true,
        };
      } else {
        options = {
          IgnoreDates:true,
          orderby: '"AccountName asc"',
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
      if(typeFilter != 'all') {
        options.Search = `AccountType IN (${"'" + typeFilterList.join("','") + "'"})`
      }
      if (useReceiptClaim) {
        if (options.Search)
          options.Search = options.Search + ` and AllowExpenseClaim=true`
        else
          options.Search = `AllowExpenseClaim=true`
      }
    }

    return this.getList(this.ERPObjects.TAccountVS1List, options);
  }

  getRateListVS1() {
    let options = "";

    options = {
      ListType: "Detail",
    };

    return this.getList(this.ERPObjects.TPayRateType, options);
  }

  getSupgetReimbursementerannuation() {
    let options = "";
    options = {
      ListType: "Detail",
    };
    return this.getList(this.ERPObjects.Treimbursement, options);
  }

  getRateTypeByName(description) {
      let options = "";

      options = {
        select: "[Description]='" + description + "'",
      };

      return this.getList(this.ERPObjects.TPayRateType, options);
  }

  getAllContactCombineVS1(limitcount, limitfrom, deleteFilter) {
    let options = "";
    if(deleteFilter == "" || deleteFilter == false || deleteFilter == null || deleteFilter == undefined){
      if (limitcount == "All") {
        options = {
          IgnoreDates:true,
          orderby: '"name asc"',
          Search: "Active = true",
        };
      } else {
        options = {
          IgnoreDates:true,
          orderby: '"name asc"',
          Search: "Active = true",
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }else{
      if (limitcount == "All") {
        options = {
          orderby: '"name asc"',
          IgnoreDates:true,
        };
      } else {
        options = {
          IgnoreDates:true,
          orderby: '"name asc"',
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }

    return this.getList(this.ERPObjects.TERPCombinedContactsVS1, options);
  }

  getAllTEmployeeList(limitcount, limitfrom, deleteFilter) {
    let options = "";
    if(deleteFilter == "" || deleteFilter == false || deleteFilter == null || deleteFilter == undefined){
      if (limitcount == "All") {
        options = {
          IgnoreDates:true,
          orderby: '"EmployeeName asc"',
          Search: "Active = true",
        };
      } else {
        options = {
          IgnoreDates:true,
          orderby: '"EmployeeName asc"',
          Search: "Active = true",
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }else{
      if (limitcount == "All") {
        options = {
          orderby: '"EmployeeName asc"',
          IgnoreDates:true,
        };
      } else {
        options = {
          IgnoreDates:true,
          orderby: '"EmployeeName asc"',
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }

    return this.getList(this.ERPObjects.TEmployeeList, options);
  }


  getAllTCustomerList(limitcount, limitfrom, deleteFilter) {
    let options = "";
    if(deleteFilter == "" || deleteFilter == false || deleteFilter == null || deleteFilter == undefined){
      if (limitcount == "All") {
        options = {
          IgnoreDates:true,
          orderby: '"PrintName asc"',
          Search: "Active = true",
        };
      } else {
        options = {
          IgnoreDates:true,
          orderby: '"PrintName asc"',
          Search: "Active = true",
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }else{
      if (limitcount == "All") {
        options = {
          orderby: '"PrintName asc"',
          IgnoreDates:true,
        };
      } else {
        options = {
          IgnoreDates:true,
          orderby: '"PrintName asc"',
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }

    return this.getList(this.ERPObjects.TCustomerVS1List, options);
  }

  searchAllCustomersDataVS1ByName(dataSearchName) {
    let options = "";
    options = {
      orderby: '"PrintName asc"',
      Search: 'ClientName f7like "' + dataSearchName + '"',
      // Search: 'Company="' + dataSearchName + '"',
    };
    return this.getList(this.ERPObjects.TCustomerVS1List, options);
  }


  getClientVS1(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        PropertyList:"ClientName,Email,Abn,Street,Street2,Street3,Suburb,State,Postcode,Country,TermsName",
        orderby: '"PrintName asc"',
        select: "[Active]=true",
      };
    } else {
      options = {
        orderby: '"PrintName asc"',
        PropertyList:"ClientName,Email,Abn,Street,Street2,Street3,Suburb,State,Postcode,Country,TermsName",
        select: "[Active]=true",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TCustomerVS1, options);
  }
  getAllEmployees(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        orderby: '"EmployeeName asc"',
        select: "[Active]=true",
      };
    } else {
      options = {
        orderby: '"EmployeeName asc"',
        ListType: "Detail",
        select: "[Active]=true",
      };
    }
    return this.getList(this.ERPObjects.TEmployee, options);
  }

  getAllLeads(limitcount, limitfrom) {
    let options = "";
    if (limitcount === "All") {
      options = {
        ListType: "Detail",
        orderby: '"PrintName asc"',
        select: "[Active]=true"
      };
    } else {
      options = {
        ListType: "Detail",
        select: "[Active]=true",
        orderby: '"PrintName asc"',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TProspect, options);
  }

  getAllLeadsEx(limitcount, limitfrom) {
    let options = "";
    if (limitcount === "All") {
      options = {
        ListType: "Detail",
        orderby: '"PrintName asc"',
        select: "[Active]=true"
      };
    } else {
      options = {
        ListType: "Detail",
        select: "[Active]=true",
        orderby: '"PrintName asc"',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TProspectEx, options);
  }

  getAllTripGroups(limitcount, limitfrom) {
    let options = "";
    if (limitcount === "All") {
      options = {
        ListType: "Detail",
        select: "[Active]=true",
      };
    } else {
      options = {
        ListType: "Detail",
        select: "[Active]=true",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TTripGroup, options);
  }

  getCheckLeadData(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        select: "[Active]=true",
      };
    } else {
      options = {
        ListType: "Detail",
        select: "[Active]=true",
      };
    }
    return this.getList(this.ERPObjects.TLeads, options);
  }

  getAllEmployeesDataVS1(limitcount, limitfrom, deleteFilter) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        orderby: '"EmployeeName asc"',
        select: "[Active]=true",
      };
    } else {
      options = {
        orderby: '"EmployeeName asc"',
        ListType: "Detail",
        select: "[Active]=true",
      };
    }
    return this.getList(this.ERPObjects.TEmployee, options);
  }

  getAllInvoiceListNonBO(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        OrderBy: "SaleID desc",
        PropertyList:"ID,EmployeeName,SaleClassName,SaleDate,CustomerName,TotalAmount,SalesStatus,ShipDate,SalesDescription,CustPONumber,TermsName,TotalTax,TotalAmountInc,TotalPaid,TotalBalance,Comments,Deleted",
      };
    } else {
      options = {
        OrderBy: "SaleID desc",
        PropertyList:"ID,EmployeeName,SaleClassName,SaleDate,CustomerName,TotalAmount,SalesStatus,ShipDate,SalesDescription,CustPONumber,TermsName,TotalTax,TotalAmountInc,TotalPaid,TotalBalance,Comments,Deleted",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }

    return this.getList(this.ERPObjects.TInvoiceNonBackOrder, options);
  }

  getAllSalesOrderList(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        OrderBy: "SaleID desc",
        ListType: "Detail",
        select: "[Deleted]=false",
      };
    } else {
      options = {
        OrderBy: "SaleID desc",
        ListType: "Detail",
        select: "[Deleted]=false",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TSalesOrderEx, options);
  }

  getAllTSalesOrderListData(dateFrom,dateTo,ignoreDate,limitcount,limitfrom, deleteFilter) {
    let options = "";

    if(deleteFilter == undefined || deleteFilter == null || deleteFilter == '' || deleteFilter == false) {
      if (ignoreDate == true) {
        options = {
          IgnoreDates: true,
          OrderBy: "SaleID desc",
          Search: "Deleted != true",
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      } else {
        options = {
          OrderBy: "SaleID desc",
          IgnoreDates: false,
          Search: "Deleted != true",
          DateFrom: '"' + dateFrom + '"',
          DateTo: '"' + dateTo + '"',
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
    } else {
      if (ignoreDate == true) {
        options = {
          IgnoreDates: true,
          OrderBy: "SaleID desc",
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      } else {
        options = {
          OrderBy: "SaleID desc",
          IgnoreDates: false,
          DateFrom: '"' + dateFrom + '"',
          DateTo: '"' + dateTo + '"',
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }
    return this.getList(this.ERPObjects.TSalesOrderList, options);
  }


  getAllTSalesOrderListFilterData(filterData,dateFrom,dateTo,ignoreDate,limitcount,limitfrom) {
    let options = "";

    if (filterData == "true") {
      options = {
        IgnoreDates: true,
        OrderBy: "SaleID desc",
        Search: "Deleted != true and Converted = " + true + "",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    } else {
      options = {
        IgnoreDates: true,
        OrderBy: "SaleID desc",
        Search: "Deleted != true and Converted != true",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TSalesOrderList, options);
  }

  getAllPurchaseOrderList(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        select: "[Deleted]=false",
      };
    } else {
      options = {
        orderby: '"PurchaseOrderID desc"',
        ListType: "Detail",
        select: "[Deleted]=false",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TPurchaseOrderEx, options);
  }

  getAllTPurchaseOrderListData(dateFrom,dateTo,ignoreDate,limitcount,limitfrom, deleteFilter) {
    let options = "";

    if (ignoreDate == true) {
      options = {
        IgnoreDates: true,
        Search: "Deleted != true",
        OrderBy: "PurchaseOrderID desc",
        IncludeBO: false,
        IncludeShipped: true,
        IncludeLines: false,
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    } else {
      options = {
        OrderBy: "PurchaseOrderID desc",
        IgnoreDates: false,
        Search: "Deleted != true",
        IncludeBO: false,
        IncludeShipped: true,
        IncludeLines: false,
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    if(deleteFilter)
      options.Search = "";
    return this.getList(this.ERPObjects.TPurchaseOrderList, options);
  }

  getPurchaseOrderListBySupplierName(supplierName) {
    let options = "";
    options = {
      IgnoreDates: true,
      Search: "Deleted != true and SupplierName f7like '" + supplierName + "'",
      OrderBy: "PurchaseOrderID desc",
      IncludeBO: false,
      IncludeShipped: true,
      IncludeLines: false,
    }
    return this.getList(this.ERPObjects.TPurchaseOrderList, options);
  }

  getAllChequeList(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        select: "[Deleted]=false",
      };
    } else {
      options = {
        orderby: '"PurchaseOrderID desc"',
        ListType: "Detail",
        select: "[Deleted]=false",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }

    return this.getList(this.ERPObjects.TChequeEx, options);
  }

  getAllChequeListData(dateFrom, dateTo, ignoreDate, limitcount, limitfrom, deleteFilter) {
    let options = "";

    if (ignoreDate == true) {
      options = {
        IgnoreDates: true,
        OrderBy: "PurchaseOrderID desc",
        Search: "Deleted != true",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    } else {
      options = {
        IgnoreDates: false,
        OrderBy: "PurchaseOrderID desc",
        Search: "Deleted != true",
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    if(deleteFilter) options.Search = "";
    return this.getList(this.ERPObjects.TChequeList, options);
  }

  getChequeListDataByName(dataSearchName) {
    let options = "";

    options = {
      OrderBy: "PurchaseOrderID desc",
      IgnoreDates: true,
      IsDetailReport: false,
      Search: 'Account = "' + dataSearchName + '"',
    };

    return this.getList(this.ERPObjects.TChequeList, options);
  }

  getAllPurchaseOrderListAll(dateFrom,dateTo,ignoreDate,limitcount,limitfrom) {
    let options = "";

    if (ignoreDate == true) {
      options = {
        IgnoreDates: true,
        IncludePOs: true,
        IncludeBills: true,
        OrderBy: "PurchaseOrderID desc",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    } else {
      options = {
        IgnoreDates: false,
        IncludePOs: true,
        IncludeBills: true,
        OrderBy: "PurchaseOrderID desc",
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TbillReport, options);
  }

  getAllPurchasesList(dateFrom, dateTo, ignoreDate, limitcount, limitfrom) {
    let options = "";

    if (ignoreDate == true) {
      options = {
        IgnoreDates: true,
        OrderBy: "OrderDate desc",
        IsPO: true,
        IsBill: true,
        IsCredit: true,
        IsCheque: false,
        IsRA: false,
        Search: "Deleted != true and IsCheque != true",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    } else {
      options = {
        OrderBy: "OrderDate desc",
        IsPO: true,
        IsBill: true,
        IsCredit: true,
        IsCheque: false,
        IsRA: false,
        Search: "Deleted != true and IsCheque != true",
        IgnoreDates: false,
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TBillList, options);
  }

  getTBillListDataByName(dataSearchName) {
    let options = "";
    if(dataSearchName.toLowerCase().indexOf("bill") >= 0){
      options = {
        IgnoreDates:true,
        OrderBy: "OrderDate desc",
        IsPO: false,
        IsBill: true,
        IsCredit: false,
        IsCheque: false,
        IsRA: false,
      };
    }else if(dataSearchName.toLowerCase().indexOf("credit") >= 0){
      options = {
        IgnoreDates:true,
        OrderBy: "OrderDate desc",
        IsPO: false,
        IsBill: false,
        IsCredit: true,
        IsCheque: false,
        IsRA: false,
      };
    }else if(dataSearchName.toLowerCase().indexOf("po") >= 0){
      options = {
        IgnoreDates:true,
        OrderBy: "OrderDate desc",
        IsPO: true,
        IsBill: false,
        IsCredit: false,
        IsCheque: false,
        IsRA: false,
      };
    }else if(dataSearchName.toLowerCase().indexOf("cheque") >= 0){
      options = {
        IgnoreDates:true,
        OrderBy: "OrderDate desc",
        IsPO: false,
        IsBill: false,
        IsCredit: false,
        IsCheque: true,
        IsRA: false,
      };
    }else if(dataSearchName.toLowerCase().indexOf("check") >= 0){
      options = {
        IgnoreDates:true,
        OrderBy: "OrderDate desc",
        IsPO: false,
        IsBill: false,
        IsCredit: false,
        IsCheque: true,
        IsRA: false,
      };
    }else{
    options = {
      IgnoreDates: true,
      OrderBy: "OrderDate desc",
      IsPO: true,
      IsBill: true,
      IsCredit: true,
      IsCheque: false,
      IsRA: false,
      // Search: 'PurchaseOrderID f7like "' + dataSearchName + '" OR SupplierName f7like "' + dataSearchName + '"',
      Search: "Deleted != true and IsCheque != true and (SupplierName like '%" + dataSearchName + "%')",
    };
   }
    return this.getList(this.ERPObjects.TBillList, options);
  }

  getAllAwaitingSupplierPayment(dateFrom,dateTo,ignoreDate,limitcount,limitfrom, deleteFilter) {
    let options = "";
    if (ignoreDate == true) {
      options = {
        IgnoreDates: true,
        IncludePOs: true,
        IncludeBills: true,
        IsDetailReport: false,
        Paid: false,
        Unpaid: true,
        OrderBy: "PurchaseOrderID desc",
        LimitCount: parseInt(limitcount),
        LimitFrom: parseInt(limitfrom),
        Search: "Deleted != true",
      };
    } else {
      options = {
        IgnoreDates: false,
        IncludePOs: true,
        IncludeBills: true,
        IsDetailReport: false,
        Paid: false,
        Unpaid: true,
        OrderBy: "PurchaseOrderID desc",
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
        LimitCount: parseInt(limitcount),
        LimitFrom: parseInt(limitfrom),
        Search: "Deleted != true",
      };
    }
    if(deleteFilter) options.Search = "";
    return this.getList(this.ERPObjects.TbillReport, options);
  }

  getAllAwaitingSupplierPaymentBySupplierName(supplierName) {
    let options = "";
    options = {
      IgnoreDates: true,
      IncludePOs: true,
      IncludeBills: true,
      IsDetailReport: false,
      Paid: false,
      Unpaid: true,
      OrderBy: "PurchaseOrderID desc",
      Search: 'PrintName = "' + supplierName + '"',
    };
    return this.getList(this.ERPObjects.TbillReport, options);
  }


  getAllAwaitingSupplierPaymentBySupplierNameOrID(supplierData) {
    let options = "";
    options = {
      IgnoreDates: true,
      IncludePOs: true,
      IncludeBills: true,
      IsDetailReport: false,
      Paid: false,
      Unpaid: true,
      OrderBy: "PurchaseOrderID desc",
      Search: 'PrintName like "' + supplierData + '" OR InvoiceNumber = "' + supplierData + '" OR Comments like "' + supplierData + '"',
    };
    return this.getList(this.ERPObjects.TbillReport, options);
  }

  getAllAwaitingCustomerPaymentByCustomerName(customerName) {
    let options = "";
    options = {
      IgnoreDates: true,
      IncludeIsInvoice: true,
      IncludeIsQuote: false,
      IncludeIsRefund: false,
      IncludeISSalesOrder: false,
      IsDetailReport: false,
      Paid: false,
      Unpaid: true,
      OrderBy: "SaleID desc",
      Search: 'CustomerName = "' + customerName + '"',
    };
    return this.getList(this.ERPObjects.TSalesList, options);
  }

  getAllAwaitingCustomerPaymentByEmployeeName(employeeName) {
    let options = "";
    options = {
      IgnoreDates: true,
      IncludeIsInvoice: true,
      IncludeIsQuote: false,
      IncludeIsRefund: false,
      IncludeISSalesOrder: false,
      IsDetailReport: false,
      Paid: false,
      Unpaid: true,
      OrderBy: "SaleID desc",
      Search: 'Deleted != true and employeeName = "' + employeeName + '"',
    };
    return this.getList(this.ERPObjects.TSalesList, options);
  }

  getAllAwaitingCustomerPaymentByCustomerNameOrID(customerData) {
    let options = "";
    options = {
      IgnoreDates: true,
      IncludeIsInvoice: true,
      IncludeIsQuote: false,
      IncludeIsRefund: false,
      IncludeISSalesOrder: false,
      IsDetailReport: false,
      Paid: false,
      Unpaid: true,
      OrderBy: "SaleID desc",
      Search: 'CustomerName like "' + customerData + '" OR SaleId = "' + customerData + '"',
      // select: '[CodeName] f7like "' + dataSearchName + '" and [Active]=true',
    };
    return this.getList(this.ERPObjects.TSalesList, options);
  }
  getAllOverDueAwaitingSupplierPayment(currentDate, limitcount, limitfrom) {
    let options = "";
    if (currentDate == "PO") {
      options = {
        IgnoreDates: true,
        IncludePOs: true,
        IncludeBills: false,
        IncludeCredits: false,
        IsDetailReport: false,
        Paid: false,
        Unpaid: true,
        OrderBy: "PurchaseOrderID desc",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    } else if (currentDate == "Bill") {
      options = {
        IgnoreDates: true,
        IncludePOs: false,
        IncludeBills: true,
        IncludeCredits: false,
        IsDetailReport: false,
        Paid: false,
        Unpaid: true,
        OrderBy: "PurchaseOrderID desc",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    } else {
      options = {
        IgnoreDates: true,
        IncludePOs: true,
        IncludeBills: true,
        IsDetailReport: false,
        Paid: false,
        Unpaid: true,
        OrderBy: "PurchaseOrderID desc",
        Search: 'DueDate < "' + currentDate + '"',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TbillReport, options);
  }

  getAllOverDueAwaitingSupplierPaymentOver(dateFrom,dateTo,ignoreDate,limitcount,limitfrom) {
    let options = "";
    if (ignoreDate == true) {
      options = {
        IgnoreDates: true,
        IncludePOs: true,
        IncludeBills: true,
        IsDetailReport: false,
        Paid: false,
        Unpaid: true,
        OrderBy: "PurchaseOrderID desc",
        Search: 'DueDate < "' + dateTo + '"',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    } else {
      options = {
        IgnoreDates: false,
        IncludePOs: true,
        IncludeBills: true,
        IsDetailReport: false,
        Paid: false,
        Unpaid: true,
        OrderBy: "PurchaseOrderID desc",
        Search: 'DueDate < "' + dateTo + '"',
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TbillReport, options);
  }

  getAllAwaitingCustomerPayment(dateFrom,dateTo,ignoreDate,limitcount,limitfrom, deleteFilter, contactID) {
    let options = "";
    if(contactID != '' && contactID != undefined && contactID != true){
      options = {
        IgnoreDates: true,
        IncludeIsInvoice: true,
        IncludeIsQuote: false,
        IncludeIsRefund: true,
        IncludeISSalesOrder: false,
        IsDetailReport: false,
        Paid: false,
        Unpaid: true,
        Search: "Deleted != true",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
        Search: "ClientId = "+contactID,
        OrderBy: "SaleDate desc"
      };
    }else{
    if (ignoreDate == true) {
      options = {
        IgnoreDates: true,
        IncludeIsInvoice: true,
        IncludeIsQuote: false,
        IncludeIsRefund: true,
        IncludeISSalesOrder: false,
        IsDetailReport: false,
        Paid: false,
        Unpaid: true,
        Search: "Deleted != true",
        OrderBy: "SaleDate desc",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    } else {
      options = {
        IgnoreDates: false,
        IncludeIsInvoice: true,
        IncludeIsQuote: false,
        IncludeIsRefund: true,
        IncludeISSalesOrder: false,
        IsDetailReport: false,
        Paid: false,
        Unpaid: true,
        OrderBy: "SaleDate desc",
        Search: "Deleted != true",
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    }
    if(deleteFilter) options.Search = '';
    return this.getList(this.ERPObjects.TSalesList, options);
  }

  getAllOverDueAwaitingCustomerPayment(dateFrom,dateTo,ignoreDate,limitcount,limitfrom) {
    let options = "";
    if (ignoreDate == true) {
      options = {
        IgnoreDates: true,
        IncludeIsInvoice: true,
        IncludeIsQuote: false,
        IncludeIsRefund: true,
        IncludeISSalesOrder: false,
        IsDetailReport: false,
        Paid: false,
        Unpaid: true,
        // Search: "Balance != 0",
        OrderBy: "SaleID desc",
        Search: 'dueDate < "' + dateTo + '" and Balance != 0',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    } else {
      options = {
        IgnoreDates: false,
        IncludeIsInvoice: true,
        IncludeIsQuote: false,
        IncludeIsRefund: true,
        IncludeISSalesOrder: false,
        IsDetailReport: false,
        Paid: false,
        Unpaid: true,
        // Search: "Balance != 0",
        OrderBy: "SaleID desc",
        Search: 'dueDate < "' + dateTo + '" and Balance != 0',
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TSalesList, options);
  }

  // getAllOverDueAwaitingCustomerPaymentByCustomerNameOrID(dateTo,customerData) {
  getAllOverDueAwaitingCustomerPaymentByCustomerNameOrID(customerData) {
    let options = "";
    options = {
      IgnoreDates: true,
      IncludeIsInvoice: true,
      IncludeIsQuote: false,
      IncludeIsRefund: false,
      IncludeISSalesOrder: false,
      IsDetailReport: false,
      Paid: false,
      Unpaid: true,
      OrderBy: "SaleID desc",
      // Search: 'dueDate < "' + dateTo + '" and Balance != 0',
      // Search: 'dueDate < "' + dateTo + '" and Balance != 0 and CustomerName like "' + customerData + '" OR SaleId = "' + customerData + '"',
      Search: 'Balance != 0 and CustomerName like "' + customerData + '" OR SaleId = "' + customerData + '"',
    };
    return this.getList(this.ERPObjects.TSalesList, options);
  }

  getAllBillExList(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        select: "[Deleted]=false and [Cancelled]=false",
      };
    } else {
      options = {
        orderby: '"PurchaseOrderID desc"',
        ListType: "Detail",
        select: "[Deleted]=false and [Cancelled]=false",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }

    return this.getList(this.ERPObjects.TBillEx, options);
  }

  getAllBillListData(dateFrom, dateTo, ignoreDate, limitcount, limitfrom, deleteFilter) {
    let options = "";

    if (ignoreDate == true) {
      options = {
        IgnoreDates: true,
        IsBill: true,
        OrderBy: "OrderDate desc",
        Search: "Deleted != true and IsBill = true and IsCheque != true",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    } else {
      options = {
        OrderBy: "OrderDate desc",
        IsBill: true,
        Search: "Deleted != true and IsBill = true and IsCheque != true",
        IgnoreDates: false,
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    if(deleteFilter) options.Search = "IsBill = true and IsCheque != true";
    return this.getList(this.ERPObjects.TBillList, options);
  }

  getAllQuoteList(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        OrderBy: "SaleID desc",
        ListType: "Detail",
        select: "[Deleted]=false",
      };
    } else {
      options = {
        OrderBy: "SaleID desc",
        ListType: "Detail",
        select: "[Deleted]=false",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TQuoteEx, options);
  }

  getAllTQuoteListData(dateFrom, dateTo, ignoreDate, limitcount, limitfrom, deleteFilter) {
    let options = "";

    if (ignoreDate == true) {
      options = {
        IgnoreDates: true,
        Search: "Deleted != true",
        OrderBy: "SaleID desc",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    } else {
      options = {
        OrderBy: "SaleID desc",
        IgnoreDates: false,
        Search: "Deleted != true",
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    if(deleteFilter)
      options.Search = "";
    return this.getList(this.ERPObjects.TQuoteList, options);
  }

  getQuoteListByCustomerName(customerName) {
    let options = "";

    options = {
      IgnoreDates: true,
      Search: "Deleted != true and CustomerName = '" + customerName + "'",
      OrderBy: "SaleID desc",
    }
    return this.getList(this.ERPObjects.TQuoteList, options);
  }

  getAllTQuoteListFilterData(filterData,dateFrom,dateTo,ignoreDate,limitcount,limitfrom) {
    let options = "";

    if (filterData == "true") {
      options = {
        IgnoreDates: true,
        OrderBy: "SaleID desc",
        Search: "Deleted != true and Converted = " + true + "",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    } else {
      options = {
        IgnoreDates: true,
        OrderBy: "SaleID desc",
        Search: "Deleted != true and Converted != true",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TQuoteList, options);
  }

  getAllCreditList(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        select: "[Deleted]=false",
      };
    } else {
      options = {
        orderby: '"PurchaseOrderID desc"',
        ListType: "Detail",
        select: "[Deleted]=false",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TCredit, options);
  }

  getTCreditListData(dateFrom, dateTo, ignoreDate, limitcount, limitfrom, deleteFilter) {
    let options = "";
    if (ignoreDate == true) {
      options = {
        OrderBy: "OrderDate desc",
        Search: "Deleted != true",
        IgnoreDates: true,
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    } else {
      options = {
        OrderBy: "OrderDate desc",
        Search: "Deleted != true",
        IgnoreDates: false,
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    if(deleteFilter) options.Search = '';
    return this.getList(this.ERPObjects.TCreditList, options);
  }

  getTCreditListByName(dataSearchName) {
    let options = "";

    options = {
      OrderBy: "OrderDate desc",
      IgnoreDates: true,
      IsDetailReport: false,
      Search: 'SupplierName = "' + dataSearchName + '" OR PurchaseOrderID = "' + dataSearchName + '"',
    };

    return this.getList(this.ERPObjects.TCreditList, options);
  }

  getTAppointmentListData(dateFrom, dateTo, ignoreDate, limitcount, limitfrom, deleteFilter) {
    let options = "";
    let seeOwnAppointments =
        localStorage.getItem("CloudAppointmentSeeOwnAppointmentsOnly") || false;
    let loggedEmpID = localStorage.getItem("mySessionEmployeeLoggedID") || 0;
    if(deleteFilter == true) {
      if (seeOwnAppointments == true) {
        //Check Access Level
        if (ignoreDate == true) {
          options = {
            OrderBy: "CreationDate desc",
            IgnoreDates: true,
            IsDetailReport: false,
            LimitCount: parseInt(limitcount) || initialReportLoad,
            LimitFrom: parseInt(limitfrom) || 0,
            Search: "TrainerID = " + loggedEmpID + "",
          };
        } else {
          options = {
            OrderBy: "CreationDate desc",
            IgnoreDates: false,
            IsDetailReport: false,
            DateFrom: '"' + dateFrom + '"',
            DateTo: '"' + dateTo + '"',
            LimitCount: parseInt(limitcount) || initialReportLoad,
            LimitFrom: parseInt(limitfrom) || 0,
            Search: "TrainerID = " + loggedEmpID + "",
          };
        }
      } else {
        if (ignoreDate == true) {
          options = {
            OrderBy: "CreationDate desc",
            IgnoreDates: true,
            IsDetailReport: false,
            LimitCount: parseInt(limitcount) || initialReportLoad,
            LimitFrom: parseInt(limitfrom) || 0,
          };
        } else {
          options = {
            OrderBy: "CreationDate desc",
            IgnoreDates: false,
            IsDetailReport: false,
            DateFrom: '"' + dateFrom + '"',
            DateTo: '"' + dateTo + '"',
            LimitCount: parseInt(limitcount) || initialReportLoad,
            LimitFrom: parseInt(limitfrom) || 0,
          };
        }
      }
    }
    else {
      if (seeOwnAppointments == true) {
        //Check Access Level
        if (ignoreDate == true) {
          options = {
            OrderBy: "CreationDate desc",
            IgnoreDates: true,
            IsDetailReport: false,
            LimitCount: parseInt(limitcount)||initialReportLoad,
            LimitFrom: parseInt(limitfrom)||0,
            Search: "TrainerID = " + loggedEmpID + "and Active = true",
          };
        } else {
          options = {
            OrderBy: "CreationDate desc",
            IgnoreDates: false,
            IsDetailReport: false,
            DateFrom: '"' + dateFrom + '"',
            DateTo: '"' + dateTo + '"',
            LimitCount: parseInt(limitcount)||initialReportLoad,
            LimitFrom: parseInt(limitfrom)||0,
            Search: "TrainerID = " + loggedEmpID + "and Active = true",
          };
        }
      } else {
        if (ignoreDate == true) {
          options = {
            OrderBy: "CreationDate desc",
            IgnoreDates: true,
            IsDetailReport: false,
            LimitCount: parseInt(limitcount)||initialReportLoad,
            LimitFrom: parseInt(limitfrom)||0,
            Search: "Active = true",
          };
        } else {
          options = {
            OrderBy: "CreationDate desc",
            IgnoreDates: false,
            IsDetailReport: false,
            DateFrom: '"' + dateFrom + '"',
            DateTo: '"' + dateTo + '"',
            LimitCount: parseInt(limitcount)||initialReportLoad,
            LimitFrom: parseInt(limitfrom)||0,
            Search: "Active = true",
          };
        }
      }
    }
   return this.getList(this.ERPObjects.TAppointmentList, options);
  }

  getTAppointmentListDataByName(dataSearchName) {
    let options = "";
    let seeOwnAppointments = localStorage.getItem("CloudAppointmentSeeOwnAppointmentsOnly") || false;
    let loggedEmpID = localStorage.getItem("mySessionEmployeeLoggedID") || 0;
    if (seeOwnAppointments == true) {
      options = {
        OrderBy: "CreationDate desc",
        IgnoreDates: true,
        IsDetailReport: false,
        Search: 'AppointID = "' + dataSearchName + '" OR ClientName = "' + dataSearchName + '" OR EnteredByEmployeeName = "' + dataSearchName + '"',
      };

    }else{
      options = {
        OrderBy: "CreationDate desc",
        IgnoreDates: true,
        IsDetailReport: false,
        Search: 'AppointID = "' + dataSearchName + '" OR ClientName = "' + dataSearchName + '" OR EnteredByEmployeeName = "' + dataSearchName + '"',
      };
    }
    return this.getList(this.ERPObjects.TAppointmentList, options);
  }

  getTCorrespondenceListDataByName(dataSearchName) {
    let options = "";

      options = {
          OrderBy: "Ref_Type asc",
          IgnoreDates: true,
          IsDetailReport: false,
          Search: 'Ref_Type = "' + dataSearchName + '" OR MessageAsString = "' + dataSearchName + '"',
      };

    return this.getList(this.ERPObjects.TCorrespondence, options);
  }

  getTJournalEntryListData(dateFrom,dateTo,ignoreDate,limitcount,limitfrom,deleteFilter) {
    let options = "";
    if (ignoreDate == true) {
      options = {
        OrderBy: "TransactionDate desc",
        IgnoreDates: true,
        Search: "Deleted != true",
        IsDetailReport: true,
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    } else {
      options = {
        OrderBy: "TransactionDate desc",
        IgnoreDates: false,
        Search: "Deleted != true",
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }

    if(deleteFilter) options.Search = "";
    return this.getList(this.ERPObjects.TJournalEntryList, options);
  }

  searchTJournalEntryListData(dataSearchName) {
    let options = "";
    options = {
      orderby: "TransactionDate desc",
      IgnoreDates:true,
      search: 'AccountName='+ dataSearchName+ ' OR ClassName="' + dataSearchName + '" OR GJID="' + dataSearchName + '" OR Memo="' + dataSearchName + '"',
    };
    return this.getList(this.ERPObjects.TJournalEntryList, options);
  }


  getSalesListData(dateFrom, dateTo, ignoreDate, limitcount, limitfrom, deleteFilter) {
    let options = "";
    if(deleteFilter == "" || deleteFilter == false || deleteFilter == null || deleteFilter == undefined){
    if (ignoreDate == true) {
      options = {
        OrderBy: "SaleID desc",
        IgnoreDates: true,
        Search: "Deleted != true",
        IncludeIsInvoice: true,
        IncludeIsQuote: true,
        IncludeIsRefund: true,
        IncludeISSalesOrder: true,
        IsDetailReport: false,
        Paid: true,
        Unpaid: true,
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    } else {
      options = {
        OrderBy: "SaleID desc",
        IgnoreDates: false,
        Search: "Deleted != true",
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
        IsDetailReport: false,
        IncludeIsInvoice: true,
        IncludeIsQuote: true,
        IncludeIsRefund: true,
        IncludeISSalesOrder: true,
        Paid: true,
        Unpaid: true,
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    }else{
      if (ignoreDate == true) {
        options = {
          OrderBy: "SaleDate desc",
          IgnoreDates: true,
          Search: "",
          IncludeIsInvoice: true,
          IncludeIsQuote: true,
          IncludeIsRefund: true,
          IncludeISSalesOrder: true,
          IsDetailReport: false,
          Paid: true,
          Unpaid: true,
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      } else {
        options = {
          OrderBy: "SaleDate desc",
          IgnoreDates: false,
          Search: "",
          DateFrom: '"' + dateFrom + '"',
          DateTo: '"' + dateTo + '"',
          IsDetailReport: false,
          IncludeIsInvoice: true,
          IncludeIsQuote: true,
          IncludeIsRefund: true,
          IncludeISSalesOrder: true,
          Paid: true,
          Unpaid: true,
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }

    return this.getList(this.ERPObjects.TSalesList, options);
  }

  getAllJournalEnrtryLinesList(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        select: "[Deleted]=false",
      };
    } else {
      options = {
        orderby: '"GJID desc"',
        ListType: "Detail",
        select: "[Deleted]=false",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TJournalEntry, options);
  }

  getAllStockAdjustEntry(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        select: "[Deleted]=false",
      };
    } else {
      options = {
        orderby: '"StockAdjustEntryID desc"',
        ListType: "Detail",
        select: "[Deleted]=false",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TStockAdjustEntry, options);
  }

  getAllStockAdjustEntryList(dateFrom, dateTo, ignoreDate, limitcount, limitfrom, deleteFilter) {
    let options = "";

    if (ignoreDate == true) {
      options = {
        IgnoreDates: true,
        Search: "Deleted != true",
        OrderBy: "StockAdjustEntryID desc",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    } else {
      options = {
        OrderBy: "StockAdjustEntryID desc",
        IgnoreDates: false,
        Search: "Deleted != true",
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    if(deleteFilter)
      options.Search = "";
    return this.getList(this.ERPObjects.TStockTransferEntryList, options);
  }

  getAllStockAdjustEntryByName(dataName) {
    let options = "";
    if(dataName && dataName != ""){
      options = {
        ListType : "Detail",
        select : "[Employee]  like '%" + dataName + "%' OR [AccountName] like '%" + dataName + "%'",
      }
    }
    else{
      options = {
        orderby: '"StockAdjustEntryID desc"',
        ListType : "Detail",
        select : "[Deleted]=false",
      }
    }
    return this.getList(this.ERPObjects.TStockAdjustEntry, options);
  }

  getAllSerialNumber() {
    let options = "";
    options = {};
    return this.getList(
      this.ERPObjects.TSerialNumberListCurrentReport,
      options
    );
  }

  getAllStockTransferEntryList(dateFrom, dateTo, ignoreDate, limitcount, limitfrom, deleteFilter) {
    let options = {};
    if (ignoreDate == true) {
      options = {
        IgnoreDates: true,
        Search: "Deleted != true",
        OrderBy: "TransferEntryID desc",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    } else {
      options = {
        OrderBy: "TransferEntryID desc",
        IgnoreDates: false,
        Search: "Deleted != true",
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    if(deleteFilter) {
      options.Search = "";
    }
    return this.getList(this.ERPObjects.TStockTransferEntryList, options);
  }

  getAllStockTransferEntry(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        select: "[Deleted]=false",
      };
    } else {
      options = {
        orderby: '"TransferEntryID desc"',
        ListType: "Detail",
        select: "[Deleted]=false",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TStockTransferEntry, options);
  }

  getAllStockTransferEntryByName(dataName) {
    let options = "";
    if(dataName && dataName != ""){
      options = {
        ListType : "Detail",
        // select : "[Deleted]=false AND [EmployeeName] like '%" + dataName + "%' OR [Accountname] like '%" + dataName + "%'",
        Search: "Deleted = false and EmployeeName='"+dataName+"' or Accountname='"+dataName+"'"
      }
    }
    else{
      options = {
        orderby: '"TransferEntryID desc"',
        ListType : "Detail",
        select : "[Deleted]=false",
      }
    }
    return this.getList(this.ERPObjects.TStockTransferEntryList, options);
  }

  getAllInvoiceList(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        OrderBy: "SaleID desc",
        ListType: "Detail",
        select: "[Deleted]=false",
      };
    } else {
      options = {
        OrderBy: "SaleID desc",
        ListType: "Detail",
        select: "[Deleted]=false",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TInvoiceEx, options);
  }

  getAllTInvoiceListData(dateFrom, dateTo, ignoreDate, limitcount, limitfrom, deleteFilter) {
    let options = "";

    if (ignoreDate == true) {
      options = {
        IgnoreDates: true,
        Search: "Deleted != true",
        OrderBy: "SaleID desc",
        IncludeBo: false,
        IncludeShipped: true,
        IncludeLines: false,
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    } else {
      options = {
        OrderBy: "SaleID desc",
        IgnoreDates: false,
        Search: "Deleted != true",
        IncludeBo: false,
        IncludeShipped: true,
        IncludeLines: false,
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    if(deleteFilter) options.Search = "";
    return this.getList(this.ERPObjects.TInvoiceList, options);
  }
  // Rasheed Speed Here
  getNewProductListVS1Update(msTimeStamp) {
    let options = {
      ListType: "Detail",
      select: '[Active]=true and [MsTimeStamp]>"' + msTimeStamp + '"',
    };
    return this.getList(this.ERPObjects.TProductVS1, options);
  }

  getTARReport(dateFrom, dateTo, ignoreDate) {
    let options = "";
    if (ignoreDate == true) {
      options = {
        IgnoreDates: true,
        select: "[deleted]=false",
      };
    } else {
      options = {
        IgnoreDates: false,
        select: "[deleted]=false",
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
        LimitCount: parseInt(initialReportLoad),
      };
    }
    return this.getList(this.ERPObjects.TARReport, options);
  }

  getTAPReport(dateFrom, dateTo, ignoreDate, limitCount, limitFrom) {
    let options = "";
    if(limitCount == undefined || limitCount == 'All') {
      if (ignoreDate == true) {
        options = {
          IgnoreDates: true,
          select: "[deleted]=false",
          OrderBy: "OrderDate desc"
        };
      } else {
        options = {
          IgnoreDates: false,
          select: "[deleted]=false",
          DateFrom: '"' + dateFrom + '"',
          DateTo: '"' + dateTo + '"',
          LimitCount: parseInt(initialReportLoad),
          OrderBy: "OrderDate desc"
        };
      }
    } else {
      if (ignoreDate == true) {
        options = {
          IgnoreDates: true,
          select: "[deleted]=false",
          LimitCount: limitCount,
          LimitFrom:limitFrom,
          OrderBy: "OrderDate desc"
        };
      } else {
        options = {
          IgnoreDates: false,
          select: "[deleted]=false",
          DateFrom: '"' + dateFrom + '"',
          DateTo: '"' + dateTo + '"',
          LimitCount: limitCount,
          LimitFrom: limitFrom,
          OrderBy: "OrderDate desc"
        };
      }
    }
    return this.getList(this.ERPObjects.TAPReport, options);
  }

  getTAPReportPage(limitCount, limitFrom, dateFrom, dateTo, ignoreDate,contactID) {
    let options = "";
    if(limitCount == undefined || limitCount == 'All') {
      if(contactID && contactID != ''){
        options = {
          IgnoreDates: true,
          ClientID:contactID,
          AgeByTransactionDate:true,
          OrderBy: "OrderDate desc"
        };
      }else{
        if (ignoreDate == true) {
          options = {
            IgnoreDates: true,
            AgeByTransactionDate:true,
            OrderBy: "OrderDate desc"
          };
        } else {
          options = {
            IgnoreDates: false,
            DateFrom: '"' + dateFrom + '"',
            DateTo: '"' + dateTo + '"',
            LimitCount: parseInt(initialReportLoad),
            AgeByTransactionDate:true,
            OrderBy: "OrderDate desc"
          };
        }
      }
    } else {
      if(contactID && contactID != ''){
        options = {
          IgnoreDates: true,
          ClientID:contactID,
          AgeByTransactionDate:true,
          LimitCount: limitCount,
          LimitFrom: limitFrom,
          OrderBy: "OrderDate desc"
        };
      }else{
        if (ignoreDate == true) {
          options = {
            IgnoreDates: true,
            AgeByTransactionDate:true,
            LimitCount: limitCount,
            LimitFrom: limitFrom,
            OrderBy: "OrderDate desc"
          };
        } else {
          options = {
            IgnoreDates: false,
            DateFrom: '"' + dateFrom + '"',
            DateTo: '"' + dateTo + '"',
            AgeByTransactionDate:true,
            LimitCount: limitCount,
            LimitFrom: limitFrom,
            OrderBy: "OrderDate desc"
          };
        }
      }
    }
    return this.getList(this.ERPObjects.TAPReport, options);
  }

  getTAPReportByKeyword(limitCount, limitFrom, dateFrom, dateTo, ignoreDate, name) {
    let options = "";
    if(limitCount == undefined || limitCount == 'All') {
        if (ignoreDate == true) {
          options = {
            IgnoreDates: true,
            AgeByTransactionDate:true,
            Search:"Name='"+name+"'",
            OrderBy: "OrderDate desc"
          };
        } else {
          options = {
            IgnoreDates: false,
            DateFrom: '"' + dateFrom + '"',
            DateTo: '"' + dateTo + '"',
            LimitCount: parseInt(initialReportLoad),
            AgeByTransactionDate:true,
            Search:"Name='"+name+"'",
            OrderBy: "OrderDate desc"
          };
        }
    } else {
        options = {
          IgnoreDates: true,
          Search:"Name='"+name+"'",
          AgeByTransactionDate:true,
          LimitCount: limitCount,
          LimitFrom: limitFrom,
          OrderBy: "OrderDate desc"
        };
    }
    return this.getList(this.ERPObjects.TAPReport, options);
  }

  getAgedPayableDetailsSummaryData(dateFrom, dateTo, ignoreDate,contactID) {
    let options = "";
    if(contactID && contactID != ''){
      options = {
        IgnoreDates: true,
        ReportType: "Summary",
        ClientID:contactID
      };
    }else{

    if (ignoreDate == true) {
      options = {
        IgnoreDates: true,
        ReportType: "Summary",
      };
    } else {
      options = {
        IgnoreDates: false,
        ReportType: "Summary",
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
      };
    }
  }
    return this.getList(this.ERPObjects.TAPReport, options);
  }

  getAgedReceivableDetailsSummaryData(dateFrom, dateTo, ignoreDate, contactID) {
    let options = "";
    if(contactID != ''){
      options = {
        IgnoreDates: true,
        ReportType: "Summary",
        ClientID:contactID,
        IncludeRefunds:false
      };
    }else{
    if (ignoreDate == true) {
      options = {
        IgnoreDates: true,
        ReportType: "Summary",
        IncludeRefunds:false
      };
    } else {
      options = {
        IgnoreDates: false,
        ReportType: "Summary",
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
        IncludeRefunds:false
      };
    }
    }
    return this.getList(this.ERPObjects.TARReport, options);
  }

  getTAPReportByName(contactName) {
    let options = "";
    options = {
      IgnoreDates: true,
      Search: 'Name = "' + contactName + '"',
    };

    return this.getList(this.ERPObjects.TAPReport, options);
  }
  getTTransactionListReport(msTimeStamp) {
    let options = "";
    if (msTimeStamp) {
      options = {
        IgnoreDates: true,
        Listtype: 1,
        FilterIndex: 2,
        ClientID:msTimeStamp,
        OrderBy: "DATE desc",
        LimitCount: parseInt(initialReportLoad),
      };
    } else {
      options = {
        IgnoreDates: true,
        Listtype: 1,
        FilterIndex: 2,
        OrderBy: "DATE desc",
        LimitCount: parseInt(initialReportLoad),
      };
    }
    return this.getList(this.ERPObjects.TTransactionListReport, options);
  }
  getTProjectTasks(msTimeStamp) {
    let options = "";

      options = {
        ListType: "Detail",
        select: "pt.Active=true",
        // LimitCount: initialReportLoad
      };
    return this.getList(this.ERPObjects.Tprojecttasks, options);
  }

  getAllAppointmentList(limitcount, limitfrom) {
    let options = "";
    let checkOwnAppointment = localStorage.getItem("CloudAppointmentSeeOwnAppointmentsOnly");
    let selectedEmployeeName = localStorage.getItem("mySessionEmployee");

    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        select: "[Active]=true",
        //Search: "Active=true",
      };
    } else {
      options = {
        // orderby: '"AppointID desc"',
        OrderBy: "CreationDate desc",
        ListType: "Detail",
        select: "[Active]=true",
        //Search: "Active=true",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    //if(deletefilter) options.Search = "";
    //return this.getList(this.ERPObjects.TAppointmentList, options);
    return this.getList(this.ERPObjects.TAppointment, options);
  }

  getAllCorrespondenceList(limitcount, limitfrom) {
    let options = "";

    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        select: "[Active]=true",
      };
    } else {
      options = {
        // orderby: '"AppointID desc"',
        OrderBy: "Ref_Type asc",
        ListType: "Detail",
        select: "[Active]=true",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }

    return this.getList(this.ERPObjects.TCorrespondence, options);
  }

  getAllAppointmentPredList(data) {
    let options = {
      PropertyList:"ID,EmployeeID,ShowApptDurationin,ShowSaturdayinApptCalendar,ShowSundayinApptCalendar,ApptStartTime,ApptEndtime,DefaultApptDuration,DefaultServiceProductID,DefaultServiceProduct",
    };
    return this.getList(this.ERPObjects.TAppointmentPreferences, options);
  }

  getAllCustomersDataVS1Update(msTimeStamp) {
    let options = {
      ListType: "Detail",
      orderby: '"PrintName asc"',
      select: '[Active]=true and [MsTimeStamp]>"' + msTimeStamp + '"',
    };
    return this.getList(this.ERPObjects.TCustomerVS1, options);
  }

  getAllSuppliersDataVS1Update(msTimeStamp) {
    let options = {
      ListType: "Detail",
      select: '[Active]=true and [MsTimeStamp]>"' + msTimeStamp + '"',
    };
    return this.getList(this.ERPObjects.TSupplierVS1, options);
  }

  getAccountListVS1Update(msTimeStamp) {
    let options = {
      ListType: "Detail",
      select: '[Active]=true and [MsTimeStamp]>"' + msTimeStamp + '"',
    };
    return this.getList(this.ERPObjects.TAccountVS1, options);
  }

  getUOMVS1() {
    let options = {
      ListType: "Detail",
      select: '[Active]=true ',
    };
    return this.getList(this.ERPObjects.TUnitOfMeasure, options);
  }

  getUOMVS1ByName(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      // select: '[UOMName] f7like "' + dataSearchName + '" and [Active]=true',
      Search: "Active = true and UnitName='"+dataSearchName+"' or UnitDescription='"+dataSearchName+"'"
    };
    return this.getList(this.ERPObjects.TUnitOfMeasureList, options);
  }

  getUOMDataList(limitcount, limitfrom, deleteFilter) {
    let options = "";
    if(deleteFilter == "" || deleteFilter == false || deleteFilter == null || deleteFilter == undefined){
      if (limitcount == "All") {
        options = {
            ListType: "Detail",
            //orderby: '"UOMName asc"',
            Search: "Active = true",
        };
      } else {
        options = {
          //orderby: '"UOMName asc"',
          ListType: "Detail",
          Search: "Active = true",
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }else{
      if (limitcount == "All") {
        options = {
            ListType: "Detail",
            //orderby: '"UOMName asc"',
        };
      } else {
        options = {
            //orderby: '"UOMName asc"',
            ListType: "Detail",
            LimitCount: parseInt(limitcount)||initialReportLoad,
            LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }

    return this.getList(this.ERPObjects.TUnitOfMeasureList, options);
  }

  getTaxRateVS1() {
    let options = {
      // PropertyList:"ID,CodeName,Description,LocationCategoryDesc,Rate,RegionName,Active",
      ListType: "Detail",
      select: "[Active]=true",
    };
    let that = this;
    let promise = new Promise(function(resolve, reject) {
      that.getList(that.ERPObjects.TTaxcodeVS1, options).then(function (data) {
        let ttaxcodevs1 = data.ttaxcodevs1.map((v) => {
          let fields = v.fields;
          let lines = fields.Lines;
          if (lines !== null) {
            if (Array.isArray(lines)) {     // if lines is array
              lines = lines.map((line) => {
                let f = line.fields;
                return {
                  ...{Id: f.ID},
                  ...f,
                }
              })
            }
            else if (typeof lines === 'object') {     // else if it is object
              lines = [
                {
                  ...{Id: lines.fields.ID},
                  ...lines.fields
                }
              ];
            }
          }
          return {
            ...{ Id: fields.ID },
            ...fields,
            ...{ Lines: lines }
          }
        });
        resolve({ ttaxcodevs1 });
      }).catch(function (err) {
        reject(err);
      })
    });
    return promise;
  }

  getTaxRateVS1ByName(dataSearchName) {
    let options = "";
    options = {
      PropertyList:"ID,CodeName,Description,LocationCategoryDesc,Rate,RegionName,Active",
      select: '[CodeName] f7like "' + dataSearchName + '" and [Active]=true',
    };
    return this.getList(this.ERPObjects.TTaxcodeVS1, options);
  }

  getShippingMethodByName(dataSearchName) {
    let options = "";
    options = {
      PropertyList: "ID,ShippingMethod",
      select: '[ShippingMethod] f7like "' + dataSearchName + '"',
    };
    return this.getList(this.ERPObjects.TShippingMethod, options);
  }

  getDepartment() {
    let options = {
      PropertyList:"ID,GlobalRef,KeyValue,DeptClassGroup,DeptClassName,Description,SiteCode,Active",
      select: "[Active]=true",
    };
    return this.getList(this.ERPObjects.TDeptClass, options);
  }

  getDepartmentDataList(limitcount, limitfrom, deleteFilter) {
    let options = "";
    if(deleteFilter == "" || deleteFilter == false || deleteFilter == null || deleteFilter == undefined){
      if (limitcount == "All") {
        options = {
            ListType: "Detail",
            orderby: '"Description asc"',
            Search: "Active = true",
        };
      } else {
        options = {
          orderby: '"Description asc"',
          ListType: "Detail",
          Search: "Active = true",
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }else{
      if (limitcount == "All") {
        options = {
            ListType: "Detail",
            orderby: '"Description asc"',
        };
      } else {
        options = {
            orderby: '"Description asc"',
            ListType: "Detail",
            LimitCount: parseInt(limitcount)||initialReportLoad,
            LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }

    return this.getList(this.ERPObjects.TDeptClassList, options);
  }

  getDepartmentDataListByName(dataSearchName) {
    let options = "";

    options = {
      OrderBy: "Description desc",
      IgnoreDates: true,
      IsDetailReport: false,
      Search: 'DeptClassName = "' + dataSearchName + '" OR Description = "' + dataSearchName + '"',
    };

    return this.getList(this.ERPObjects.TDeptClassList, options);
  }

  getTripGroup(limitfrom, limitcount, deleteFilter) {
    let options = {
      PropertyList:"ID,TripName,Description,Active",
      select: "[Active]=true",
    };
    if(deleteFilter) options.select = "";
    return this.getList(this.ERPObjects.TTripGroup, options);
  }

  getTripGroupByName(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      select: '[TripName] f7like "' + dataSearchName + '"',
    };
    return this.getList(this.ERPObjects.TTripGroup, options);
  }

  getReceiptCategory() {
    let options = {
      PropertyList:"ID,CategoryName,CategoryDesc,Active",
      select: "[Active]=true",
    };
    return this.getList(this.ERPObjects.TReceiptCategory, options);
  }

  getReceiptCategoryByName(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      select: '[CategoryName] f7like "' + dataSearchName + '"',
    };
    return this.getList(this.ERPObjects.TReceiptCategory, options);
  }

  getAccountantCategory() {
    let options = {
      PropertyList:"ID,FirstName,LastName,CompanyName,Address,DocName,TownCity,PostalZip,StateRegion,Country,Active",
      select: "[Active]=true",
    };
    return this.getList(this.ERPObjects.TReportsAccountantsCategory, options);
  }

  getTermsVS1() {
    let options = {
      PropertyList:"ID,Days,IsEOM,IsEOMPlus,TermsName,Description,IsDays,Active,isPurchasedefault,isSalesdefault",
      select: "[Active]=true",
    };
    return this.getList(this.ERPObjects.TTermsVS1, options);
  }

  getTermsDataList(limitcount, limitfrom, deleteFilter) {
    let options = "";
    if(deleteFilter == "" || deleteFilter == false || deleteFilter == null || deleteFilter == undefined){
      if (limitcount == "All") {
        options = {
            ListType: "Detail",
            orderby: '"Description asc"',
            Search: "Active = true",
        };
      } else {
        options = {
          orderby: '"Description asc"',
          ListType: "Detail",
          Search: "Active = true",
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }else{
      if (limitcount == "All") {
        options = {
            ListType: "Detail",
            orderby: '"Description asc"',
        };
      } else {
        options = {
            orderby: '"Description asc"',
            ListType: "Detail",
            LimitCount: parseInt(limitcount)||initialReportLoad,
            LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }

    return this.getList(this.ERPObjects.TTermsVS1List, options);
  }

  getOneTermsByTermName(keyword) {
    let options={
      ListType:'Detail',
      //select:"[Terms] f7like '"+keyword+"'",
      Search: "Active = true and Terms='"+keyword+"' or Description='"+keyword+"' or TermsID='"+keyword+"'",
    }
    return this.getList(this.ERPObjects.TTermsVS1List, options);
  }



  getDefaultCustomerTerms() {
    let options = {
      PropertyList:"ID,TermsName",
      select: "[Active]=true",
      // select: "[isSalesdefault]=true",
    };
    return this.getList(this.ERPObjects.TTermsVS1, options);
  }

  getDefaultSupplierTerms() {
    let options = {
      PropertyList:"ID,TermsName",
      select: "[Active]=true",
      // select: "[isPurchasedefault]=true",
    };
    return this.getList(this.ERPObjects.TTermsVS1, options);
  }

  getAllowance(limitcount, limitfrom, deleteFilter = false) {
    let options = "";
    if (deleteFilter == true) {
      if (limitcount == "All") {
        options = {
          ListType: "Detail",
        };
      } else {
        options = {
          ListType: "Detail",
        };
      }
    } else {
      if (limitcount == "All") {
        options = {
          ListType: "Detail",
          select: "[Active]=true",
        };
      } else {
        options = {
          ListType: "Detail",
          select: "[Active]=true",
        };
      }
    }
    return this.getList(this.ERPObjects.TAllowance, options);
  }

  getReimbursement(limitcount, limitfrom, deleteFilter = false) {
    let options = "";
    if (deleteFilter == true) {
      if (limitcount == "All") {
        options = {
          ListType: "Detail",
        };
      } else {
        options = {
          ListType: "Detail",
        };
      }
    } else {
      if (limitcount == "All") {
        options = {
          ListType: "Detail",
          select: "[ReimbursementActive]=true",
        };
      } else {
        options = {
          ListType: "Detail",
          select: "[ReimbursementActive]=true",
        };
      }
    }
    return this.getList(this.ERPObjects.TReimbursement, options);
  }

  getordinaryEarningByName(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
      };
    } else {
      options = {
        ListType: "Detail",
      };
    }
    return this.getList(this.ERPObjects.TOrdinaryTimeEarnings, options);
  }


  getvs1superannuationBonusesCommissions(limitcount, limitfrom)
  {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
      };
    } else {
      options = {
        ListType: "Detail",

      };
    }
    return this.getList(this.ERPObjects.TEarningsBonusesCommissions, options);

  }
  getDeduction(limitcount, limitfrom, deleteFilter = false) {
    let options = "";
    if (deleteFilter == true) {
      if (limitcount == "All") {
        options = {
          ListType: "Detail",
        };
      } else {
        options = {
          ListType: "Detail",
        };
      }
    } else {
      if (limitcount == "All") {
        options = {
          ListType: "Detail",
          select: "[Active]=true",
        };
      } else {
        options = {
          ListType: "Detail",
          select: "[Active]=true",
        };
      }
    }
    return this.getList(this.ERPObjects.TDeduction, options);
  }

  getAllEmployeePaySettings(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        //select: '[Active]=true'
      };
    } else {
      options = {
        ListType: "Detail",
        //select: '[Active]=true',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TEmployeepaysettings, options);
  }

  getAllLeadStatus() {
    let options = {
      PropertyList: "ID,TypeCode,TypeName,Name,Description,IsDefault,EQPM",
      select: "[Active]=true",
    };
    return this.getList(this.ERPObjects.TLeadStatusType, options);
  }

  getLeadStatusByName(keyword) {
    let options = {
      // PropertyList: "ID,TypeCode,TypeName,Name,Description,IsDefault,EQPM",
      // select: "[Active]=true and [TypeName]='"+keyword+"'",
      ListType:'Detail',
      Search: "Active = true and TypeName='"+keyword+"' or Description='"+keyword+"'",
    }
    return this.getList(this.ERPObjects.TLeadStatusTypeList, options);
  }

  getLeadStatusDataList(limitcount, limitfrom, deleteFilter) {
    let options = "";
    if(deleteFilter == "" || deleteFilter == false || deleteFilter == null || deleteFilter == undefined){
      if (limitcount == "All") {
        options = {
            ListType: "Detail",
            orderby: '"Name asc"',
            Search: "Active = true",
        };
      } else {
        options = {
          orderby: '"Name asc"',
          ListType: "Detail",
          Search: "Active = true",
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }else{
      if (limitcount == "All") {
        options = {
            ListType: "Detail",
            orderby: '"Name asc"',
        };
      } else {
        options = {
            orderby: '"Name asc"',
            ListType: "Detail",
            LimitCount: parseInt(limitcount)||initialReportLoad,
            LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }

    return this.getList(this.ERPObjects.TLeadStatusTypeList, options);
  }

  getShippingMethodData() {
    let options = {
      PropertyList: "ID,ShippingMethod",
      select: "[Active]=true",
    };
    return this.getList(this.ERPObjects.TShippingMethod, options);
  }


  getShippingMethodList(limitcount, limitfrom, deleteFilter) {
    let options = "";
    if(deleteFilter == "" || deleteFilter == false || deleteFilter == null || deleteFilter == undefined){
      if (limitcount == "All") {
        options = {
            PropertyList: "ID,ShippingMethod",
            Search: "Active = true",
        };
      } else {
        options = {
          PropertyList: "ID,ShippingMethod",
          Search: "Active = true",
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }else{
      if (limitcount == "All") {
        options = {
            PropertyList: "ID,ShippingMethod",
        };
      } else {
        options = {
            PropertyList: "ID,ShippingMethod",
            LimitCount: parseInt(limitcount)||initialReportLoad,
            LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }

    return this.getList(this.ERPObjects.TShippingMethod, options);
  }

  getOneShippingMethod(keyword) {
    let options = {
      PropertyList: "ID,ShippingMethod",
      select: "[Active]=true and [ShippingMethod] f7like '"+ keyword + "'",
    };
    return this.getList(this.ERPObjects.TShippingMethod, options);
  }

  // getCurrencies() {
  //
  //   var today = new Date();
  //   var dd = String(today.getDate()).padStart(2, '0');
  //   var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  //   var yyyy = today.getFullYear();
  //   today = dd+'/'+mm+'/'+ yyyy;
  //   let msTimeStamp = yyyy+'-'+mm+'-'+dd+' 00:00:00';
  //   let options = {
  //     PropertyList: "ID, Code, CurrencyDesc, Currency, BuyRate, SellRate,Active, CurrencySymbol,Country,RateLastModified",
  //     select: "[Active]=true AND [MsTimeStamp]>'"+msTimeStamp+"'",
  //     ListType: "Detail"
  //   };
  //   return this.getList(this.ERPObjects.TCurrency, options);
  // }

  getCurrencies() {
    let options = {
      ListType: "Detail",
      //select: "[Active]=true",
      Search: "Active=true",
    };
    return this.getList(this.ERPObjects.TCurrencyList, options);
  }

  getCurrencyDataList(limitcount, limitfrom, deleteFilter) {
    let options = "";
    if(deleteFilter == "" || deleteFilter == false || deleteFilter == null || deleteFilter == undefined){
      if (limitcount == "All") {
        options = {
            ListType: "Detail",
            orderby: '"Currency asc"',
            Search: "Active = true",
        };
      } else {
        options = {
          orderby: '"Currency asc"',
          ListType: "Detail",
          Search: "Active = true",
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }else{
      if (limitcount == "All") {
        options = {
            ListType: "Detail",
            orderby: '"Currency asc"',
        };
      } else {
        options = {
            orderby: '"Currency asc"',
            ListType: "Detail",
            LimitCount: parseInt(limitcount)||initialReportLoad,
            LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }

    return this.getList(this.ERPObjects.TCurrencyList, options);
  }

  getAccountTypesToAddNew() {
    let options = {
      PropertyList: "AccountTypeName,Description,OriginalDescription",
    };
    return this.getList(this.ERPObjects.TAccountType, options);
  }

  getAllEmployeesUpdate(msTimeStamp) {
    let options = {
      ListType: "Detail",
      orderby: '"EmployeeName asc"',
      select: '[Active]=true and [MsTimeStamp]>"' + msTimeStamp + '"',
    };
    return this.getList(this.ERPObjects.TEmployee, options);
  }

  getAccountTypes() {
    let options = {
      PropertyList: "ID,AccountName,AccountTypeName,TaxCode,AccountNumber,Description",
      select: "[Active]=true",
    };
    return this.getList(this.ERPObjects.TAccount, options);
  }

  getAllJournalEnrtryLinesListUpdate() {
    let options = {
      ListType: "Detail",
      select: "[Deleted]=false",
    };
    return this.getList(this.ERPObjects.TJournalEntry, options);
  }

  getAllTVS1BankDepositData(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        select: "[Deleted]=false",
      };
    } else {
      options = {
        orderby: '"DepositID desc"',
        ListType: "Detail",
        select: "[Deleted]=false",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TVS1BankDeposit, options);
  }

  getAllTBankDepositListData(dateFrom, dateTo, ignoreDate, limitcount, limitfrom, deleteFilter) {
    let options = "";
    if (ignoreDate == true) {
      options = {
        IgnoreDates: true,
        Search: "Deleted != true",
        OrderBy: "DepositDate desc",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    } else {
      options = {
        //IgnoreDates: true,
        OrderBy: "DepositDate desc",
        Search: "Deleted != true",
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    if(deleteFilter) options.Search = "";
    return this.getList(this.ERPObjects.TBankDepositList, options);
  }

  getAllTBankDepositListByName(dataSearchName) {
    let options = "";
    options = {
      OrderBy: "DepositDate desc",
      IgnoreDates: true,
      IsDetailReport: false,
      Search: 'AccountName f7like "' + dataSearchName + '" OR DepositClassName f7like "' + dataSearchName + '"',
    };

    return this.getList(this.ERPObjects.TBankDepositList, options);
  }

  getAllBankAccountDetails(dateFrom,dateTo,ignoreDate,limitcount,limitfrom, isDeleted) {
    let dateDivide = dateFrom.split("/");
    if(dateDivide.length > 1)
      dateFrom = dateDivide[2] + '-' + dateDivide[1] + '-' + dateDivide[0];
    dateDivide = dateTo.split("/");
    if(dateDivide.length > 1)
      dateTo = dateDivide[2] + '-' + dateDivide[1] + '-' + dateDivide[0];

    let options = "";
    if(isDeleted == "" || isDeleted == false || isDeleted == null || isDeleted == undefined){
    if (ignoreDate == true) {
      options = {
        IgnoreDates: true,
        //IncludedataPriorToClosingDate:true,
        Search: "Active != true",
        OrderBy: "Date desc",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    } else {
      options = {
        IgnoreDates: false,
        //IncludedataPriorToClosingDate:true,
        Search: "Active != true",
        OrderBy: "Date desc",
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    }else{
      if (ignoreDate == true) {
        options = {
          IgnoreDates: true,
          //IncludedataPriorToClosingDate:true,
          Search: "",
          OrderBy: "Date desc",
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      } else {
        options = {
          IgnoreDates: false,
          //IncludedataPriorToClosingDate:true,
          Search: "",
          OrderBy: "Date desc",
          DateFrom: '"' + dateFrom + '"',
          DateTo: '"' + dateTo + '"',
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }
    return this.getList(this.ERPObjects.TBankAccountReport, options);
  }

  searchAllBankAccountDetails(dataSearchName) {
    let options = "";
    options = {
      orderby: '"name asc"',
      IgnoreDates:true,
      search: 'AccountName='+ dataSearchName+ ' OR Type="' + dataSearchName + '" OR TransID="' + dataSearchName + '" OR ClassName="' + dataSearchName + '" OR Notes="' + dataSearchName + '"',
    };
    return this.getList(this.ERPObjects.TBankAccountReport, options);
  }

  getAllInvoiceListUpdate(msTimeStamp) {
    let options = {
      OrderBy: "SaleID desc",
      ListType: "Detail",
      select: '[Deleted]=false and [MsTimeStamp]>"' + msTimeStamp + '"',
    };
    return this.getList(this.ERPObjects.TInvoiceEx, options);
  }

  getAllBOInvoiceList(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        FilterString: "SaleType='Invoice'",
        select: "[Deleted]=false",
      };
    } else {
      options = {
        OrderBy: "SaleID desc",
        FilterString: "SaleType='Invoice'",
        select: "[Deleted]=false",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.BackOrderSalesList, options);
  }

  getAllBackOrderInvoiceList(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        OrderBy: "SaleID desc",
        ListType: "Detail",
        // select: '[Deleted]=false'
      };
    } else {
      options = {
        OrderBy: "SaleID desc",
        ListType: "Detail",
        // select: '[Deleted]=false',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TInvoiceBackOrder, options);
  }

  getAllTSalesBackOrderReportData(dateFrom,dateTo,ignoreDate,limitcount,limitfrom) {
    let options = "";

    if (ignoreDate == true) {
      options = {
        IgnoreDates: true,
        Search: "Deleted != true",
        OrderBy: "SaleID desc",
        IncludeBo: true,
        IncludeShipped: false,
        IncludeLines: true,
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    } else {
      options = {
        OrderBy: "SaleID desc",
        IgnoreDates: false,
        Search: "Deleted != true",
        IncludeBo: true,
        IncludeShipped: false,
        IncludeLines: true,
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TInvoiceList, options);
  }

  getAllPurchaseOrderListNonBo() {
    let options = {
      PropertyList:"ID,EmployeeName,SaleClassName,OrderDate,SupplierName,TotalAmount,OrderStatus,ShipDate,SalesDescription,CustPONumber,TermsName,TotalTax,TotalAmountInc,TotalPaid,TotalBalance,Comments,Deleted",
    };
    return this.getList(this.ERPObjects.TpurchaseOrderNonBackOrder, options);
  }

  getAllPurchaseOrderListBO(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        PropertyList:"ID,EmployeeName,SaleClassName,OrderDate,SupplierName,TotalAmount,OrderStatus,ShipDate,SalesDescription,CustPONumber,TermsName,TotalTax,TotalAmountInc,TotalPaid,TotalBalance,Comments,Deleted",
        select: "[Deleted]=false",
      };
    } else {
      options = {
        orderby: '"PurchaseOrderID desc"',
        PropertyList:"ID,EmployeeName,SaleClassName,OrderDate,SupplierName,TotalAmount,OrderStatus,ShipDate,SalesDescription,CustPONumber,TermsName,TotalTax,TotalAmountInc,TotalPaid,TotalBalance,Comments,Deleted",
        select: "[Deleted]=false",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TpurchaseOrderBackOrder, options);
  }

  getAllTPurchasesBackOrderReportData(dateFrom,dateTo,ignoreDate,limitcount,limitfrom, deleteFilter) {
    let options = "";

    if (ignoreDate == true) {
      options = {
        IgnoreDates: true,
        Search: "Deleted != true",
        OrderBy: "PurchaseOrderID desc",
        IncludeBo: true,
        IncludeShipped: false,
        IncludeLines: true,
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    } else {
      options = {
        OrderBy: "PurchaseOrderID desc",
        IgnoreDates: false,
        Search: "Deleted != true",
        IncludeBo: true,
        IncludeShipped: false,
        IncludeLines: true,
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
      if(deleteFilter)
        options.Search = "";
    }
    return this.getList(this.ERPObjects.TPurchaseOrderList, options);
  }

  getAllTPurchasesBackOrderReportDataBySupplierName(supplierName) {
    let options = "";
    options = {
      IgnoreDates: true,
      Search: "Deleted != true and SupplierName f7like '" + supplierName + "'",
      OrderBy: "PurchaseOrderID desc",
      IncludeBo: true,
      IncludeShipped: false,
      IncludeLines: true,
    }
    return this.getList(this.ERPObjects.TPurchaseOrderList, options);
  }

  getAllReconcilationList(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        select: "[Deleted]=false",
      };
    } else {
      options = {
        orderby: '"ReconciliationID desc"',
        ListType: "Detail",
        select: "[Deleted]=false",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TReconciliation, options);
  }

    getAllTReconcilationListDataForBankAccountChart(limitfrom,limitcount, deleteFilter) {
        let options = "";

        options = {
            IgnoreDates: true,
            // OrderBy: "ReconciliationID desc",
            OrderBy: "ReconciliationDate desc",
            LimitCount: parseInt(limitcount)||initialReportLoad,
            LimitFrom: parseInt(limitfrom)||0,
            Search: "Deleted != true",
        };

        if(deleteFilter) options.Search = "";
        return this.getList(this.ERPObjects.TReconciliationList, options);
    }
    getAllTReconcilationByNameForBankAccountChart(accountName) {
        let options = {
            ListType: "Detail",
            Search: 'AccountName="' + accountName + '"',
            // IgnoreDates: false,
            // AccountName: accountName,
            // DateFrom: '"' + dateFrom + '"',
            // DateTo: '"' + dateTo + '"'
        };
        return this.getList(this.ERPObjects.TReconciliationList, options);
    }

  getAllTReconcilationListData(dateFrom, dateTo, ignoreDate, limitCount, limitFrom, deleteFilter) {
    let options = "";

    if (ignoreDate == true) {
      options = {
        IgnoreDates: true,
        OrderBy: "ReconciliationID desc",
        Search: "Deleted != true",
        LimitCount: parseInt(limitCount)||initialReportLoad,
        LimitFrom: parseInt(limitFrom)||0,
      };
    } else {
      options = {
        IgnoreDates: false,
        OrderBy: "ReconciliationID desc",
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
        LimitCount: parseInt(limitCount)||initialReportLoad,
        LimitFrom: parseInt(limitFrom)||0,
        Search: "Deleted != true",
      };
    }
    if(deleteFilter) options.Search = "";
    return this.getList(this.ERPObjects.TReconciliationList, options);
  }

  getAllTReconcilationByName(accountName) {
    let options = {
      ListType: "Detail",
      Search: "Deleted!=true and AccountName='" + accountName + "'",
    };
    return this.getList(this.ERPObjects.TReconciliationList, options);
  }
  getAllTReconcilationList(dateFrom, dateTo) {
    let options = {
      IgnoreDates: false,
      DateFrom: '"' + dateFrom + '"',
      DateTo: '"' + dateTo + '"',
      Search: "Deleted != true",
    };
    return this.getList(this.ERPObjects.TReconciliationList, options);
  }
  getAllBankRuleList() {
    let options = {
      IgnoreDates: true,
      OrderBy: "ID desc",
      Search: "Active != false",
    };
    return this.getList(this.ERPObjects.TBankRuleList, options);
  }

  getProductStocknSaleReportData(dateFrom, dateTo) {
    let options = {
      IgnoreDates: false,
      DateFrom: '"' + dateFrom + '"',
      DateTo: '"' + dateTo + '"',
      LimitCount: parseInt(initialReportLoad),
    };

    return this.getList(
      this.ERPObjects.TProductStocknSalePeriodReport,
      options
    );
  }

  getCurrentLoggedUser() {
    let options = {
      PropertyList:"ID,DatabaseName,UserName,MultiLogon,EmployeeID,FirstName,LastName,LastTime",
    };
    return this.getList(this.ERPObjects.TAppUser, options);
  }

  getAllBillList() {
    let options = {
      PropertyList:"ID,EmployeeName,AccountName,SaleClassName,OrderDate,SupplierName,TotalAmount,OrderStatus,ShipDate,SalesDescription,CustPONumber,TermsName,TotalTax,TotalAmountInc,TotalPaid,TotalBalance,Comments",
      select: "[Deleted]=false and [Cancelled]=false",
    };
    return this.getList(this.ERPObjects.TBill, options);
  }

  getAllSalesOrderListNonBO() {
    let options = {
      PropertyList:"ID,EmployeeName,SaleClassName,SaleDate,CustomerName,TotalAmount,SalesStatus,ShipDate,SalesDescription,CustPONumber,TermsName,SaleCustField1,SaleCustField2,TotalTax,TotalAmountInc,TotalPaid,TotalBalance,Comments,Deleted",
    };
    return this.getList(this.ERPObjects.TsalesOrderNonBackOrder, options);
  }

  getCountry() {
    return this.GET(this.erpGet.ERPCountries);
  }

  getPaymentMethodDataVS1() {
    let options = {
      ListType: "Detail",
      select: "[Active]=true",
    };
    return this.getList(this.ERPObjects.TPaymentMethodVS1, options);
  }

  getPaymentMethodDataList(limitcount, limitfrom, deleteFilter) {
    let options = "";
    if(deleteFilter == "" || deleteFilter == false || deleteFilter == null || deleteFilter == undefined){
      if (limitcount == "All") {
        options = {
            ListType: "Detail",
            orderby: '"Name asc"',
            Search: "Active = true",
        };
      } else {
        options = {
          orderby: '"Name asc"',
          ListType: "Detail",
          Search: "Active = true",
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }else{
      if (limitcount == "All") {
        options = {
            ListType: "Detail",
            orderby: '"Name asc"',
        };
      } else {
        options = {
            orderby: '"Name asc"',
            ListType: "Detail",
            LimitCount: parseInt(limitcount)||initialReportLoad,
            LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }

    return this.getList(this.ERPObjects.TPaymentMethodList, options);
  }

  getPaymentMethodVS1() {
    let options = {
      ListType: "Detail",
      select: "[Active]=true",
    };
    return this.getList(this.ERPObjects.TPaymentMethodVS1, options);
  }

  getPaymentMethodVS1ByName(dataSearchName) {
    let options = "";
    options = {
      PropertyList: "ID,IsCreditCard,PaymentMethodName,Active",
      select: '[PaymentMethodName] f7like "' + dataSearchName + '"',
    };
    return this.getList(this.ERPObjects.TPaymentMethodVS1, options);
  }

  getClientTypeDataByName(dataSearchName) {
    let options = "";
    options = {
      PropertyList: "ID,TypeDescription,TypeName,Active",
      select: '[TypeName] f7like "' + dataSearchName + '"',
    };
    return this.getList(this.ERPObjects.TClientType, options);
  }

  getClientTypeData() {
    let options = {
      ListType: "Detail",
      select: "[Active]=true",
    };
    return this.getList(this.ERPObjects.TClientType, options);
  }

  getClientTypeDataList(limitcount, limitfrom, deleteFilter) {
    let options = {};
    if(deleteFilter == "" || deleteFilter == false || deleteFilter == null || deleteFilter == undefined){
      if (limitcount == "All") {
        options = {
            ListType: "Detail",
            orderby: '"TypeDescription asc"',
            Search: "Active=true",
        };
      } else {
        options = {
          orderby: '"TypeDescription asc"',
          ListType: "Detail",
          Search: "Active=true",
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }else{
      if (limitcount == "All") {
        options = {
            ListType: "Detail",
            orderby: '"TypeDescription asc"',
        };
      } else {
        options = {
            orderby: '"TypeDescription asc"',
            ListType: "Detail",
            LimitCount: parseInt(limitcount)||initialReportLoad,
            LimitFrom: parseInt(limitfrom)||0,
        };
      }
    }

    return this.getList(this.ERPObjects.TClientTypeList, options);
  }
  getAllCustomerStatementData(dateFrom, dateTo, ignoreDate, limitcount, limitfrom, deleteFilter) {
    let options;

    if (ignoreDate) {
      options = {
        IgnoreDates: true,
        LimitCount: parseInt(limitcount) || initialReportLoad,
        LimitFrom: parseInt(limitfrom) || 0,
        OrderBy: "ClientName asc",
        Search: "Deleted != true",
      };
    } else {
      options = {
        IgnoreDates: false,
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
        LimitCount: parseInt(limitcount) || initialReportLoad,
        LimitFrom: parseInt(limitfrom) || 0,
        OrderBy: "ClientName asc",
        Search: "Deleted != true",
      };
    }
    if(deleteFilter) options.Search = "";

    return this.getList(this.ERPObjects.TStatementList, options);
  }

  getGlobalSettings() {
    let options = {
      PropertyList: "PrefName,Fieldvalue",
      select:'[PrefName]="DefaultServiceProduct" or [PrefName]="DefaultServiceProductID" or [PrefName]="DefaultApptDuration" or [PrefName]="ApptStartTime" or [PrefName]="ApptEndtime" or [PrefName]="ShowSaturdayinApptCalendar" or [PrefName]="ShowSundayinApptCalendar" or [PrefName]="ShowApptDurationin" or [PrefName]="RoundApptDurationTo" or [PrefName]="MinimumChargeAppointmentTime" or [PrefName]="VS1SMSID" or [PrefName]="VS1SMSToken" or [PrefName]="VS1SMSPhone" or [PrefName]="VS1SAVESMSMSG" or [PrefName]="VS1STARTSMSMSG" or [PrefName]="VS1STOPSMSMSG"',
    };
    return this.getList(this.ERPObjects.TERPPreference, options);
  }

  getGlobalSettingsExtra() {
    let options = {
      PropertyList: "ID,Prefname,fieldValue",
    };
    return this.getList(this.ERPObjects.TERPPreferenceExtra, options);
  }

  getGlobalSearchReport(searchName, limitcount, limitfrom) {
    let options = {
      SearchName: "'" + searchName + "'",
      QuerySearchMode: "'smSearchEngineLike'",
      LimitCount: parseInt(limitcount)||initialReportLoad,
      LimitFrom: parseInt(limitfrom)||0,
    };
    return this.getList(this.ERPObjects.TGlobalSearchReport, options);
  }

  getOneSupplierDataExByName(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      select: '[ClientName]="' + dataSearchName + '"',
    };
    return this.getList(this.ERPObjects.TSupplier, options);
  }

  getOneCustomerDataExByName(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      select: '[ClientName]="' + dataSearchName + '"',
    };
    return this.getList(this.ERPObjects.TCustomer, options);
  }

  getOneProductdatavs1byname(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      select: '[ProductName]="' + dataSearchName + '"',
    };
    return this.getList(this.ERPObjects.TProduct, options);
  }

  getAllTimeSheetList(limitCount, limitFrom, deleteFilter = false) {
    let options = {
      ListType: "Detail",
      select: "[Active]=true",
      OrderBy: "TimeSheetDate desc",
      LimitCount: parseInt(limitCount)||initialReportLoad,
      LimitFrom: parseInt(limitFrom)||0,
    };
    if(deleteFilter)
      options.select = "";
    return this.getList(this.ERPObjects.TTimeSheet, options);
  }

  getAllTimeSheetListByEmployeeName(EmployeeName) {
    let options = {
      ListType: "Detail",
      select: "[Active]=true AND [EmployeeName] f7like '"+ EmployeeName +"'",
      OrderBy: "TimeSheetDate desc",
    };
    return this.getList(this.ERPObjects.TTimeSheet, options);
  }

  getNewChequeByNameOrID(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      //select: '[ID] f7like "'+dataSearchName+'"'
      select:'[ClientName] f7like "' +dataSearchName +'" OR [ID] f7like "' +dataSearchName +'" OR [GLAccountName] f7like "' +dataSearchName +'" OR [SupplierInvoiceNumber] f7like "' +dataSearchName +'"',
    };
    return this.getList(this.ERPObjects.TChequeEx, options);
  }

  getAllRefundList(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        OrderBy: "SaleID desc",
        ListType: "Detail",
        select: "[Deleted]=false",
      };
    } else {
      options = {
        OrderBy: "SaleID desc",
        ListType: "Detail",
        select: "[Deleted]=false",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    return this.getList(this.ERPObjects.TRefundSale, options);
  }

  getAllTRefundSaleListData(dateFrom,dateTo,ignoreDate,limitcount,limitfrom, deleteFilter) {
    let options = "";

    if (ignoreDate == true) {
      options = {
        IgnoreDates: true,
        Search: "Deleted != true",
        OrderBy: "SaleID desc",
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    } else {
      options = {
        OrderBy: "SaleID desc",
        IgnoreDates: false,
        Search: "Deleted != true",
        DateFrom: '"' + dateFrom + '"',
        DateTo: '"' + dateTo + '"',
        LimitCount: parseInt(limitcount)||initialReportLoad,
        LimitFrom: parseInt(limitfrom)||0,
      };
    }
    if(deleteFilter) options.Search = "";
    return this.getList(this.ERPObjects.TRefundSaleList, options);
  }

  getNewRefundByName(dataSearchName) {
    let options = "";
    options = {
      ListType: "Detail",
      Search: "Deleted != true and CustomerName f7like '" + dataSearchName + "'",
      // select:'[ClientName] f7like "' +dataSearchName +'" OR [ID] f7like "' +dataSearchName +'"',
      //select: '[ClientName] f7like "'+dataSearchName+'"'
    };
    return this.getList(this.ERPObjects.TRefundSaleList, options);
  }

  getCloudTERPForm() {
    let options = {
      PropertyList: "Description,TabGroupName,SkinsGroup",
      select: "[TabGroup]=26 and [AccessLevels]=true",
    };
    return this.getList(this.ERPObjects.TERPForm, options);
  }

  getEmpFormAccessDetail() {
    let options = {
      ListType: "Detail",
      select:"[TabGroup]=26 and [EmployeeId]='" +localStorage.getItem("mySessionEmployeeLoggedID") +"'",
    };
    return this.getList(this.ERPObjects.TEmployeeFormAccessDetail, options);
  }

  getAllPayRunDataVS1(limitCount, limitFrom, deleteFilter) {
    let options = "";
    if (limitCount == "All") {
      options = {
        ListType: "Detail",
        Select: "Complete!=true",
      };
    } else {
      options = {
        // orderby:'"ClientID desc"',
        ListType: "Detail",
        LimitCount: parseInt(limitCount)||initialReportLoad,
        LimitFrom: parseInt(limitFrom)||0,
        Select: "Complete!=true",
      };
    }
    if(deleteFilter)
      options.Select = ""
    return this.getList(this.ERPObjects.TPayRun, options);
  }

  getAllPayRunDataByID(id) {
    let options = "";
    options = {
      ListType: "Detail",
      Select: "Complete!=true and [ID]=" + id,
    };
    return this.getList(this.ERPObjects.TPayRun, options);
  }

  getAllPayHistoryDataVS1(limitCount, limitFrom, deleteFilter) {
    let options = "";
    if (limitCount == "All") {
      options = {
        ListType: "Detail",
        Select: "Deleted!=true",
      };
    } else {
      options = {
        // orderby:'"ClientID desc"',
        ListType: "Detail",
        LimitCount: parseInt(limitCount)||initialReportLoad,
        LimitFrom: parseInt(limitFrom)||0,
        Select: "Deleted!=true",
      };
    }
    if(deleteFilter)
      options.Select = "";
    return this.getList(this.ERPObjects.TPayHistory, options);
  }

  getPayHistoryDataByID(id) {
    let options = "";
    options = {
      ListType: "Detail",
      Select: "Deleted!=true and [ID]=" + id,
    };
    return this.getList(this.ERPObjects.TPayHistory, options);
  }

  getCalender(limitcount, limitfrom, deleteFilter = false) {
    let options = "";
    if (deleteFilter == true) {
      if (limitcount == "All") {
        options = {
          ListType: "Detail",
        };
      } else {
        options = {
          ListType: "Detail",
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
    } else {
      if (limitcount == "All") {
        options = {
          ListType: "Detail",
          select: "[PayrollCalendarActive]=true",
        };
      } else {
        options = {
          ListType: "Detail",
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
          select: "[PayrollCalendarActive]=true",
        };
      }
    }
    return this.getList(this.ERPObjects.TPayrollCalendars, options);
  }

  getPaySlips(limitcount, limitfrom, deleteFilter = false) {
    let options = "";
    if (deleteFilter == true) {
      if (limitcount == "All") {
        options = {
          ListType: "Detail",
        };
      } else {
        options = {
          // orderby:'"ClientID desc"',
          ListType: "Detail",
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
    } else {
      if (limitcount == "All") {
        options = {
          ListType: "Detail",
          select: "[Active]=true",
        };
      } else {
        options = {
          // orderby:'"ClientID desc"',
          ListType: "Detail",
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
          select: "[Active]=true",
        };
      }
    }
    return this.getList('TPaySlips', options);
  }

  getPayNote(limitcount, limitfrom, deleteFilter = false, employeeID) {
    let options = "";
    employeeID = employeeID == 'undefined' ? 0 : employeeID;
    if (deleteFilter == true) {
      if (limitcount == "All") {
        options = {
          ListType: "Detail",
          select: "[EmployeeID]='" +employeeID +"'",
        };
      } else {
        options = {
          // orderby:'"ClientID desc"',
          ListType: "Detail",
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
          select: "[EmployeeID]='" +employeeID +"'",
        };
      }
    } else {
      if (limitcount == "All") {
        options = {
          ListType: "Detail",
          select: "[Active]=true and [EmployeeID]='" +employeeID +"'",
        };
      } else {
        options = {
          // orderby:'"ClientID desc"',
          ListType: "Detail",
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
          select: "[Active]=true and [EmployeeID]='" +employeeID +"'",
        };
      }
    }
    return this.getList('TPayNotes', options);
  }

  getOvertimes(limitcount, limitfrom, deleteFilter = false) {
    let options = "";
    if (deleteFilter == true) {
      if (limitcount == "All") {
        options = {
          ListType: "Detail",
        };
      } else {
        options = {
          // orderby:'"ClientID desc"',
          ListType: "Detail",
        };
      }
    } else {
      if (limitcount == "All") {
        options = {
          ListType: "Detail",
          select: "[Active]=true",
        };
      } else {
        options = {
          // orderby:'"ClientID desc"',
          ListType: "Detail",
          select: "[Active]=true",
        };
      }
    }

    return this.getList(this.ERPObjects.TOverTimeEarnings, options);
  }


  getSuperannuation(limitcount, limitfrom, deleteFilter = false) {
    let options = "";
    if (deleteFilter == true) {
      if (limitcount == "All") {
        options = {
          ListType: "Detail",
        };
      } else {
        options = {
          // orderby:'"ClientID desc"',
          ListType: "Detail",
        };
      }
    } else {
      if (limitcount == "All") {
        options = {
          ListType: "Detail",
          select: "[Active]=true",
        };
      } else {
        options = {
          // orderby:'"ClientID desc"',
          ListType: "Detail",
          select: "[Active]=true",
        };
      }
    }

    return this.getList(this.ERPObjects.Tsuperannuation, options);
  }

  getSuperType() {
    let options = "";

    options = {
      ListType: "Detail",
      // select: '[Active]=true'
    };

    return this.getList(this.ERPObjects.TSuperType, options);
  }

  getOneFundTypeByName(dataSearchName) {
    let options = {
      ListType: "Detail",
      select: '[Description]="' + dataSearchName + '"',
    };
    return this.getList(this.ERPObjects.TSuperType, options);
  }

  getPaidLeave(limitcount, limitfrom, deleteFilter = false) {
    let options = "";
    if (deleteFilter == true) {
      if (limitcount == "All") {
        options = {
          ListType: "Detail",
        };
      } else {
        options = {
          // orderby:'"ClientID desc"',
          ListType: "Detail",
        };
      }
    } else {
      if (limitcount == "All") {
        options = {
          ListType: "Detail",
          select: "[LeavePaidActive]=true",
        };
      } else {
        options = {
          ListType: "Detail",
          select: "[LeavePaidActive]=true",
        };
      }
    }
    return this.getList(this.ERPObjects.TPaidLeave, options);
  }

  getUnPaidLeave(limitcount, limitfrom) {
    let options = "";
    if (limitcount == "All") {
      options = {
        ListType: "Detail",
        select: "[LeaveUnpaidActive]=true",
      };
    } else {
      options = {
        // orderby:'"ClientID desc"',
        ListType: "Detail",
        select: "[LeaveUnpaidActive]=true",
      };
    }
    return this.getList(this.ERPObjects.TUnpaidLeave, options);
  }

  getTvs1dashboardpreferences() {
    let options = "";
    options = {
      ListType: "Detail",
      select: "[EmployeeID]='" + localStorage.getItem("mySessionEmployeeLoggedID") + "'",
    };
    return this.getList(this.ERPObjects.Tvs1dashboardpreferences, options);
  }

  getTvs1charts() {
    let options = "";
    options = {
      ListType: "Detail",
    };
    return this.getList(this.ERPObjects.Tvs1charts, options);
  }

  getEarnings(limitcount, limitfrom, deleteFilter = false) {
    let options = "";

    if(deleteFilter = true) {
      if (limitcount == "All") {
        options = {
          ListType: "Detail",
        };
      } else {
        options = {
          ListType: "Detail",
        };
      }
    } else {
      if (limitcount == "All") {
        options = {
          ListType: "Detail",
          select: "[Active]=true",
        };
      } else {
        options = {
          ListType: "Detail",
          select: "[Active]=true",
        };
      }
    }
    return this.getList(this.ERPObjects.TEarnings, options);
  }

  getAllCustomFieldsWithQuery(query='') {
    let options = {
      ListType: "Detail",
    };
    if(query == 'ltSalesOverview') {
      options = {
        ListType: "Detail",
        select: "[ListType]='ltSales' OR [ListType]='ltSalesOverview'",
      };
    } else if(query == 'ltSalesOrderList') {
      options = {
        ListType: "Detail",
        select: "[ListType]='ltSales' OR [ListType]='ltSalesOrderList'",
      };
    } else if(query == 'ltSaleslines') {
      options = {
        ListType: "Detail",
        select: "[ListType]='ltSales' OR [ListType]='ltSaleslines'",
      };
    } else if(query == 'ltInvoiceList') {
      options = {
        ListType: "Detail",
        select: "[ListType]='ltSales' OR [ListType]='ltInvoiceList'",
      };
    } else if(query == 'ltQuoteList') {
      options = {
        ListType: "Detail",
        select: "[ListType]='ltSales' OR [ListType]='ltQuoteList'",
      };
    } else if(query == 'ltRefundList') {
      options = {
        ListType: "Detail",
        select: "[ListType]='ltSales' OR [ListType]='ltRefundList'",
      };
    } else if(query == 'ltPurchaseOverview') {
      options = {
        ListType: "Detail",
        select: "[ListType]='ltOrder' OR [ListType]='ltPurchaseOverview'",
      };
    }

    return this.getList(this.ERPObjects.TCustomFieldList, options);
  }

  getAllLabels(){
    let options = "";

      options = {
       ListType: "Detail",
       select: "[Active]=true"
     };
    return this.getList(this.ERPObjects.Tprojecttask_TaskLabel, options);
  }

  getAllTaskList() {
    let options = "";
      options = {
       ListType: "Detail",
       select: "pt.Active=true"
     };
    return this.getList(this.ERPObjects.Tprojecttasks, options);
  }

  getTProjectList() {
    let options = "";
      options = {
       ListType: "Detail",
       select: "[Active]=true"
     };
    return this.getList(this.ERPObjects.Tprojectlist, options);
  }

  getCorrespondences() {
    let options = "";
    options = {
     ListType: "Detail",
     select: "[Active]=true"
   };
  return this.getList(this.ERPObjects.TCorrespondence, options);
  }

  getScheduleSettings() {
      let options = {
          ListType: "Detail",
      };
      return this.getList(this.ERPObjects.TReportSchedules,options);
  }

  updateEmployeeFormAccessDetail(data){
    return this.POST(this.ERPObjects.TEmployeeFormAccessDetail, data);
  }

  saveCorrespondence(data)
  {
      return this.POST(this.ERPObjects.TCorrespondence,data);
  }

  savePayNotes(data)
  {
      return this.POST(this.ERPObjects.TPayNotes,data);
  }


  getNewCustomFieldsWithQuery(employeeID='', tableName='') {
    let options = {
      EmployeeID: employeeID,
    };

    if(tableName) {
      options = {
        EmployeeID: employeeID,
        TableName: tableName,
      };
    }

    return this.getList(this.ERPObjects.VS1_Customize, options);
  }
  getLeaveRequest(limitCount, limitFrom, deleteFilter) {
    let options = {
      ListType: "Detail",
      LimitCount: parseInt(limitCount)||initialReportLoad,
      LimitFrom: parseInt(limitFrom)||0,
      Select: "Active=true",
    };
    if(deleteFilter)
      options.Select = "";
    return this.getList(this.ERPObjects.TLeavRequest, options);
  }

  getLeaveRequestByDescription(descriptionData) {
    let options = {
      ListType: "Detail",
      Select: 'Active=true and Description f7like "' + descriptionData + '"',
    };
    return this.getList(this.ERPObjects.TLeavRequest, options);
  }

  getAssignLeaveType(limitcount, limitfrom) {
    let options = '';
    if(limitcount == 'All'){
        options = {
            ListType: "Detail"
            //select: '[Active]=true'
        };
    }else{
        options = {
            ListType: "Detail",
            //select: '[Active]=true',
            LimitCount: parseInt(limitcount)||initialReportLoad,
            LimitFrom: parseInt(limitfrom)||0,
        };
    };
    return this.getList(this.ERPObjects.TAssignLeaveType, options);
  }

  getAllClockOnReport(dateFrom, dateTo, ignoreDate, limitcount, limitfrom, deleteFilter) {
      let options = "";
      if (ignoreDate == true) {
        options = {
          IgnoreDates: true,
          OrderBy: "PurchaseOrderID desc",
          Search: "Deleted != true",
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      } else {
        options = {
          IgnoreDates: false,
          OrderBy: "PurchaseOrderID desc",
          Search: "Deleted != true",
          DateFrom: '"' + dateFrom + '"',
          DateTo: '"' + dateTo + '"',
          LimitCount: parseInt(limitcount)||initialReportLoad,
          LimitFrom: parseInt(limitfrom)||0,
        };
      }
      if(deleteFilter) options.Search = "";
      return this.getList(this.ERPObjects.TVS1ClockOnReport, options);
    }

  saveNewCustomFields(erpGet, tableName, employeeId, columns)
  {
    try {
      let data = {
        Name: "VS1_Customize",
        Params:
        {
            TableName: tableName,
            EmployeeId: employeeId,
            Columns: columns,
            ERPUserName:erpGet.ERPUsername,
            ERPPassword:erpGet.ERPPassword
        }
      };

      let myCustomizeString = '"JsonIn"'+':'+JSON.stringify(data);
      let oPost = new XMLHttpRequest();

      return new Promise((resolve, reject) => {
        oPost.open("POST",URLRequest +erpGet.ERPIPAddress +":" +erpGet.ERPPort +"/" +'erpapi/VS1_Cloud_Task/Method',true);
        oPost.setRequestHeader("database", erpGet.ERPDatabase);
        oPost.setRequestHeader("username", erpGet.ERPUsername);
        oPost.setRequestHeader("password", erpGet.ERPPassword);
        oPost.setRequestHeader("Accept", "application/json");
        oPost.setRequestHeader("Accept", "application/html");
        oPost.setRequestHeader("Content-type", "application/json");
        oPost.send(myCustomizeString);
        oPost.onreadystatechange = (e) => {
          if (oPost.readyState !== 4) {
            return false;
          }

          if (oPost.status === 200) {
            resolve(JSON.parse(oPost.responseText));
          } else {
            return false;
          }
        };
      });
    } catch (error) {
      return false
    }
  }
  getSubTaxCode() {
     let options = {
         PropertyList: "ID,Code,Description,Category,Active,GlobalRef,ISEmpty,RegionName",
         select: "[Active]=true",
     };
     return this.getList(this.ERPObjects.TSubTaxCode, options);
 }

  changeDialFormat (mobile, country) {


      let countries = require('./Model/phoneCodes.json');
      let user_country = countries.find (item=>{
          return item.name == country;
      })
      let code = '';
      if(user_country && user_country != null) {
          code = user_country.dial_code;
      }
      var mobileResult = '';
      if(mobile && mobile !== '') {
        if(mobile.charAt(0) == '0') {
          mobileResult = mobile.replace('0', code)
        } else if(mobile.charAt(0) == '+') {
          mobileResult = mobile.replace(code, '0');
        } else  {
          mobileResult = code.concat(mobile);
        }
      }
      return mobileResult;
  }

  getVS1MenuConfig() {
    // const data = this.GET(this.erpGet.TPreference);
    let options = {
      ListType: "Detail",
      select:"[PrefName]='VS1Menu' and [UserID]='"+localStorage.getItem('mySessionEmployeeLoggedID')+"'",
    };

    return this.getList(this.ERPObjects.TPreference, options);
    // return data;
  }

  updateVS1MenuConfig (menuType, employeeId) {
    const prefValue = '{"Location": \"' + menuType + '\", "AccessLevel": 1, "AccessLevelName": \"Full Access\"}'
    let send_data = {
      "type": "TPreference",
      "fields": {
        "UserID": employeeId,
        "PrefName": "VS1Menu",
        "PrefType": "VS1Menu",
        "PrefValue": prefValue,
        "PrefGroup": "GuiPrefs",
      }
    };
    if (parseInt(localStorage.getItem('TPreferenceMenuID')) > 0)
      send_data.fields['ID'] = parseInt(localStorage.getItem('TPreferenceMenuID'));
    return this.POST(this.ERPObjects.TPreference, send_data);
  }

  getAllLeadCharts(){
    let options = {
        PropertyList: "ID,CreationDate,SourceName",
        select: "[Active]=true",
    };
    return this.getList(this.ERPObjects.TProspect, options);
  }

  getTitleList() {
      return this.getManualTitleList();

  }
  getManualTitleList() {
      return this.Wow();
  }
    Wow() {
        var that = this;
        var promise = new Promise(function(resolve, reject) {
            var splashArrayTitleList = [
                [1,"Mr",""],
                [2,"Mrs",""],
                [3,"Miss",""],
                [4,"Ms",""],
            ];
            resolve({"ttitlelist" : splashArrayTitleList});
        });
        return promise;
    }

    getTransactionDescription() {
        return this.getManualTransactionDescription();

    }
    getManualTransactionDescription() {
        return this.getWowTransactionDescription();
    }
    getWowTransactionDescription() {
        var that = this;
        var promise = new Promise(function(resolve, reject) {
            var splashArrayTitleList = [['', 'Payroll'], ['', 'Supplier'], ['', 'Insurance'], ['', 'Accounting']]
            resolve({"ttransactiondescription" : splashArrayTitleList});
        });
        return promise;
    }

    getTransactionCode() {
        return this.getManualTransactionCode();

    }
    getManualTransactionCode() {
        return this.getWowTransactionCode();
    }
    getWowTransactionCode() {
        var that = this;
        var promise = new Promise(function(resolve, reject) {
            var splashArrayTitleList = [['13', 'Debit'],
            ['50', 'Credit'],
            ['51', 'Australian Govt. Security Interest'],
            ['52', 'Basic Family Payments/Additional Family Payment'],
            ['53', 'Pay'],
            ['54', 'Pension'],
            ['55', 'Allotment'],
            ['56', 'Dividend'],
            ['57', 'Debenture/Note Interest']]
            resolve({"ttransactioncode" : splashArrayTitleList});
        });
        return promise;
    }

  getCombinedContacts(limitCount, limitFrom, deleteFilter) {
    return this.getManualCombinedContacts(deleteFilter);

  }
  getManualCombinedContacts() {
    return this.getWowCombinedContacts();
  }
  getWowCombinedContacts() {
    var that = this;
    var promise = new Promise(function(resolve, reject) {
      var splashArrayTitleList = [
        ["Armidale Building Society Limited",""],
        ["Adelaide Bank Limited",""],
        ["Test",""],
      ];
      resolve({"terpcombinedcontacts" : splashArrayTitleList});
    });
    return promise;
  }

  getBankCode(limitCount, limitFrom, deleteFilter) {
    let options = {
      ListType:"Detail",
      select: "[Active]=true",
      LimitCount: parseInt(limitCount)||initialReportLoad,
      LimitFrom: parseInt(limitFrom)||0,
    };
    if(deleteFilter) options.select = "";
    return this.getList(this.ERPObjects.TBankCode, options);
  }

  getDashboardOptions(limitCount, limitFrom, deleteFilter) {
    return new Promise(function(resolve, reject) {
      const defaultDashboardOptions = require('../popUps/dashboardoptions.json');
      if (!deleteFilter) {
        resolve({"tdashboardoptions" : defaultDashboardOptions, });
      } else {
        resolve({
          "tdashboardoptions" : defaultDashboardOptions,
          Params: {
            Search: ""
          }
        });
      }
    });
  }

  getDashboardOptionsByName(dataSearchName) {
    return new Promise(function(resolve, reject) {
      const defaultDashboardOptions = require('../popUps/dashboardoptions.json');
      const fileterData = defaultDashboardOptions.filter(item => new RegExp(dataSearchName, "i").test(item.name))
      resolve({"tdashboardoptionsex" : fileterData});
    });
  }
}
