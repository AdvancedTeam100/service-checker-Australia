import { Meteor } from 'meteor/meteor';
import { SyncedCron } from 'meteor/percolate:synced-cron';
import { Email } from 'meteor/email';
import Twilio from 'twilio';
import fetch from 'node-fetch';

const urlRequest = 'http://localhost:3002'; // replace with your API endpoint URL
//const urlRequest = 'https://phpstack-473757-3549370.cloudwaysapps.com/'; // replace with your API endpoint URL
//const urlRequest = 'https://servicechecker.vs1cloud.com/'; // replace with your API endpoint URL
Meteor.startup(() => {
  fetch(`${urlRequest}/api/frequency`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(frequencyData => {

      // frequency daily part start 
      let dailySchedule;
      if (frequencyData[0].mode_b == "daily") {
        if (frequencyData[0].mode_s == "dailyEveryDay") { // in case of daily every day
          const time = frequencyData[0].time.split(':');
          dailySchedule = `*/5 ${time[1]}-59/1 ${time[0]}-23 * * *`; // Run every 5 minutes between start time and 11:59pm
          start_day = frequencyData[0].start_date;
          end_day = frequencyData[0].end_date;
          SyncedCron.add({
            name: 'log cron',
            schedule: parser => parser.text(dailySchedule),
            startAt: start_day,
            endAt: end_day,
            job() {
              fetch(`${urlRequest}/api/machinesAll`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
              })
                .then(response => response.json())
                .then(data => check(data))
                .catch(error => console.error(error));
            }
          });
        }
        else if (frequencyData[0].mode_s == "dailyEvery") { // in case of daily every
          start_day = frequencyData[0].start_date;
          end_day = frequencyData[0].end_date;
          SyncedCron.add({
            name: 'log cron',
            schedule: parser => parser.text("every 5 minutes"),
            startAt: start_day,
            endAt: end_day,
            job() {
              fetch(`${urlRequest}/api/machinesAll`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
              })
                .then(response => response.json())
                .then(data => check(data))
                .catch(error => console.error(error));
            }
          });
        }
      }
      // frequency daily part end
      // frequency weekly part start
      let weeklySchedule;
      if (frequencyData[0].mode_b == "weekly") {
        const days = frequencyData[0].day.replace(/\s/g, "");
        const time = frequencyData[0].time.split(':');
        const interval = frequencyData[0].interval_time;
        weeklySchedule = `*/${interval} ${time[1]}-59/1 ${time[0]}-23 * * ${days}`; // Run every x minutes between start time and 11:59pm weekly
        console.log(weeklySchedule);
        start_day = frequencyData[0].start_date;
        end_day = frequencyData[0].end_date;
        SyncedCron.add({
          name: 'log cron',
          schedule: parser => parser.text(weeklySchedule),
          startAt: start_day,
          endAt: end_day,
          job() {
            fetch(`${urlRequest}/api/machinesAll`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            })
              .then(response => response.json())
              .then(data => check(data))
              .catch(error => console.error(error));
          }
        });
      }
      // frequency weekly part end
      // frequency one time only start
      let oneTimeSchedule;
      if(frequencyData[0].mode_b == "onetime"){
        const time = frequencyData[0].time.split(':');
        oneTimeSchedule = `${time[1]} ${time[0]} * * *`; // 
          console.log(oneTimeSchedule);
          start_day = frequencyData[0].start_date;
          SyncedCron.add({
            name: 'log cron',
            schedule: parser => parser.text(oneTimeSchedule),
            job() {
              fetch(`${urlRequest}/api/machinesAll`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
              })
                .then(response => response.json())
                .then(data => check(data))
                .catch(error => console.error(error));
            }
          });
      }
      // frequency one time only end

      SyncedCron.start();
    })
    .catch(error => {
      console.error(error);
      throw new Meteor.Error('fetch-error', 'Failed to fetch data');
    });
});

function check(data) {
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    let status = '';

    Meteor.call('checkService', data[i].ip, data[i].port, (error, result) => {
      if (result) {
        if (result === 'up') {
          status = 'on';
        } else {
          status = 'off';

          fetch(`${urlRequest}/api/getAlladmin`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => response.json())
            .then(users => {
              for (let j = 0; j < users.length; j++) {
                console.log(`Email and SMS were sent to ${users[j].name}`);

                const baseMsg = "Hi [Customer Name], This is Service Checker from VS1Cloud just letting you know that we have finished doing the following service [Product/Service].";
                const message = baseMsg
                  .replace("[Customer Name]", users[j].name)
                  .replace("[Product/Service]", `${data[i].ip}/${data[i].service_name}`);

                Meteor.call('sendEmail', {
                  from: "VS1Cloud",
                  to: users[j].email,
                  subject: '',
                  text: message,
                  html: '',
                  attachments: undefined
                }, (error, result) => {
                  if (error && error.error === "error") {
                    // handle error
                  } else {
                    // handle success
                  }
                });

                Meteor.call("sendSMS",
                  smsSettings.twilioAccountId || '',
                  smsSettings.twilioAccountToken || '',
                  smsSettings.twilioTelephoneNumber || '',
                  phoneNumber || '',
                  message || '',
                  function (error, result) {
                    if (error || !result.success) {
                      // handle error
                    } else {
                      // handle success
                    }
                  }
                );
              }
            })
            .catch(error => console.error(error));
        }
      } else {
        status = 'off';

        fetch(`${urlRequest}/api/getAlladmin`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(users => {
            for (let k = 0; k < users.length; k++) {
              console.log(`-Email and SMS were sent to ${users[k].name}`);

              const baseMsg = "Hi [Customer Name], This is Service Checker from VS1Cloud just letting you know that we have finished doing the following service [Product/Service].";
              const message = baseMsg
                .replace("[Customer Name]", users[k].name)
                .replace("[Product/Service]", `${data[i].ip}/${data[i].service_name}`);

              Meteor.call('sendEmail', {
                from: "VS1Cloud",
                to: users[k].email,
                subject: '',
                text: message,
                html: '',
                attachments: undefined
              }, (error, result) => {
                if (error && error.error === "error") {
                  // handle error
                } else {
                  // handle success
                }
              });

              Meteor.call("sendSMS",
                smsSettings.twilioAccountId || '',
                smsSettings.twilioAccountToken || '',
                smsSettings.twilioTelephoneNumber || '',
                phoneNumber || '',
                message || '',
                function (error, result) {
                  if (error || !result.success) {
                    // handle error
                  } else {
                    // handle success
                  }
                }
              );
            }
          })
          .catch(error => console.error(error));
      }

      const postData = {
        machine_id: data[i].id,
        server_name: data[i].service_name,
        ip: data[i].ip,
        port: data[i].port,
        service_account: data[i].username,
        status: status
      };

      fetch(`${urlRequest}/api/logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })
        .then(response => response.json())
        .then(data => {
          // handle success
        })
        .catch(error => console.error(error));
    });
  }
}