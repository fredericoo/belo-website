import Layout from "components/Layout/Layout";
import Hero from "components/Hero/Hero";
import Ticker from "components/Ticker/Ticker";
import Articles from "components/Articles/Articles";
import News from "components/News/News";
import WorldNews from "components/WorldNews/WorldNews";
import AltData from "components/AltData/AltData";
import Meta from "components/Meta/Meta";
import { Client } from "utils/prismicHelpers";

export default function Home({ doc }) {
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
			<News showDivider />
			<WorldNews showDivider perPage={8} display={5} />
			<AltData showDivider />
			<Articles showDivider />
		</Layout>
	);
}

export async function getStaticProps({ locale }) {
	const client = Client();
	const doc = await client.getSingle("home", { lang: locale });

	if (doc) {
		return {
			revalidate: 600,
			props: {
				doc: doc || {},
			},
		};
	}
	return { revalidate: 60, props: { doc: {} } };
}
