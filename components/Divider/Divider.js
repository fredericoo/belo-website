import styles from "./Divider.module.scss";

const Divider = ({ title, spacer }) => {
	return (
		<section className={`container ${styles.section}`}>
			<h2 className={`h-div ${spacer ? styles.transparent : ""}`}>{title}</h2>
		</section>
	);
};

export default Divider;
