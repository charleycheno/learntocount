const game = document.getElementById("game");
const display = document.getElementById("display");
const input = document.getElementById("input");
const form = document.getElementById("form");
const check = document.getElementById("check");
const skip = document.getElementById("skip");
const show = document.getElementById("show");
const maximum = document.getElementById("maximum");
const select = document.getElementById("select");
const reverse = document.getElementById("reverse");
const message = document.getElementById("message");

var chosenLanguage = select.value;
var reverseValue = false;

var vowels = "aeiou";
var softSign = "ь";

var irregulars;

fetch('./irregulars.json')
  .then(results => results.json())
  .then(data => irregulars = data)
  .then(round)

function EnglishVersion(number) {
  var language = "english";
  var result;

  if(irregulars[language][number] != undefined) {
    result = irregulars[language][number];
  } else if(number > 20 && number < 100) {
    var tens = Math.floor(number / 10);
    var ones = number - (tens * 10);
    result = numbersToLetters(tens * 10, language) + "-" + numbersToLetters(ones, language);
  }

  return result;
}

function DutchVersion(number) {
  var language = "dutch";
  var result;
  var trema = false;

  if(irregulars[language][number] != undefined) {
    result = irregulars[language][number];
  } else if(number >= 15 && number < 20) {
    var tens = Math.floor(number / 10);
    var ones = number - (tens * 10);
    result = numbersToLetters(ones, language) + numbersToLetters(10, language);
  } else if(number > 20 && number < 100) {
    var tens = Math.floor(number / 10);
    var ones = number - (tens * 10);

    for (let i = 0; i < vowels.length; i++) {
      if(numbersToLetters(ones, language).charAt(numbersToLetters(ones, language).length - 1) == vowels[i]) {
        trema = true;
      }
    }

    if(trema == false) {
      result = numbersToLetters(ones, language) + "en" + numbersToLetters(tens * 10, language);
    } else {
      result = numbersToLetters(ones, language) + "ën" + numbersToLetters(tens * 10, language);
    }
  }

  return result;
}

function GermanVersion(number) {
  var language = "german";
  var result;

  if(irregulars[language][number] != undefined) {
    result = irregulars[language][number];
  } else if(number > 12 && number < 20) {
    var tens = Math.floor(number / 10);
    var ones = number - (tens * 10);
    result = numbersToLetters(ones, language) + numbersToLetters(10, language);
  } else if(number - (Math.floor(number / 10) * 10) == 1) {
    var tens = Math.floor(number / 10);
    var ones = number - (tens * 10);
    result = numbersToLetters(ones, language).slice(0, -1) + "und" + numbersToLetters(tens * 10, language);
  } else if(number > 20 && number < 100) {
    var tens = Math.floor(number / 10);
    var ones = number - (tens * 10);
    result = numbersToLetters(ones, language) + "und" + numbersToLetters(tens * 10, language);
  }

  return result;
}

function ChineseVersion(number) {
  var language = "chinese";
  var result;

  if(irregulars[language][number] != undefined) {
    result = irregulars[language][number];
  } else if(number > 10 && number < 100) {
    var tens = Math.floor(number / 10);
    var ones = number - (tens * 10);

    if(tens == 1) {
      result = numbersToLetters(10, language);
    } else if(tens > 1) {
      result = numbersToLetters(tens, language) + numbersToLetters(10, language);
    } if(ones != 0) {
      result = result + numbersToLetters(ones, language);
    }
  }

  return result;
}

function RussianVersion(number) {
  var language = "russian";
  var result;

  if(irregulars[language][number] != undefined) {
    result = irregulars[language][number];
  } else if(number > 10 && number < 20) {
    var tens = Math.floor(number / 10);
    var ones = number - (tens * 10);

    if(numbersToLetters(ones, language).charAt(numbersToLetters(ones, language).length - 1) == softSign) {
      result = numbersToLetters(ones, language).slice(0, -1) + "на" + "дцать";
    } else {
      result = numbersToLetters(ones, language) + "на" + "дцать";
    }
  } else if(number > 20 && number < 100) {
    var tens = Math.floor(number / 10);
    var ones = number - (tens * 10);

    result = numbersToLetters(tens * 10, language) + " " + numbersToLetters(ones, language);
  }

  return result;
}

function FrenchVersion(number) {
  var language = "french";
  var result;

  if(irregulars[language][number] != undefined) {
    result = irregulars[language][number];
  } else if(number > 16 && number < 20) {
    result = "dix" + "-" + numbersToLetters(number - 10, language);
  } else if(number > 20 && number < 70) {
    var tens = Math.floor(number / 10);
    var ones = number - (tens * 10);

    if(ones == 1) {
      result = numbersToLetters(tens * 10, language) + " et " + numbersToLetters(ones, language);
    } else {
      result = numbersToLetters(tens * 10, language) + "-" + numbersToLetters(ones, language);
    }
  } else if(number >= 70 && number < 80) {
    var tens = Math.floor(number / 10);
    var ones = number - (tens * 10);

    if(ones == 1) {
      result = numbersToLetters((tens * 10) - 10, language) + " et " + numbersToLetters(ones + 10, language);
    } else {
      result = numbersToLetters((tens * 10) - 10, language) + "-" + numbersToLetters(ones + 10, language);
    }
  } else if(number >= 80 && number < 100) {
    var tens = Math.floor(number / 10);
    var ones = number - (tens * 10);

    if(ones == 0) {
      result = numbersToLetters(4, language) + "-" + numbersToLetters(20, language) + "s";
    } else if(tens == 8) {
      result = numbersToLetters(4, language) + "-" + numbersToLetters(20, language) + "-" + numbersToLetters(ones, language);
    } else if(tens == 9) {
      result = numbersToLetters((tens * 10) - 10, language) + "-" + numbersToLetters(ones + 10, language);
    }
  }

  return result;
}

function numbersToLetters(number, language) {
  var result;

  switch (language.toLowerCase()) {
    case "english":
      result = EnglishVersion(number);
      break;
    case "dutch":
      result = DutchVersion(number);
      break;
    case "german":
      result = GermanVersion(number);
      break;
    case "chinese":
      result = ChineseVersion(number);
      break;
    case "russian":
      result = RussianVersion(number);
      break;
    case "french":
      result = FrenchVersion(number);
      break;
    default:
      result = "Error";
      break;
  }

  if(result == undefined) {
    result = "Error";
  }

  return result;
}

function round() {
  var maximumValue = maximum.value;

  var secretNumber = Math.round(Math.random() * maximumValue);

  if(reverseValue == false) {
    display.innerText = numbersToLetters(secretNumber, chosenLanguage);
  } else {
    display.innerText = secretNumber;
  }

  input.value = "";
  check.value = "Check";
  message.style.opacity = 0;

  correct = false;

  form.onsubmit = function(e) {
    e.preventDefault();
    if(correct == true) {
      round();
    } else {
      if(reverseValue == false) {
        if(input.value == secretNumber) {
          message.style.color = "green";
          message.innerText = "Correct!";
          message.style.opacity = 1;
          check.value = "Next";
          correct = true;
        } else {
          message.style.color = "red";
          message.innerText = "Incorrect!"
          message.style.opacity = 1;
        }
      } else {
        if(input.value == numbersToLetters(secretNumber, chosenLanguage)) {
          message.style.color = "green";
          message.innerText = "Correct!";
          message.style.opacity = 1;
          check.value = "Next";
          correct = true;
        } else {
          message.style.color = "red";
          message.innerText = "Incorrect!"
          message.style.opacity = 1;
        }
      }
      setTimeout('message.style.opacity = 0', 1000);
    }
  }

  skip.onclick = function() {
    round();
  }

  show.onclick = function () {
    if(reverseValue == false) {
      input.value = secretNumber;
    } else {
      input.value = numbersToLetters(secretNumber, chosenLanguage);
    }
  }

  maximum.oninput = function() {
    if(maximum.value >= 0 && maximum.value <= 100) {
      maximumValue = maximum.value;
    } else {
      maximum.value = 100;
    }
  }

  select.onchange = function() {
    chosenLanguage = select.value;
    round();
  }

  reverse.onclick = function() {
    switch (reverseValue) {
      case false:
        reverseValue = true;
        reverse.style.background = "lightgray";
        reverse.value = "Reversed";
        input.setAttribute("type", "text");
        break;

      case true:
        reverseValue = false;
        reverse.style.background = "white";
        reverse.value = "Normal"
        input.setAttribute("type", "number");
        break;
    
      default:
        break;
    }
    round();
  }
}