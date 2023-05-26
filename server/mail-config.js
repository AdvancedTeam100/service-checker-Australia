
FutureTasks = new Meteor.Collection('email_settings');

Meteor.startup(function(){

});

Meteor.methods({
  sendEmail: function (details) {
    check([details.to, details.from, details.cc, details.subject, details.text, details.html, details.attachments], [String]);
    this.unblock();
    if(details.attachments === undefined){
        details.attachments = [];
    }else{

    }
    try {
        Email.send({
            to: details.to,
            from: details.from,
            cc: details.cc,
            subject: details.subject,
            text: details.text,
            html: details.html,
            attachments: details.attachments
        });
    } catch(e) {
        if (e) {
            throw new Meteor.Error("error", e.response);
        }
    }
  }
});