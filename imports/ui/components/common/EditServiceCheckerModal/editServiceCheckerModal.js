import { ReactiveVar } from "meteor/reactive-var";
import { Template } from 'meteor/templating';
import './editServiceCheckerModal.html';

Template.editServiceCheckerModal.onCreated(function () {
  const templateObject = Template.instance();
  templateObject.accountList = new ReactiveVar([]);
  templateObject.accountTypes = new ReactiveVar([]);
  templateObject.expenseCategories = new ReactiveVar([]);
  templateObject.taxRates = new ReactiveVar([]);  
});

Template.editServiceCheckerModal.onRendered(function () {

});

Template.editServiceCheckerModal.events({
  "click #openEftOptionsModal" : (e) => {
    $('.eftOptionsModal').modal();
  },
});

Template.editServiceCheckerModal.helpers({

});
