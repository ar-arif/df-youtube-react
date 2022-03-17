import isUrl from "is-url";
import axios from "axios";
import getSliceId from "./getSliceId";

export default async function addToFavourite(str, idList, setIdList) {
	const server_base =
		import.meta.env.MODE == "production" ? "/" : "http://localhost:8000/";
	if (isUrl(str)) {
		const id = getSliceId(str);
		try {
			const res = await axios.get(`${server_base}api/youtube?id=${id}`);
			const data = res.data;
			const allInputIds = idList.map((itm) => itm.inputID);
			if (idList == null || idList.length == 0) {
				setIdList([data]);
				localStorage.setItem("list", JSON.stringify([data]));
			} else if (!allInputIds.includes(data.inputID)) {
				const updateData = [...idList, data];
				setIdList(updateData);
				localStorage.setItem("list", JSON.stringify(updateData));
			} else {
				alert("it's already added!");
				return;
			}
			alert("added successfully!");
		} catch (err) {
			console.error(err);
		}
	} else {
		alert("invalid url!");
	}
}
