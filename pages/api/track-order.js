import connectToDatabase from "@/utils/db";
const mongodb = require("mongodb");
const handler = async (req, res) => {
  const { tNumber } = req.body;
  if (req.method !== "POST") {
    return;
  }
  const client = await connectToDatabase();
  const db = client.db();
  const result = await db
    .collection("PlacedOrder")
    .findOne({ _id: new mongodb.ObjectId(`${tNumber}`) });
  console.log(result);
  result && res.status(200).json({ message: result });
  client.close();
};
export default handler;
