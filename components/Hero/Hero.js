import styles from "./Hero.module.scss";
import { useRef, useEffect } from "react";
import Button from "components/Button/Button";

const Hero = () => {
	const canvasRef = useRef();
	useEffect(() => {
		if (canvasRef.current && window) {
			const context = canvasRef.current.getContext("2d");
			let time = 0;
			const color = function (x, y, r, g, b) {
				context.fillStyle = `rgb(${r}, ${g}, ${b})`;
				context.fillRect(x, y, 10, 10);
			};
			const R = function (x, y, time) {
				return Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + time));
			};

			const G = function (x, y, time) {
				return Math.floor(
					192 +
						64 *
							Math.sin(
								(x * x * Math.cos(time / 4) + y * y * Math.sin(time / 3)) / 300
							)
				);
			};

			const B = function (x, y, time) {
				return Math.floor(
					192 +
						64 *
							Math.sin(
								5 * Math.sin(time / 9) +
									((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100
							)
				);
			};
			const startAnimation = function () {
				for (let x = 0; x <= 30; x++) {
					for (let y = 0; y <= 30; y++) {
						color(x, y, R(x, y, time), G(x, y, time), B(x, y, time));
					}
				}
				time = time + 0.03;
				window.requestAnimationFrame(startAnimation);
			};

			startAnimation();
		}
	}, [canvasRef]);

	return (
		<section className={`grid grid--full ${styles.section}`}>
			<canvas
				ref={canvasRef}
				className={styles.canvas}
				width="16px"
				height="4px"
			></canvas>
			<div className={styles.overlay}></div>
			<h1 className={`h-1 ${styles.heading}`}>
				Extraímos valor das informações mais adequadas visando a melhor gestão
				de cada carteira.
			</h1>
			<div className={`body ${styles.box}`}>
				<p>
					A Belo Investment Research une expertise acadêmica e tecnologia de
					ponta na investigação de fontes, coleta, seleção, cruzamento e análise
					de dados alternativos e tradicionais, para embasar as decisões de
					investidores institucionais.
				</p>
				<Button href="/#" type="arrow">
					Saiba mais
				</Button>
			</div>
		</section>
	);
};

export default Hero;
