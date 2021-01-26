import Layout from "components/Layout/Layout";
import AltData from "components/AltData/AltData";
import Meta from "components/Meta/Meta";
import useTranslation from "next-translate/useTranslation";
import styles from "./alt-data.module.scss";

export default function Page() {
	const { t } = useTranslation();
	return (
		<Layout>
			<Meta pageTitle={t("common:menu.alternativeData")} />
			<header className={`${styles.section} grid grid--inner`}>
				<h2 className={`${styles.heading} h-1`}>
					{t("common:menu.alternativeData")}
				</h2>

				<div className={styles.textBlock}>Markup text</div>
			</header>
			<AltData perPage={9} />
		</Layout>
	);
}
