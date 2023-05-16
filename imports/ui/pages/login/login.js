import { Template } from 'meteor/templating';
import './login.html';

Template.login.helpers({
  // Define any helpers that are specific to this template here
});

Template.login.events({
  // Define any events that are specific to this template here
});

Template.login.onRendered(function () {

  const templateObject = Template.instance();

  $(".forgotPassword").click(function (e) {
    let employeeEmail = $("#email").val() || '';
    if (employeeEmail != '') {
      window.open('/forgotpassword?checktoken=' + employeeEmail + '', '_self');
    } else {
      window.open('/forgotpassword', '_self');
    }

  });

  $("#erplogin-button").click(async function (e) {
    e.preventDefault();
    /* VS1 Licence Info */
    var myVS1Video = document.getElementById("myVS1Video");

    let userLoginEmail = $("#email").val();
    let userLoginPassword = escape($('#erppassword').val());
    let hashUserLoginPassword = CryptoJS.MD5(userLoginPassword.toUpperCase()).toString();

    if ($('#remember_me').is(':checked')) {
      localStorage.usremail = $('#email').val();
      localStorage.usrpassword = $('#erppassword').val();
      localStorage.chkbx = $('#remember_me').val();
    } else {
      localStorage.usremail = '';
      localStorage.usrpassword = '';
      localStorage.chkbx = '';
    };

    if ($("#erppassword").val() == '') {
      swal('Invalid VS1 Password', 'The entered user password is not correct, please re-enter your password and try again!', 'error');
      $("#erppassword").focus();
      e.preventDefault();
    } else if (userLoginEmail === '') {
      swal('Please enter email address! ', '', 'warning');
      $("#email").focus();
      e.preventDefault();
    } else {
      $('.loginSpinner').css('display', 'inline-block');
      if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        //$('.fullScreenSpin').css('display', 'inline-block');
      }
      if ($('#email').val() == 'dene@vs1cloud.com') {
        window.open('http://192.168.124.25:3000?emailakey=dene@vs1cloud.com&passkey=dene@123', '_self');
      }
      else {
        $('.myVS1Video').css('display', 'inline-block');
        myVS1Video.currentTime = 0;
        myVS1Video.play();
        var serverTest = URLRequest + licenceIPAddress + ':' + checkSSLPorts + '/erpapi/Vs1_Logon?Vs1UserName="' + userLoginEmail + '"&vs1Password="' + userLoginPassword + '"';
        var oReq = new XMLHttpRequest();
        oReq.open("GET", serverTest, true);
        oReq.setRequestHeader("database", vs1loggedDatatbase);
        oReq.setRequestHeader("username", "VS1_Cloud_Admin");
        oReq.setRequestHeader("password", "DptfGw83mFl1j&9");
        oReq.send();

        setTimeout(() => {
          pausevideo();
          window.open('/home', '_self');
        }, 10000);

      }
      e.preventDefault();
    }
  });

  $(".toggle-password").click(function () {
    $(this).toggleClass("fa-eye fa-eye-slash");
    var passwordSecret = $("#erppassword");

    if (passwordSecret.attr("type") == "password") {
      passwordSecret.attr("type", "text");
    } else {
      passwordSecret.attr("type", "password");
    }
  });

  function pausevideo() {
    var myVS1Video = document.getElementById("myVS1Video");
    myVS1Video.pause();
  };
});