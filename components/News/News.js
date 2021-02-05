import styles from "./News.module.scss";
import useTranslation from "next-translate/useTranslation";
import { useState, useEffect } from "react";
import Button from "components/Button/Button";
import Article from "components/Article/Article";

import moment from "moment";

import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "utils/fetcher";

const News = ({ display = 5, perPage = 5 }) => {
	const { locale } = useRouter();
	const [showing, setShowing] = useState(display);
	const { data } = useSWR(
		JSON.stringify({
			docType: "article",
			locale,
			filters: { type: ["news", "article"] },
		}),
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnMount: true,
			revalidateOnReconnect: false,
		}
	);
	const posts = data || new Array(7).fill({});
	useEffect(() => {
		const areaCalc = posts
			? posts.reduce(
					(acc, cur) =>
						acc.area + 1 * (cur.thumbnail && cur.thumbnail.url ? 2 : 1) <= 8
							? {
									area:
										acc.area + 1 * (cur.thumbnail && cur.thumbnail.url ? 2 : 1),
									noPosts: acc.noPosts + 1,
							  }
							: acc,
					{ area: 4, noPosts: 1 }
			  )
			: 0;
		setShowing(Math.max(display, areaCalc.noPosts));
	}, [data]);

	const { t } = useTranslation();

	const loadMore = () => {
		setShowing(showing + perPage);
	};

	return (
		<section className={`container ${styles.section}`}>
			<div className={`loop loop--sm ${styles.articles}`}>
				{posts &&
					posts
						.sort((a, b) => (a.date > b.date ? -1 : 1))
						.slice(0, Math.min(showing, posts.length))
						.map((post, index) => (
							<Article
								key={`post-${index}`}
								title={post.title}
								size={index === 0 ? 2 : 1}
								lead={post.lead}
								href={post.slug && `/article/${post.slug}`}
								thumbnail={post.thumbnail}
								source={moment(post.date).format("ll")}
								type={post.type ? t(`common:type.${post.type}`) : undefined}
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
