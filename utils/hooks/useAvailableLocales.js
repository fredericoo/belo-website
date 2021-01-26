import { useState } from "react";
import { useRouter } from "next/router";

const useAvailableLocales = () => {
	const router = useRouter();
	const [availableLocales, setAvailableLocales] = useState();
	return [availableLocales, setAvailableLocales];
};

export default useAvailableLocales;
