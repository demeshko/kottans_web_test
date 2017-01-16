let totalQuestions = 0;
let answerCounter = 0;
let questionAnswer = '';
function getQuestion() {
  $.get('https://jservice.io/api/random').done(function(data) {
	  let question = data[0];
    if (question.answer.split(" ").length > 1) {
    	// console.log("reject: " + question.answer);
      getQuestion();
    } else {
    	console.log("Answer: " + question.answer.replace(/<\/?[^>]+(>|$)/g, ""));
      questionAnswer = question.answer.replace(/<\/?[^>]+(>|$)/g, "");
      bindQuestion(question);
    }
  });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function addButtons(answer) {
  let shuffledArray = shuffleArray(answer.split(""));
  let len = shuffledArray.length;
         for (let i = 0; i < len; i++) {
          // console.log(i);
          let li = $('<li class="inline-block"><button class="character">' + shuffledArray[i] + "</button></li>");
          $("#shuffled-answer").append(li);
        }
}

function bindQuestion(question) {
	let answer = question.answer.replace(/<\/?[^>]+(>|$)/g, "");
	$(".question-id").text(question.id);
	$(".question-category").text(question.category.title);
	$(".question-description").text(question.question);
	$(".total-questions-counter").text(totalQuestions);
  $(".correct-answers-counter").text(answerCounter);
  addButtons(answer);
}

$(function(){
  getQuestion();
	$("#skip").on("click", function() {
  	totalQuestions++;
    $('#shuffled-answer').empty();
    $('#answer-check').empty();
	  getQuestion();
	});

  $("body").on("domChanged", function () {
    let answer = '';
    $( "#answer-check > li" ).each(function(index) {
        answer += $(this).text();
    });
    if (answer ===  questionAnswer) {
      $("#myModal").modal();
      answerCounter++;
      totalQuestions++;
      $('#shuffled-answer').empty();
      $('#answer-check').empty();
      getQuestion();
    }
  });

  $(document).on('click', '#shuffled-answer > li > button', function() {
    let chr = $(this).parent('.inline-block');
    $(this).parent('.inline-block').remove();
    $('#answer-check').append(chr);
    $("body").trigger("domChanged");
  });

  $(document).on('click', '#answer-check > li > button', function() {
    let chr = $(this).parent('.inline-block');
    $(this).parent('.inline-block').remove();
    $('#shuffled-answer').append(chr);

  });

});
