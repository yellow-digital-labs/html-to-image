var express = require('express');
var app = express();

app.get('/', function (req, res) {
  var pageno = req.query.page;
  var timestamp = parseInt(Date.now()/1000);
  const puppeteer = require('puppeteer');

  (async () => {
      const browser = await puppeteer.launch();
        const page = await browser.newPage();
        /*await page.goto('https://news.ycombinator.com', {
          waitUntil: 'networkidle2',
        });
        await page.pdf({ path: 'hn.pdf', format: 'a4' });*/

        await page.goto('http://127.0.0.1:8000/profile/'+pageno);
        await page.screenshot({ path: timestamp+'-example-'+pageno+'.png', fullPage: true });

        await browser.close();

        var response = {
          status: 200,
          msg: 'ok'
        };
        res.send(JSON.stringify(response));
  })();
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})