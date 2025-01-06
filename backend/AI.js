const axios = require('axios');

const API_KEY = 'AIzaSyC_cU6MdymbQjG2Zh3FKwOPfqfUrQkEXvo';

const generateCode = async (prompt) => {
  try {
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        contents: [
          { parts: [{ text: prompt }] }
        ]
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error generating content:', error.response.data);
    throw error;
  }
};


module.exports = generateCode