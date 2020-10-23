import axios from 'axios';

function getBalanceUsd(balance) {
  return axios.get('https://api.coingecko.com/api/v3/coins/hydro')
    .then((res) => {
      const currentPrice = res.data.market_data.current_price.usd;
      const value = parseFloat(currentPrice) * parseFloat(balance);

      return value;
    })
    .catch((err) => {
      console.log(err);
    });
}

export {
  getBalanceUsd,
};
