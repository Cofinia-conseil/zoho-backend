const express = require("express");
const serverless = require("serverless-http");
import axios from 'axios'
import fetch from 'node-fetch'



const app = express();
const router = express.Router();
const cors = require('cors');
app.use(express.json());
const corsOptions = {
  origin: 'https://excel-add-in-zoho-books.netlify.app',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

router.get("/hello", (req, res) => {
  res.json({
   hello: "hi!"
  });
});
router.get('/store-token', async (req, res) => {
  console.error('zohoAccessToken')
  console.error('req.body',req.body)
  
  const token = req.body.token;
  if (token) {
      zohoAccessToken = token;
  console.error('zohoAccessToken',zohoAccessToken)

      console.log('Token reçu et stocké:', zohoAccessToken);
  const apiURL = "https://books.zoho.com/api/v3/organizations";
  const response = await axios.get(apiURL, {  
    headers: {
      Authorization: `Zoho-oauthtoken ${zohoAccessToken}`,
      'Content-Type': 'application/json'
    },
  });    
  console.error('response',response)

      res.status(200).json(response.data);
  } else {
      res.status(400).json({ error: 'Token non fourni' });
  }
});


router.get('/trialbalance', async (req, res) => {
  const { from_date, to_date } = req.query;
  console.error("from_date",from_date)
try {
  const apiURL = `https://books.zoho.com/api/v3/reports/trialbalance?cash_based=false&filter_by=TransactionDate.CustomDate&from_date=${from_date}&to_date=${to_date}&select_columns=%5B%7B%22field%22%3A%22name%22%2C%22group%22%3A%22report%22%7D%2C%7B%22field%22%3A%22account_code%22%2C%22group%22%3A%22report%22%7D%2C%7B%22field%22%3A%22net_debit%22%2C%22group%22%3A%22report%22%7D%2C%7B%22field%22%3A%22net_credit%22%2C%22group%22%3A%22report%22%7D%5D&is_for_date_range=true&show_rows=non_zero&sort_column=account&sort_order=A&usestate=true&is_response_new_flow=true&response_option=1&organization_id=709668213`;
  console.error('from_date',from_date)
  console.error('zohoAccessToken',zohoAccessToken)
  const response = await axios.get(apiURL, {
    headers: {
      Authorization: `Zoho-oauthtoken ${zohoAccessToken}`,
    },
  });

  res.status(200).json(response.data);
} catch (error) {
  console.error('Erreur lors de la récupération du trial balance:', error.message);
  res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
}
});

app.use(`/.netlify/functions/api`, router);


module.exports.handler = serverless(app);