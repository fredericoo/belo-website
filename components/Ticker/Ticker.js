import styles from "./Ticker.module.scss";
import { withSeparator } from "./utils/numbers";
import useTranslation from "next-translate/useTranslation";
import moment from "moment";
import useSWR from "swr";
import { useState, useEffect, useRef } from "react";

const TickerEntry = ({ entry }) => {
	const numberRef = useRef();
	const [lastValue, setLastValue] = useState(entry.change);
	useEffect(() => {
		if (entry.change != lastValue) {
			setLastValue(entry.change);
			if (numberRef.current) {
				numberRef.current.animate(
					[
						{
							backgroundColor: lastValue > entry.change ? "#fce0b2" : "#73b0a6",
						},
						{ backgroundColor: "transparent" },
					],
					{ duration: 1000 }
				);
			}
		}
	}, [entry]);
	if (entry.symbol) {
		const { t } = useTranslation();
		const direction =
			entry.change > 0 ? "positive" : entry.change < 0 ? "negative" : "neutral";
		return (
			<li className={`s-xs ${styles.entry} ${styles[direction]}`}>
				<div className={`${styles.label}`}>{entry.name}</div>
				<div ref={numberRef} className={`${styles.price}`}>
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
	const fetcher = (url) => fetch(url).then((r) => r.json());
	const { t } = useTranslation();

	const { data, error } = useSWR("/api/market", fetcher, {
		refreshInterval: 60000,
	});
	if (error) return null;
	const skeleton = { stocks: new Array(5).fill({}) };

	return (
		<aside className={styles.ticker}>
			<div
				className={styles.viewport}
				style={{ "--entries": data?.stocks.length || skeleton.stocks.length }}
			>
				<ul className={styles.first}>
					{data?.stocks.length &&
						data.stocks.map((entry, index) => (
							<TickerEntry key={`entry-${index}`} entry={entry} />
						))}
				</ul>
				<ul className={styles.second}>
					{data?.stocks.length &&
						data.stocks.map((entry, index) => (
							<TickerEntry key={`entry-${index}`} entry={entry} />
						))}
				</ul>
			</div>
			{data && data.timestamp && (
				<div className={`${styles.timestamp}`}>
					{t("common:updated")} {moment(data.timestamp).format("lll")}
				</div>
			)}
		</aside>
	);
};

export default Ticker;
