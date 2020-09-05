<template>
    <div class="slider-container">
        <v-slider
            v-model="slider"
            class="align-center mb-4"
            :max="max"
            :min="min"
            hide-details
            @end="saveSliderValue"
        >
        </v-slider>
        <v-chip>{{ slider }}</v-chip>
        <slot></slot>
    </div>
</template>
<script>
export default {
    data() {
        return {
            slider: 0,
        };
    },
    props: {
        min: String,
        max: String,
    },
    methods: {
        saveSliderValue() {
            this.$store.commit("setSliderValue", this.slider);
        },
    },
};
</script>
<style lang="scss">
.slider-container {
    width: 250px;
    margin-left: 40px;
}
</style>
