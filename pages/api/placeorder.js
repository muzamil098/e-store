import connectToDatabase from "@/utils/db";
const mongodb = require("mongodb");
const handler = async (req, res) => {
  const { placeOrder } = req.body;
  if (req.method === "POST") {
    const client = await connectToDatabase();
    const db = client.db();
    const result = await db.collection("PlacedOrder").insertOne(placeOrder);
    res
      .status(201)
      .json({ message: "Order Placed", insertedId: result.insertedId });
  }
  if (req.method === "GET") {
    try {
      const client = await connectToDatabase();
      const db = client.db();
      const result = await db
        .collection("PlacedOrder")
        .find({ _id: new mongodb.ObjectId("674b343ae109d6402ece497d") })
        .toArray();
      res.status(200).json({ message: result });
    } catch (err) {
      console.log(err.message);
    }
  }
};
export default handler;
