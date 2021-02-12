<template>
  <div class="">
    <h1>Community create/update</h1>
    <h3>Community name</h3>
    <input type="text" v-model="communityInfo.name" placeholder="Community name">
    <p>{{communityInfo.user.name}}</p>
    <p>{{communityInfo.user.login}}</p>
    <!-- <button class="btn btn-primary" @click="createCommunity()" v-if="community == undefined">Создать Community</button> -->

    
      <h3>Пользователи группы</h3>
      <p v-for="user in communityUsers" :key="user.id">{{user}} <button class="btn btn-danger" @click="deleteUser(user.id)" v-if="user.user.id != communityInfo.user.id">Delete User</button></p>
      
      <input type="text" v-model="addUserToCommunity" placeholder="Login нового пользователя">
      <button class="btn btn-primary" @click="addUser()">Add user to community</button>
    

    
  </div>
</template>

<script>
import {getCommunityUsers, getCommunity} from '../requests/communities'
import {addUserToCommunity, deleteUserCommunity} from '../requests/userCommunities'
// import {getUser} from '../requests/users'

export default {
  name: 'CommunityCreateUpdate',
  props:{
    community:{}
  },
  data(){
    return {
     communityInfo:{
       name: '',
       user:{ // Это админ
         name: ''
       }
     },
     communityUsers:[], //Список всех пользователей комьюнити, включая админа

     addUserToCommunity: ''
    }
  },
  methods: {
    loadPage(){
      // getUser().then(user=>{
      //   this.user = user
        console.log('PROP COMMUNITY', this.community)
        getCommunity(this.community.communityId).then(admin=>{
          console.log('thi is admin', admin)
          this.communityInfo = admin
        })
        getCommunityUsers(this.community.communityId).then(communityUsers=>{
          this.communityUsers = communityUsers
        })
      // })
    },
    addUser(){
      var data = {    
        login: this.addUserToCommunity,
        communityId: this.community.communityId
      }
      addUserToCommunity(data).then(response=>{
        console.log(response)
        this.loadPage()
      })
    },
    deleteUser(userCommunityId){
      deleteUserCommunity(userCommunityId).then(response=>{
        console.log(response)
        this.loadPage()
      })
    },
  },
  mounted(){
    this.loadPage()
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
