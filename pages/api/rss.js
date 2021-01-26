import moment from "moment";

async function fetchFromSource(source) {
	const iconv = require("iconv-lite");
	const parser = require("fast-xml-parser");
	let response = [];
	await fetch(source.feed)
		.then((res) => res.arrayBuffer())
		.then((arrayBuffer) =>
			iconv
				.decode(new Buffer(arrayBuffer), source.encoding || "UTF-8")
				.toString()
		)
		.then((response) => parser.parse(response))
		.then((data) => {
			data.rss.channel.item.forEach((article) => {
				response.push({
					source: source.name,
					date: article.pubDate,
					title: article.title,
					link: article.link,
					description: article.description,
				});
			});
		})
		.catch((err) => {
			console.log(err);
		});
	return response;
}

async function rssfeeds(req, res) {
	const sources = {
		"pt-br": [
			{
				name: "Infomoney",
				feed: "https://www.infomoney.com.br/feed",
			},
			{
				name: "Folha Mercado",
				feed: "https://feeds.folha.uol.com.br/mercado/rss091.xml",
				encoding: "ISO-8859-1",
			},
		],
		"en-us": [
			{
				name: "The Rio Times",
				feed: "https://riotimesonline.com/feed",
			},
			{
				name: "The Economist",
				feed: "https://www.economist.com/finance-and-economics/rss.xml",
			},
			{
				name: "The Wall Street Journal",
				feed: "https://feeds.a.dj.com/rss/RSSMarketsMain.xml",
			},
		],
	};

	await Promise.all(
		sources[req.query.locale].map((source) => fetchFromSource(source))
	)
		.then((responses) => {
			res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate");
			res.json(
				responses
					.flat()
					.sort((a, b) => moment(b.date).diff(moment(a.date)))
					.slice(0, 7)
			);
		})
		.catch(() => {
			res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");
			res.json({});
		});
}

export default rssfeeds;
