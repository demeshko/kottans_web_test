let totalQuestions = 0;
let answerCounter = 0;
function request() {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://jservice.io/api/random', false);
		xhr.send();
		if (xhr.status != 200) {
				console.log(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
		} else {
				const res = JSON.parse(xhr.responseText);
				return res[0];
		}
}
function compile() {
	let response = request();
	while (response.answer.split(" ").length > 1) {
			response = request();
	}
	let answer = response.answer.replace(/<\/?[^>]+(>|$)/g, "");
	console.log(response.answer.split(" ").length);
	console.log(answer);
	document.getElementsByClassName("question-id")[0].innerHTML = response.id;
	document.getElementsByClassName("question-category")[0].innerHTML = response.category.title;
	document.getElementsByClassName("question-description")[0].innerHTML = response.question;
	document.getElementsByClassName("total-questions-counter")[0].innerHTML = totalQuestions;
	// let template = Handlebars.compile($('#template').html());
	// $('#updates').append(template(response));
}

$(function() {
  compile();
	$("#skip").on("click", function() {
			// app();
			// $('#updates').empty();
			totalQuestions++;
			compile();
	});
});
