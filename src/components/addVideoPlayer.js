import isUrl from "is-url";
import axios from "axios";
import getSliceId from "./getSliceId";

export default async function addVideoPlayer(str, props) {
	if (isUrl(str)) {
		const id = getSliceId(str);
		props.setVideoID(id);
		try {
			const res = await axios.get(`/api/youtube?id=${id}`);
			const data = res.data;
			localStorage.setItem("lastID", JSON.stringify(data));
		} catch (err) {
			console.error(err);
		}
	} else {
		alert("invalid url!");
	}
}
