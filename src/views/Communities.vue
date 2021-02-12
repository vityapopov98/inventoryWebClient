<template>
  <div class="">
    <h1>Communities</h1>
    <!-- <router-link :to="{ name: 'CommunityCreateUpdate', params: {}}" >
        <h2 class="folder-header">Создать Community</h2>
    </router-link> -->

    <input type="text" v-model="newCommunityName" placeholder="Community name">
    <button class="btn btn-primary" @click="createCommunity()">Создать Community</button>

    <p v-for="community in userCommunities" :key="community.id">
      {{community}}
      <router-link :to="{ name: 'CommunityCreateUpdate', params: { community: community}}" >
        <h2 class="folder-header">Редактировать</h2>
      </router-link>
      <button class="btn btn-danger" @click="deleteCommunity(community.communityId)">Удалить</button>
    </p>
    
  </div>
</template>

<script>
import {createCommunity, deleteCommunity} from '../requests/communities'
import {getUserCommunities} from '../requests/userCommunities'
import {getUser} from '../requests/users'

export default {
  name: 'Communities',
  data(){
    return {
      userCommunities: [],
      user: {
        selectedCommunity: 7
      },
      newCommunityName: ''
    }
  },
  methods: {
    loadPage(){
      getUserCommunities().then(userCommunities=>{
        this.userCommunities = userCommunities
      })

      getUser().then(user=>{
        this.user = user
      })
    },
    createCommunity(){
      //Получаем пользователя 
      // формируем объект 
      var data = {
        name: this.newCommunityName,
      }
      createCommunity(data).then(response=>{
        console.log(response)
        this.newCommunityName = ''
        this.loadPage()
      })
    },
    deleteCommunity(communityId){
      deleteCommunity(communityId).then(response=>{
        console.log(response)
        this.loadPage()
      })
    }
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
