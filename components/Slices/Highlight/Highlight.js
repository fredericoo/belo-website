import styles from "./Highlight.module.scss";
import { RichText } from "prismic-reactjs";

const Highlight = ({ primary }) => (
	<section className={styles.section}>
		<div className={`container s-xl f-serif ${styles.text}`}>
			{primary.text && <RichText render={primary.text} />}
		</div>
	</section>
);

export default Highlight;
