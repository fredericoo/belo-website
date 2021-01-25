import styles from "./Footer.module.scss";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

const Footer = () => {
	const { t } = useTranslation();

	return (
		<footer className={`${styles.section} container`}>
			<h3 className="visually-hidden">{t("common:footer")}</h3>
			<ul className={`loop s-sm loop--sm ${styles.columns}`}>
				<li>
					<h3>Belo Investment Research</h3>
					R. Ouro Fino 395/701. <br />
					Belo Horizonte MG, Brazil
				</li>
				<li>
					<h3>Links</h3>
					<p>
						<Link href="/company">{t("common:menu.about")}</Link>
					</p>
					<p>
						<Link href="/contact">{t("common:menu.contact")}</Link>
					</p>
				</li>
			</ul>
		</footer>
	);
};
export default Footer;
