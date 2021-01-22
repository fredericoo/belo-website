import styles from "./Ticker.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const TickerEntry = ({ entry }) => {
	if (entry.symbol) {
		const direction =
			entry.change > 0 ? "positive" : entry.change < 0 ? "negative" : "neutral";
		return (
			<li className={`s-xs ${styles.entry} ${styles[direction]}`}>
				<div className={`${styles.label}`}>{entry.name}</div>
				<div className={`${styles.price}`}>{entry.price}</div>
				<div className={styles.arrow}></div>
				<div className={`${styles.value}`}>
					{entry.change}&emsp;{entry.changesPercentage}%
				</div>
			</li>
		);
	}
	return (
		<li className={`s-xs ${styles.entry} ${styles.skeleton}`}>
			<div className={`${styles.label}`}>Stock Label</div>
			<div className={`${styles.price}`}>123.456</div>
			<div className={styles.arrow}></div>
			<div className={`${styles.value}`}>1.2345&emsp;1.2345%</div>
		</li>
	);
};

const Ticker = ({}) => {
	const [data, setData] = useState(new Array(5).fill({}));
	useEffect(() => {
		fetch("/api/market")
			.then((res) => res.json())
			.then((data) => {
				if (data.stocks.length) setData(data.stocks);
			});
	}, []);

	return (
		<aside className={styles.ticker}>
			<div
				className={styles.viewport}
				style={{ "--entries": data.length || 5 }}
			>
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
