import Layout from "components/Layout/Layout";
import Meta from "components/Meta/Meta";
import useTranslation from "next-translate/useTranslation";
import styles from "./contact.module.scss";
import { Client } from "utils/prismicHelpers";
import { RichText } from "prismic-reactjs";
import { Fragment } from "react";

export default function Page({ doc }) {
	const { t } = useTranslation();
	if (doc?.data) {
		return (
			<Layout altLangs={doc.alternate_languages}>
				<Meta
					pageTitle={t("common:menu.contact")}
					pageDesc={RichText.asText(doc.data.text)}
				/>
				<section className={`${styles.section} grid grid--inner`}>
					<div className={styles.heading}>
						<h2 className={`h-1`}>{RichText.asText(doc.data.heading)}</h2>
						<div className={styles.text}>
							<RichText render={doc.data.text} />
						</div>
					</div>
				</section>
				<section className={`${styles.section} grid grid--inner`}>
					{doc.data.contact.map((way, index) => (
						<Fragment key={`contact-${index}`}>
							<h3 className={`${styles.subHeading}`}>{way.form}</h3>
							<div className={styles.textBlock}>
								<RichText render={way.content} />
							</div>
						</Fragment>
					))}
				</section>
			</Layout>
		);
	}
	return null;
}

export async function getStaticProps({ locale }) {
	const client = Client();
	const contact = await client.getSingle("contact_page", { lang: locale });

	if (contact) {
		return {
			revalidate: 600,
			props: {
				doc: contact || {},
			},
		};
	}
	return { revalidate: 60, props: { doc: {} } };
}
