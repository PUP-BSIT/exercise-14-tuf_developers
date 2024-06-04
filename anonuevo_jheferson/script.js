const commentName = document.querySelector("#name");
const commentMessage = document.querySelector("#comment");
const commentButton = document.querySelector("#comment_button");
const commentsContainer = document.querySelector("#comments-container");
const sortAscButton = document.querySelector("#sort-asc");
const sortDescButton = document.querySelector("#sort-desc");

const newest = "newest_to_oldest";
const oldest = "oldest_to_newest";
let sortOrder = newest;

const comments = [
	{
		name: "Von",
		message:
			"Your clarity of purpose in pursuing your goals is admirable",
		date: new Date("2024-01-27"),
	},
	{
		name: "Andrea",
		message: "I hope you achieve your goal",
		date: new Date("2024-02-27"),
	},
	{
		name: "Mau",
		message: "Persistence pays off, keep going",
		date: new Date("2024-03-27"),
	},
	{
		name: "Mark",
		message: "You are making a difference",
		date: new Date("2024-04-27"),
	},
];

function validateComment() {
	if (commentName.value.length && commentMessage.value.length) {
		commentButton.disabled = false;
	} else {
		commentButton.disabled = true;
	}
}

function addComment(name, message, date) {
	const comment = {
		name,
		message,
		date: date || new Date(),
	};
	comments.push(comment);
	if (sortOrder == newest) {
		sortCommentsDesc();
	} else {
		sortCommentsAsc();
	}
}

function displayComments() {
	commentsContainer.innerHTML = "";
	comments.forEach((comment) => {
		const commentElement = document.createElement("p");
		commentElement.textContent = `${comment.message} -
            ${comment.name} (${comment.date.toLocaleString()})`;
		commentsContainer.append(commentElement);
	});
}

function sortCommentsAsc() {
	comments.sort((a, b) => new Date(a.date) - new Date(b.date));
	displayComments();
	sortOrder = oldest;
}

function sortCommentsDesc() {
	comments.sort((a, b) => new Date(b.date) - new Date(a.date));
	displayComments();
	sortOrder = newest;
}

function pressButton() {
	addComment(commentName.value, commentMessage.value);
	commentName.value = "";
	commentMessage.value = "";
	commentButton.disabled = true;
}

commentButton.addEventListener("click", pressButton);
sortAscButton.addEventListener("click", sortCommentsAsc);
sortDescButton.addEventListener("click", sortCommentsDesc);

commentName.addEventListener("input", validateComment);
commentMessage.addEventListener("input", validateComment);

displayComments();