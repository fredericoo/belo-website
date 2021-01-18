import Image from "next/image";
import { useState } from "react";
import styles from "./Placeholder.module.scss";

export default function Placeholder(props) {
	const [loaded, setLoaded] = useState(false);
	return (
		<div className={`${styles.placeholder} ${loaded ? styles.loaded : ""}`}>
			<Image
				objectFit="cover"
				className={`${styles.image} ${loaded ? styles.loaded : ""}`}
				{...props}
				onLoad={() => setLoaded(true)}
			/>
		</div>
	);
}
