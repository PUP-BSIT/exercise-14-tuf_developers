const userCom = document.querySelector("#user");
const inputCom = document.querySelector("#add_comment");
const addCom = document.querySelector("#comment_button");
const ascendCom = document.querySelector("#ascend");
const descendCom = document.querySelector("#descend");
const descendOrder = "descend";
const ascendOrder = "ascend";
let sortOrder = ascendOrder;

const commentList = document.querySelector("#comment_list");
const commentListData = [
	{ 
		name: "Jhef",
		comment: `Your goals also reflect mine`,
		date: new Date("Sat Apr 27 22:28:24 2024")
	},
	{
		name: "Von",
		comment: `Your goals are truly inspiring`,
		date: new Date("Sat Apr 27 22:45:41 2024")
	},
	{
		name: "Andrea",
		comment: `I rooting for your goal`,
		date: new Date("Sat Apr 27 23:02:34 2024")
	},
	{
		name: "Mau",
		comment: `Stay motivated, you're making it happen`,
		date: new Date("Sat Apr 27 23:06:32 2024")
	}
];

function setToAscend() {
	sortOrder = ascendOrder;
	sortComments();
}

function setToDescend() {
	sortOrder = descendOrder;
	sortComments();
}

function validComment() {
    if (userCom.value.length && inputCom.value.length) {
        addCom.disabled = false;
    } else {
      addCom.disabled = true;  
    }
}

function updateComments() {
	commentList.innerHTML = "";

	for (const comment of commentListData) {
		const newComment = document.createElement("li");
		const formatDate = new Date(comment.date);
		newComment.innerHTML = `${comment.comment}
			<strong>- ${comment.name}</strong>`;

		commentList.append(newComment);
	}
}

function sortComments() {
	commentListData.sort((a, b) => {
		if (sortOrder == ascendOrder) {
			return a.date - b.date;
		} 
		else {
			return b.date - a.date;
		}
	});
	
	updateComments();
}

function addComment() {
	const newComment = {
		name: userCom.value,
		comment: inputCom.value,
		date: new Date()
	};

	commentListData.push(newComment);
	sortComments();
}

sortComments(); 