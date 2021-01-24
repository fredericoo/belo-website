import styles from "./Team.module.scss";
import { useRouter } from "next/router";
import TeamMember from "components/TeamMember/TeamMember";

const Team = ({ members }) => {
	const { locale } = useRouter();

	return (
		<section className={`${styles.section} container`}>
			<div className={`${styles.members} loop loop--sm`}>
				{members &&
					members.map((member) => (
						<TeamMember
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
