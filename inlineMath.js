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
        return "<span class='TO' style='display: inline-block; position: relative; transform: translateY(-0.4em); font-size: 0.8em; padding-left: 0.15em;'>" + passedString + "</span>";
    }],
    ["SUB", (passedString) => {
        return "<span class='SUB' style='display: inline-block; position: relative; transform: translateY(0.4em); font-size: 0.8em; padding-left: 0.15em;'>" + passedString + "</span>";
    }],
    ["OVER", (passedString) => {
        return "<span class='OVER'><div style='display: inline-block; position: relative; vertical-align: middle; text-align: center; font-size: 0.8em; margin: 0em 0.4em 0em 0.4em; transform: translateY(-0.1em);'><span style='display: block;'>" + passedString.split(", ")[0] + "</span><span style='display: none'>/</span><span style='border-top: 0.04em solid black; display: block;'>" + passedString.split(", ")[1] + "&nbsp</span></div></span>";
    }],
    ["SQRT", (passedString) => {
        return "<span class='SQRT'><span style='font-size: 1.1em;'>√</span><span style='font-size: 0.8em; border-top: solid 0.05em black; margin-left: 0.14em; padding-right: 0.5em; padding-top: 0.02em;'>" + passedString + "</span></span>";
    }],
]

for (var i = 0; i < mathTag.length; i++) {
    mathTag[i].style.fontFamily = "computerModern";
    mathTag[i].style.cursor = "pointer";
    mathTag[i].style.padding = "0 0.3em 0 0.3em";
    mathTag[i].style.borderRadius = "0.4em";

    var alert = document.createElement("div");
    alert.style.display = "block";
    alert.style.position = "absolute";
    alert.style.textAlign = "center";
    alert.style.borderRadius = "0.4em";
    alert.style.padding = "0 0.3em 0 0.3em";
    alert.style.fontSize = "0.7em";
    alert.style.opacity = "0";
    alert.innerHTML = "Item successfully copied to clipboard";
    alert.className = "alert";
    mathTag[i].append(alert);

    for (var j = 0; j < replaceArray.length; j++) {
        replaceArray[j][0] += "{";
        while (mathTag[i].innerHTML.split(replaceArray[j][0]).length != 1) {
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
        while (mathTag[i].innerHTML.split(changeArray[j][0]).length != 1) {
            mathTag[i].innerHTML = mathTag[i].innerHTML.substr(0, mathTag[i].innerHTML.indexOf(changeArray[j][0])) + changeArray[j][1] + mathTag[i].innerHTML.substr(mathTag[i].innerHTML.indexOf(changeArray[j][0]) + changeArray[j][0].length)
        }
    }

    mathTag[i].addEventListener("click", (e) => {
        for (var i = 0; i < mathTag.length; i++) {
            if (mathTag[i] == e.target) {
                var obj = e.target;
            } else {
                var obj = e.target.closest("math-inline");
            }
        }

        var dupeObj = obj.cloneNode(true);
        var alertObj = null;
        for (var i = 0; i < obj.children.length; i++) {
            if (obj.children[i].className == "alert") {
                alertObj = obj.children[i];
                break;
            }
        }

        alertObj.style.transform = "translateY(-2em)";
        var u2 = 0;
        var interval2 = setInterval(() => {
            u2 >= 1.0 ? clearInterval(interval2) : null;
            alertObj.style.setProperty("opacity", "" + ((0 - u2) * 0 + u2 * 1) + "");
            alertObj.style.setProperty("transform", "translateY(" + ((0 - u2) * 0 + u2 * 1) + "em)");
            u2 += 1 / 30;
        }, 10);
        setTimeout(() => {
            var u2 = 0;
            var interval2 = setInterval(() => {
                u2 >= 1.0 ? clearInterval(interval2) : null;
                alertObj.style.setProperty("opacity", "" + ((1 - u2) * 1 + u2 * 0) + "");
                alertObj.style.setProperty("transform", "translateY(" + ((1 - u2) * 1 + u2 * 0) + "em)");
                u2 += 1 / 30;
            }, 10);
        }, 1200)

        var rewrite = {
            TO: () => {
                dupeObj.innerHTML = dupeObj.innerHTML.split(dupeObj.children[0].outerHTML)[0] + "^(" + dupeObj.children[0].innerHTML + ")" + dupeObj.innerHTML.split(dupeObj.children[0].outerHTML)[1];
            },
            SUB: () => {
                dupeObj.innerHTML = dupeObj.innerHTML.split(dupeObj.children[0].outerHTML)[0] + "sub(" + dupeObj.children[0].innerHTML + ")" + dupeObj.innerHTML.split(dupeObj.children[0].outerHTML)[1];
            },
            OVER: () => {
                dupeObj.innerHTML = dupeObj.innerHTML.split(dupeObj.children[0].outerHTML)[0] + "((" + dupeObj.children[0].children[0].children[0].innerHTML + ") / (" + dupeObj.children[0].children[0].children[2].innerHTML.replace('&nbsp;', '') + "))" + dupeObj.innerHTML.split(dupeObj.children[0].outerHTML)[1];
            },
            SQRT: () => {
                dupeObj.innerHTML = dupeObj.innerHTML.split(dupeObj.children[0].outerHTML)[0] + "sqrt(" + dupeObj.children[0].children[1].innerHTML + ")" + dupeObj.innerHTML.split(dupeObj.children[0].outerHTML)[1];
            },
        }

        while (dupeObj.innerHTML.split("<span").length != 1) {
            rewrite[dupeObj.children[0].className]();
        }

        var el = document.createElement('textarea');
        el.value = dupeObj.innerHTML.split("<div")[0];
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    });
}