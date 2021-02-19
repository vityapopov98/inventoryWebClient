<template>
  <div class="hello">
    <h1>User Communities</h1>
    <select class="form-select" aria-label="Default select example" @change="changeSelectedCommunity($event)">
      
        <option :selected="userCommunity.communityId == user.selectedCommunity" 
                :value="userCommunity.communityId" v-for="(userCommunity) in userCommunities" 
                :key="userCommunity.id"> 
                    {{userCommunity.community.name}}
        </option>

    </select>

    <p>{{user.selectedCommunity}}</p>
  </div>
</template>

<script>
import {getUserCommunities} from '../requests/userCommunities'
import {getUser, updateUser} from '../requests/users'

export default {
  name: 'UserCommunities',
  data(){
    return {
      userCommunities: [],
      user: {
        selectedCommunity: 7
       }
    }
  },
  methods:{
    changeSelectedCommunity(event){
      console.log('communityId', event.target.options[event.target.options.selectedIndex].value)
      this.user.selectedCommunity = event.target.options[event.target.options.selectedIndex].value

      var data = {
        selectedCommunity: event.target.options[event.target.options.selectedIndex].value
      }

      updateUser(data).then(response=>{
        console.log('user upd', response)
        this.$emit('selectedCommunityUpdated')
      })
    }
  },
  mounted(){
    getUserCommunities().then(userCommunities=>{
      this.userCommunities = userCommunities
    })

    getUser().then(user=>{
      this.user = user
    })
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
