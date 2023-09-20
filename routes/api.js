'use strict';

const likes = {
  'GOOG': 0,
  'MSFT': 0
}

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async function (req, res) {
      const stockSymbol = req.query.stock
      if (Array.isArray(stockSymbol) != true) {
        const response = await fetch("https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/" + stockSymbol + "/quote");
        const responseJSON = await response.json();
        // likes[stockSymbol] = likes[stockSymbol] + 1
        if (likes[stockSymbol] == 0){
          likes[stockSymbol] =  1
        }
        else if(likes[stockSymbol] > 0){
          likes[stockSymbol] =  1
        }
        var result = { "stockData": { 'stock': stockSymbol, 'price': responseJSON.latestPrice, 'likes': likes[stockSymbol] } }
        res.send(result)
      }
      else {
        const result = []
        await stockSymbol.forEach(async stock => {
          const response = await fetch("https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/" + stock + "/quote");
          const responseJSON = await response.json();
          // likes[stock] += 1
          if (likes[stock] == 0){
            likes[stock] =  1
          }
          else if(likes[stock] > 0){
            likes[stock] =  1
          }
          result.push({ "stockData": { stock, 'price': responseJSON.latestPrice, 'rel_likes': 0 } })
          if (stock == stockSymbol[1]) {
            result[0].stockData.rel_likes = likes[stockSymbol[0]] - likes[stockSymbol[1]]
            result[1].stockData.rel_likes = likes[stockSymbol[0]] - likes[stockSymbol[1]]
            console.log(result)
            res.send(result)
          }
        });
      }

    });

};
