const express = require("express");
const app = express();
const cors = require("cors");
const port = 8000;
const { Client } = require("youtubei");
const youtube = new Client();

app.use(cors());
app.get("/", (req, res) => {
	res.status(200).json({ dev_server: port });
});
app.get("/api/youtube", async (req, res) => {
	try {
		const id = req.query.id;
		if (id) {
			if (id.includes("list")) {
				const index = id.indexOf("=") + 1;
				const pid = id.slice(index);
				const playlist = await youtube.getPlaylist(pid);
				res.status(200).json({
					inputID: id,
					type: "playlist",
					id: playlist.id,
					title: playlist.title,
					thumbnail: playlist.videos[0].thumbnails[3].url,
				});
			} else {
				const video = await youtube.getVideo(id);
				res.status(200).json({
					inputID: id,
					type: "video",
					id: video.id,
					title: video.title,
					thumbnail: video.thumbnails[3].url,
				});
			}
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

app.listen(port, () => {
	console.log(
		`Express-Server listening  ==> \x1b[36m http://localhost:${port}/ \x1b[0m`
	);
});
