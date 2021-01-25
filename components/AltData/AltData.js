import styles from "./AltData.module.scss";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import Button from "components/Button/Button";
import Article from "components/Article/Article";

import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "utils/fetcher";

const Articles = ({ display = 3, perPage = 3, showDivider }) => {
	const { locale } = useRouter();
	const { data } = useSWR(
		JSON.stringify({
			docType: "article",
			locale,
			filters: { type: "alternate data" },
		}),
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnMount: true,
			revalidateOnReconnect: false,
		}
	);
	const [showing, setShowing] = useState(display);
	const { t } = useTranslation();

	const loadMore = () => {
		setShowing(showing + perPage);
	};

	const posts = data || new Array(display).fill({});

	return (
		<section className={`container ${styles.section}`}>
			{showDivider && (
				<h2 className={`h-div`}>{t("common:menu.alternativeData")}</h2>
			)}
			<div className={`loop loop--md ${styles.articles}`}>
				{posts &&
					posts.slice(0, Math.min(showing, posts.length)).map((post, index) => {
						return (
							<Article
								key={`post-${index}`}
								title={post.title}
								size={2}
								lead={post.lead}
								href={post.slug && `/article/${post.slug}`}
								thumbnail={post.thumbnail}
							/>
						);
					})}
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
