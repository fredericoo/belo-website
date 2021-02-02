import Link from "next/link";
import Placeholder from "components/Placeholder/Placeholder";
import styles from "./Article.module.scss";
import { RichText } from "prismic-reactjs";

const Article = ({
	href,
	title,
	source,
	lead,
	type,
	thumbnail,
	size,
	target,
}) => {
	const articleClass = `${styles.article} ${
		size ? styles[`size-${size}`] : ""
	} ${href && href.charAt(0) != "/" ? styles.external : ""}
	${thumbnail && thumbnail.url ? styles.hasImage : ""}`;
	const headingClass = `${
		size && size < 2 ? "h-4" : thumbnail && thumbnail.url ? "h-3" : "h-2"
	} ${styles.title}`;
	const sourceClass = `${styles.source} s-xs`;
	const leadClass = `s-sm ${styles.lead}`;

	if (href)
		return (
			<Link href={href}>
				<a className={articleClass} target={target}>
					{thumbnail && thumbnail.url && (
						<div className={styles.thumbnail}>
							<Placeholder
								src={thumbnail.url}
								height={600}
								width={size >= 2 ? 1280 : 600}
								layout="responsive"
								alt={thumbnail.alt}
							/>
						</div>
					)}

					{typeof title === "object" ? (
						<h3 className={headingClass}>{RichText.asText(title)}</h3>
					) : (
						<h3
							className={headingClass}
							dangerouslySetInnerHTML={{ __html: title }}
						/>
					)}
					<h4 className={sourceClass}>
						{type && <span className={styles.type}>{type}</span>} {source}
					</h4>
					<div className={leadClass}>
						{typeof lead === "object" ? (
							<RichText render={lead} />
						) : (
							<p dangerouslySetInnerHTML={{ __html: lead }} />
						)}
					</div>
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
