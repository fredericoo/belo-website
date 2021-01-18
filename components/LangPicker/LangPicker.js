import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { AvailableLocalesContext } from "utils/context";
import styles from "./LangPicker.module.scss";
import Link from "next/link";

const LangPicker = () => {
	let { t } = useTranslation();
	const router = useRouter();
	return (
		<AvailableLocalesContext.Consumer>
			{([locales]) => (
				<ul className={`${styles.locales}`}>
					{locales.map((locale) => (
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
			)}
		</AvailableLocalesContext.Consumer>
	);
};

export default LangPicker;
