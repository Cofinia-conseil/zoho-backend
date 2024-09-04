const axios = require('axios') 
exports.handler = async (event, context, callback) => { 
    zohoAccessToken = token;
    const apiURL = "https://books.zoho.com/api/v3/organizations"; // Remplacez avec votre URL exacte
    try { 
       
        const response = await axios.get(apiURL, {
            headers: {
                Authorization: `Zoho-oauthtoken ${zohoAccessToken}`,
                'Content-Type': 'application/json' 
              },
   
        });    
        const result = { statusCode: 200, body: JSON.stringify({ response: response.data} ) } 
        return callback(null, result)
        } 
        catch (error) { return callback(error); } } 