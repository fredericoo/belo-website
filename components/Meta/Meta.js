import Head from "next/head";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

const Meta = ({ pageTitle, pageDesc, pageType, pageImage }) => {
	let { t } = useTranslation();
	const { asPath } = useRouter();
	const tabInfo = {
		title: pageTitle
			? `${pageTitle} — ${t("common:title")}`
			: t("common:title"),
		desc: pageDesc ? pageDesc : t("common:desc"),
	};

	const seoImage =
		pageImage ||
		"https://images.prismic.io/belo/0faddb0b-d869-4fd4-af20-cfb4fc09b92c_belo-inside+copy.jpg?&rect=0,104,1440,683&w=1200&h=627";

	return (
		<Head>
			<title>{tabInfo.title}</title>
			<meta
				name="viewport"
				content="viewport-fit=cover, width=device-width, initial-scale=1.0"
			/>
			<meta property="og:title" content={tabInfo.title} />

			<meta property="og:description" content={tabInfo.desc} />
			<meta name="description" content={tabInfo.desc} />

			<link rel="canonical" href={`https://belo.re${asPath}`} />
			<meta property="og:url" href={`https://belo.re${asPath}`} />

			<meta property="og:image" content={seoImage} />

			<meta property="og:type" content={pageType || "website"} />

			<meta name="theme-color" content="#f0f0f0" />
			<link rel="manifest" href="/manifest.json" />
			<meta name="msapplication-config" content="/browserconfig.xml" />

			<meta name="copyright" content="Frederico Batista" />
			<meta name="designer" content="Penumbra design et web" />

			<meta name="robots" content="index,follow" />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="og:email" content="belo@belo.re" />

			{/* WEB APP */}
			<meta name="apple-mobile-web-app-capable" content="yes" />
			<meta
				name="apple-mobile-web-app-status-bar-style"
				content="default"
				// content="black-translucent"
			/>

			{/* FAVICONS */}
			<link rel="icon" href="/favicons/favicon-32.png" sizes="32x32" />
			<link rel="icon" href="/favicons/favicon-57.png" sizes="57x57" />
			<link rel="icon" href="/favicons/favicon-76.png" sizes="76x76" />
			<link rel="icon" href="/favicons/favicon-96.png" sizes="96x96" />
			<link rel="icon" href="/favicons/favicon-128.png" sizes="128x128" />
			<link rel="icon" href="/favicons/favicon-192.png" sizes="192x192" />
			<link rel="icon" href="/favicons/favicon-228.png" sizes="228x228" />

			<link
				rel="shortcut icon"
				sizes="196x196"
				href="/favicons/favicon-196.png"
			/>

			<link
				rel="apple-touch-icon"
				href="/favicons/favicon-120.png"
				sizes="120x120"
			/>
			<link
				rel="apple-touch-icon"
				href="/favicons/favicon-152.png"
				sizes="152x152"
			/>
			<link
				rel="apple-touch-icon"
				href="/favicons/favicon-180.png"
				sizes="180x180"
			/>

			<meta name="msapplication-TileColor" content="#FFFFFF" />
			<meta
				name="msapplication-TileImage"
				content="/favicons/favicon-144.png"
			/>

			<link rel="icon" href="/favicons/favicon.svg" />
			<link rel="mask-icon" href="/favicons/favicon.svg" color="#000000" />
		</Head>
	);
};

export default Meta;
