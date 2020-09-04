<template>
  <div id="app">
    <div id="test" contenteditable>Select any part of this text and then click 'Run'.</div>
    <button id="execute">Run</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {
    let counter = 0; // console.log(newStr.replace('</span>', '<span'));
    let execute = document.getElementById("execute");
    let test = document.getElementById("test");
    execute.addEventListener("click", function () {
      var range = window.getSelection().getRangeAt(0);
      let span = document.createElement("span");

      span.style.cssText = "color:red";
      span.appendChild(range.extractContents());
      range.insertNode(span);

      let spans = document.querySelectorAll("#test > span");

      for (let i = 0; i < spans.length; i++) {
        if (spans[i].children.length > 0) {
          let newElem = spans[i].innerHTML.replace("<span", "</span><span");
          newElem = newElem.replace(/<\/span>/gi, function (match) {
            counter++;
            return counter === 2 ? "</span><span>" : match;
          });
          let inner = test.innerHTML;
          let newtext = inner.replace(spans[i].innerHTML, newElem);
          test.innerHTML = newtext;
        }
      }
      //range.removeAllRanges();
    });
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
