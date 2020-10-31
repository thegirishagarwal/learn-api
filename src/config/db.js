global.mongoose = require("mongoose");
const db = process.env.MONGODB_URL;

global.mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  console.log('MongoDB Connected')
}).catch(err => {
  console.error('Error => ', err);
});