import styles from "./Divider.module.scss";

const Divider = ({ title, type, spacer }) => {
	return (
		<section className={`container ${styles.section}`}>
			<h2
				className={`h-div ${
					spacer ? styles.transparent : type ? styles[type] : ""
				}`}
			>
				{title}
			</h2>
		</section>
	);
};

export default Divider;
