<template>
  
    <div class="create-folder">
      <div class="card-image">
        <div class="folder_img-container" :class="[folderInfo.color ? folderInfo.color : 'light-grey']">
        <img :src="require(`@/assets/${folderInfo.image}`)" alt="" srcset="">
        </div>
      </div>
      <div class="card-body">
        <div class="folder-card-header">
          <input type="text" name="name" placeholder="Имя папки" v-model="folderInfo.name">
        </div>

          <div class="folder-icon-select">
            <div v-for="iconItem in iconsArray" :key="iconItem">
              <input type="radio" :value="iconItem" v-model="folderInfo.image" name="icon" :id="iconItem">
              <label :for="iconItem">
                <div class="folder-icon_img-container" :class="[folderInfo.color ? folderInfo.color : 'light-grey']">
                  <img :src="require(`@/assets/${iconItem}`)" alt="">
                </div>
              </label>
            </div>
          </div>

        <h5>Выбирите цвет: </h5>
          <div class="folder-color-select">
            <div v-for="colorItem in colorsArray" :key="colorItem">
              <input type="radio" class="folder-color-input" name="color" :value="colorItem" v-model="folderInfo.color" :id="`${colorItem}-folder-color`">
              <label :for="`${colorItem}-folder-color`">
                <div class="folder-color-outline" :class="[folderInfo.color == colorItem ? colorItem : 'light-grey']">
                  <div class="folder-color" :class="colorItem"></div>
                </div>
              </label>
            </div>
          </div>

        <input class="btn btn-primary" type="submit" value="save" @click="$route.params.folder != undefined ? updateFolder() : createFolder()">

      </div>
    </div>
  
</template>

<script>
import {createFolder, updateFolder} from '../requests/folders'

export default {
  name: 'FoldersCreateUpdate',
  props: {
    folder: {},
    selectedCommunity: Number
  },
  data: function(){
    return {
      folderInfo:{
        id: Number,
        name: '', 
        image: 'icon-all.png',
        color: 'light-grey',
        communityId: Number
      },
      isLoad: false,
      color: 'blue',
      icon: 'icon-all.png',
      iconsArray: [
        'icon-all.png',
        'icon-box.png',
        'icon-music.png',
        'icon-coffee.png',
        'icon-compass.png',
        'icon-briefcase.png',
        'icon-book.png',
        'icon-home.png',
        'icon-columns.png',
        'icon-truck.png'
      ],
      colorsArray: [
        'blue',
        'green',
        'indigo',
        'orange',
        'pink',
        'purple',
        'red',
        'teal',
        'yellow'
      ],
      
    }
  },
  methods: {
    createFolder(){
      console.log('creating folder', this.folderInfo)
      var data ={
        name: this.folderInfo.name,
        image: this.folderInfo.image,
        color: this.folderInfo.color,
        communityId: this.folderInfo.communityId
      }
      createFolder(data).then(response=>{
        console.log(response)
         this.$router.push('/')
      })
    },
    updateFolder(){
      console.log('updating folder', this.folderInfo)
      var data ={
        id: this.folderInfo.id,
        name: this.folderInfo.name,
        image: this.folderInfo.image,
        color: this.folderInfo.color
      }
      updateFolder(data).then(response=>{
        console.log(response)
        this.$router.push('/')
      })
    }
  },
  mounted(){
    // Если в props folder что то есть, то закидываем это в folderInfo и занимаемся обновлением
    if(this.$route.params.folder != undefined){
      console.log('Update', this.$route.params.folder)
      console.log(this.$route.params.folder.name)
      this.folderInfo.id = this.$route.params.folder.id
      this.folderInfo.name = this.$route.params.folder.name
      this.folderInfo.image = this.$route.params.folder.image
      this.folderInfo.color = this.$route.params.folder.color
    }
    else { // Если в props folder пусто, то создаем папку
      console.log('Create')
      this.folderInfo.communityId = this.$route.params.selectedCommunity
    }
    
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* __________ FOLDERS STYLE ____________ */
/* _____________________________________ */
.create-folder{
    width: 100%;  
    margin: 1rem 0;
    display: flex;
    flex-flow: row wrap;
    border: 1px solid #c0c0c0;
    border-radius: 20px;
}
.folder-icon_img-container{
  height: 50px;
  width: 50px;
  border-radius: 40px;
  /* background-color: #aeaeae; */
}
.folder-icon_img-container>img, .folder-color{
  height: 50px;
  width: 50px;
}
.folder-color{
  display: flex;
  border-radius: 40px;
  padding: .1rem;
  border: 3px solid #ffffff;
  /* outline: #42b983; */
}
.folder-color{
  height: 29px;
  width: 29px;
}
.folder-color-outline{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 35px;
  border-radius: 40px;
}
.folder-icon-select, .folder-color-select{
  padding: 1rem 0;
  display: flex;
  flex-flow: row wrap;
}
input.folder-color-input, .folder-icon-select input{
  opacity: 0;
}
/* .folder_img-container{
    width: 0px;
    height: 100px;
    
  } */
@media(max-width: 640px){
  .card-image{
    width: 100%
  }
  .folder_img-container{
    width: 100px !important;
    height: 100px !important;
    margin-bottom: 0;
  }
  .toolbar{
    padding-bottom: 1rem;
  }
}

</style>
