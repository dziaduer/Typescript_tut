const button = document.querySelector('button');
const input = document.getElementById('calculatorInput')! as HTMLInputElement;
const answerHeader = document.getElementById('equationAnswer');

function Add(num1: number, num2: number){
    return num1 + num2;
}

function Calculate(values: Array<string>, tokens: Array<operator>): string{
    var result = +values[0];
    let i = 0;
    for(let token of tokens){
        i++;
        switch(token){
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

type operator = '+' | '-' | '*' | '/';

function GetCalculationTokens(text: string){
    let tokens: Array<operator>;
    tokens = [];
    let letters = text.split('');
    for(let letter of letters){
        switch(letter){
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

function ParseToArray(text: string){
return text.split(/[\+\-\*\/]/);
}

function SubmitCalculation()
{
    answerHeader.innerText = Calculate(ParseToArray(input.value),  GetCalculationTokens(input.value));
}

button.addEventListener('click', function () {
    SubmitCalculation();
});
