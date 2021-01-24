import moment from "moment";

async function fetchFromSource(source) {
	const parser = require("fast-xml-parser");
	let response = [];
	await fetch(source.feed, {
		headers: {
			"Content-type": `text/xml; encoding="UTF-8"`,
		},
	})
		.then((response) => response.text())
		.then((response) => parser.parse(response))
		.then((data) => {
			data.rss.channel.item.forEach((article) => {
				response.push({
					source: source.name,
					date: article.pubDate,
					title: Buffer.from(article.title, "latin1").toString(),
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
				name: "Financial Times",
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
					.slice(0, 100)
			);
		})
		.catch(() => {
			res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");
			res.json({});
		});
}

export default rssfeeds;
