import "@material-tailwind/react/tailwind.css";
import Header from "./components/Header.jsx";
import Body from "./components/Body.jsx";
import { useState } from "react";
import GithubCorner from "react-github-corner";

export default function App() {
  let lastID =
    JSON.parse(localStorage.getItem("lastID")) != null
      ? JSON.parse(localStorage.getItem("lastID")).inputID
      : null;
  const [videoId, setVideoID] = useState(lastID);
  return (
    <>
      <GithubCorner
        href="https://github.com/ar-arif/df-youtube-react"
        target="_blank"
        direction="left"
        octoColor="#000"
        bannerColor="#fff"
        size="40"
      />
      <Header setVideoID={setVideoID} />
      {videoId != "" || videoId != null ? <Body videoId={videoId} /> : ""}
    </>
  );
}
