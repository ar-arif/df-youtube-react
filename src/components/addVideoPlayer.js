import isUrl from "is-url";
import axios from "axios";
import getSliceId from "./getSliceId";

export default async function addVideoPlayer(str, props) {
	const server_base =
		import.meta.env.MODE == "production" ? "/" : "http://localhost:8000/";
	if (isUrl(str)) {
		const id = getSliceId(str);
		try {
			const res = await axios.get(`${server_base}api/youtube?id=${id}`);
			const data = res.data;
			localStorage.setItem("lastID", JSON.stringify(data));
			props.setVideoID(data);
		} catch (err) {
			console.error(err);
		}
	} else {
		alert("invalid url!");
	}
}
