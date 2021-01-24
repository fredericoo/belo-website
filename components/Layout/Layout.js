import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";

export const Layout = ({ children, altLangs }) => {
	const { t } = useTranslation();
	return (
		<>
			<Head>
				{/* <link rel="preload" href="/fonts/" as="font" /> */}
				<title>{t("common:title")}</title>
			</Head>
			<Navbar altLangs={altLangs} />
			<main>{children}</main>
			<Footer />
		</>
	);
};

export default Layout;
