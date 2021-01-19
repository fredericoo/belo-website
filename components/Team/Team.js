import styles from "./Team.module.scss";
import { useRouter } from "next/router";
import TeamMember from "components/TeamMember/TeamMember";

import useSWR from "swr";
import { fetcher } from "utils/fetcher";

const Team = () => {
	const { locale } = useRouter();
	const { data } = useSWR(
		JSON.stringify({ docType: "member", locale }),
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnMount: true,
			revalidateOnReconnect: false,
		}
	);

	return (
		<section className={`${styles.section} container`}>
			<div className={`${styles.members} loop loop--sm`}>
				{data &&
					data.map((member) => (
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
