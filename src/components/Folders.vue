<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{folders}}</p>
         <div class="folder-container">
         <div class="folder" v-for="(folder, index) in folders" :key="index">

              <div class="dropdown show" v-if="folder.folder.name != 'Все вещи' && folder.folder.name != 'Корзина' && folder.folder.name != 'Given'">
                <!-- <a class="" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <svg class="feather">
                    <use xlink:href="@/assets/feather-sprite.svg#more-horizontal"/>
                  </svg>
                </a> -->

                <button @click="dropdownShow =  !dropdownShow" class="dropdown" :class="{'show': dropdownShow}">
                   <svg class="feather">
                    <use xlink:href="@/assets/feather-sprite.svg#more-horizontal"/>
                  </svg>
                </button>

                <div class="dropdown-menu dropdown-menu-right" :class="{'show': dropdownShow}" aria-labelledby="dropdownMenuLink">
                  <!-- <button class="dropdown-item" @click="editFolder(index)">Редактировать</button> -->
                  <router-link :to="{ name: 'FoldersCreateUpdate', params: { folder: folder.folder}}" >
                      <h2 class="folder-header">Редактировать</h2>
                  </router-link>
                 
                  <button class="dropdown-item" @click="deleteFolder(index)">Удалить</button>
                </div>
              </div>

             <div class="folder-image" :class="{
              'grey': folder.folder.color == undefined,
              'blue': folder.folder.color == 'blue', 
              'green': folder.folder.color == 'green', 
              'indigo': folder.folder.color == 'indigo',
              'orange': folder.folder.color == 'orange',
              'pink': folder.folder.color == 'pink',
              'purple': folder.folder.color == 'purple',
              'red': folder.folder.color == 'red', 
              'teal': folder.folder.color == 'teal',
              'yellow': folder.folder.color == 'yellow',
              
              'folder-image-more': folder.folder.name != 'Все вещи' && folder.folder.name != 'Корзина' && folder.folder.name != 'Given',
              }">
              
                 <img v-if="folder.folder.image != undefined" :src="require(`@/assets/${folder.folder.image}`)" alt="">
             </div>

              <router-link :to="{ name: 'Items', params: { from: folder.folder, fromType: 'Folder'}}">
                <h2 class="folder-header">{{folder.folder.name}}</h2>
              </router-link>

              <!-- <router-link :to="{ name: 'Items', params: { from: folder.name}}" v-if="displayMode=='Folder'">
                <h2 class="folder-header">{{folder.name}}</h2>
              </router-link> -->
             <p class="folder-item-count">{{folder.itemCount}} <span v-if="folder.folder.name != 'Все вещи' && folder.folder.name != 'Корзина' && folder.folder.name != 'Given'">вещей</span>  </p>
         </div> 
     </div>
  </div>
</template>

<script>
// import Items from '../views/Items'
import {getFolders} from '../requests/folders'

// import FoldersCreateUpdate from '../views/FolderCreateUpdate'

export default {
  name: 'Folders',
  components: {
    // FoldersCreateUpdate
  },
  props: {
    msg: String
  },
  data(){
    return {
      folders: [],
      dropdownShow: false,
      // { "folder": { "id": 1, "name": "Test Folder2", "image": "icon-all.png", "color": "yellow", "communityId": 1, "createdAt": "2021-01-26T10:14:02.000Z", "updatedAt": "2021-01-26T10:14:02.000Z" }, "itemCount": 6 }
    }
  },
  mounted(){
    getFolders().then(folders=>{
      console.log(folders)
      this.folders = folders
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* __________ FOLDERS STYLE ____________ */
/* _____________________________________ */
.Folders{
    padding-top: 3rem ;
}
.message-empty-content{
  padding: 2rem;
  text-align: center;
  color: #676767;
}
.folder-container{
    display: flex;
    flex-flow: row wrap;
    justify-content: center; 
}
.folder{
    /* background-color: rgb(255, 255, 255); */
    border: 1px solid #aeaeae;
    border-radius: 20px;
    height: 209px;
    width: 169px;
    margin: 1rem;
    padding: .6rem 1rem 1rem 1rem;
}
@media(prefers-color-scheme: light){
  .folder{
    background-color: white;
    color: rgb(28, 29, 30);
  }
}
@media(prefers-color-scheme: dark){
  .folder{
    background-color:rgb(44, 44, 46) !important;
    border: 1px solid rgb(58, 58, 60) !important;
  }
  h2.folder-header{
    color: white !important;
  }
}
.dropdown{
  display: flex;
  justify-content: flex-end;
}
.folder-header{
    font-size: 1.2rem;
    font-weight: 700;
    text-align: left;
}
.folder-image{
    flex-direction: column;
    align-items: center;
    height: 100px;
    width: 100px;
    border-radius: 100px;
    margin:  21px auto .5rem auto;
}
.folder-image-more{
  margin: 0 auto .5rem;
}
.folder-image>img{
  height: 100px;
    width: 100px;
}
@media(max-width: 640px){
  .folder{
    width: calc(50% - 2rem);
  }
  .folder-image, .folder-image>img{
    height: 80px;
    width: 80px;
  }
  .toolbar{
    flex-direction: row;
  }
}

</style>
