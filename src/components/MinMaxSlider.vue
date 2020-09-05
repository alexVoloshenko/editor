<template>
    <v-row>
        <v-col class="pr-4">
            <v-slider
                v-model="slider"
                class="align-center"
                :max="max"
                :min="min"
                hide-details
            >
                <template v-slot:append>
                    <v-text-field
                        v-model="slider"
                        class="mt-0 pt-0"
                        hide-details
                        single-line
                        type="number"
                        style="width: 60px"
                    ></v-text-field>
                </template>
            </v-slider>
        </v-col>
    </v-row>
</template>
<script>
export default {
    data() {
        return {
            slider: 0,
        };
    },
    props: {
        min: Number,
        max: Number,
    },
};
</script>
