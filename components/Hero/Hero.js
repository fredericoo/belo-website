import styles from "./Hero.module.scss";
import { useState, useEffect } from "react";
import Button from "components/Button/Button";
import { RichText } from "prismic-reactjs";
import TextBox from "components/TextBox/TextBox";

const Hero = ({ heading, about, cta }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		window && window.setTimeout(() => setIsLoaded(true), 300);
	}, []);

	return (
		<section className={`grid grid--full ${styles.section}`}>
			<div
				className={`${styles.canvas} ${isLoaded ? styles.loaded : ""}`}
			></div>
			<h1 className={`h-1 ${styles.heading}`}>{RichText.asText(heading)}</h1>

			<TextBox text={about} href="/about" cta={cta} row="2" padded />
		</section>
	);
};

export default Hero;
