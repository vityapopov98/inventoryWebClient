<template>
  <div class="CreateItem">
    
         <div class="item-card">
       <div class="card-image">
         <div class="card_img-container">
            <img :src="itemInfo.image" alt="" srcset="">
         </div>
            <!-- <Upload /> -->
       </div>
       <div class="card-body">
         <div class="item-card-header">
           <input type="text" name="name" placeholder="Название" v-model="itemInfo.name">
         </div>
         <div class="card-information">
           <p><input type="text" name="description" placeholder="Описание" v-model="itemInfo.description"></p>
           <p>Фото: <input type="text" name="image" placeholder="Фото" v-model="itemInfo.image">
            <input type="file" name="file" id="file" class="circleButton" @change="previewImage" accept="image/*" >
           </p>
           
           <p>Дата покупки: <input type="text" name="purchaseDate" placeholder="Дата покупки ГГГГ-ММ-ДД" v-model="itemInfo.purchaseDate"></p>
           <p>Гарантия: <input type="text" name="guarantee" placeholder="гарантия" v-model="itemInfo.guarantee"></p>
           <p>Цена: <input type="text" name="cost" placeholder="cost" v-model="itemInfo.cost"></p>
           <p>Количество: <input type="text" name="count" placeholder="count" v-model="itemInfo.count"></p>
           <!-- Сделать папку, хранилище селектами, комьюнити -->
           <select class="form-select" aria-label="Default select example" @change="changeStorage($event)" v-if="userStorages != 0">
                
                <option :selected="userStorages[index] == 0"
                        :value="userStorage.storage.id" v-for="(userStorage, index) in userStorages" 
                        :key="userStorage.storage.id"> 
                            {{userStorage.storage.name}}
                </option>

            </select>
           <p>Хранилище: <input type="text" name="storage" placeholder="storage" v-model="itemInfo.storageId"></p>
           <select class="form-select" aria-label="Default select example" @change="changeFolder($event)" v-if="userFolders != 0">
                <!-- :selected="userStorage.id == userStorage.id" -->
                <option  :selected="userFolders[index] == 0"
                        :value="userFolder.folder.id" v-for="(userFolder, index) in userFolders" 
                        :key="userFolder.folder.id"> 
                            {{userFolder.folder.name}}
                </option>

            </select>
           <p>Папка: <input type="text" name="folder" placeholder="folder" v-model="itemInfo.folderId"></p>
           <!-- <p><input type="text" class="d-none" name="from" placeholder="from" v-model="from" ></p> -->
           <input class="btn btn-primary" type="submit" value="save" @click="createItem()">
         </div>
       </div>
     </div>

    
  </div>
</template>

<script>
// import Upload from '../components/Upload.vue'
import {previewUploadImage, deletePreviewImage} from '../requests/previewUploadImage'
import {createItem} from '../requests/items'

export default {
  name: 'CreateItem',
  props: {
    from: {},
    fromType: String,
    userStorages: Array,
    userFolders: Array
  },
  components: {
    // Upload
  },
  data: function(){
    return {
      itemInfo: {
            name: '',
            description:'',
            image: '',
            purchaseDate: '',
            guarantee: '',
            cost: '',
            count: '',
            storageId:'',
            folderId: '',
            communityId: ''
      },
      // userStorages: [],
      // userFolders: [],
      communityId: this.from.communityId,
      isLoad: false,
      file: Object
    }
  },
  methods:{
    createItem(){ 
      //Удалить превью
      var file = '.'+this.itemInfo.image.slice(21)
      console.log('this is file ', file)
      deletePreviewImage(file).then(response=>{
        console.log(response)
      
        var data = {
          name: this.itemInfo.name,
          description: this.itemInfo.description,
          purchaseDate: this.itemInfo.purchaseDate,
          guarantee: this.itemInfo.guarantee,
          cost: this.itemInfo.cost,
          count: this.itemInfo.count,
          storageId: this.itemInfo.storageId,
          folderId: this.itemInfo.folderId,
          communityId: this.communityId
        }
        var formData = new FormData()
        console.log(data)
        for (const key in data) {
          if (data.hasOwnProperty.call(data, key)) {
            const element = data[key];
            formData.append(key, element)
          }
        }
        formData.append('image', this.file)
        console.log(formData.get('name'))
        createItem(formData).then(response=>{
          console.log(response)
          this.$emit('reloadCards')
        })
      })
    },
    previewImage(event){
      console.log(event.target.files[0])
      this.file = event.target.files[0]


      if(this.itemInfo.image != ''){
        var file = '.'+this.itemInfo.image.slice(21)
        console.log('this is file ', file)
        deletePreviewImage(file).then(response=>{
          console.log(response)
        })
      }

      //Запрос на сервер для превью
      var formData = new FormData()
      formData.append('image', this.file)
      previewUploadImage(formData).then(imagePreview=>{
        this.itemInfo.image = imagePreview.image
      })
    },
    changeStorage(event){
       console.log('StorageId', event.target.options[event.target.options.selectedIndex].value)
       this.itemInfo.storageId = event.target.options[event.target.options.selectedIndex].value
    },
    changeFolder(event){
       console.log('FolderId', event.target.options[event.target.options.selectedIndex].value)
       this.itemInfo.folderId = event.target.options[event.target.options.selectedIndex].value
    }
  },
  mounted(){
    this.itemInfo.storageId = this.userStorages[0].storage.id
    this.itemInfo.folderId = this.userFolders[0].folder.id
    // if(this.fromType=='Folder'){
    //   console.log('loading items from folder', this.from)
    //   this.itemInfo.folderId = this.from.id
    //   //Fetch storages
    //   getStorages().then(storages=>{
    //     console.log(storages)
    //     this.userStorages = storages
    //     this.itemInfo.storageId = storages[0].storage.id
    //   })
    // }
    // else if(this.fromType=='Storage'){
    //   console.log('loading items from storage', this.from)
    //   this.itemInfo.storageId = this.from.id
    //   //fetch folder
    //   getFolders().then(folders=>{
    //     console.log(folders)
    //     this.userFolders = folders
    //   })
    // }
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
