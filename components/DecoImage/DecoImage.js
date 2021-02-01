import styles from "./DecoImage.module.scss";
import Image from "next/image";

const DecoImage = ({ src, row }) => {
	return (
		<div className={styles.wrapper} style={{ gridRow: row }}>
			<Image src={src} width={1024} height={512} layout="responsive" />
		</div>
	);
};

export default DecoImage;
