import "styles/globals.scss";

import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
import CookieConsent from "components/CookieConsent/CookieConsent";

import moment from "moment";

import { AvailableLocalesContext } from "utils/context";
import useAvailableLocales from "utils/hooks/useAvailableLocales";
import { useRouter } from "next/router";

const App = ({ Component, pageProps }) => {
	const { locale } = useRouter();
	const availableLocales = useAvailableLocales();
	moment.locale(locale);
	const NavbarComponent = Component.Navbar || Navbar;
	const FooterComponent = Component.Footer || Footer;
	return (
		<AvailableLocalesContext.Provider value={availableLocales}>
			<CookieConsent />
			<NavbarComponent />
			<Component {...pageProps} />
			<FooterComponent />
		</AvailableLocalesContext.Provider>
	);
};

export default App;
