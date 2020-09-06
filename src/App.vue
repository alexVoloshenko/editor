<template>
    <v-app id="app">
        <div id="container" contenteditable="true">
            !!Нажмите на кнопку, чтобы соответствующий метод отработал<span
                style="color: green; font-size: 28px"
                >на</span
            >
            выделении!!
            <span style="color: red">Lorem </span>
            ipsum dolor sit amet consectetur adipisicing elit. Consectetur atque
            ex quisquam recusandae repellendus explicabo eos, error alias
            molestias? Ipsam est magnam iusto nesciunt molestias blanditiis
            provident maiores accusamus nisi?
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
                    @click="replaceSelectedText(null, null, slider)"
                    >Set Fontsize</v-btn
                >
            </MinMaxSlider>
            <DialogComponent :showDialog="showDialog"></DialogComponent>
        </div>
    </v-app>
</template>

<script>
import MinMaxSlider from './components/MinMaxSlider';
import DialogComponent from './components/DialogComponent';
export default {
    name: 'App',
    components: {
        MinMaxSlider,
        DialogComponent,
    },
    data() {
        return {
            color: '#8D098D',
            showDialog: false,
        };
    },
    computed: {
        slider() {
            return this.$store.state.slider;
        },
    },
    mounted() {},
    methods: {
        replaceSelectedText(color, bgColor, fontSize) {
            let container = document.getElementById('container');
            var sel, range;
            let counter = 0;
            sel = window.getSelection();
            if (sel.anchorNode && sel.toString() != '') {
                sel = window.getSelection();
                let text = sel.toString();
                if (sel.rangeCount) {
                    range = sel.getRangeAt(0);

                    let fragment = sel.getRangeAt(0).cloneContents();
                    range.deleteContents();
                    let span = document.createElement('span');
                    span.append(fragment);

                    if (span.children) {
                        for (let i = 0; i < span.childNodes.length; i++) {
                            if (span.childNodes[i].nodeType === 3) {
                                let innerSpan = document.createElement('span');
                                innerSpan.textContent =
                                    span.childNodes[i].textContent;
                                span.replaceChild(
                                    innerSpan,
                                    span.childNodes[i]
                                );
                            }
                        }
                        console.log(span);

                        for (let i = 0; i < span.children.length; i++) {
                            if (color) {
                                span.children[i].style.color = color;
                            } else if (bgColor) {
                                span.children[i].style.background = bgColor;
                            } else if (fontSize) {
                                span.children[i].style.fontSize =
                                    fontSize + 'px';
                            }
                        }
                    }

                    if (color) {
                        span.style.color = color;
                    } else if (bgColor) {
                        span.style.background = bgColor;
                    } else if (fontSize) {
                        span.style.fontSize = fontSize + 'px';
                    }
                    range.insertNode(span);
                }
                let spans = document.querySelectorAll('#container > span');
                for (let i = 0; i < spans.length; i++) {
                    if (spans[i].children.length > 0) {
                        let newElem = spans[i].innerHTML.replace(
                            '<span',
                            '</span><span'
                        );
                        newElem = newElem.replace(/<\/span>/gi, function (
                            match
                        ) {
                            counter++;
                            return counter === 2
                                ? `</span><span style="${spans[i].getAttribute(
                                      'style'
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
                this.showDialog = true;
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
