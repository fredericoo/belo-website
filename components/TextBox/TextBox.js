import styles from "./TextBox.module.scss";
import { RichText } from "prismic-reactjs";
import Button from "components/Button/Button";

const TextBox = ({ text, href, cta, padded, row }) => {
	console.log(row);
	return (
		<div
			className={`body body--sans ${styles.box} ${padded ? styles.padded : ""}`}
			style={{ gridRow: row }}
		>
			<RichText render={text} />
			<Button href={href} type="arrow">
				{cta}
			</Button>
		</div>
	);
};

export default TextBox;
