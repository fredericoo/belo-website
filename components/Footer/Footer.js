import styles from "./Footer.module.scss";
import useTranslation from "next-translate/useTranslation";
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
					<h3>{t("common:menu.contact")}</h3>
					<p>belo@belo.re</p>
					<p>+1 646 662 9 863</p>
				</li>
			</ul>
		</footer>
	);
};
export default Footer;
