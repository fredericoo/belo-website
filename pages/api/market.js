import moment from "moment";

async function market(req, res) {
	const apiKey = process.env.FMP_KEY;
	const timestamp = moment().format();

	const symbols = [
		"^BVSP",
		"^DJI",
		"^IXIC",
		"^US500",
		"^GDAXI",
		"^FTSE",
		"^STOXX50E",
	];
	await fetch(
		`https://financialmodelingprep.com/api/v3/quote/${symbols}?apikey=${apiKey}`
	)
		.then((res) => res.json())
		.then((data) => {
			res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");
			res.json({ timestamp, stocks: data });
		})
		.catch((err) => {
			res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");
			res.json({ err });
		});
}

export default market;
