import axios from 'axios'
import fetch from 'node-fetch'
import zlib from'zlib'


exports.handler = async (event) => {
  try {
    const { token } = event.queryStringParameters;
    let organization_id
    if (!token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Token not provided' })
      };
    }
    console.error('tokenzzz',token)
    console.log('tokenzzz',token)

    const apiURL = 'https://www.zohoapis.com/books/v3/organizations'; 
    const response =  await axios.get(apiURL, {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/json'
      }
    });
  console.error('tokenzzz',token)

  console.error('tokendddd',token)
  organization_id = response.data.organizations[0].organization_id;
  console.error('response',organization_id)
  console.error('token',token)
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://excel-add-in-zoho-books.netlify.app',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({organization_id:organization_id})
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