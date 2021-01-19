import Layout from "components/Layout/Layout";
import Meta from "components/Meta/Meta";
import useTranslation from "next-translate/useTranslation";

export default function Page() {
	const { t } = useTranslation();
	return (
		<Layout>
			<Meta pageTitle={t("common:menu.about")} />
		</Layout>
	);
}
