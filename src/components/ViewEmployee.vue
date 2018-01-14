<template>
  <div id="view-employee">
    <ul class="collection with-header">
      <li class="collection-header"><h4>{{name}}</h4></li>
      <li class="collection-item">Employee ID: {{employee_id}}</li>
      <li class="collection-item">Department: {{dept}}</li>
      <li class="collection-item">Position: {{position}}</li>
      <li class="collection-item">Supervisor: {{supervisor}}</li>
      <li class="collection-item">Salary: {{salary}}</li>
      <li class="collection-item">Address: {{address}}</li>
      <li class="collection-item">Phone: {{phone}}</li>
      <li class="collection-item">Notes: {{notes}}</li>
    </ul>
    <router-link v-bind:to="{name: 'edit-employee', params: {employee_id: employee_id}}" class="btn waves-effect teal darken-2">Edit</router-link>
    <router-link to="/" class="btn grey waves-effect">Back</router-link>
    <button @click="deleteEmployee" class="btn red right waves-effect">Delete</button>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'view-employee',
  data () {
    return {
      employee_id: null,
      name: null,
      dept: null,
      position: null,
      supervisor: null,
      salary: null,
      address: null,
      phone: null,
      notes: null
    }
  },
  beforeRouteEnter (to, from, next) {
    db.collection('employees').where('employee_id', '==', to.params.employee_id).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        next(vm => {
          vm.employee_id = doc.data().employee_id
          vm.name = doc.data().name
          vm.dept = doc.data().dept
          vm.position = doc.data().position
          vm.supervisor = doc.data().supervisor
          vm.salary = doc.data().salary
          vm.address = doc.data().address
          vm.phone = doc.data().phone
          vm.notes = doc.data().notes
        })
      })
    })
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      db.collection('employees').where('employee_id', '==', this.$route.params.employee_id).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.employee_id = doc.data().employee_id
          this.name = doc.data().name
          this.dept = doc.data().dept
          this.position = doc.data().position
          this.supervisor = doc.data().supervisor
          this.salary = doc.data().salary
          this.address = doc.data().address
          this.phone = doc.data().phone
          this.notes = doc.data().notes
        })
      })
    },
    deleteEmployee () {
      if(confirm('Are you sure?')){
         db.collection('employees').where('employee_id', '==', this.$route.params.employee_id).get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete()
            this.$router.push('/')
          })
        })
      }
    }
  }
}
</script>