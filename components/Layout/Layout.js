import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import { AvailableLocalesContext } from "utils/context";

export const Layout = ({ children, altLangs }) => {
	const { t } = useTranslation();
	return (
		<>
			<AvailableLocalesContext.Consumer>
				{([_, setAltLangs]) => {
					altLangs ? setAltLangs(altLangs) : setAltLangs(undefined);
					return null;
				}}
			</AvailableLocalesContext.Consumer>
			<Head>
				{/* <link rel="preload" href="/fonts/" as="font" /> */}
				<title>{t("common:title")}</title>
			</Head>
			<main>{children}</main>
		</>
	);
};

export default Layout;
