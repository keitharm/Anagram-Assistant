$(() => {
  let input  = $("#input");
  let output = $("#output");
  let avail  = $("#lettersAvailable");
  let count  = $("#lettersCount");

  function calcLetters() {
    let inputLetters  = {};
    let outputLetters = {};

    let inputSplit  = $("#input").val().trim().toLowerCase().replace(/ /g, '').split('').sort();
    let outputSplit = $("#output").val().trim().toLowerCase().replace(/ /g, '').split('').sort();

    let difference = filter(outputSplit, inputSplit);

    $.each(difference, (index, val) => {
      if (val in inputLetters) inputLetters[val]++;
      else inputLetters[val] = 1;
    });

    $.each(outputSplit, (index, val) => {
      if (val in outputLetters) outputLetters[val]++;
      else outputLetters[val] = 1;
    });

    let letterRow = "";
    let countRow = "";

    if (Object.keys(inputLetters).length === 0) {
      letterRow = "<th></th>";
      countRow  = "<td>No more letters available</td>";
    } else {

      $.each(Object.keys(inputLetters).sort(), (index, value) => {
        let count = inputLetters[value];
        letterRow += `<th>${value}</th>`;
        countRow += `<td>${count < 9 ? count : '9+'}</td>`;
      });
    }

    avail.html(letterRow);
    count.html(countRow);

    // Remove missing input letters from output
    let extraLetters = filter(inputSplit, outputSplit);

    extraLetters.forEach(letter => {
      output.val(output.val().split('').reverse().join('').replace(new RegExp(letter, 'i'), '').split('').reverse().join(''));
    });
  }

  input.on("change keyup", calcLetters);
  output.on("change keyup", calcLetters);
  calcLetters();
});


function filter(a, b) {
  a = a.slice();
  b = b.slice();


  a.forEach(val => {
    let index = b.indexOf(val);
    if (index !== -1) {
      b.splice(index, 1);
    }
  });

  return b;
}
