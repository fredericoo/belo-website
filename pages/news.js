import Layout from "components/Layout/Layout";
import News from "components/News/News";
import Meta from "components/Meta/Meta";
import Divider from "components/Divider/Divider";
import useTranslation from "next-translate/useTranslation";

export default function Page() {
	const { t } = useTranslation();
	return (
		<Layout>
			<Meta pageTitle={t("common:menu.news")} />
			<Divider />
			<News perPage={9} />
		</Layout>
	);
}
