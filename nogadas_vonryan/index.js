const commentName = document.querySelector("#comment_name");
const commentContent = document.querySelector("#comment_content");
const commentButton = document.querySelector("#comment_button");

const commentList = document.querySelector(".comment-list");
const commentListData = [
	{
		name: "Jheferson",
		comment: `Your goals are very ambitious!`,
		date: new Date("Sat Apr 27 22:28:24 2024")
	},
	{
		name: "Andrea",
		comment: `I hope you achieve all your goals that will 
				  help you be successful in life`,
		date: new Date("Sat Apr 27 22:45:41 2024")
	},
	{
		name: "Mau",
		comment: `Keep on going hard work pays off`,
		date: new Date("Sat Apr 27 23:02:34 2024")
	},
	{
		name: "Mark",
		comment: `Your perspective is refreshing`,
		date: new Date("Sat Apr 27 23:06:32 2024")
	}
];

function validateComment() {
	if (commentName.value && commentContent.value) {
		commentButton.disabled = false;
	} else {
		commentButton.disabled = true;
	}
}

function updateComments() {
	commentList.innerHTML = "";

	for (const commentData of commentListData) {
		const newComment = document.createElement("li");
		const formatDate = new Date(commentData.date);

		newComment.innerHTML = `
			<div class='upper-tags'>
				<div class='user-tag'>${commentData.name}</div>
				<div class='date-tag'>${formatDate.toLocaleString()}</div>
			</div>
			<div class='user-comment'>${commentData.comment}</div>`;

		commentList.append(newComment);
	}
}

function sortComments() {
	const sortType = document.querySelector("#sort_type");
	const newestSortType = "newest_first";

	commentListData.sort((a, b) => {
		if (sortType.value == newestSortType) {
			return a.date - b.date;
		} else {
			return b.date - a.date;
		}
	});
	
	updateComments();
}

function addComment() {
	const newComment = {
		name: commentName.value,
		comment: commentContent.value,
		date: new Date(),
	};

	commentListData.push(newComment);
	sortComments();
}

sortComments();