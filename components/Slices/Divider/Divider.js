import styles from "./Divider.module.scss";
import Divider from "components/Divider/Divider";

const DividerSlice = ({ primary }) => (
	<divcl className={styles.section}>
		<Divider type={primary.type} title={primary.text} />
	</divcl>
);
export default DividerSlice;
