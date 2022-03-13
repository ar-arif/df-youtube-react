const { Client } = require("youtubei");
const youtube = new Client();

exports.handler = async function (event) {
	try {
		const id = event.queryStringParameters.id;
		if (id) {
			if (id.includes("list")) {
				const index = id.indexOf("=") + 1;
				const pid = id.slice(index);
				const playlist = await youtube.getPlaylist(pid);
				return {
					statusCode: 200,
					body: JSON.stringify({
						inputID: id,
						type: "playlist",
						data: playlist,
					}),
				};
			} else {
				const video = await youtube.getVideo(id);
				return {
					statusCode: 200,
					body: JSON.stringify({
						inputID: id,
						type: "video",
						data: video,
					}),
				};
			}
		}
	} catch (error) {
		return { statusCode: 500, body: error.toString() };
	}
};
