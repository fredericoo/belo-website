import { AvailableLocalesContext } from "utils/context";
import { useContext, useEffect } from "react";

export const Layout = ({ children, altLangs }) => {
	const [_, setAltLangs] = useContext(AvailableLocalesContext);
	useEffect(() => {
		altLangs ? setAltLangs(altLangs) : setAltLangs(undefined);
	}, [children]);

	return <main>{children}</main>;
};

export default Layout;
