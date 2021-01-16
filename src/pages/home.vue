<template>
  <MainLayout>
    <h1>Firebase</h1>

    <div class='hello'>
    <div>
      <input type="text" v-model="name" placeholder="NAME">
      <input type="text" v-model="tel" placeholder="TEL">
      <button @click="insertToContact(tel, name)">Add</button>
    </div>

    <hr>

    <ul :key="key" v-for="(contact, key) in contacts">
      <li v-if="updateKey === key">
        <input type="text" v-model="updateName" placeholder="NAME">
        <input type="text" v-model="updateTel" placeholder="TEL">
        <button @click="updateContact(updateTel, updateName)">Save</button>
      </li>
      <li v-else>
        {{contact.name}} : {{contact.tel}} 
        <button @click="setUpdateContact(key, contact)">Update</button>
        <button @click="deleteContact(key)">Delete</button>
      </li>
    </ul>
  </div>
  </MainLayout>
</template>

<script>
import MainLayout from '../layouts/main'
import * as firebase from 'firebase'

var config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: ''
}
firebase.initializeApp(config)
var database = firebase.database()
var contactRef = database.ref('/contacts')

export default {
  name: 'Home',
  components: {
    MainLayout,
  },
  data () {
    return {
      contacts: {},
      tel: '',
      name: '',
      updateTel: '',
      updateName: '',
      updateKey: ''
    }
  },
  methods: {
    insertToContact (tel, name) {
      let data = {
        tel: tel,
        name: name
      }
      contactRef.push(data)
      this.tel = ''
      this.name = ''
    },
    setUpdateContact (key, contact) {
      this.updateKey = key
      this.updateTel = contact.tel
      this.updateName = contact.name
    },
    updateContact (tel, name) {
      contactRef.child(this.updateKey).update({
        tel: tel,
        name: name
      })
      this.updateKey = ''
      this.updateTel = ''
      this.updateName = ''
    },
    deleteContact (key) {
      contactRef.child(key).remove()
    }
  },
  mounted () {
    contactRef.on('value', (snapshot) => {
      this.contacts = snapshot.val()
    })
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
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