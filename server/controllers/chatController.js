const genAI = require('../config/gemini');

const sendMessageToAI = async (req, res) => {
    const { message } = req.body;

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const result = await model.generateContent(message);

        const response = await result.response;
        const text = response.text();

        res.status(200).json({
            success: true,
            reply: text
        });

    } catch (error) {
        console.error("Gemini API Error =>", error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong with Gemini API!'
        });
    }
};

module.exports = { sendMessageToAI };
