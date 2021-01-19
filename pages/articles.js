import Layout from "components/Layout/Layout";
import Articles from "components/Articles/Articles";
import Meta from "components/Meta/Meta";
import useTranslation from "next-translate/useTranslation";

export default function Page() {
	const { t } = useTranslation();
	return (
		<Layout>
			<Meta pageTitle={t("common:menu.articles")} />
			<Articles perPage={9} />
		</Layout>
	);
}
