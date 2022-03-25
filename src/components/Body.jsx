import "./body.css";
import { useState, useEffect } from "react";

export default function Body({ data }) {
  const [opts, setOpts] = useState("");
  const optsString = () => {
    const param = ["rel=0", "autoplay=1", "modestbranding=1", "controls=1"];
    let final = data.type == "playlist" ? "&" : "?";
    param.forEach((e) => {
      final += e + "&";
    });
    setOpts(final);
  };
  useEffect(() => {
    if (data != null && data != undefined) {
      optsString();
    }
  }, [data]);
  return (
    <div id="body">
      {data != null && data != undefined ? (
        <iframe
          className="video-player"
          src={"https://www.youtube.com/embed/" + data.inputID + opts}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        ""
      )}
    </div>
  );
}
