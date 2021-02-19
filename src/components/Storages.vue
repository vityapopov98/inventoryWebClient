<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <p>{{storages}}</p>
         <div class="folder-container">
         <div class="folder" v-for="(storage, index) in storages" :key="index">

              <!-- <div class="dropdown show" v-if="storage.storage.name != 'Все вещи' && storage.storage.name != 'Корзина' && storage.storage.name != 'Given'">
                <a class="" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <svg class="feather">
                    <use xlink:href="@/assets/feather-sprite.svg#more-horizontal"/>
                  </svg>
                </a>

                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                  <button class="dropdown-item" @click="editFolder(index)">Редактировать</button>
                  <button class="dropdown-item" @click="deleteFolder(index)">Удалить</button>
                </div>
              </div> -->
              <div class="dropdown show" v-if="storage.storage.name != 'Все вещи' && storage.storage.name != 'Корзина' && storage.storage.name != 'Given'">
                <button @click="openDropdown(index)" class="dropdown" :class="{'show': dropdownShow == index}">
                   <svg class="feather">
                    <use xlink:href="@/assets/feather-sprite.svg#more-horizontal"/>
                  </svg>
                </button>

                <div class="dropdown-menu dropdown-menu-right" :class="{'show': dropdownShow == index}" aria-labelledby="dropdownMenuLink">
                  <!-- <button class="dropdown-item" @click="editFolder(index)">Редактировать</button> -->
                  <router-link :to="{ name: 'StorageCreateUpdate', params: { storage: storage.storage}}" >
                      <h2 class="folder-header">Редактировать</h2>
                  </router-link>
                 
                  <button class="dropdown-item" @click="deleteStorage(index)">Удалить</button>
                </div>
              </div>

             <div class="folder-image" :class="{
              'grey': storage.storage.color == undefined,
              'blue': storage.storage.color == 'blue', 
              'green': storage.storage.color == 'green', 
              'indigo': storage.storage.color == 'indigo',
              'orange': storage.storage.color == 'orange',
              'pink': storage.storage.color == 'pink',
              'purple': storage.storage.color == 'purple',
              'red': storage.storage.color == 'red', 
              'teal': storage.storage.color == 'teal',
              'yellow': storage.storage.color == 'yellow',
              
              'folder-image-more': storage.storage.name != 'Все вещи' && storage.storage.name != 'Корзина' && storage.storage.name != 'Given',
              }">
              
                 <img v-if="storage.storage.image != undefined" :src="require(`@/assets/${storage.storage.image}`)" alt="">
             </div>

              <router-link :to="{ name: 'Items', params: { from: storage.storage, fromType: 'Storage' }}">
                <h2 class="folder-header">{{storage.storage.name}}</h2>
              </router-link>

              <!-- <router-link :to="{ name: 'Items', params: { from: folder.name}}" v-if="displayMode=='Folder'">
                <h2 class="folder-header">{{folder.name}}</h2>
              </router-link> -->
             <p class="folder-item-count">{{storage.itemCount}} <span v-if="storage.storage.name != 'Все вещи' && storage.storage.name != 'Корзина' && storage.storage.name != 'Given'">вещей</span>  </p>
         </div> 
     </div>
  </div>
</template>

<script>
import {getStorages, deleteStorage} from '../requests/storages'

export default {
  name: 'Storages',
  props: {
    selectedCommunity: Number
  },
  data(){
    return {
      storages: [ ],
      // { "folder": { "id": 1, "name": "Test Folder2", "image": "icon-all.png", "color": "yellow", "communityId": 1, "createdAt": "2021-01-26T10:14:02.000Z", "updatedAt": "2021-01-26T10:14:02.000Z" }, "itemCount": 6 }
      // innerState: this.selectedCommunity,
      dropdownShow: null
    }
  },
  methods: {
    loadPage(){
      getStorages().then(storages=>{
        console.log(storages)
        this.storages = storages
      })
    },
    update(){
      alert(`was updated ${this.selectedCommunity}`)
    },
    openDropdown(index){
      console.log(index)
      if(this.dropdownShow == null){
        this.dropdownShow = index
      }
      else{
       this.dropdownShow = null
      }
    },
    deleteStorage(index){
      console.log('deleteing: ', this.storages[index])
      var result = confirm(`⚠️This Storage will be deleted ${this.storages[index].storage.id}`)
      if(result){
        deleteStorage(this.storages[index].storage.id).then(response=>{
          console.log(response)
          this.loadPage()
        })
      }
    }
  },
   watch:{
    selectedCommunity: function(old, nv){
      console.log(`was updated ${this.selectedCommunity}, ${old}, ${nv}`)
      getStorages().then(storages=>{
        console.log(storages)
        this.storages = storages
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
