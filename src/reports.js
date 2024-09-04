import axios from 'axios'


exports.handler = async (event) => {
  try {
  console.error('event',event)

    const {organization_id,token} = event.queryStringParameters;
    const apiURL = `https://books.zoho.com/api/v3/reports/meta?organization_id=${organization_id}`;
    const response = await axios.get(apiURL, {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/json'
      },
    });
  
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://excel-add-in-zoho-books.netlify.app',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': 'https://excel-add-in-zoho-books.netlify.app',
      },
      body: JSON.stringify({ error: 'Error fetching data.' })
    };
  }
};