var button = document.querySelector('button');
var input = document.getElementById('calculatorInput');
var answerHeader = document.getElementById('equationAnswer');
function Add(num1, num2) {
    return num1 + num2;
}
function Calculate(values, tokens) {
    var result = +values[0];
    var i = 0;
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        i++;
        switch (token) {
            case '+':
                result = result + +values[i];
                break;
            case '-':
                result = result - +values[i];
                break;
            case '*':
                result = result * +values[i];
                break;
            case '/':
                result = result / +values[i];
                break;
        }
    }
    return result.toString();
}
function GetCalculationTokens(text) {
    var tokens;
    tokens = [];
    var letters = text.split('');
    for (var _i = 0, letters_1 = letters; _i < letters_1.length; _i++) {
        var letter = letters_1[_i];
        switch (letter) {
            case '+':
                tokens.push('+');
                break;
            case '-':
                tokens.push('-');
                break;
            case '*':
                tokens.push('*');
                break;
            case '/':
                tokens.push('/');
                break;
            default:
                break;
        }
    }
    return tokens;
}
function ParseToArray(text) {
    return text.split(/[\+\-\*\/]/);
}
function SubmitCalculation() {
    answerHeader.innerText = Calculate(ParseToArray(input.value), GetCalculationTokens(input.value));
}
button.addEventListener('click', function () {
    SubmitCalculation();
});
