function convertToString(_sql) {
  const splittedSql = _sql.split("\n");

  const sql = splittedSql
    .map((line, index, array) => {
      const isLastIndex = index === array.length - 1;

      if (isLastIndex) {
        return '"' + line + ';";';
      }

      return '"' + line + " " + "\\n" + '"' + "+" + "\n";
    })
    .join("");

  return sql;
}
const convertBtn = document.getElementById("convert");

convertBtn.addEventListener("click", () => {
  const sql = document.querySelector("textarea").value;

  navigator.clipboard.writeText(convertToString(sql));
});
