import "@material-tailwind/react/tailwind.css";
import Header from "./components/Header.jsx";
import Body from "./components/Body.jsx";
import { useState } from "react";

export default function App() {
  const [videoId, setVideoID] = useState(localStorage.getItem("lastID"));
  return (
    <>
      <Header setVideoID={setVideoID} />
      {videoId != "" ? <Body videoId={videoId} /> : ""}
    </>
  );
}
