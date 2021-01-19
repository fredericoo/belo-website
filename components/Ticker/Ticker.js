import styles from "./Ticker.module.scss";

const TickerEntry = ({ entry }) => {
	const positive = entry.value > 0;
	return (
		<li className={`s-xs ${styles.entry} ${positive && styles.positive}`}>
			<div className={`${styles.label}`}>{entry.label}</div>
			<div className={`${styles.marketPrice}`}>{entry.marketPrice}</div>
			<div className={styles.arrow}></div>
			<div className={`${styles.value}`}>
				{entry.value}&emsp;
				{(
					100 -
					((entry.marketPrice + entry.value) * 100) / entry.marketPrice
				).toFixed(2)}
				%
			</div>
		</li>
	);
};

const Ticker = ({}) => {
	const data = [
		{
			label: "Euro Stoxx 50 Pr",
			marketPrice: 3602.67,
			value: 3.12,
		},
		{
			label: "Euro Stoxx 50 Pr",
			marketPrice: 3602.67,
			value: -3.12,
		},
		{
			label: "Euro Stoxx 50 Pr",
			marketPrice: 3602.67,
			value: 3.12,
		},
		{
			label: "Euro Stoxx 50 Pr",
			marketPrice: 3602.67,
			value: -3.12,
		},
		{
			label: "Euro Stoxx 50 Pr",
			marketPrice: 3602.67,
			value: 3.12,
		},
		{
			label: "Euro Stoxx 50 Pr",
			marketPrice: 3602.67,
			value: -3.12,
		},
		{
			label: "Euro Stoxx 50 Pr",
			marketPrice: 3602.67,
			value: 3.12,
		},
		{
			label: "Euro Stoxx 50 Pr",
			marketPrice: 3602.67,
			value: -3.12,
		},
	];

	return (
		<aside className={styles.ticker}>
			<div className={styles.viewport} style={{ "--entries": data.length }}>
				<ul className={styles.first}>
					{data.map((entry, index) => (
						<TickerEntry key={`entry-${index}`} entry={entry} />
					))}
				</ul>
				<ul className={styles.second}>
					{data.map((entry, index) => (
						<TickerEntry key={`entry-${index}`} entry={entry} />
					))}
				</ul>
			</div>
		</aside>
	);
};

export default Ticker;
