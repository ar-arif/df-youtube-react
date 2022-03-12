import "@material-tailwind/react/tailwind.css";
import Header from "./components/Header.jsx";
import Body from "./components/Body.jsx";
import { useState } from "react";

export default function App() {
  let lastID =
    JSON.parse(localStorage.getItem("lastID")) != null
      ? JSON.parse(localStorage.getItem("lastID")).inputID
      : null;
  const [videoId, setVideoID] = useState(lastID);
  return (
    <>
      <Header setVideoID={setVideoID} />
      {videoId != "" || videoId != null ? <Body videoId={videoId} /> : ""}
    </>
  );
}
