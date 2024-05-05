let output = document.getElementById("displayField");
let log = [];

function add(value) {
  output.value += value;
  log.push(value);
  return;
}

function reset() {
  if (output.value == "") {
    alert("Calculator was already resetted");
    log = [];
    return;
  } else {
    output.value = "";
    log = [];
    return;
  }
}

function calculate() {
  let cal = 0;
  cal = eval(output.value);

  if (cal == "" || cal == undefined) {
    alert("Please input value");
    log = [];
    return;
  } else if (cal == isNaN) {
    alert("Not able to calculate this.");
    log = [];
    return;
  } else {
    output.value = cal;
    log.push("=" + cal);
    console.log(log);
    log = [];
    return;
  }
}
