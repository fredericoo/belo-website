import Head from "next/head";
import useTranslation from "next-translate/useTranslation";

export const Layout = ({ children }) => {
	const { t } = useTranslation();
	return (
		<>
			<Head>
				{/* <link rel="preload" href="/fonts/" as="font" /> */}
				<title>{t("common:title")}</title>
			</Head>
			<main>{children}</main>
		</>
	);
};

export default Layout;
