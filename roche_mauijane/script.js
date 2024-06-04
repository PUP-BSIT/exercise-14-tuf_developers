const commentName = document.querySelector("#name");
const commentMessage = document.querySelector("#comment");
const commentButton = document.querySelector("#comment_button");
const commentsContainer = document.querySelector("#comments");
const sortAscButton = document.querySelector("#ascend");
const sortDescButton = document.querySelector("#descend");

const newest = "newest_to_oldest";
const oldest = "oldest_to_newest";
let sortOrder = newest;

const comments = [
	{
		name: "Jhef",
		message: "Stay focused, you're on track",
		date: new Date("2024-01-27"),
	},
	{
		name: "Von",
		message: `Your thoughtfulness and consideration of others' needs
				 as your goal demonstrates your empathy and kindness`,
		date: new Date("2024-02-27"),
	},
	{
		name: "Andrea",
		message: "I'm rooting for your success to achieve your goal",
		date: new Date("2024-03-27"),
	},
	{
		name: "Mark",
		message: "You are brave",
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

function displayComments() {
	commentsContainer.innerHTML = "";
	comments.forEach((comment) => {
		const commentElement = document.createElement("p");
		commentElement.textContent = `${comment.message} - ${
			comment.name
		} (${comment.date.toLocaleString()})`;
		commentsContainer.append(commentElement);
	});
}

function addComment(name, message, date) {
	const comment = {
		name,
		message,
		date: date || new Date(),
	};
	comments.push(comment);
	if (sortOrder === newest) {
		sortCommentsDesc();
	} else {
		sortCommentsAsc();
	}
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