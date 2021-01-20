import styles from "./Hero.module.scss";
import { useState, useEffect } from "react";
import Button from "components/Button/Button";

const Hero = ({ heading }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		setIsLoaded(true);
	}, []);

	return (
		<section className={`grid grid--full ${styles.section}`}>
			<div
				className={`${styles.canvas} ${isLoaded ? styles.loaded : ""}`}
			></div>
			<div className={styles.overlay}></div>
			<h1 className={`h-1 ${styles.heading}`}>{heading}</h1>
			<div className={`body body--sans ${styles.box}`}>
				<p>
					A Belo Investment Research une expertise acadêmica e tecnologia de
					ponta na investigação de fontes, coleta, seleção, cruzamento e análise
					de dados alternativos e tradicionais, para embasar as decisões de
					investidores institucionais.
				</p>
				<Button href="/about" type="arrow">
					Saiba mais
				</Button>
			</div>
		</section>
	);
};

export default Hero;
