//Dependencies

const mongoose = require('mongoose');

const url = process.env.URL_MONGO;
const database = 'fhsc-soccer';
const userName = process.env.DBUSERNAME;
const password = process.env.DBPASSWORD;
console.log('URL:', url);
console.log('Username:', userName);
console.log('Password:', password);

const db = async () => {
    try {
        // Remove warning for depreciated features
        mongoose.set('strictQuery', true);

        console.log(`mongodb+srv://${userName}:${password}@atlascluster.${url}.mongodb.net/${database}`)

        await mongoose.connect(`mongodb+srv://${userName}:${password}@atlascluster.${url}.mongodb.net/${database}`, {
            // Remove mongoose dependency warnings
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`Database Connected: mongodb+srv://...@atlascluster.${url}.mongodb.net/${database}`);
    } catch (err) {
        throw new Error(err);
    };
};

module.exports = { db, mongoose };