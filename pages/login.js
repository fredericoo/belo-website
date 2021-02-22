import styles from "./login.module.scss";
import Layout from "components/Layout/Layout";
import Meta from "components/Meta/Meta";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import Button from "components/Button/Button";

const LoginPage = () => {
	const { t } = useTranslation();
	const [auth, setAuth] = useState();
	const [loading, setLoading] = useState(false);

	const handleAuth = (e) => {
		e.preventDefault();
		if (window) {
			setAuth(null);
			setLoading(true);
			window.setTimeout(() => {
				setLoading(false);
				setAuth(false);
			}, 300 + Math.random() * 600);
		}
	};

	return (
		<Layout>
			<Meta pageTitle={t("common:login")} />
			<section className={`${styles.viewport} container`}>
				<header className={styles.header}>
					<h1 className="h-3">{t("common:login")}</h1>
				</header>
				<form
					onSubmit={handleAuth}
					className={`${styles.form} ${loading && styles.loading}`}
				>
					<label className={`smcp`} htmlFor="username">
						Email or Client ID
					</label>
					<input type="text" name="username" id="username" required />
					<label className={`smcp`} htmlFor="password">
						Password
					</label>
					<input type="password" name="password" id="password" required />
					<button className={styles.login} type="submit">
						{loading ? "Loading" : "Log in"}
					</button>
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
					<Button type="link" href="/">
						Forgot your password?
					</Button>
				</div>
			</section>
		</Layout>
	);
};
LoginPage.Navbar = () => null;
LoginPage.Footer = () => null;

export default LoginPage;
