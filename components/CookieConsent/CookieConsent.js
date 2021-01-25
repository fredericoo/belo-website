import styles from "./CookieConsent.module.scss";
import Button from "components/Button/Button";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const CookieInfo = ({ onReject }) => (
	<div className={`${styles.info} s-sm body body--sans`}>
		<h2>Cookies used to improve your experience</h2>
		<p>
			We use Google Analytics software (Universal Analytics) to collect
			anonymised information about how you use our website. We do this to help
			make sure the site is meeting the needs of its users and to help us make
			improvements to the site and to government digital services.
		</p>
		<p className="info">
			We do not allow Google to use or share the data about how you use this
			site.
		</p>
		<p>Google Analytics stores information about:</p>
		<ul>
			<li>how you got to the site;</li>
			<li>the pages you visit on belo.re and how long you spend on them;</li>
			<li>what you click on while you’re visiting the site</li>
		</ul>
		<p>Google Analytics sets the following cookies:</p>
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Purpose</th>
					<th width={100}>Expires</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>_ga</td>
					<td>
						These help us count how many people visit belo.re by tracking if
						you’ve visited before
					</td>
					<td>2 years</td>
				</tr>
				<tr>
					<td>_gid</td>
					<td>
						These help us count how many people visit belo.re by tracking if
						you’ve visited before
					</td>
					<td>24 hours</td>
				</tr>
			</tbody>
		</table>
		<Button type="secondary" onClick={onReject}>
			Reject cookies
		</Button>
	</div>
);

const CookieConsent = ({ debug = false }) => {
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
			<div className={styles.text}>
				belo.re puts small files (known as ‘cookies’) onto your computer to
				collect information about how you browse the site.
			</div>
			<div className={styles.options}>
				{!showInfo && (
					<Button type="secondary" onClick={() => setShowInfo(true)}>
						More information
					</Button>
				)}
				<Button type="primary" onClick={handleAccept}>
					Accept
				</Button>
			</div>
		</aside>
	);
};
export default CookieConsent;
