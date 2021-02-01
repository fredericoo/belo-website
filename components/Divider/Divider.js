import styles from "./Divider.module.scss";

const Divider = ({ title }) => {
	return (
		<section className={`container ${styles.section}`}>
			<h2 className={`h-div`}>{title}</h2>
		</section>
	);
};

export default Divider;
