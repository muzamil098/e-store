const { GoogleGenerativeAI } = require("@google/generative-ai");
async function handler(req, res) {
  if (req.method === "POST") {
    const AIPrompt = req.body;
    console.log(AIPrompt);
    const genAI = new GoogleGenerativeAI(
      "AIzaSyB3liC7xuIM83-EUcCh3R8KK_HXCskTnX8"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(AIPrompt);
    console.log(result.response.text());
    res.send({ message: result.response.text() });
  }
}
export default handler;
