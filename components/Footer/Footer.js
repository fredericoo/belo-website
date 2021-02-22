import styles from "./Footer.module.scss";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

const Footer = () => {
	const { t } = useTranslation();

	return (
		<footer className={`grid grid--inner ${styles.section}`}>
			<h3 className="visually-hidden">{t("common:footer")}</h3>
			<ul className={`loop s-sm loop--sm ${styles.columns}`}>
				<li>
					<h3>Belo Investment Research</h3>
					<Link href="https://www.google.com/maps/place/R.+Ouro+Fino,+395+-+Cruzeiro,+Belo+Horizonte+-+MG,+30310-110,+Brazil/@-19.9417481,-43.9279316,17z/data=!3m1!4b1!4m5!3m4!1s0xa699c7ea8510bf:0xfe655261aaffb3d9!8m2!3d-19.9417481!4d-43.9257376">
						<a target="_blank" className={styles.pin}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width=".85rem"
								height=".85rem"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="butt"
								strokeLinejoin="arcs"
							>
								<circle cx="12" cy="10" r="3" />
								<path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
							</svg>
						</a>
					</Link>{" "}
					{t("common:address.line1")} <br />
					{t("common:address.line2")}
					<br />
				</li>
				<li>
					<h3>Links</h3>
					<ul>
						<li className={styles.link}>
							<Link href="/about">{t("common:menu.about")}</Link>
						</li>
						<li className={styles.link}>
							<Link href="/contact">{t("common:menu.contact")}</Link>
						</li>
					</ul>
				</li>
			</ul>
		</footer>
	);
};
export default Footer;
