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
						id: playlist.id,
						title: playlist.title,
						thumbnail: playlist.videos[0].thumbnails[3].url,
					}),
				};
			} else {
				const video = await youtube.getVideo(id);
				return {
					statusCode: 200,
					body: JSON.stringify({
						inputID: id,
						type: "video",
						id: video.id,
						title: video.title,
						thumbnail: video.thumbnails[3].url,
					}),
				};
			}
		}
	} catch (error) {
		return { statusCode: 500, body: error.toString() };
	}
};
