var superscript = false;
var superscript_text;
var powers = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"]
var decimalUsed = false;

document.addEventListener("DOMContentLoaded", function() {
    const expression = document.querySelector("#expression");
    const expression_record = document.querySelector("#expression-record");
    const input_buttons = document.querySelectorAll(".writable");
    
    input_buttons.forEach((element) => {
        element.addEventListener("click", function() {
            expression.value += element.textContent.trim();
        });
    });
    
    const backspace = document.querySelector("#backspace");
    backspace.addEventListener("click", function() {
        expression.value = expression.value.slice(0, -1);
    });
    
    const all_clear = document.querySelector("#all-clear");
    all_clear.addEventListener("click", function() {
        expression.value = "";
    });
    
    const equals = document.querySelector("#equals");
    equals.addEventListener("click", function() {
        expression_record.innerHTML = expression.value;
        
        if (expression.value === "") {
            return;
        }
        
        processed_expression = process(expression.value)
        expression.value = eval(processed_expression);
    });
    
    expression.addEventListener("keyup", (event) => {
        expression.value = prettify(expression.value);

        if (event.key == "Enter") {
            // superscript = false;
            expression_record.innerHTML = expression.value;
            
            if (expression.value === "") {
                return;
            }

            processed_expression = process(expression.value);
            expression.value = eval(processed_expression);
        }

        // if (superscript && coefficients.includes(event.key)) {
        //     var i = expression.value.lastIndexOf(event.key);
        //     // alert("caught: " + expression.value[i] + " at i=" + i + " to change to " + powers[event.key]);
            
        //     expression.value = expression.value.split("").reverse().join("").replace(event.key, powers[event.key]).split("").reverse().join("");
        // }
        
        // if (event.key == "^") {
            // superscript = true;
        //     alert("superscript enabled");
        //     // expression.value = expression.value.replace("^", "");
        // }
        
        // if (event.key == "Escape" || event.key == "Esc") {
        //     var super_i = expression.value.lastIndexOf("^");
        //     alert("^ found at: " + super_i);
        //     if (super_i >= 0) {
        //         alert("bruh");
        //         var count = 0;
        //         alert("expression.value[i + 1]: " + expression.value.charAt(i + 1));
        //         while (superscriptable.includes(expression.value[i + 1 + count])) {
        //             count++;
        //         }
        //         alert("num of superscript: " + count);
        //     }
        // }

        // if (superscript) {
        //     superscript_text += event.key;
        //     alert("super text so far: " + superscript_text);
        // } else {
        //     alert("stop reading");
        //     if (superscript_text.length > 0) {
        //         alert("Prettifying: " + superscript_text);
        //         expression.value = expression.value.split("").reverse().join("").replace(event.key, powers[event.key]).split("").reverse().join("");
        //     }
        //     superscript_text = false;
        // }
        
        // if (event.key in numbers && superscript) {
            //     expression.value = expression.value.replace(event.key, powers[event.key]);
            // } else {
                //     superscript = false;
                // }
                
                
    });
});

var pairs = {
    "÷": "/",
    "×": "*",
    "^": "**",
    "π": Math.PI,
    "e": Math.E,
    "τ": 2 * Math.PI,
    "φ": 1.61803398874989484820
};

var coefficientable = ["π", "e", "φ", "τ"];
var superscriptable = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var coefficients = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "π", "e", "φ", "τ"];

function process(expression) {
    // Lowercase
    expression = expression.toLowerCase();

    // alert("BRACKETS STAGE");
    for (var i = 1, n = expression.length; i < n; i++) {
        if (coefficientable.includes(expression[i]) && coefficients.includes(expression[i - 1])) {
            var count = 0;
            for (var j = i - 1; coefficients.includes(expression[j]); j--) {
                count++;
            }
            var start = i - count;

            count = 0;
            for (var j = i; coefficientable.includes(expression[j]); j++) {
                count++;
            }
            var end = i + count;

            var bracketed_term = "(" + expression.slice(start, end) + ")";
            // alert("term bracketed: " + bracketed_term);

            expression = expression.slice(0, start) + bracketed_term + expression.slice(end);
            // alert("bracketed term reinserted: " + expression);

            i = end + 1; // end holds the position of the last constant found (add one for closing bracket)
            n += 2;
        }
    }

    // Add multiplication operator between coefficients and coefficientable
    // alert("COEFFICIENTS STAGE");
    for (var i = 1, n = expression.length; i < n; i++) {
        if (coefficientable.includes(expression[i]) && coefficients.includes(expression[i - 1])) {
            expression = expression.slice(0, i) + "*" + expression.slice(i);
            i++;
            n++;
            // alert("* added: " + expression);
        }
    }

    // alert("SUBSTITUTION STAGE");
    // Replace operators and coefficientable with corresponding values in pairs
    for (var [key, value] of Object.entries(pairs)) {
        if (expression.includes(key)) {
            expression = expression.toLowerCase().replaceAll(key, value);
            // alert(key + " replaced with " + value + ": " + expression);
        }
    }

    // Factorial calculation
    var num = "";
    for (var i in expression) {
        if (expression[i] === "!") {
            var j = i - 1;
            while (numbers.includes(expression[j])) {
                num += expression[j];
                j--;
            }

            num = num.split("").reverse().join("");
        }

        if (num !== "") {
            // alert("Computing factorial: " + num + "! = " + factorial(num));
            expression = expression.replace(num + "!", factorial(num));
            num = "";
        }
    }

    return expression;
}

var shorthand = {
    "pi": "π",
    "phi":  "φ",
    "tau":  "τ"
};


function prettify(expression) {
    expression = expression.toLowerCase();

    // Superscript text management
    // var start_i, end_i;
    // if (!(superscript || start_i == -1)) {
    //     end_i = expression.length;

    //     for (var i = start_i; i < end_i; i++) {
    //         if (!numbers.includes(expression[i]))
    //         expression[i] = powers[expression[i]];
    //     }
    // } else {
    //     start_i = expression.lastIndexOf("^");
    // }

    // Prettify coefficientable
    for (var [key, value] of Object.entries(shorthand)) {
        expression = expression.replaceAll(key, value);
    }

    return expression;
}

function inform(subject, message) {

}

function factorial(num) {
    if (num == 0) {
        return 1;
    }

    return num * factorial(num - 1);
}
