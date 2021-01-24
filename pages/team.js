import Layout from "components/Layout/Layout";
import Team from "components/Team/Team";
import Meta from "components/Meta/Meta";
import useTranslation from "next-translate/useTranslation";
import { queryRepeatableDocuments } from "utils/queries";

export default function Page({ docs }) {
	const { t } = useTranslation();
	return (
		<Layout>
			<Meta pageTitle={t("common:menu.team")} />
			<Team
				members={docs.map((doc) => {
					return {
						uid: doc.slugs[0],
						name: doc.data.name,
						position: doc.data.position,
						photo: doc.data.photo,
						bio: doc.data.bio,
					};
				})}
			/>
		</Layout>
	);
}

export async function getStaticProps({ locale }) {
	const documents = await queryRepeatableDocuments(
		(doc) => doc.type === "member" && doc.lang === locale
	);

	if (documents) {
		return {
			revalidate: 60,
			props: {
				docs: documents || {},
			},
		};
	}
	return { revalidate: 600, props: { docs: {} } };
}
