<template>
 <div class="Items">
   <h2>{{from}}</h2>

    <div class="toolbar">
    <button class="circleButton" @click="toggleCreateComponent()">+ {{addNewItemButton}}</button>
    </div>

    <CreateItem :from="from" :fromType="'Folder'" 
                :userStorages="userStorages" :userFolders="userFolders" 
                v-if="showCreateComponent" @reloadCards="loadItems(from)"/>

        <div class="message-empty-content" v-if="items.length==0">
            <h3>Нет вещей!</h3>
            <p>Создайте вещи, нажав на кнопку Add Item</p>
        </div>

        <div class="card-block" v-if="displayMode=='Cards' && !showCreateComponent">
            <div v-for="(item, index) in filteredItems" :key="index">
             <ItemCard :item="item" :index="index" :from="from" :userStorages="userStorages" :userFolders="userFolders"  @reloadCards="loadItems(from)" />
            </div>
        </div>
          
    </div>
</template>

<script>
import CreateItem from '../components/CreateItem.vue'
import ItemCard from '../components/ItemCard.vue'
import {getFolders} from '../requests/folders'
import {getStorages} from '../requests/storages'
import {getItems} from '../requests/items'


export default {
  name: 'Items',
  components: {
    CreateItem, 
    ItemCard,
  },
  props:{
      from: {},
      fromType: String
  },
  data: function(){
    return {
      items:[{
        id: Number,
        name: '',
        description:'',
        image: '',
        purchaseDate: '',
        guarantee: '',
        cost: '',
        count: '',
        storage:'',
        folder: ''
      },],
      displayMode: 'Cards',
      searchString: '',
      filterName: 'name',
      showCreateComponent: false,
      addNewItemButton: 'Add Item',

      userStorages: [],
      userFolders: [],
    }
  },
  methods:{
    loadItems(){
        this.showCreateComponent = false
        var urlProp = {
            prop: '',
            value: ''
        }
        if(this.fromType == 'Folder'){
            console.log('loading items from folder', this.from)
            urlProp.prop = 'folderId'
            urlProp.value = this.from.id
        }
        else if (this.fromType == 'Storage'){
            console.log('loading items from storage', this.from)
            urlProp.prop = 'storageId'
            urlProp.value = this.from.id
        }
        getItems(urlProp).then(items=>{
            console.log(items)
            this.items = items
        })
    },
    toggleCreateComponent(){
      if(this.showCreateComponent == false){
        this.showCreateComponent = true;
        this.addNewItemButton = 'Cancel'
      }
      else{
        this.$emit('delete-preview')
        this.showCreateComponent = false;
        this.addNewItemButton = 'Add Item'
      }
    },
  },
  mounted(){
      this.loadItems()

    // if(this.fromType=='Folder'){
      console.log('loading items from folder', this.from)
      //Fetch storages
      getStorages().then(storages=>{
        console.log(storages)
        this.userStorages = storages
      })
    // }
    // else if(this.fromType=='Storage'){
      console.log('loading items from storage', this.from)
      //fetch folder
      getFolders().then(folders=>{
        console.log(folders)
        this.userFolders = folders
      })
    // }

  },
  computed: {
    filteredItems: function(){
      var itemsArray = this.items;
      var searchString = this.searchString;

      if (!searchString) {
        return itemsArray;
      }

      searchString = searchString.trim().toLowerCase();

      if (this.filterName == 'name'){
        itemsArray = itemsArray.filter(function(item){
          if (item.name.toLowerCase().indexOf(searchString) !== -1) {
            return item;
          }
        })
      }
      else if (this.filterName == 'storage'){
        itemsArray = itemsArray.filter(function(item){
          if (item.storage.name.toLowerCase().indexOf(searchString) !== -1) {
            return item;
          }
        })
      }

      return itemsArray;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.Items{
  padding-top: 3rem;
}
/* __________toolbar________ */
.toolbar{
  display: flex;
  padding: 0rem  0rem 3rem;
  /* justify-content: space-between; */
}
.search input{
  margin: 0 1rem;
  width: 500px;
  padding: .5rem 1.5rem;
  border-radius: 40px;
  border: 1px solid #aeaeae;
}
.search input:focus{
  border: 1px solid #2c44ff;
  outline: none;
}
/* __________Switcher_______ */
.switcher{
  margin-right: 1rem;
  width: 10rem;
  height: 2.5rem;
  background-color: #f1f1f1;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/*  */
@media(prefers-color-scheme: dark){
  .sitcher_active-label, .circleButton{
    background-color: rgb(44, 44, 46)!important;
  }
  .switcher_first-button-label, .circleButton{
    border: 3px solid rgb(28, 28, 30)!important;
  }
  .switcher{
    background-color:rgb(44, 44, 46);
  }
}
/* 👇🏻 input */
.switcher_first-button{
  height: 0;
  width: 0%;
  opacity: 0;
}
.switcher_first-button-label{
  cursor: pointer;
  padding: .5rem;
  width: 100%;
  height: 100%;
  border-radius: 40px;
  border: 3px solid #f1f1f1;
  margin: 0%;
  text-align: center;
}
.sitcher_active-label{
  background: rgb(255, 255, 255);
  border-radius: 40px;
  border: 3px solid #f1f1f1;
  text-align: center;
}
.circleButton{
  display: flex;
  align-items: center;
  height: 2.5rem;
  background: rgb(255, 255, 255);
  border-radius: 40px;
  border: 3px solid #f1f1f1;
  text-align: center;
  padding:  0 1rem;
}
.circleButton:focus{
  outline: none;
}


/* ____________Card___________ */
.item-card{
    width: 100%;  
    margin: 1rem 0;
    display: flex;
    flex-direction: row;
    border: 1px solid #c0c0c0;
    border-radius: 20px;
}
.item-card-header input, .folder-card-header input{
  font-size: 2rem;
  font-weight: 500;
  flex-grow: 1;
}
 .folder-card-header input{
   border: none;
 }
.item-card input:disabled{
  border: none;
  background-color: white;
}
.item-card input{
  border: none;
  /* border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #aeaeae; */
  width: 70%;
}
.card-image{
  padding: 22px;
}
.item-card-header, .folder-card-header{
  display: flex;
}

.card-body{
  width: 80%;
}
.event-card_hr{
    border: 0.5px solid #d7d7d7;
    margin: 2rem 0;
}

.card_img-container, .folder_img-container{
  width: 260px;
  height: 260px;
    margin: auto;
    overflow: hidden;
    border-radius: 1rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.card_img-container{
  background-color: #c0c0c0;
}
.card_img-container>img, .folder_img-container>img{
    object-fit: cover;
    width: 100%;
    height: 100%;
}
/* Buttons on card */
.card-edit-button, .card-delete-button{
  border: none;
  background: none;
  outline: none;
}
.card-edit-button:active, .card-delete-button:active, .card-edit-button:focus, .card-delete-button:focus{
  outline: none;
}
.card-edit-button .feather:hover{
  stroke: #11bf20;
}
.card-delete-button .feather:hover{
  stroke: rgb(255, 44, 29);
}
.event-card_img-container>input{
    outline:0;
    opacity:0;
    cursor: pointer;
    position: absolute;
}
p.event-card_description{
  width: 80%;
  text-overflow: ellipsis;
  /* white-space: nowrap; */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.events-toolbar>input{
    border-radius: 5rem;
    border: 1px solid #999;
    padding: .3rem 1.2rem;
    margin-right:  1rem;

    /* background-color: #f2f2f2; */
}
@media(max-width:800px){
    #sidebar-nav{
        width: 100%;
        z-index: 10;
    }
    .s-hidden{
        display: none !important;
    }
    .s-open{
        display: block;
    }
    .signInBlock{
      padding: 7rem 0;
    }
    .signInBlock_form{
      width: 100%;
      margin: 0;
      padding: 2rem;
    }

    .events-toolbar>input{
      width: 60%;
      padding: .5rem 0 .5rem 1rem;
      margin-right:  .5rem;
      border-style:solid;
      border: 1px solid #d7d7d7 !important;
      outline: none;
      inset: none !important;
      background: white;
      box-shadow: none;
    }

    /* toolbar */
    .toolbar{
      flex-flow: row wrap;
    }
    .search{
      margin-bottom: 1rem;
    }
    .search input{
      width: 100%;
    }
    /* карточки */
    .item-card{
      flex-direction: column;
    }
    .card-image{
      padding-bottom: 0;
    }
    .card-body{
      width: 100%;
      padding-top: 0;
    }
    .item-card-header>input{
      font-size: 1.5rem;
      font-weight: 600;
    }
}
.feather {
  width: 1.1rem;
  height: 1.1rem;
  stroke: #848484;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
a.router-link-exact-active>.feather{
  stroke: #ff004d;
}
</style>
