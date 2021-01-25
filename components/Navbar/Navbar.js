import { useState, useEffect } from "react";
import Link from "next/link";
import LangPicker from "components/LangPicker/LangPicker";
import styles from "./Navbar.module.scss";
import useTranslation from "next-translate/useTranslation";
import Button from "components/Button/Button";
import { useRouter } from "next/router";

const Navbar = () => {
	const { asPath, locales, locale } = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	const { t } = useTranslation();

	useEffect(() => {
		setIsOpen(false);
	}, [asPath]);

	const menu = [
		{ label: "about", href: "/company" },
		// { label: "team", href: "/team" },
		{ label: "articles", href: "/articles" },
		{ label: "news", href: "/news" },
		{ label: "alternativeData", href: "/alt-data" },
		{ label: "contact", href: "/contact" },
	];

	return (
		<nav className={`container ${styles.navbar}`}>
			<Link href="/">
				<a className={styles.logo}>
					<img src="/logo.svg" />
				</a>
			</Link>
			<div className={styles.viewport}>
				<div className={`${styles.tools} ${isOpen ? styles.open : ""}`}>
					<ul className={styles.menu}>
						{menu.map(({ label, href }) => (
							<li key={label}>
								<Link href={href}>
									<a
										className={` ${styles.item} ${
											asPath === href ? styles.active : ""
										}`}
									>
										{t(`common:menu.${label}`)}
									</a>
								</Link>
							</li>
						))}
					</ul>
					<LangPicker />
					<div className={styles.login}>
						<Button type="secondary" size="sm" href="/login">
							{t("common:login")}
						</Button>
					</div>
				</div>
			</div>
			<button
				label={t("common:toggleMenu")}
				className={`${styles.toggler}`}
				type="button"
				onClick={toggle}
			>
				<div className={`${styles.togglerIcon} ${isOpen ? styles.open : ""}`}>
					<span></span>
				</div>
			</button>
		</nav>
	);
};

export default Navbar;
