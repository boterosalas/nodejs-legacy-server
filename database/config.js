const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('Database online');
    } catch (error) {
        throw new Error('Error when starting database')
    }
}

module.exports = {
    dbConnection
}