import Layout from "components/Layout/Layout";
import Team from "components/Team/Team";
import Meta from "components/Meta/Meta";
import useTranslation from "next-translate/useTranslation";

export default function Page() {
	const { t } = useTranslation();
	return (
		<Layout>
			<Meta pageTitle={t("common:menu.team")} />
			<Team perPage={999} />
		</Layout>
	);
}
