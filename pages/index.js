import Layout from "components/Layout/Layout";
import Hero from "components/Hero/Hero";
import Ticker from "components/Ticker/Ticker";
import Articles from "components/Articles/Articles";
import News from "components/News/News";
import WorldNews from "components/WorldNews/WorldNews";
import AltData from "components/AltData/AltData";
import Meta from "components/Meta/Meta";
import useTranslation from "next-translate/useTranslation";

export default function Home() {
	const { t } = useTranslation();
	return (
		<Layout>
			<Meta />
			<Ticker />
			<Hero heading={t("common:desc")} />
			<News showDivider />
			<WorldNews showDivider perPage={8} display={5} />
			<AltData showDivider />
			<Articles showDivider />
		</Layout>
	);
}
