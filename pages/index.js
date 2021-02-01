import Layout from "components/Layout/Layout";
import Hero from "components/Hero/Hero";
import Ticker from "components/Ticker/Ticker";
import News from "components/News/News";
import WorldNews from "components/WorldNews/WorldNews";
import AltData from "components/AltData/AltData";
import Meta from "components/Meta/Meta";
import { Client } from "utils/prismicHelpers";
import useTranslation from "next-translate/useTranslation";
import Divider from "components/Divider/Divider";
import TextBox from "components/TextBox/TextBox";
import DecoImage from "components/DecoImage/DecoImage";

export default function Home({ doc, altdata }) {
	const { t } = useTranslation();
	return (
		<Layout>
			<Meta />
			<Ticker />
			{doc && doc.data && (
				<Hero
					heading={doc.data.heading}
					about={doc.data.about}
					cta={doc.data.cta}
				/>
			)}
			<Divider title={t("common:menu.news")} />
			<News display={3} perPage={8} showDivider />
			<Divider title={t("common:menu.world")} />
			<WorldNews display={3} perPage={8} showDivider />

			<Divider title={t("common:menu.alternativeData")} />
			<section className="grid grid--inner">
				<DecoImage src={"/img/alt-data-deco.svg"} />
				{altdata?.data && altdata.data.lead && (
					<TextBox
						text={altdata.data.lead}
						href="/alt-data"
						cta={doc.data.cta}
					/>
				)}
			</section>
			<Divider spacer />
			<AltData display={2} perPage={4} showDivider />
		</Layout>
	);
}

export async function getStaticProps({ locale }) {
	const client = Client();
	const doc = await client.getSingle("home", { lang: locale });
	const altdata = await client.getSingle("altdata", { lang: locale });

	if (doc) {
		return {
			revalidate: 600,
			props: {
				doc: doc || {},
				altdata: altdata || {},
			},
		};
	}
	return { revalidate: 60, props: { doc: {}, altdata: {} } };
}
