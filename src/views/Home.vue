<template>
  <div class="">
    <h1>Home</h1>
    
    <UserCommunities @selectedCommunityUpdated="loadPage()"/> 
    <p>{{user}}</p>
    <router-link :to="{ name: 'FoldersCreateUpdate', params: { selectedCommunity: user.selectedCommunity}}" >
        <h2 class="folder-header">Создать папку</h2>
    </router-link>
    <router-link :to="{ name: 'StorageCreateUpdate', params: { selectedCommunity: user.selectedCommunity}}" >
        <h2 class="folder-header">Создать Хранилище</h2>
    </router-link>

    <Storages :selectedCommunity="user.selectedCommunity"/>
    <Folders :selectedCommunity="user.selectedCommunity" />
    
  </div>
</template>

<script>
// import {getUserCommunities} from '../requests/userCommunities'
import {getUser} from '../requests/users'

import Storages from '../components/Storages'
import Folders from '../components/Folders'

import UserCommunities from '../components/userCommunitiesSelect'
// import Communities from '../views/Communities'

export default {
  name: 'Home',
  components:{
    Storages,
    Folders,
    UserCommunities,
  },
  data(){
    return {

      user: {}
    }
  },
  methods:{
    loadPage(){
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
