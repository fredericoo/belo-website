async function market(req, res) {
	const apiKey = process.env.FMP_KEY;

	const symbols = ["^DJI", "^GSPC", "^IXIC"];
	await fetch(
		`https://financialmodelingprep.com/api/v3/quote/${symbols}?apikey=${apiKey}`
	)
		.then((res) => res.json())
		.then((data) => {
			res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate");
			res.json({ stocks: data });
		})
		.catch((err) => {
			res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate");
			res.json({ err });
		});

	// 	await Promise.all(
	// 		symbols.map((symbol) =>
	// 			fetch(
	// 				`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&apikey=${apiKey}&symbol=${symbol}`
	// 			)
	// 		)
	// 	)
	// 		.then(function (responses) {
	// 			return Promise.all(
	// 				responses.map(function (response) {
	// 					return response.json();
	// 				})
	// 			);
	// 		})
	// 		.then(function (data) {
	// 			const apiRes = { stocks: [] };
	// 			data.forEach((stock) => {
	// 				if (stock["Global Quote"]) {
	// 					apiRes.stocks.push({
	// 						symbol: stock["Global Quote"]["01. symbol"],
	// 						price: stock["Global Quote"]["05. price"],
	// 						change: stock["Global Quote"]["09. change"],
	// 						changePercent: stock["Global Quote"]["10. change percent"],
	// 					});
	// 				}
	// 			});
	// 			res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate");
	// 			res.json(apiRes);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 			res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate");
	// 			res.json({ error: "Error fetching data from the API." });
	// 		});
}

export default market;
