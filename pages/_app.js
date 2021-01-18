import "styles/globals.scss";
import { AvailableLocalesContext } from "utils/context";
import useAvailableLocales from "utils/hooks/useAvailableLocales";
import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";

const App = ({ Component, pageProps }) => (
	<AvailableLocalesContext.Provider value={useAvailableLocales()}>
		<Navbar />
		<Component {...pageProps} />
		<Footer />
	</AvailableLocalesContext.Provider>
);

export default App;
