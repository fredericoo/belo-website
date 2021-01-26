import Layout from "components/Layout/Layout";
import Meta from "components/Meta/Meta";
import useTranslation from "next-translate/useTranslation";
import styles from "./company.module.scss";
import { Client } from "utils/prismicHelpers";
import { queryRepeatableDocuments } from "utils/queries";
import Team from "components/Team/Team";
import { RichText } from "prismic-reactjs";
import { Fragment } from "react";
import Placeholder from "components/Placeholder/Placeholder";

export default function Page({ team, about }) {
	const { t } = useTranslation();
	const zeroPad = (num, places) => String(num).padStart(places, "0");
	if (about) {
		return (
			<Layout altLangs={about.alternate_languages}>
				<Meta
					pageTitle={t("common:menu.about")}
					pageDesc={RichText.asText(about.data.about)}
				/>
				<header className={`${styles.header} grid grid--inner`}>
					<div className={`${styles.established} s-sm`}>
						{about.data.established}
					</div>
					<h1 className={`${styles.title} h-1`}>
						{RichText.asText(about.data.heading)}
					</h1>
				</header>
				<section className={`${styles.section} grid grid--inner`}>
					<hr className={styles.divider} />
					<div className={`${styles.how}`}>
						<RichText render={about.data.about} />
					</div>
					{about.data.image && (
						<div className={styles.image}>
							<Placeholder
								src={about.data.image.url}
								width={about.data.image.dimensions.width}
								height={about.data.image.dimensions.height}
								quality={100}
								unoptimized
							/>
						</div>
					)}
				</section>
				<section className={`${styles.section}`}>
					<Team
						members={team.map((doc) => {
							return {
								uid: doc.slugs[0],
								name: doc.data.name,
								position: doc.data.position,
								photo: doc.data.photo,
								bio: doc.data.bio,
								priority: doc.data.priority,
							};
						})}
					/>
				</section>

				<section className={`${styles.section} grid grid--inner`}>
					<hr className={styles.divider} />
					<h2 className={`${styles.heading} h-1`}>{t("common:purpose")}</h2>

					{about.data.purpose.map((purpose, index) => (
						<Fragment key={`purpose-${index}`}>
							<h3 className={`${styles.subHeading}`}>
								{RichText.asText(purpose.title)}
							</h3>
							<div className={styles.textBlock}>
								<RichText render={purpose.text} />
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
	const documents = await queryRepeatableDocuments(
		(doc) => doc.type === "member" && doc.lang === locale
	);
	const client = Client();
	const about = await client.getSingle("about", { lang: locale });

	if (documents) {
		return {
			revalidate: 600,
			props: {
				about: about || {},
				team: documents || {},
			},
		};
	}
	return { revalidate: 60, props: { team: {}, about: {} } };
}
