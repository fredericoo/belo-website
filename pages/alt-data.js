import Layout from "components/Layout/Layout";
import AltData from "components/AltData/AltData";
import Meta from "components/Meta/Meta";
import useTranslation from "next-translate/useTranslation";
import styles from "./alt-data.module.scss";
import { RichText } from "prismic-reactjs";
import { Client } from "utils/prismicHelpers";
import Slices from "components/Slices/Slices";
import DecoImage from "components/DecoImage/DecoImage";
import Divider from "components/Divider/Divider";

export default function Page({ doc }) {
	const { t } = useTranslation();
	return (
		<Layout>
			<Meta pageTitle={t("common:menu.alternativeData")} />
			<header className={`${styles.section} grid grid--inner`}>
				<DecoImage src={"/img/alt-data-deco.svg"} />
				<div className={`${styles.heading}`}>
					<h2 className={`${styles.title} h-1`}>
						{t("common:menu.alternativeData")}
					</h2>

					{/* {doc?.data && doc.data.lead && (
						<div className={`h-3 ${styles.lead}`}>
							<RichText render={doc.data.lead} />
						</div>
					)} */}
				</div>

				{/* {doc?.data && (
					<div className={`${styles.textBlock} body body--sans s-sm`}>
						<RichText render={doc.data.about} />
					</div>
				)} */}
			</header>
			<Slices slices={doc.data.body} />
			<AltData perPage={9} />
		</Layout>
	);
}

export async function getStaticProps({ locale }) {
	const client = Client();
	const document = await client.getSingle("altdata", { lang: locale });

	if (document) {
		return {
			revalidate: 600,
			props: {
				doc: document || {},
			},
		};
	}
	return { revalidate: 60, props: { doc: {} } };
}
