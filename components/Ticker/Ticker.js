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
					{ duration: 2000 }
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
	const [play, setPlay] = useState(true);

	const fetcher = (url) => fetch(url).then((r) => r.json());
	const { t } = useTranslation();

	const { data, error } = useSWR("/api/market", fetcher, {
		refreshInterval: 60000,
	});
	if (error) return null;
	const skeleton = { stocks: new Array(5).fill({}) };

	return (
		<aside className={styles.ticker}>
			<button
				className={`${styles.button}`}
				type="button"
				onClick={() => setPlay(!play)}
			>
				{play ? <Pause /> : <Play />}
			</button>
			<div
				className={styles.viewport}
				style={{ "--entries": data?.stocks.length || skeleton.stocks.length }}
			>
				<ul className={`${styles.first} ${play ? styles.play : ""}`}>
					{data?.stocks.length &&
						data.stocks.map((entry, index) => (
							<TickerEntry key={`entry-${index}`} entry={entry} />
						))}
				</ul>
				<ul className={`${styles.second} ${play ? styles.play : ""}`}>
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

const Play = ({ size = 16, color = "currentColor" }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke={color}
		strokeWidth="1"
		strokeLinecap="butt"
		strokeLinejoin="arcs"
	>
		<polygon points="5 3 19 12 5 21 5 3"></polygon>
	</svg>
);
const Pause = ({ size = 16, color = "currentColor" }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke={color}
		strokeWidth="1"
		strokeLinecap="butt"
		strokeLinejoin="arcs"
	>
		<rect x="6" y="4" width="4" height="16"></rect>
		<rect x="14" y="4" width="4" height="16"></rect>
	</svg>
);

export default Ticker;
