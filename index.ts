const button = document.querySelector('button');
const input = document.getElementById('calculatorInput')! as HTMLInputElement;
const answerHeader = document.getElementById('equationAnswer');

function Add(num1: number, num2: number){
    return num1 + num2;
}

function Calculate(values, tokens: Array<operator>): string{
    let i = 0;
    for(let token of tokens){
        switch(token){
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
    for(let i = 0; i < tokens.length;){
        switch(tokens[i]){
            case '*':
                values[i] = (+values[i] * +values[i+1]);
                tokens.splice(i, 1);
                values.splice(i + 1, 1);
                break;
            case '/':
                if(+values[i + 1] != 0)
                {
                    values[i] = +values[i] / +values[i+1];
                    tokens.splice(i, 1);
                    values.splice(i + 1, 1);
                }
                else{
                    values[i] = +values[i] / 1;
                    tokens.splice(i, 1);
                    values.splice(i + 1, 1);
                }
                break;
            case '^':
                    values[i] = Math.pow(+values[i], +values[i+1]); 
                    tokens.splice(i, 1);
                    values.splice(i + 1, 1);
                break;
            default:
                i++;
                break;
        }
        
    }
    var result = +values[0];
    i = 0;
    for(let token of tokens){
        i++;
        switch(token){
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

type operator = '+' | '-' | '*' | '/' | '%' | ',' | '^';

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

function ParseToArray(text: string){
return text.split(/[\+\-\*\/\%\,\^]/);
}

function SubmitCalculation()
{
    answerHeader.innerText = Calculate(ParseToArray(input.value),  GetCalculationTokens(input.value));
}

button.addEventListener('click', function () {
    SubmitCalculation();
});
