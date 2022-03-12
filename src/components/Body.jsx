import "./body.css";

export default function Body({ videoId }) {
  return (
    <div id="body">
      {videoId != null ? (
        <iframe
          className="video-player"
          src={"https://www.youtube.com/embed/" + videoId}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        ""
      )}
    </div>
  );
}
