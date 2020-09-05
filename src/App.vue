<template>
    <v-app id="app">
        <div id="container" contenteditable="true">
            Нажмите на кнопку, чтобы соответствующий метод отработал на
            выделении, <span style="color:red">или</span> на "resetExample",
            чтобы восстановить выделение как было.
        </div>
        <div class="color-picker">
            <v-color-picker v-model="color"></v-color-picker>
            <div class="color-picker__button-container">
                <v-btn
                    color="primary"
                    class="mb-4"
                    max-width="200"
                    @click="replaceSelectedText(color)"
                    >Set color</v-btn
                >
                <v-btn
                    color="primary"
                    max-width="200"
                    @click="replaceSelectedText(null, color)"
                    >Set Background</v-btn
                >
            </div>
            <MinMaxSlider min="4" max="50">
                <v-btn
                    color="primary"
                    class="ml-4"
                    max-width="150"
                    @click="replaceSelectedText(null, null, sliderr)"
                    >Set Fontsize</v-btn
                >
            </MinMaxSlider>
        </div>

        <v-row> </v-row>
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
        };
    },
    computed: {
        sliderr() {
            return this.$store.state.slider;
        },
    },
    mounted() {},
    methods: {
        replaceSelectedText(color, bgColor, fontSize) {
            let container = document.getElementById("container");
            var sel, range;
            let counter = 0;
            sel = window.getSelection();
            if (sel.anchorNode && sel.toString() != "") {
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
                        span.style.fontSize = fontSize + "px";
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
<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    padding: 20px;
}

#container {
    margin-bottom: 50px;
}
.color-picker {
    display: flex;
    &__button-container {
        display: flex;
        flex-direction: column;
        margin-left: 40px;
    }
}
</style>
