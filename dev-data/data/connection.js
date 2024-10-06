const dotenv = require("dotenv");
const path = dotenv.config({ path: "./../../.env" });

const connectMongo = (db) =>
  mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

const connection = async (db) => {
  connectMongo(process.env.LOCAL_DATABASE);
};
