const mathTag = document.getElementsByTagName("math-inline");

const changeArray = [
    // shorthand
    ["*", "∙"],
    ["!=", "≠"],
    ["PI", "π"],
    ["MU", "μ"],
    ["SIGMA", "Σ"],
    ["DELTA", "Δ"],
    ["+-", "±"],
    ["THETA", "Ѳ"],
    // longhand
    ["FOR_ALL", "∀"],
    ["COMPLEMENT", "∁"],
    ["PARTIAL_DIFFERENTIAL", "∂"],
    ["THERE_EXISTS", "∃"],
    ["THERE_DOES_NOT_EXIST", "∄"],
    ["EMPTY_SET", "∅"],
    ["INCREMENT", "∆"],
    ["NABLA", "∇"],
    ["ELEMENT_OF", "∈"],
    ["NOT_AN_ELEMENT_OF", "∉"],
    ["CONTAINS_AS_MEMBER", "∋"],
    ["DOES_NOT_CONTAIN_AS_MEMBER", "∌"],
    ["END_OF_PROOF", "∎"],
    ["N-ARY_PRODUCT", "∏"],
    ["N-ARY_COPRODUCT", "∐"],
    ["N-ARY_SUMMATION", "∑"],
    ["MINUS_SIGN", "−"],
    ["MINUS-OR-PLUS_SIGN", "∓"],
    ["DOT_PLUS", "∔"],
    ["DIVISION_SLASH", "∕"],
    ["SET_MINUS", "∖"],
    ["ASTERISK_OPERATOR", "∗"],
    ["RING_OPERATOR", "∘"],
    ["BULLET_OPERATOR", "∙"],
    ["SQUARE_ROOT", "√"],
    ["CUBE_ROOT", "∛"],
    ["FOURTH_ROOT", "∜"],
    ["PROPORTIONAL_TO", "∝"],
    ["INFINITY", "∞"],
    ["RIGHT_ANGLE", "∟"],
    ["ANGLE", "∠"],
    ["MEASURED_ANGLE", "∡"],
    ["SPHERICAL_ANGLE", "∢"],
    ["DIVIDES", "∣"],
    ["DOES_NOT_DIVIDE", "∤"],
    ["PARALLEL_TO", "∥"],
    ["NOT_PARALLEL_TO", "∦"],
    ["LOGICAL_AND", "∧"],
    ["LOGICAL_OR", "∨"],
    ["INTERSECTION", "∩"],
    ["UNION", "∪"],
    ["CONTOUR_INTEGRAL", "∮"],
    ["SURFACE_INTEGRAL", "∯"],
    ["VOLUME_INTEGRAL", "∰"],
    ["TRIPLE_INTEGRAL", "∭"],
    ["DOUBLE_INTEGRAL", "∬"],
    ["INTEGRAL", "∫"],
    ["CLOCKWISE_CONTOUR_INTEGRAL", "∲"],
    ["CLOCKWISE_INTEGRAL", "∱"],
    ["ANTICLOCKWISE_CONTOUR_INTEGRAL", "∳"],
];

const replaceArray = [
    ["TO", (passedString) => {
        return passedString.sup();
    }],
    ["SUB", (passedString) => {
        return passedString.sub();
    }],
    ["OVER", (passedString) => {
        return "<div style='display: inline-block; position: relative; vertical-align: middle; text-align: center; font-size: 0.8em; margin: 0em 0.4em 0em 0.4em; transform: translateY(-0.1em);'><span style='display: block;'>" + passedString.split(", ")[0] + "</span><span style='display: none'>/</span><span style='border-top: thin solid black; display: block;'>" + passedString.split(", ")[1] + "&nbsp</span></div>";
    }],
    ["SQRT", (passedString) => {
        return "√<span style='font-size: 0.75em; border-top: solid 0.05em black; margin-left: 0.2em; padding-right: 0.5em;'>" + passedString + "</span>";
    }],
    ["ROOT", (passedString) => {
        return "<span style='display: inline-block; font-size: 0.5em; transform: translate(0.6em, -0.8em); text-align: right;'>" + passedString.split(", ")[0] + "</span>√<span style='font-size: 0.75em; border-top: solid 0.05em black; margin-left: 0.2em; padding-right: 0.5em;'>" + passedString.split(", ")[1] + "</span>";
    }],
]

for (var i = 0; i < mathTag.length; i++) {
    mathTag[i].style.fontFamily = "computerModern";
    mathTag[i].style.margin = "0 0.3em 0 0.3em";

    for (var j = 0; j < replaceArray.length; j++) {
        replaceArray[j][0] += "{";
        for (var l; mathTag[i].innerHTML.split(replaceArray[j][0]).length != 1; l) {
            var newStr = "";
            var iter = 0;
            for (var n = replaceArray[j][0].length; mathTag[i].innerHTML[mathTag[i].innerHTML.indexOf(replaceArray[j][0]) + n] != "}" || iter > 0; n++) {
                newStr += mathTag[i].innerHTML[mathTag[i].innerHTML.indexOf(replaceArray[j][0]) + n];
                mathTag[i].innerHTML[mathTag[i].innerHTML.indexOf(replaceArray[j][0]) + n] == "{" ? iter++ : null;
                mathTag[i].innerHTML[mathTag[i].innerHTML.indexOf(replaceArray[j][0]) + n] == "}" ? iter-- : null;
            }
            mathTag[i].innerHTML = mathTag[i].innerHTML.substr(0, mathTag[i].innerHTML.indexOf(replaceArray[j][0])) + replaceArray[j][1](newStr, mathTag[i]) + mathTag[i].innerHTML.substr(mathTag[i].innerHTML.indexOf(replaceArray[j][0]) + replaceArray[j][0].length + newStr.length + 1);
        }
    }

    for (var j = 0; j < changeArray.length; j++) {
        for (var l; mathTag[i].innerHTML.split(changeArray[j][0]).length != 1; l) {
            mathTag[i].innerHTML = mathTag[i].innerHTML.substr(0, mathTag[i].innerHTML.indexOf(changeArray[j][0])) + changeArray[j][1] + mathTag[i].innerHTML.substr(mathTag[i].innerHTML.indexOf(changeArray[j][0]) + changeArray[j][0].length)
        }
    }

    for (var j = 0; j < mathTag[i].children.length; j++) {
        if (mathTag[i].children[j].tagName == "SUP") {
            mathTag[i].children[j].style.fontSize = "0.6em";
            mathTag[i].children[j].style.marginLeft = "0.1em";
        } else if (mathTag[i].children[j].tagName == "SUB") {
            mathTag[i].children[j].style.fontSize = "0.5em";
        }
    }
}