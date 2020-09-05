<template>
    <v-app id="app">
        <div id="container">
            Нажмите на кнопку, чтобы соответствующий метод отработал на
            выделении, <span style="color:red">или</span> на "resetExample",
            чтобы восстановить выделение как было.
        </div>
        <button id="btn">Set color</button>
        <button id="btn2">green</button>
        <button id="btn3">blue</button>
        <span>{{ color }}</span>
        <v-color-picker v-model="color"></v-color-picker>
        <v-btn
            color="primary"
            max-width="100"
            @click="replaceSelectedText(color)"
            >Set color</v-btn
        >
        <v-btn
            color="primary"
            max-width="100"
            @click="replaceSelectedText(null, color)"
            >Set Background</v-btn
        >
        <v-btn
            color="primary"
            max-width="100"
            @click="replaceSelectedText(null, null, '24')"
            >Set Fontsize</v-btn
        >
        <MinMaxSlider></MinMaxSlider>
    </v-app>
</template>

<script>
import MinMaxSlider from "./components/MinMaxSlider";
export default {
    name: "App",
    components: { MinMaxSlider },
    data() {
        return {
            color: "#000",
            fontSize: "12px",
        };
    },
    mounted() {
        // let btn = document.getElementById("btn");
        // btn.addEventListener("click", function() {
        //     replaceSelectedText("red");
        // });
        // let btn2 = document.getElementById("btn2");
        // btn2.addEventListener("click", function() {
        //     replaceSelectedText("green");
        // });
        // let btn3 = document.getElementById("btn3");
        // btn3.addEventListener("click", function() {
        //     replaceSelectedText("blue");
        // });
    },
    methods: {
        replaceSelectedText(color, bgColor, fontSize) {
            let container = document.getElementById("container");
            var sel, range;
            let counter = 0;
            if (window.getSelection().anchorNode) {
                sel = window.getSelection();
                let text = sel.toString();
                if (sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    range.deleteContents();
                    let span = document.createElement("span");
                    span.textContent = text;
                    if (color) {
                        span.style.color = color;
                        console.log("inside color");
                    } else if (bgColor) {
                        console.log("inside bgColor");
                        //console.log(span.style.color);
                        span.style.background = bgColor;
                    } else if (fontSize) {
                        console.log("inside fontsize");
                        span.style.fontSize = "24px";
                    }
                    range.insertNode(span);
                }
                let spans = document.querySelectorAll("#container > span");
                console.log(spans);

                for (let i = 0; i < spans.length; i++) {
                    if (spans[i].children.length > 0) {
                        let newElem = spans[i].innerHTML.replace(
                            "<span",
                            "</span><span"
                        );
                        newElem = newElem.replace(/<\/span>/gi, function(
                            match
                        ) {
                            counter++;
                            return counter === 2
                                ? `</span><span style="${spans[i].getAttribute(
                                      "style"
                                  )}">`
                                : match;
                        });
                        let inner = container.innerHTML;
                        let newtext = inner.replace(
                            spans[i].innerHTML,
                            newElem
                        );
                        container.innerHTML = newtext;
                        counter = 0;
                    }
                }
                window.getSelection().empty();
                range.collapse();
            } else {
                alert("here");
            }
        },
    },
};

/* eslint-disable */
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
