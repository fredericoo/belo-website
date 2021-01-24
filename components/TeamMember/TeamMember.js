import Placeholder from "components/Placeholder/Placeholder";
import styles from "./TeamMember.module.scss";
import { RichText } from "prismic-reactjs";

const TeamMember = ({ name, position, photo, bio }) => {
	return (
		<div className={`${styles.container} s-sm`}>
			<div className={styles.photo}>
				{photo.url && (
					<Placeholder
						alt={photo.alt}
						src={photo.url}
						height={photo.dimensions.height}
						width={photo.dimensions.width}
						layou="responsive"
						sizes="300px,
						(max-width: 768px) 300px,
						(max-width: 1920px) 600px,
						600px"
						unoptimized
					/>
				)}
			</div>
			<div className={`styles.name`}>
				<RichText render={name} />
			</div>
			<div className={styles.position}>{position}</div>
			<div className={`${styles.bio}`}>
				<RichText render={bio} />
			</div>
		</div>
	);
};
export default TeamMember;
