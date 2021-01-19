import { RichText } from "prismic-reactjs";
import { queryRepeatableDocuments } from "utils/queries";
import { Client } from "utils/prismicHelpers";
import Layout from "components/Layout/Layout";
import styles from "./Article.module.scss";
import Meta from "components/Meta/Meta";
import Placeholder from "components/Placeholder/Placeholder";
import Slices from "components/Slices/Slices";

export default function Post({ doc }) {
	if (doc && doc.data) {
		const article = doc.data;
		return (
			<Layout altLangs={doc.alternate_languages}>
				<article className={`${styles.article}`}>
					<Meta
						pageTitle={RichText.asText(article.title)}
						pageDesc={RichText.asText(article.lead)}
						pageType="article"
						pageImage={
							article.thumbnail
								? article.thumbnail.small
									? article.thumbnail.small.url
									: article.thumbnail.url
								: ""
						}
					/>
					{article.thumbnail && article.thumbnail.url && (
						<div className={styles.thumbnail}>
							<Placeholder
								src={article.thumbnail.url}
								height={article.thumbnail.dimensions.height}
								width={article.thumbnail.dimensions.width}
								layout="responsive"
								alt={article.thumbnail.alt}
							/>
						</div>
					)}
					<Slices
						slices={[
							{ slice_type: "body_text", primary: { text: article.title } },
							...article.body,
						]}
					/>
				</article>
			</Layout>
		);
	}
	return (
		<Layout>
			<article className={`container ${styles.article}`}>
				<div className="body">
					<h2>Error.</h2>
					<p>
						This article could not be loaded. Its URL could have changed or it
						may be no longer available. If you believe this is a mistake, please
						get in touch with our team.
					</p>
				</div>
			</article>
		</Layout>
	);
}

export async function getStaticPaths() {
	const documents = await queryRepeatableDocuments(
		(doc) => doc.type === "article"
	);

	return {
		paths: documents.map((doc) => {
			return {
				params: { uid: doc.uid },
				locale: doc.lang,
			};
		}),
		fallback: true,
	};
}

export async function getStaticProps({ params, locale }) {
	const client = Client();
	const doc = await client.getByUID("article", params.uid, { lang: locale });

	if (doc) {
		return {
			revalidate: 60,
			props: {
				doc: doc || {},
			},
		};
	}
	return { revalidate: 10, props: { doc: {} } };
}
