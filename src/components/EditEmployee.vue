<template>
  <div id="edit-employee">
    <h3>Edit Employee</h3>
    <div class="row">
    <form @submit.prevent="updateEmployee" class="col s12">
      <div class="row">
        <div class="input-field col s12 m3">
          <input disabled type="text" v-model="employee_id" required>
          <label class="active">Employee ID#</label>
        </div>
        <div class="input-field col s12 m9">
          <input type="text" v-model="name" required>
          <label class="active">Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12 m3">
          <input type="text" v-model="dept" required>
          <label class="active">Department</label>
        </div>
        <div class="input-field col s12 m3">
          <input type="text" v-model="position">
          <label class="active">Position</label>
        </div>
        <div class="input-field col s12 m3">
          <input type="text" v-model="supervisor">
          <label class="active">Supervisor</label>
        </div>
        <div class="input-field col s12 m3">
          <input type="text" v-model="salary" required>
          <label class="active">Salary</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="address" required>
          <label class="active">Address</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12 m6">
          <input type="text" v-model="phone" required>
          <label class="active">Phone</label>
        </div>
        <div class="input-field col s12 m6">
          <input type="text" v-model="notes">
          <label class="active">Notes</label>
        </div>
      </div>
      <button type="submit" class="btn teal darken-2 waves-effect">Submit</button>
      <router-link v-bind:to="{name: 'view-employee', params: {employee_id: employee_id}}" class="btn grey waves-effect">Back</router-link>
    </form>
  </div>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'edit-employee',
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
    updateEmployee () {
      db.collection('employees').where('employee_id', '==', this.$route.params.employee_id).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({
            employee_id: this.employee_id,
            name: this.name,
            dept: this.dept,
            position: this.position,
            supervisor: this.supervisor,
            salary: this.salary,
            address: this.address,
            phone: this.phone,
            notes: this.notes
          })
          .then(() => {
            this.$router.push({name: 'view-employee', params: {employee_id: this.employee_id}})
          })
        })
      })
    }
  }
}
</script>