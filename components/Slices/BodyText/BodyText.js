import styles from "./BodyText.module.scss";
import { RichText } from "prismic-reactjs";

const BodyText = ({ primary }) => (
	<section className={`body ${styles.section}`}>
		{primary.text && <RichText render={primary.text} />}
	</section>
);

export default BodyText;
