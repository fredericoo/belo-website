import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import styles from "./LangPicker.module.scss";
import Link from "next/link";
import { AvailableLocalesContext } from "utils/context";

const LangPicker = () => {
	let { t } = useTranslation();
	const router = useRouter();
	return (
		<AvailableLocalesContext.Consumer>
			{([altLangs, _]) => {
				const altLocales = altLangs
					? altLangs.map((lang) => lang.lang)
					: router.locales;
				const availableLocales = router.locales.filter(
					(lang) => lang === router.locale || altLocales.includes(lang)
				);
				return (
					<ul className={`${styles.locales}`}>
						{availableLocales.map((locale) => (
							<li key={locale}>
								<Link href={router.asPath} locale={locale}>
									<a
										className={`smcp ${styles.locale} ${
											locale === router.locale ? styles.active : ""
										}`}
									>
										{t(`common:locales.${locale}`)}
									</a>
								</Link>
							</li>
						))}
					</ul>
				);
			}}
		</AvailableLocalesContext.Consumer>
	);
};

export default LangPicker;
