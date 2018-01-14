<template>
  <div id="new-employee">
    <h3>New Employee</h3>
    <div class="row">
      <form @submit.prevent="saveEmployee" class="col s12">
        <div class="row">
          <div class="input-field col s12 m3">
            <input type="text" v-model="employee_id" required>
            <label>Employee ID#</label>
          </div>
          <div class="input-field col s12 m9">
            <input type="text" v-model="name" required>
            <label>Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12 m3">
            <input type="text" v-model="dept" required>
            <label>Department</label>
          </div>
          <div class="input-field col s12 m3">
            <input type="text" v-model="position">
            <label>Position</label>
          </div>
          <div class="input-field col s12 m3">
            <input type="text" v-model="supervisor">
            <label>Supervisor</label>
          </div>
          <div class="input-field col s12 m3">
            <input type="text" v-model="salary" required>
            <label>Salary</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="address" required>
            <label>Address</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12 m6">
            <input type="text" v-model="phone" required>
            <label>Phone</label>
          </div>
          <div class="input-field col s12 m6">
            <input type="text" v-model="notes">
            <label>Notes</label>
          </div>
        </div>
        <button type="submit" class="btn cyan darken-2 waves-effect">Submit</button>
        <router-link to="/" class="btn grey waves-effect">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
  import db from './firebaseInit'
  export default {
    name: 'new-employee',
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
    methods: {
      saveEmployee () {
        db.collection('employees').add({
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
        .then(docRef => {
          console.log('Client added: ', docRef.id)
          this.$router.push('/')
        })
        .catch(error => {
          console.error('Error adding employee: ', error)
        })
      }
    }
  }
</script>
