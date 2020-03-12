# Stock monitor


Used react to build a simple stock monitor, it support the following functions

### Features

* Add to stock portfolio by providing:
    * Stock symbol (IBM, MSFT, AMZN, etc.)
    * Number of shares purchased
  * see current portfolio at a glance,
    including the symbol, number of shares, current market price per share,
    and total value (number of shares multiplied by current market price).
  * sort the portfolio by symbol, number of shares,
    or stock value; and in either ascending or descending order (i.e.
    clicking the same column twice should toggle the sort order).
  * sell (substract) shares of a stock
  * see their total portfolio value (the sum of all stock values).
* Advanced 


### Installation

After git clone the repo, run the following scripts

```
npm install
```

```
npm build
```

```
npm run dev
```
The webpack-dev-server will run. The app is at `127.0.0.1:8000`.


### Demonstration

Since the free IEX Group API does not always working, even in the sandbox, if one free acount request too much times in the short time. It will always return the 429 code.
So to demonstrate the app, you can see the following youtube video

[![Demo](https://img.youtube.com/vi/w2orHDae6wo/0.jpg)](https://youtu.be/w2orHDae6wo?t=1m38s "Demo - Click to Watch!")
