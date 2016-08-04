var current = '0';
var total = 0;
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

document.getElementById("clear").onclick = function() {
  total = 0;
  current = '0';
  document.getElementById('output-text').innerHTML = current;
};

document.getElementById("equals").onclick = function() {
  current = operateIt[operator](parseFloat(total), parseFloat(current));
  total = 0; 
  document.getElementById('output-text').innerHTML = current;
};

var operators = document.querySelectorAll('.operator');
for (var i = 0; i < operators.length; i++) {
  operators[i].onclick = function(event) {    
    if (total == 0) {
      total = current;
      current = '0';      
      operator = this.id;
      document.getElementById('output-text').innerHTML = current;
    } else {
      total = operateIt[operator](parseFloat(total), parseFloat(current));
      operator = this.id;
      current = '0'; 
      document.getElementById('output-text').innerHTML = current;
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
    document.getElementById('output-text').innerHTML = current;
  }
}

document.getElementsByClassName("close")[0].onclick = function() {
  warningModal.style.display = "none";
}