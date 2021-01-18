import styles from "./News.module.scss";
import useTranslation from "next-translate/useTranslation";
import { useState, useEffect } from "react";
import Button from "components/Button/Button";
import Article from "components/Article/Article";

const News = () => {
	const [posts, setPosts] = useState(new Array(9).fill({}));
	const [showing, setShowing] = useState(6);
	const { t } = useTranslation();

	useEffect(() => {
		window.setTimeout(() => {
			fetch("https://jsonplaceholder.typicode.com/posts")
				.then((response) => response.json())
				.then((json) => {
					const postData = json.map((post) => {
						return { ...post, size: (Math.random() * 1 + 1).toFixed(0) };
					});
					setPosts(postData);
				});
		}, 600);
	}, []);

	const loadMore = () => {
		setShowing(showing + 6);
	};

	return (
		<section className={`container ${styles.section}`}>
			<h2 className={`h-4 ${styles.heading}`}>{t("common:news")}</h2>
			<div className={`loop loop--sm ${styles.articles}`}>
				{posts.slice(0, Math.min(showing, posts.length)).map((post, index) => (
					<Article
						key={`post-${index}`}
						size={index === 0 ? 3 : post.size}
						title={post.title}
						source={"Valor Econômico"}
						lead={post.body}
						href={post.id && `/${post.id}`}
						post={post}
						thumbnail={"https://placehold.it/1200x600"}
					/>
				))}
			</div>
			{posts.length > showing && (
				<div className={styles.loadMore}>
					<Button type="secondary" onClick={loadMore}>
						{t("common:loadMore")}
					</Button>
				</div>
			)}
		</section>
	);
};

export default News;
