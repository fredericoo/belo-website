import Link from "next/link";
import styles from "./Button.module.scss";

const Button = ({ children, href, onClick, type = "primary", size = "md" }) => {
	const buttonClass = `${styles.button} ${
		type ? styles[`type--${type}`] : ""
	} ${size ? styles[`size--${size}`] : ""}`;

	if (!href)
		return (
			<button onClick={onClick} type="button" className={buttonClass}>
				{children}
			</button>
		);

	return (
		<Link href={href}>
			<a className={buttonClass}>{children}</a>
		</Link>
	);
};
export default Button;
