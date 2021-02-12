<template>
  <div class="">
    <h1>Login</h1>
    <input type="text" placeholder="Login" v-model="email">
    <input type="password" placeholder="password" v-model="password">
    <button @click="login()">log in</button>
    
  </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login(){
      var data = {
        email: this.email,
        password: this.password
      }
      
      this.request.login(data).then(tokens=>{
        console.log(tokens)
        // save tokens.accessToken
        localStorage.accessToken = tokens.accessToken
        // save tokens.refreshToken
        localStorage.refreshToken = tokens.refreshToken
        //redirect на login
        this.$router.push('/')
      }) 
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
