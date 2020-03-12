import { csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

function parseData(parse) {
	return function(d) {
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
        d.volume = +d.volume;
		return d;
	};
}

const parseDate = timeParse("%Y-%m-%d");
export function getData(symbol) { 
	const promiseMSFT = fetch(`https://sandbox.iexapis.com/stable/stock/${symbol}/batch?types=chart&range=1m&token=Tpk_51bea65b13774bd2834cecb06d37b02b`)
        .then((response) => {return response.json()})
        .then((res) => {console.log(res); return Promise.all(res.chart.map((item) =>{
            return `${item.date}, ${item.open}, ${item.open}, ${item.high}, ${item.low}, ${item.close}, ${item.volume}`
        }))})
        .then((data) => {
            return "date,open,close,high,low,close,volume\n" + data.join("\n")})
        .then( (data) => {
        return csvParse(data, parseData(parseDate))})
	return promiseMSFT;
}

export function getNews(symbol) {
    const news = fetch(`https://sandbox.iexapis.com/stable/stock/${symbol}/batch?types=news&range=1m&last=5&token=Tpk_51bea65b13774bd2834cecb06d37b02b`)
    .then((response) => {return response.json()})
    .then((res) => {return Promise.all(res.news.map((item) => {
        console.log(item)
        return {headline:item.headline, 
                url:item.url, 
                summary:item.summary
        }
    }))})
    .then((data) => {
        console.log(data)
        return data
    })
    return news
}

export function getPrice(symbol) {
    const price = fetch(`https://sandbox.iexapis.com/stable/stock/${symbol}/batch?types=quote&last=1&token=Tpk_51bea65b13774bd2834cecb06d37b02b`)
    .then((response) => {return response.json()})
    .then((res) => {return res.quote})
    .then((res) => {
        return res.latestPrice})
    return price
}

