export default function getSliceId(str) {
	let id;
	// check playlist
	if (str.includes("list=")) {
		let index = str.indexOf("list=");
		id = "videoseries?" + str.slice(index);
	}
	// check video
	else if (str.includes("watch?v=")) {
		let index = str.indexOf("watch?v=") + 8;
		id = str.slice(index, index + 11);
	} else {
		id = str.slice(17);
	}
	return id;
}
