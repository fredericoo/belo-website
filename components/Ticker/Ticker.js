import styles from "./Ticker.module.scss";
import { useState, useEffect } from "react";
import { withSeparator } from "./utils/numbers";
import useTranslation from "next-translate/useTranslation";

const TickerEntry = ({ entry }) => {
	if (entry.symbol) {
		const { t } = useTranslation();
		const direction =
			entry.change > 0 ? "positive" : entry.change < 0 ? "negative" : "neutral";
		return (
			<li className={`s-xs ${styles.entry} ${styles[direction]}`}>
				<div className={`${styles.label}`}>{entry.name}</div>
				<div className={`${styles.price}`}>
					{withSeparator(
						entry.price,
						t("common:separator.decimal"),
						t("common:separator.thousands")
					)}
				</div>
				<div className={styles.arrow}></div>
				<div className={`${styles.value}`}>
					{withSeparator(
						entry.change,
						t("common:separator.decimal"),
						t("common:separator.thousands")
					)}
					&ensp;(
					{withSeparator(
						entry.changesPercentage,
						t("common:separator.decimal"),
						t("common:separator.thousands")
					)}
					%)
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
