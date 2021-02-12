<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
     <router-link to="/">Dashboard</router-link>
     <router-link to="/login">login</router-link>
     <router-link to="/registration">Registration</router-link>
     <router-link to="/Communities">Communities</router-link>
     <router-view/>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import {getUser} from './requests/users'

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data(){
    return {
      user: {}
    }
  },
  mounted(){
     getUser().then(user=>{
        console.log(user)
        
        this.user = user
      }, error=>{
        //Нужно сделать обновление пары токенов.
        console.log('error handler ', error)
        this.request.refreshToken().then(response=>{
          console.log(response)
        })
      })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
a{
  padding: .5rem;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}
/* __________ COLORS ____________ */
/* ______________________________ */
.blue{
  background-color: rgb(0, 122, 255);
}
.green{
  background-color: rgb(52, 199, 89);
}
.indigo{
  background-color: rgb(88, 86, 214);
}
.orange{
  background-color: rgb(255, 149, 0);
}
.pink{
  background-color: rgb(255, 45, 85); 
}
.purple{
  background-color: rgb(175, 82, 222);
}
.red{
  background-color: rgb(255, 59, 48);
}
.teal{
  background-color: rgb(90, 200, 250);
}
.yellow{
  background-color: rgb(255, 204, 0);
}
.grey{
  background-color: #aeaeae;
}
.light-grey{
  background-color: #e8e8e8;
}
</style>
