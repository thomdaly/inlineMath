const mathTag = document.getElementsByTagName("math-inline");

const changeArray = [
    ["*"    , "⋅"],
    ["!="   , "≠"],
    ["PI"   , "π"],
    ["MU"   , "μ"],
    ["SIGMA", "Σ"],
    ["DELTA", "Δ"],
];

const replaceArray = [
    ["^"   , (passedString) => { return passedString.sup() }, " "],
    ["SUB(", (passedString) => { return passedString.sub() }, ")"],
]

for (var i = 0; i < mathTag.length; i++) {
    mathTag[i].style.fontFamily = "computerModern";

    for (var j = 0; j < replaceArray.length; j++) {
        for (var l = 0; mathTag[i].innerHTML.split(replaceArray[j][0]).length != 1; l++) {
            var newStr = "";
            for (var n = replaceArray[j][0].length; mathTag[i].innerHTML[mathTag[i].innerHTML.indexOf(replaceArray[j][0]) + n] != replaceArray[j][2] && mathTag[i].innerHTML[mathTag[i].innerHTML.indexOf(replaceArray[j][0]) + n] != undefined; n++) {
                newStr += mathTag[i].innerHTML[mathTag[i].innerHTML.indexOf(replaceArray[j][0]) + n];
            }
            mathTag[i].innerHTML = mathTag[i].innerHTML.substr(0, mathTag[i].innerHTML.indexOf(replaceArray[j][0])) + replaceArray[j][1](newStr) + mathTag[i].innerHTML.substr(mathTag[i].innerHTML.indexOf(replaceArray[j][0]) + replaceArray[j][0].length + newStr.length + 1);
        }
    }

    for (var j = 0; j < changeArray.length; j++) {
        for (var l; mathTag[i].innerHTML.split(changeArray[j][0]).length != 1; l) {
            mathTag[i].innerHTML = mathTag[i].innerHTML.substr(0, mathTag[i].innerHTML.indexOf(changeArray[j][0])) + changeArray[j][1] + mathTag[i].innerHTML.substr(mathTag[i].innerHTML.indexOf(changeArray[j][0]) + changeArray[j][0].length)
        }
    }
}