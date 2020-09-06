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
            <DialogComponent v-model="showDialog"></DialogComponent>
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
            let selection, range;
            let counter = 0;
            selection = window.getSelection();
            if (selection.anchorNode && selection.toString() != '') {
                range = selection.getRangeAt(0);
                let fragment = selection.getRangeAt(0).cloneContents();
                let span = document.createElement('span');
                span.append(fragment);
                range.deleteContents();

                if (span.children) {
                    for (let i = 0; i < span.childNodes.length; i++) {
                        if (span.childNodes[i].nodeType === 3) {
                            let innerSpan = document.createElement('span');
                            innerSpan.textContent =
                                span.childNodes[i].textContent;
                            span.replaceChild(innerSpan, span.childNodes[i]);
                        }
                    }
                    for (let i = 0; i < span.children.length; i++) {
                        this.setStyles(
                            span.children[i],
                            color,
                            bgColor,
                            fontSize
                        );
                    }
                }

                this.setStyles(span, color, bgColor, fontSize);
                range.insertNode(span);

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
                range.collapse();
                window.getSelection().empty();
            } else {
                this.showDialog = true;
            }
        },

        setStyles(element, color, bgColor, fontSize) {
            if (color) {
                element.style.color = color;
            } else if (bgColor) {
                element.style.background = bgColor;
            } else if (fontSize) {
                element.style.fontSize = fontSize + 'px';
            }
        },
    },
};
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
