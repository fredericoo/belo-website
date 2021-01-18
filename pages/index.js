import Layout from "components/Layout/Layout";
import Hero from "components/Hero/Hero";
import Ticker from "components/Ticker/Ticker";
import Articles from "components/Articles/Articles";
import News from "components/News/News";

export default function Home() {
	return (
		<Layout>
			<Ticker />
			<Hero />
			<Articles />
			<News />
		</Layout>
	);
}
