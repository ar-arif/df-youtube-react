import {
  Input,
  Button,
  Dropdown,
  DropdownItem,
  DropdownLink,
  Icon,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Header(props) {
  const [inputText, setInputText] = useState("");
  const [idList, setIdList] = useState(
    JSON.parse(localStorage.getItem("list"))
  );
  const fetchData = async (id) => {
    let res = await fetch(`/.netlify/functions/api?id=${id}`);
    let data = await res.json();
    return data.title;
  };
  // useEffect(() => {
  //   console.log(fetchData("n_KASTN0gUE"));
  // }, []);
  function checkUrl(str) {
    let regexp =
      /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
      return true;
    } else {
      return false;
    }
  }
  const addVideoPlayer = (str) => {
    let id;
    if (checkUrl(str)) {
      // check playlist
      if (str.includes("list=")) {
        let index = str.indexOf("list=");
        id = "videoseries?" + str.slice(index);
      }
      // check video
      else if (str.includes("watch?v=")) {
        let index = str.indexOf("watch?v=") + 8;
        id = str.slice(index, index + 11);
      } else {
        id = str.slice(17);
      }

      props.setVideoID(id);
      axios.get(`/.netlify/functions/api?id=${id}`).then((res) => {
        let resData = res.data;
        let type = "";
        if (id.includes("list")) {
          type = "playlist";
        } else {
          type = "video";
        }
        let data = {
          inputID: id,
          type,
          data: resData,
        };
        localStorage.setItem("lastID", data);
      });
      catch(err){
        console.error(err)
      }
    } else {
      alert("invalid url!");
    }
  };
  const removeID = (id) => {
    let index = idList.indexOf(id);
    if (index > -1) {
      let temp = [...idList];
      temp.splice(index, 1);
      let wantRemove = confirm("are you sure?");
      if (wantRemove) {
        setIdList(temp);
        localStorage.setItem("list", JSON.stringify(temp));
      }
    }
  };
  const addToFavourite = (str) => {
    let id;
    if (checkUrl(str)) {
      // check playlist
      if (str.includes("list=")) {
        let index = str.indexOf("list=");
        id = "videoseries?" + str.slice(index);
      }
      // check video
      else if (str.includes("watch?v=")) {
        let index = str.indexOf("watch?v=") + 8;
        id = str.slice(index, index + 11);
      } else {
        id = str.slice(17);
      }

      let list = localStorage.getItem("list");
      if (id != "") {
        if (list != null) {
          let temp = JSON.parse(list);
          if (!temp.includes(id)) {
            temp.push(id);
            localStorage.setItem("list", JSON.stringify(temp));
            alert("Added Successfully!");
            setIdList(temp);
          }
        } else {
          let temp = [id];
          localStorage.setItem("list", JSON.stringify(temp));
          alert("Added Successfully!");
          setIdList(temp);
        }
      }
    } else {
      alert("invalid url!");
    }
  };

  return (
    <div id="header" className="flex m-5">
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

      <Button
        className="ml-2"
        color="red"
        buttonType="filled"
        size="regular"
        // rounded={true}
        block={false}
        iconOnly={false}
        ripple="light"
        onClick={() => addVideoPlayer(inputText)}
      >
        <Icon name="monitor" size="xxxl" />
      </Button>
      <Button
        className="mx-2"
        color="red"
        buttonType="outline"
        size="regular"
        // rounded={true}
        block={false}
        iconOnly={false}
        ripple="light"
        onClick={() => addToFavourite(inputText)}
      >
        <Icon name="favorite" size="xxxl" />
      </Button>
      <Dropdown
        color="gray"
        placement="bottom-start"
        buttonText={<Icon name="list" size="xxxl" />}
        buttonType="outline"
        size="regular"
        rounded={false}
        block={false}
        ripple="dark"
      >
        {idList != null
          ? idList.map(async (itm, i) => (
              <span className="flex items-center" key={i}>
                <DropdownItem
                  color="red"
                  ripple="light"
                  onClick={() => {
                    localStorage.setItem("lastID", itm);
                    props.setVideoID(itm);
                  }}
                >
                  {await fetchData(itm)}
                </DropdownItem>
                <Icon
                  name="close"
                  size="xxxl"
                  style={{ color: "black", cursor: "pointer" }}
                  onClick={() => removeID(itm)}
                />
              </span>
            ))
          : ""}
      </Dropdown>
    </div>
  );
}
