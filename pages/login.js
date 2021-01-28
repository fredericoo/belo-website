import styles from "./login.module.scss";
import Layout from "components/Layout/Layout";
import Meta from "components/Meta/Meta";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import Link from "next/link";
import Button from "components/Button/Button";

const LoginPage = () => {
	const { t } = useTranslation();
	const [auth, setAuth] = useState();

	return (
		<Layout>
			<Meta pageTitle={t("common:login")} />
			<section className={`${styles.viewport} container`}>
				<header className={styles.header}>
					<h1 className="h-3">{t("common:login")}</h1>
				</header>
				<form className={styles.form}>
					<label className={`smcp`} htmlFor="username">
						Email or Client ID
					</label>
					<input type="text" name="username" id="username" />
					<label className={`smcp`} htmlFor="password">
						Password
					</label>
					<input type="password" name="password" id="password" />
					<Button type="primary" onClick={() => setAuth(false)}>
						Proceed
					</Button>
					{auth === false && (
						<div className={`${styles.error} s-xs`}>
							Username or password do not check out. Check your credentials and
							try again.
						</div>
					)}
				</form>
				<div className={`${styles.footer} s-sm`}>
					<Button type="arrowBack" href="/">
						Back to Belo.re
					</Button>
				</div>
			</section>
		</Layout>
	);
};
LoginPage.Navbar = () => null;
LoginPage.Footer = () => null;

export default LoginPage;
