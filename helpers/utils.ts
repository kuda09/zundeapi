import _ = require("lodash");

const noUpdateFields = ['_id', 'created_at', 'updated_at', 'hash', 'salt', 'username', '__v'];

export function removeNonUpdatableElementsFromObject(obj) {

   _.map(noUpdateFields, (item) => {

        var keys = _.keys(obj);

        _.map(keys, key => {

            if(key === item) {

                delete obj[key];
            }
        });
    });

    return obj;
}

export function sendJSONResponse (res, status, content)  {
    res.status(status);
    res.json(content);
}