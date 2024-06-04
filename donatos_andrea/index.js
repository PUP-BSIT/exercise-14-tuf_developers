const memberName = document.querySelector("#member_name");
const commentArea = document.querySelector("#comment_area");
const commentButton = document.querySelector("#comment_button");

const commentList = document.querySelector("#comment_list");
const commentListData = [
	{
		name: "Jheferson",
		comment: `Amazing goal, keep it up!`,
		date: new Date("Sat Apr 27 22:28:24 2024")
	},
	{
		name: "Von",
		comment: `Your strategic approach to planning and
        executing your life goals is impressive`,
		date: new Date("Sat Apr 27 22:45:41 2024")
	},
	{
		name: "Maui",
		comment: `I love your goals, they reflect mine`,
		date: new Date("Sat Apr 27 23:02:34 2024")
	},
	{
		name: "Mark",
		comment: `You could survive a zombie apocalypse`,
		date: new Date("Sat Apr 27 23:06:32 2024")
	}
];

function commentForm() {
    if (memberName.value && commentArea.value) {
        commentButton.disabled = false;
    } else {
        commentButton.disabled = true;
    }
}

function updateComments() {
	commentList.innerHTML = "";

	for (const comment of commentListData) {
		 const newComment = document.createElement("li");
		 const formatDate = new Date(comment.date);

		newComment.innerHTML = `
			<div class='upper-tags'>
			    <div class='user-tag'>${comment.name}</div>
			    <div class='date-tag'>${formatDate.toLocaleString()}</div>
			</div>
			<div class='user-comment'>${comment.comment}</div>`;

		commentList.append(newComment);
	}
}

function sortComments() {
	const sortType = document.querySelector("#sort_type");
	const newestSortType = "newest_first";

	commentListData.sort((a, b) => {
		if (sortType.value == newestSortType) {
			return b.date - a.date;
		} else {
			return a.date - b.date;
		}
	});
	
	updateComments();
}

function addComment() {
	const newComment = {
		name: memberName.value,
		comment: commentArea.value, 
		date: new Date(),
	};

	commentListData.push(newComment);
	sortComments();
}

sortComments();