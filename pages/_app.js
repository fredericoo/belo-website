import "styles/globals.scss";
import Navbar from "components/Navbar/Navbar";

const App = ({ Component, pageProps }) => (
	<>
		<Navbar altLangs={pageProps.altLangs} />
		<Component {...pageProps} />
	</>
);

export default App;
