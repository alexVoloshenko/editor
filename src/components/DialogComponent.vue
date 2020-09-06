<template>
    <div class="text-center">
        <v-dialog :value="value" @input="$emit('input')" width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2">
                    You don't selected any text
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click.native="$emit('input')">
                        OK
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    props: ['value'],
};
</script>
