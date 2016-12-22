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

let response = request();
while (response.answer.split(" ").length > 2) {
		response = request();
}
console.log(response.answer.split(" ").length);
console.log(response.answer);
// document.getElementsByClassName("question-id")[0].innerHTML = question;
let template = Handlebars.compile($('#template').html());
$('#updates').append(template(response));
