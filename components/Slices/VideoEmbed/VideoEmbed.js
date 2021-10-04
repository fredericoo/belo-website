import YouTube from "react-youtube";
import styles from "./VideoEmbed.module.scss";

const getYoutubeIDFromUrl = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url?.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
}

const VideoEmbed = ({ primary }) => {
	if (!primary?.embed) return null;
	const {provider_name, embed_url, width, height} = primary.embed;
	
	const videoId = getYoutubeIDFromUrl(embed_url);
	if (!videoId || provider_name !== 'YouTube') return null;

	return (
	<section className={`${styles.section}`} style={{
		"--aspectRatio": width / height,
	}}>
			<YouTube containerClassName={styles.wrapper} videoId={videoId} />
	</section>
)};

export default VideoEmbed;
