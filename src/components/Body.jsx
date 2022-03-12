import "./body.css";

export default function Body({ videoId }) {
  function randomNumber(n) {
    return parseInt(Math.random() * n);
  }
  return (
    <div id="body">
      <div>{randomNumber(10000000000)}</div>
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
