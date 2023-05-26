import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// define our routes
//login-layout
const publicRedirect = () => {

};

const publicRoutes = FlowRouter.group({
  name: 'public',
  triggersEnter: [publicRedirect]
});

publicRoutes.route('/', {
  name: 'login',
  action() {
    BlazeLayout.render('LoginLayout', { yield: 'login' });
  }
});

publicRoutes.route('/register', {
  name: 'register',
  action() {
    BlazeLayout.render('LoginLayout', { yield: 'register' });
  }
});

publicRoutes.route('/forgotpassword', {
  name: 'forgotpassword',
  action() {
    BlazeLayout.render('LoginLayout', { yield: 'forgotpassword' });
  }
});

//after login main-layout

const authenticatedRedirect = () => {
// provide authenticated users
};

const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated',
  triggersEnter: [authenticatedRedirect]
});

authenticatedRoutes.route('/home', {
  name: 'home',
  action() {
    BlazeLayout.render('MainLayout', { yield: 'home' });
  },
});

authenticatedRoutes.route('/editdetail', {
  name: 'editdetail',
  action() {
    BlazeLayout.render('MainLayout', { yield: 'editdetail' });
  },
});


