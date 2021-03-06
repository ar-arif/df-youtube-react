import {
  Input,
  Button,
  Dropdown,
  DropdownItem,
  DropdownLink,
  Icon,
} from "@material-tailwind/react";
import { useState } from "react";
import addToFavourite from "./addToFavourite";
import addVideoPlayer from "./addVideoPlayer";
import removeID from "./removeID";

export default function Header(props) {
  const [inputText, setInputText] = useState("");
  const [idList, setIdList] = useState(
    JSON.parse(localStorage.getItem("list")) != null
      ? JSON.parse(localStorage.getItem("list"))
      : []
  );

  return (
    <div id="header" className="m-5 md:flex">
      <Input
        className=""
        type="text"
        color="red"
        size="regular"
        outline={true}
        placeholder="YouTube Link"
        style={{ color: "white" }}
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
      />
      <div className="flex justify-center mt-2 md:mt-0">
        <Button
          className="mx-2 md:order-first"
          color="red"
          buttonType="filled"
          size="regular"
          block={false}
          iconOnly={false}
          ripple="light"
          onClick={() => addVideoPlayer(inputText, props)}
        >
          <Icon name="monitor" size="xxxl" />
        </Button>
        <Button
          className="order-first md:mr-2"
          color="red"
          buttonType="outline"
          size="regular"
          block={false}
          iconOnly={false}
          ripple="light"
          onClick={() => addToFavourite(inputText, idList, setIdList)}
        >
          <Icon name="favorite" size="xxxl" />
        </Button>
        <Dropdown
          className=""
          color="gray "
          placement="bottom-start"
          buttonText={<Icon name="list" size="xxxl" />}
          buttonType="outline"
          size="regular"
          rounded={false}
          block={false}
          ripple="dark"
        >
          <div id="list-scroolbar">
            {idList != null
              ? idList.map((itm, i) => (
                  <span className="flex items-center" key={i}>
                    <DropdownItem
                      id="yt-thumbnail-btn"
                      color="red"
                      ripple="light"
                      onClick={() => {
                        localStorage.setItem("lastID", JSON.stringify(itm));
                        props.setVideoID(itm);
                      }}
                    >
                      <img src={itm.thumbnail} className="yt-thumbnail mr-2" />
                      <h4>{itm.title}</h4>
                    </DropdownItem>
                    <Icon
                      name="close"
                      size="xxxl"
                      style={{ color: "black", cursor: "pointer" }}
                      onClick={() => removeID(itm, idList, setIdList)}
                    />
                  </span>
                ))
              : ""}
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
