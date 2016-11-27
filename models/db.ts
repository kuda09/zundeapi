///<reference path="../typings/modules/mongoose/index.d.ts"/>

let connections = () => {

    let mongoose = require('mongoose');
    let dbURI = 'mongodb://localhost:27017/zunde';

    mongoose.connect(dbURI);

    if(process.env.NODE_ENV === 'production') {

        dbURI = 'mongodb://kud09:305kuda@ds025742.mlab.com:25742/zunde'
    }



    mongoose.connection.on('connected', () => {

        console.log('Mongoose connect to ' + dbURI);
    })

    mongoose.connection.on('error', (err: any) => {

        console.error('Mongoose connection error: ' + err);
    })

    mongoose.connection.on('disconnected', () => {

        console.warn('Mongoose disconnected');
    });
}

export = connections;
