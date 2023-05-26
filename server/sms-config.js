import { Meteor } from 'meteor/meteor';
import Twilio from 'twilio';

Meteor.methods({

    sendSMS: async (authSid, authToken, from, to, body) => {
        const smsClient = new Twilio(authSid, authToken);
        try {
            const message = await smsClient.messages.create({
                body: body,
                from: from,
                to: to
            });
            return { success: true, sid: message.sid };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
});