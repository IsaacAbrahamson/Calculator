var current = '0';
var firstNum = 0;
var operator = '';
var warningModal = document.getElementById('warning');

var operateIt = {
  '+': function(x, y) {
    return x + y
  },
  '-': function(x, y) {
    return x - y
  },
  '*': function(x, y) {
    return x * y
  },
  '/': function(x, y) {
    return x / y
  }
};

function checkLimit() {
  if (current.toString().length > 15) {
    warningModal.style.display = "block";
    return true;
  } else {
    return false;
  }
}

function displayCurrent() {
  document.getElementById('output-text').innerHTML = current;
}

document.getElementById("clear").onclick = function() {
  total = 0;
  current = '0';
  displayCurrent();
};

document.getElementById("equals").onclick = function() {
  current = operateIt[operator](firstNum, parseFloat(current));
  if (checkLimit()) {
    current = '0';
  }
  firstNum = 0;
  displayCurrent();
};

var operators = document.querySelectorAll('.operator');
for (var i = 0; i < operators.length; i++) {
  operators[i].onclick = function(event) {
    operator = this.id;
    if (firstNum !== 0) {
      firstNum = operateIt[operator](firstNum, parseFloat(current));
      current = '0';
      displayCurrent();
    } else {
      firstNum = parseFloat(current);
      current = '0';
      displayCurrent();
    }
  }
}

var calcBtns = document.querySelectorAll('.number');
for (var i = 0; i < calcBtns.length; i++) {
  calcBtns[i].onclick = function(event) {
    if (checkLimit()) {
      return;
    }

    var value = this.id;
    
    if (value === '.' && current.indexOf('.') > -1) {
       return;
     }

    if (current === '0') {
      current = value;
    } else {
      current += value;
    }
    displayCurrent();
  }
}

document.getElementsByClassName("close")[0].onclick = function() {
  warningModal.style.display = "none";
}