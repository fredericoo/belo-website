import styles from "./Articles.module.scss";
import useTranslation from "next-translate/useTranslation";
import { useState, useEffect } from "react";
import Button from "components/Button/Button";
import Article from "components/Article/Article";

const Articles = () => {
	const [posts, setPosts] = useState(new Array(6).fill({}));
	const [showing, setShowing] = useState(6);
	const { t } = useTranslation();

	useEffect(() => {
		window.setTimeout(() => {
			fetch("https://jsonplaceholder.typicode.com/posts")
				.then((response) => response.json())
				.then((json) => {
					setPosts(json);
				});
		}, 600);
	}, []);

	const loadMore = () => {
		setShowing(showing + 6);
	};

	return (
		<section className={`container ${styles.section}`}>
			<h2 className={`h-div`}>{t("common:articles")}</h2>
			<div className={`loop loop--md ${styles.articles}`}>
				{posts.slice(0, Math.min(showing, posts.length)).map((post, index) => (
					<Article
						key={`post-${index}`}
						title={post.title}
						source={"Valor Econômico"}
						lead={post.body}
						href={post.id && `/${post.id}`}
						post={post}
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

export default Articles;
