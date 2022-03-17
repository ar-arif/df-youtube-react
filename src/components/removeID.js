export default function removeID(id, idList, setIdList) {
	let index = idList.indexOf(id);
	if (index > -1) {
		let temp = [...idList];
		temp.splice(index, 1);
		let wantRemove = confirm("you want to Delete?");
		if (wantRemove) {
			setIdList(temp);
			localStorage.setItem("list", JSON.stringify(temp));
		}
	}
}
