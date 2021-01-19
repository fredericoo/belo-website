import Layout from "components/Layout/Layout";
import AltData from "components/AltData/AltData";
import Meta from "components/Meta/Meta";
import useTranslation from "next-translate/useTranslation";

export default function Page() {
	const { t } = useTranslation();
	return (
		<Layout>
			<Meta pageTitle={t("common:menu.alternativeData")} />
			<AltData perPage={9} />
		</Layout>
	);
}
