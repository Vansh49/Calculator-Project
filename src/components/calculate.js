// calculate.js

// ---------------- HELPERS ----------------

function isOperator(token) {
  return ["+", "-", "*", "/", "^"].includes(token);
}

function isFunction(token) {
  return ["sin", "cos", "tan", "log", "sqrt"].includes(token);
}

function precedence(token) {
  if (token === "+" || token === "-") return 1;
  if (token === "*" || token === "/") return 2;
  if (token === "^") return 3;
  if (isFunction(token)) return 4;
  return 0;
}

// ---------------- TOKENIZER ----------------

function tokenize(expression) {
  return expression.match(
    /(\d+\.?\d*|sin|cos|tan|log|sqrt|\+|\-|\*|\/|\^|\(|\))/g
  );
}

// ---------------- INFIX → POSTFIX ----------------

export function infixToPostfix(expression) {
  const tokens = tokenize(expression);
  const output = [];
  const stack = [];

  for (let token of tokens) {
    if (!isNaN(token)) {
      // number
      output.push(token);
    } else if (isFunction(token)) {
      stack.push(token);
    } else if (token === "(") {
      stack.push(token);
    } else if (token === ")") {
      while (stack.length && stack[stack.length - 1] !== "(") {
        output.push(stack.pop());
      }
      stack.pop(); // remove "("

      // if function is on top → pop it too
      if (stack.length && isFunction(stack[stack.length - 1])) {
        output.push(stack.pop());
      }
    } else if (isOperator(token)) {
      while (
        stack.length &&
        precedence(stack[stack.length - 1]) >= precedence(token)
      ) {
        output.push(stack.pop());
      }
      stack.push(token);
    }
  }

  while (stack.length) {
    output.push(stack.pop());
  }

  return output;
}

// ---------------- POSTFIX EVALUATION ----------------

export function evaluatePostfix(postfix) {
  const stack = [];

  for (let token of postfix) {
    if (!isNaN(token)) {
      stack.push(Number(token));
    } else if (isOperator(token)) {
      const b = stack.pop();
      const a = stack.pop();

      let result;

      switch (token) {
        case "+":
          result = a + b;
          break;
        case "-":
          result = a - b;
          break;
        case "*":
          result = a * b;
          break;
        case "/":
          if (b === 0) return "Error";
          result = a / b;
          break;
        case "^":
          result = Math.pow(a, b);
          break;
        default:
          return "Error";
      }

      stack.push(result);
    } else if (isFunction(token)) {
      const value = stack.pop();

      let result;

      switch (token) {
        case "sin":
          result = Math.sin(value);
          break;
        case "cos":
          result = Math.cos(value);
          break;
        case "tan":
          result = Math.tan(value);
          break;
        case "log":
          result = Math.log10(value);
          break;
        case "sqrt":
          result = Math.sqrt(value);
          break;
        default:
          return "Error";
      }

      stack.push(result);
    }
  }

  return stack.pop();
}

// ---------------- MAIN FUNCTION ----------------

export function calculateExpression(expression) {
  try {
    const postfix = infixToPostfix(expression);
    const result = evaluatePostfix(postfix);

    return result;
  } catch {
    return "Error";
  }
}