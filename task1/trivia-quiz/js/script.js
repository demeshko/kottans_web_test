let totalQuestions = 0;
let answerCounter = 0;
function getQuestion() {
  $.get('http://jservice.io/api/random').done(function(data) {
	  let question = data[0];
    if (question.answer.split(" ").length > 1) {
    	console.log("reject: " + question.answer);
      getQuestion();
    } else {
    	console.log("accept: " + question.answer);
      bindQuestion(question);
    }
  });
}

function bindQuestion(question) {
	let answer = question.answer.replace(/<\/?[^>]+(>|$)/g, "");
	$(".question-id").text(question.id);
	$(".question-category").text(question.category.title);
	$(".question-description").text(question.question);
	$(".total-questions-counter").text(totalQuestions);
}

$(function(){
  getQuestion();
	$("#skip").on("click", function() {
  	totalQuestions++;
	  getQuestion();
	});
});
