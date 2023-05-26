import { Meteor } from 'meteor/meteor';
import net from 'net';
import '../imports/api/route';
import './cron-job';
import './mail-config';
import './sms-config';
import moment from 'moment-timezone';

Meteor.startup(() => {
  // code to run on server at startup
  URLRequest = "http://localhost:3002/";
  //URLRequest = "https://phpstack-473757-3549370.cloudwaysapps.com/";
  //URLRequest = "https://servicechecker.vs1cloud.com/";
  moment.tz.setDefault('America/Los_Angeles');
});

Meteor.methods({
  checkService: function(ipAddress, port) {
    return new Promise((resolve, reject) => {
      const socket = net.connect(port, ipAddress);
      socket.setTimeout(3000);
      socket.on('connect', () => {
        const message = `up`;
        resolve(message);
      });

      socket.on('timeout', () => {
        socket.destroy();
        reject("timed");
      });
      
      socket.on('error', (err) => {
        reject(err);
      });
    });
  }
});