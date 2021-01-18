import styles from "./Footer.module.scss";
const Footer = () => (
	<footer className={`${styles.section} container`}>
		<h3 className="visually-hidden">Footer</h3>
		<ul className={`loop s-sm loop--md ${styles.columns}`}>
			<li>
				<h3>Belo Investment Research</h3>
				R. Ouro Fino 395/701. <br />
				Belo Horizonte MG, Brazil
			</li>
			<li>
				<h3>Contato</h3>
				<p>belo@belo.re</p>
				<p>+1 646 662 9 863</p>
			</li>
			<li>
				<h3>Links</h3>
				<p>
					<a href="#">Cookies</a>
				</p>
				<p>
					<a href="#">Privacy</a>
				</p>
			</li>
		</ul>
	</footer>
);
export default Footer;
