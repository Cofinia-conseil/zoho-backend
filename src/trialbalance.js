import axios from 'axios'


exports.handler = async (event) => {
  try {
  console.error('event',event)

    const { from_date, to_date ,organization_id,token} = event.queryStringParameters;
    console.error("from_date",from_date)
    const apiURL = `https://books.zoho.com/api/v3/reports/trialbalance?cash_based=false&filter_by=TransactionDate.CustomDate&from_date=${from_date}&to_date=${to_date}&select_columns=%5B%7B%22field%22%3A%22name%22%2C%22group%22%3A%22report%22%7D%2C%7B%22field%22%3A%22account_code%22%2C%22group%22%3A%22report%22%7D%2C%7B%22field%22%3A%22net_debit%22%2C%22group%22%3A%22report%22%7D%2C%7B%22field%22%3A%22net_credit%22%2C%22group%22%3A%22report%22%7D%5D&is_for_date_range=false&show_rows=non_zero&sort_column=account&sort_order=A&usestate=true&is_response_new_flow=true&response_option=1&organization_id=${organization_id}`;
    console.error('from_date',from_date)
    console.error('token',token)
    const response = await axios.get(apiURL, {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/json'
      },
    });
  
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://excel-add-in-zoho-books.netlify.app', // https://excel-add-in-zoho-books.netlify.app
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