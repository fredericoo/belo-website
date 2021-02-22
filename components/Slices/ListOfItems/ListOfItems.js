import styles from "./ListOfItems.module.scss";
import { RichText } from "prismic-reactjs";
import { Fragment } from "react";
const ListOfItems = ({ primary, items }) => (
	<section className={`${styles.section} grid grid--inner`}>
		<hr className={styles.divider} />
		{primary && (
			<h2 className={`h-3 ${styles.heading}`}>
				{RichText.asText(primary.title)}
			</h2>
		)}
		{items && (
			<dl className={styles.list}>
				{items.map((item, key) => (
					<Fragment key={key}>
						<dt className="h-1">↘</dt>
						<dd>
							<RichText render={item.item} />
						</dd>
					</Fragment>
				))}
			</dl>
		)}
	</section>
);

export default ListOfItems;
