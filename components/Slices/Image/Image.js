import styles from "./Image.module.scss";
import { RichText } from "prismic-reactjs";
import Placeholder from "components/Placeholder/Placeholder";

const Image = ({ primary }) => (
	<section className={`grid grid--full ${styles.section}`}>
		{primary.image && primary.image.url && (
			<div
				className={`${styles.image} ${
					primary.full_width ? styles.fullWidth : ""
				}`}
			>
				<Placeholder
					src={primary.image.url}
					width={primary.image.dimensions.width}
					height={primary.image.dimensions.height}
					layout="responsive"
					sizes="320px,
						(max-width: 768px) 640px,
						(max-width: 1920px) 1366px,
						1920px"
					quality={100}
				/>
			</div>
		)}
		{primary.text && (
			<div className={`s-sm ${styles.caption}`}>
				<RichText render={primary.text} />
			</div>
		)}
	</section>
);

export default Image;
