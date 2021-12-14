var button = document.querySelector('button');
var input = document.getElementById('calculatorInput');
var answerHeader = document.getElementById('equationAnswer');
function Add(num1, num2) {
    return num1 + num2;
}
function Calculate(values, tokens) {
    var i = 0;
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        switch (token) {
            case '%':
                values[i] = (+values[i] / 100);
                tokens.splice(i, 1);
                values.splice(i + 1, 1);
                break;
            case ',':
                values[i] = +(values[i] + '.' + values[i + 1]);
                tokens.splice(i, 1);
                values.splice(i + 1, 1);
                break;
        }
        i++;
    }
    for (var i_1 = 0; i_1 < tokens.length;) {
        switch (tokens[i_1]) {
            case '*':
                values[i_1] = (+values[i_1] * +values[i_1 + 1]);
                tokens.splice(i_1, 1);
                values.splice(i_1 + 1, 1);
                break;
            case '/':
                if (+values[i_1 + 1] != 0) {
                    values[i_1] = +values[i_1] / +values[i_1 + 1];
                    tokens.splice(i_1, 1);
                    values.splice(i_1 + 1, 1);
                }
                else {
                    values[i_1] = +values[i_1] / 1;
                    tokens.splice(i_1, 1);
                    values.splice(i_1 + 1, 1);
                }
                break;
            case '^':
                values[i_1] = Math.pow(+values[i_1], +values[i_1 + 1]);
                tokens.splice(i_1, 1);
                values.splice(i_1 + 1, 1);
                break;
            default:
                i_1++;
                break;
        }
    }
    var result = +values[0];
    i = 0;
    for (var _a = 0, tokens_2 = tokens; _a < tokens_2.length; _a++) {
        var token = tokens_2[_a];
        i++;
        switch (token) {
            case '+':
                result = result + +values[i];
                break;
            case '-':
                result = result - +values[i];
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
            case '%':
                tokens.push('%');
                break;
            case ',':
                tokens.push(',');
                break;
            case '^':
                tokens.push('^');
                break;
            default:
                break;
        }
    }
    return tokens;
}
function ParseToArray(text) {
    return text.split(/[\+\-\*\/\%\,\^]/);
}
function SubmitCalculation() {
    answerHeader.innerText = Calculate(ParseToArray(input.value), GetCalculationTokens(input.value));
}
button.addEventListener('click', function () {
    SubmitCalculation();
});
