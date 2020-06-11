<template>
    <b-container>
        <b-row class="justify-content-center">
            <b-col cols="4">
                <h1>Login</h1>
                <b-form @submit.prevent="login">
                    <b-form-group
                            label="Email:"
                            label-for="emailInput">
                        <b-form-input type="email" id="emailInput"  v-model="user.email" required></b-form-input>
                    </b-form-group>
                    <b-form-group label-for="inputPassword" label="Password:">
                        <b-form-input type="password" id="inputPassword" v-model="user.password" required></b-form-input>
                    </b-form-group>
                    <b-button type="submit" class="btn-block btn-success">Login In</b-button>
                </b-form>
                <div v-if="message !== ''">
                    {{message}}
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import {mapActions} from "vuex";
    export default {
        name: "Login",
        data() {
            return {
                user: {
                    email: "",
                    password: ""
                },
                message: ""
            }
        },
        methods: {
            async login() {
                console.log(this.user)
                try {
                    const res = await this.axios.post("/login", this.user)
                    console.log("post login",res.data);
                    const token = res.data.token;
                    this.saveUser(token);
                    await this.$router.push({name: "Notes"})
                } catch (e) {
                    console.error("error post login",e.response);
                    this.message = e.response.data.message
                }
            },
            ...mapActions(['saveUser'])
        }
    }
</script>

<style scoped>

</style>