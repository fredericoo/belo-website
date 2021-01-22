import styles from "./Ticker.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const TickerEntry = ({ entry }) => {
	const positive = entry.change > 0;
	return (
		<li className={`s-xs ${styles.entry} ${positive && styles.positive}`}>
			<div className={`${styles.label}`}>{entry.symbol}</div>
			<div className={`${styles.marketPrice}`}>{entry.price}</div>
			<div className={styles.arrow}></div>
			<div className={`${styles.value}`}>
				{entry.change}&emsp;{entry.changePercent}
			</div>
		</li>
	);
};

const Ticker = ({}) => {
	const [data, setData] = useState([]);
	useEffect(() => {
		fetch("/api/market")
			.then((res) => res.json())
			.then((data) => {
				if (data.stocks) setData(data.stocks);
			});
	}, []);

	return (
		<aside className={styles.ticker}>
			<div className={styles.viewport} style={{ "--entries": data.length }}>
				<ul className={styles.first}>
					{data.length &&
						data.map((entry, index) => (
							<TickerEntry key={`entry-${index}`} entry={entry} />
						))}
				</ul>
				<ul className={styles.second}>
					{data.length &&
						data.map((entry, index) => (
							<TickerEntry key={`entry-${index}`} entry={entry} />
						))}
				</ul>
			</div>
		</aside>
	);
};

export default Ticker;
