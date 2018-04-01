import { Users } from '/db';
import { Exposure } from 'meteor/cultofcoders:grapher';

Users.expose({
    firewall(filters, options, userId) {
        Exposure.restrictFields(filters, options, ['services', 'createdAt']);
    }
});
