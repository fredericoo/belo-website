import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import Footer from "components/Footer/Footer";

export const Layout = ({ children, altLangs }) => {
	const { t } = useTranslation();
	return (
		<>
			<Head>
				{/* <link rel="preload" href="/fonts/" as="font" /> */}
				<title>{t("common:title")}</title>
			</Head>
			<main>{children}</main>
			<Footer />
		</>
	);
};

export default Layout;
