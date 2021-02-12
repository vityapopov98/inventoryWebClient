<template>
  <div class="">
    <h1>Registration</h1>
    <input type="text" placeholder="name" v-model="name">
    <input type="text" placeholder="Login" v-model="login">
    <input type="password" placeholder="password" v-model="password">
    <input type="password" placeholder=" repeat password" v-model="repassword">
    <button @click="register()">Register</button>
    
  </div>
</template>

<script>
export default {
  name: 'Registration',
  data(){
    return {
      name: '',
      login: '',
      password: '',
      repassword: ''
    }
  },
  methods: {
    register(){
      var data = {
        user: {
          name: this.name,
          login: this.login,
          password: this.password
        }
      }
      if(this.password == this.repassword){
        this.request.register(data).then(tokens=>{
          console.log(tokens)
          // save tokens.accessToken
          localStorage.accessToken = tokens.accessToken
          // save tokens.refreshToken
          localStorage.refreshToken = tokens.refreshToken
          //redirect на login
          this.$router.push('login')
        }) 
      }
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
