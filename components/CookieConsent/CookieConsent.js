import styles from "./CookieConsent.module.scss";
import Button from "components/Button/Button";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import useTranslation from "next-translate/useTranslation";

const CookieInfo = ({ onReject }) => {
	const { t } = useTranslation();
	return (
		<div className={`${styles.info} s-sm body body--sans`}>
			<h2>{t("common:cookies.infoHeading")}</h2>
			<p>{t("common:cookies.infoText")}</p>
			<p className="info">{t("common:cookies.infoAside")}</p>
			<p>{t("common:cookies.analyticsAbout")}</p>
			<ul>
				<li>{t("common:cookies.analyticsAbout1")};</li>
				<li>{t("common:cookies.analyticsAbout2")};</li>
				<li>{t("common:cookies.analyticsAbout3")}.</li>
			</ul>
			<p>{t("common:cookies.analytics")}</p>
			<table>
				<thead>
					<tr>
						<th>{t("common:cookies.name")}</th>
						<th>{t("common:cookies.purpose")}</th>
						<th width={100}>{t("common:cookies.expires")}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>_ga</td>
						<td>{t("common:cookies.analyticsPurpose")}</td>
						<td>2 {t("common:cookies.years")}</td>
					</tr>
					<tr>
						<td>_gid</td>
						<td>{t("common:cookies.analyticsPurpose")}</td>
						<td>24 {t("common:cookies.hours")}</td>
					</tr>
				</tbody>
			</table>
			<Button type="secondary" onClick={onReject}>
				{t("common:cookies.reject")}
			</Button>
		</div>
	);
};

const CookieConsent = ({ debug = false }) => {
	const { t } = useTranslation();
	const cookies = new Cookies();
	let expiryDate = new Date();
	const month = (expiryDate.getMonth() + 1) % 12;
	expiryDate.setMonth(month);
	const cookieSettings = {
		path: "/",
		sameSite: true,
		expires: expiryDate,
	};
	const [showInfo, setShowInfo] = useState(false);
	const [dismissed, setDismissed] = useState(true);

	useEffect(() => {
		if (!cookies.get("cookies_status") || debug) {
			setDismissed(false);
		}
	}, []);

	const handleAccept = () => {
		cookies.set("cookies_status", "accept", cookieSettings);
		setDismissed(true);
	};
	const handleReject = () => {
		cookies.set("cookies_status", "reject", cookieSettings);
		setDismissed(true);
	};

	if (dismissed) return null;

	return (
		<aside className={`${styles.prompt} grid grid--inner s-sm`}>
			{showInfo && <CookieInfo onReject={handleReject} />}
			<div className={styles.text}>{t("common:cookies.small")}</div>
			<div className={styles.options}>
				{!showInfo && (
					<Button type="secondary" onClick={() => setShowInfo(true)}>
						{t("common:cookies.info")}
					</Button>
				)}
				<Button type="primary" onClick={handleAccept}>
					{t("common:cookies.accept")}
				</Button>
			</div>
		</aside>
	);
};
export default CookieConsent;
