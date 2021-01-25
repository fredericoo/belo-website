import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import { AvailableLocalesContext } from "utils/context";
import { useContext, useEffect } from "react";

export const Layout = ({ children, altLangs }) => {
	const { t } = useTranslation();
	const [_, setAltLangs] = useContext(AvailableLocalesContext);
	useEffect(() => {
		altLangs ? setAltLangs(altLangs) : setAltLangs(undefined);
	}, [children]);

	return (
		<>
			<Head>
				<link
					rel="preload"
					href="//fonts/fakt/364db368710f5fb837ef8418c6d51df3e3027bfb.woff2"
					as="font"
				/>
				<link
					rel="preload"
					href="//fonts/fakt/7071de2dc925341ccc839e2d8a7dea79820800b3.woff2"
					as="font"
				/>
				<title>{t("common:title")}</title>
			</Head>
			<main>{children}</main>
		</>
	);
};

export default Layout;
