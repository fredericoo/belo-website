import styles from "./Spacer.module.scss";

const Spacer = ({ primary }) => (
	<section
		className={`${styles.section}`}
		style={{ height: `${primary.height}rem` }}
	></section>
);

export default Spacer;
