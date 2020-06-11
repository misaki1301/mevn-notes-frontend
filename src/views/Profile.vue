<template>
    <b-container class="mt-4">
        <h1>Hello {{user.data.name}}</h1>
    </b-container>
</template>

<script>
    import {mapState} from "vuex";
    export default {
        name: "Profile",
        computed: {
            ...mapState(['user'])
        }
    }
</script>

<style scoped>

</style>