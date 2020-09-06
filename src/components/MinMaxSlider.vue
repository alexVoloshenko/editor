<template>
    <div class="slider-container">
        <v-slider
            v-model="sliderValue"
            class="align-center mb-4"
            :max="max"
            :min="min"
            hide-details
            @end="saveSliderValue"
        >
        </v-slider>
        <v-chip>{{ sliderValue }}</v-chip>
        <slot></slot>
    </div>
</template>
<script>
export default {
    data() {
        return {
            sliderValue: 0,
        };
    },
    props: {
        min: String,
        max: String,
    },
    methods: {
        saveSliderValue() {
            this.$store.commit('setSliderValue', this.sliderValue);
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
