import { MongoClient } from "mongodb";
const connectToDatabase = async () => {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://muzamilchanna8:LkugPRjXyWHPVbBQ@cluster0.jbvsw.mongodb.net/placed_order?retryWrites=true&w=majority&appName=Cluster0"
    );
    return client;
  } catch (err) {
    console.log(err);
  }
};
export default connectToDatabase;
