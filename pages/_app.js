import "styles/globals.scss";
import Navbar from "components/Navbar/Navbar";
import CookieConsent from "components/CookieConsent/CookieConsent";

const App = ({ Component, pageProps }) => (
	<>
		<CookieConsent />
		<Navbar altLangs={pageProps.altLangs} />
		<Component {...pageProps} />
	</>
);

export default App;
