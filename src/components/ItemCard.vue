<template>
<div class="item-card" v-if="item != undefined">
       <div class="card-image">

         <div class="card_img-container">
          <img :src="item.image" alt="" srcset="">
         </div>
         <input type="text" class="item-card-header" v-model="item.image" :disabled="isDisabled">
       </div>

       <div class="card-body">

         <div class="item-card-header">
           <input type="text" class="item-card-header" v-model="item.name" :disabled="isDisabled">
           <button v-on:click="cardEdit()" class="card-edit-button">
             {{cardEditBtnLabel}}
             <svg class="feather">
                <use xlink:href="@/assets/feather-sprite.svg#edit"/>
             </svg>
           </button>
           <button @click="deleteItem()" class="card-delete-button">
             <svg class="feather">
                <use xlink:href="@/assets/feather-sprite.svg#trash"/>
             </svg>
           </button>
         </div>

         <div class="card-information">
            <div class="card-item-information">
              
              <p><input type="text" v-model="item.description" :disabled="isDisabled"></p>
              <p>Дата покупки: <input type="text" v-model="item.purchaseDate" :disabled="isDisabled"></p>
              <p>Гарантия: <input type="text" v-model="item.guarantee" :disabled="isDisabled"></p>
              <p>Цена: <input type="text" v-model="item.cost" :disabled="isDisabled"></p>
              <p>Количество: <input type="text" v-model="item.count" :disabled="isDisabled"></p>
              <p>Хранилище:
                <select class="form-select" aria-label="Default select example" @change="changeStorage($event)" v-if="userStorages != 0" :disabled="isDisabled">
                  <option  
                          :value="userStorage.storage.id" v-for="(userStorage) in userStorages" 
                          :key="userStorage.storage.id"> 
                              {{userStorage.storage.name}}
                  </option>
                </select>
              <!-- <input type="text" v-model="item.storage.name" :disabled="isDisabled"> -->
              </p>
              
              <p v-if="item.folder != null">Папка: <input type="text" v-model="item.folder.name" :disabled="isDisabled">
              <!--  -->
                <select class="form-select" aria-label="Default select example" @change="changeFolder($event)" v-if="userFolders != 0" :disabled="isDisabled">
                  <option  :selected="item.folder.name == userFolder.folder.name"
                          :value="userFolder.folder.id" v-for="(userFolder) in userFolders" 
                          :key="userFolder.folder.id"> 
                              {{userFolder.folder.name}}
                  </option>
                </select>
              </p>
              <div class="utilizedItem" v-if="item.utilizeDate || !isDisabled">
                <hr>
                <p>Дата утилизации: <input type="text" v-model="item.utilizeDate" :disabled="isDisabled" ></p>
                <p>Причина утилизации: <input type="text" v-model="item.utilizeReason" :disabled="isDisabled" ></p>
              </div>
            </div>

            <!-- блок выданной вещи -->
            <div class="card-giving-information" v-if="item.giving != null">
              <p>Кто дал: <input type="text" v-model="item.giving.userId" disabled></p>
              <p>Кому дал: <input type="text" v-model="item.giving.whoTakeName" disabled></p>
              <p>Телефон получателя: <input type="text" v-model="item.giving.whoTakePhone" disabled></p>
              <p>Дата выдачи: <input type="text" v-model="item.giving.date" disabled></p>
              <p>Ожидаемая дата возврата: <input type="text" v-model="item.giving.returnDate" disabled></p>
              <p>Залог: <input type="text" v-model="item.giving.pledge" disabled></p>
              <button class="btn btn-primary" @click="returnItem()">Вернуть</button>
            </div>
            <!-- блок для заполнения выдачи вещи -->
            <div v-else>
              <CreateGiving v-if="!isDisabled" @givingCreated="onCreateGivingUpdate" />
            </div>

         </div>
       </div>
     </div>
</template>

<script>
import CreateGiving from '../components/CreateGiving'
import {updateItem} from '../requests/items'

export default {
  name: 'ItemCard',
  components: {
    CreateGiving
  },
  props: {
    item:{},
      index: Number,
      from: {},
      userStorages: Array,
      userFolders: Array,
      
  },
  data: function(){
    return {
      isDisabled: true,
      cardEditBtnLabel: '',
      reloadItems:  '',
      
    }
  },
  methods: {
    cardEdit(){
      if (this.isDisabled == true) {
        this.isDisabled = false
        this.cardEditBtnLabel = 'Done';
      }
      else{
        //редактирование закончено
        this.cardEditBtnLabel = '';
        this.isDisabled = true
        var data = {
          id: this.item.id,
          name: this.item.name,
          description: this.item.description,
          purchaseDate: this.item.purchaseDate,
          guarantee: this.item.guarantee,
          cost: this.item.cost,
          count: this.item.count,
          storageId: this.item.storageId,
          folderId: this.item.folderId,
          communityId: this.from.communityId
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
        // //делаем запрос на обновления, передавая инфу о вещи, айди выдачи и роут на который нужно вернуться
        updateItem(formData).then(response=>{
          console.log(response)
          this.$emit('reloadCards')
        })
        // this.requests.updateItemInformation(this.$root.item, this.$root.givingId).then(response=>{
        //   //после того, как ответ пришел, испускаем событие, что бы повторно загрузить инфу о вещах
        //   if(response){
        //     this.$emit('reloadCards')
        //   }
        // })
      }
    },
    changeStorage(event){
       console.log('StorageId', event.target.options[event.target.options.selectedIndex].value)
       this.item.storageId = event.target.options[event.target.options.selectedIndex].value
    },
    changeFolder(event){
       console.log('FolderId', event.target.options[event.target.options.selectedIndex].value)
       this.item.folderId = event.target.options[event.target.options.selectedIndex].value
    },
    onCreateGivingUpdate(){
      console.log('Updating')
    },
    deleteItem(){
      var result = confirm('⚠️This item will be deleted')
      if(result){
        console.log('red: ', this.fromPlace)
        this.requests.deleteItem(this.item.id, this.fromPlace).then(response=>{
          console.lo(response)
          this.$emit('reloadCards')
        })
      }
      //испустить событие на обновление данных в виде Items.vue
      
    },
    returnItem(){
      var data = {
        givingId: this.item.givingId
      }
      console.log('Destroyed', data)
      // fetch('/api/delete-giving',{
      //   method: 'DELETE',
      //   headers:{
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json',
      //     'Authorization': `Bearer ${this.$root.accessToken}`
      //   },
      //   body: JSON.stringify(data)
      // }).then(res=>{
      //   return res.json()
      // }).then(data=>{
      //   console.log('Destroyed', data)
      //   this.$emit('reloadCards')
      // })
    },

  },
  mounted(){
   
  },
    // computed: {
    //   itemPurchaseDate(){
    //     var computedDate = this.item.purchaseDate.substr(10)
    //     return computedDate
    //   }
    // }

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
.card-information{
  display: flex;
}
.card-item-information{
  /* flex-grow: .5; */
  width: 100%;
}
</style>
