import { useState } from "react";
import Link from "next/link";
import LangPicker from "components/LangPicker/LangPicker";
import styles from "./Navbar.module.scss";
import useTranslation from "next-translate/useTranslation";
import Button from "components/Button/Button";
import { useRouter } from "next/router";

const Navbar = () => {
	const { asPath } = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	const { t } = useTranslation();

	const menu = [
		{ label: "about", href: "/about" },
		{ label: "team", href: "/team" },
		{ label: "articles", href: "/articles" },
		{ label: "contact", href: "/contact" },
	];

	return (
		<nav className={`container ${styles.navbar}`}>
			<div className={`${styles.toggler}`}>
				<Button onClick={toggle} size="sm" type="">
					<div className={`${styles.togglerIcon} ${isOpen ? styles.open : ""}`}>
						<span></span>
					</div>
				</Button>
			</div>
			<Link href="/">
				<a className={styles.logo}>
					<img src="/logo.svg" />
				</a>
			</Link>
			<ul className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
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
			<div className={styles.tools}>
				<LangPicker />
				<div className={styles.login}>
					<Button type="secondary" size="sm" href="/">
						{t("common:login")}
					</Button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
