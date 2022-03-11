const { Client } = require("youtubei");
const youtube = new Client();

exports.handler = async function (event) {
	const id = event.queryStringParameters.id;
	if (id) {
		if (id.includes("list")) {
			const index = id.indexOf("=") + 1;
			const pid = id.slice(index);
			const playlist = await youtube.getPlaylist(pid);
			return {
				statusCode: 200,
				body: JSON.stringify(playlist),
			};
		} else {
			const video = await youtube.getVideo(id);
			return {
				statusCode: 200,
				body: JSON.stringify(video),
			};
		}
	}
};
