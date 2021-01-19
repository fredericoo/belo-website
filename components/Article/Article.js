import Link from "next/link";
import Placeholder from "components/Placeholder/Placeholder";
import styles from "./Article.module.scss";

const Article = ({ href, title, source, lead, thumbnail, size }) => {
	const articleClass = `${styles.article} ${
		size ? styles[`size-${size}`] : ""
	}`;
	const headingClass = `${size && size < 3 ? "h-4" : "h-3"} ${styles.title}`;
	const sourceClass = `smcp ${styles.source} s-sm`;
	const leadClass = styles.lead;

	if (href)
		return (
			<Link href={href}>
				<a className={articleClass}>
					{thumbnail && size >= 2 && (
						<div className={styles.thumbnail}>
							<Placeholder
								src={thumbnail}
								height={600}
								width={size >= 3 ? 1280 : 600}
								layout="responsive"
							/>
						</div>
					)}
					<h3 className={headingClass}>{title}</h3>
					<h4 className={sourceClass}>{source}</h4>
					<div className={leadClass}>{lead}</div>
				</a>
			</Link>
		);

	return (
		<div className={`${articleClass} ${styles.skeleton}`}>
			<h3 className={headingClass}>Lorem ipsum</h3>
			<h4 className={sourceClass}>Dolor sit Amet</h4>
			<div className={leadClass}>
				Lorem ipsum dolor sit amet consequequitur Lorem ipsum dolor sit amet
				consequequitur Lorem ipsum dolor sit amet consequequitur Lorem ipsum
				dolor sit amet consequequitur Lorem ipsum dolor sit amet consequequitur.
			</div>
		</div>
	);
};

export default Article;
