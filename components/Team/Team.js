import styles from "./Team.module.scss";
import TeamMember from "components/TeamMember/TeamMember";
import useTranslation from "next-translate/useTranslation";

const Team = ({ members }) => {
	const { t } = useTranslation();
	return (
		<section className={`${styles.section} container`}>
			<h2 className={`${styles.heading} h-1`}>{t("common:menu.team")}</h2>
			<div className={`${styles.members} loop loop--sm`}>
				{members &&
					members
						.sort((a, b) => +b.priority - +a.priority)
						.map((member) => (
							<TeamMember
								priority={member.priority}
								key={member.uid}
								name={member.name}
								position={member.position}
								photo={member.photo}
								bio={member.bio}
							/>
						))}
			</div>
		</section>
	);
};

export default Team;
