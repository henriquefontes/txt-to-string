const sqlTextArea = document.getElementById("sql");
const stringTextArea = document.getElementById("string");
//
const toStringBtn = document.getElementById("to-string");
const toSqlBtn = document.getElementById("to-sql");

function convertToString(_sql) {
  const splittedSql = _sql.split("\n");

  const sql = splittedSql
    .map((line, index, array) => {
      const isLastIndex = index === array.length - 1;

      if (isLastIndex) {
        return '"' + line + '";';
      }

      return '"' + line + " " + "\\n" + '"' + "+" + "\n";
    })
    .join("");

  return sql;
}

function convertToSql(_string) {
  const splittedString = _string.split("+");
  const lastLine = splittedString[splittedString.length - 1];
  const lastLineChar = lastLine[lastLine.length - 1];

  if (lastLineChar === ";") {
    splittedString[splittedString.length - 1][
      splittedString[splittedString.length - 1] - 1
    ] = "";
  }

  return splittedString
    .map((line) => line.replaceAll('"', ""))
    .map((line) => {
      if (line.substring(0, 1) === "\n") {
        return line.replace("\n", "");
      }

      return line;
    })
    .map((line) => line.replace("\\n", "\n"))
    .join("");
}

toSqlBtn.addEventListener("click", () => {
  sqlTextArea.value = convertToSql(stringTextArea.value);
});

toStringBtn.addEventListener("click", () => {
  stringTextArea.value = convertToString(sqlTextArea.value);
});

document.querySelectorAll("i").forEach((copyBtn) => {
  const textArea = copyBtn.parentElement.parentElement.children[0];

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(textArea.value);
  });
});
