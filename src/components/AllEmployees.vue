<template>
  <div id="all-employees">
    <h3>Employees</h3>
    <input type="text" v-model="search" placeholder="Search Employees"/>
    <div id="checkboxes" class="center">
      <input type="checkbox" id="it" value="it" v-model="departments"/>
      <label for="it">IT</label>
      <input type="checkbox" id="accounting" value="accounting" v-model="departments"/>
      <label for="accounting">Accounting</label>
      <input type="checkbox" id="sales" value="sales" v-model="departments"/>
      <label for="sales">Sales</label>
      <input type="checkbox" id="management" value="management" v-model="departments"/>
      <label for="management">Management</label>
    </div>
    <div v-for="employee in filteredEmployees" v-bind:key= "employee.id" class= "row">
      <div class="card">
        <div class="card-content">
          <span class="card-title">{{employee.employee_id}}: {{employee.name}} <span class="chip">{{employee.dept}}</span><router-link v-bind:to="{name: 'view-employee', params: {employee_id: employee.employee_id}}" class="btn waves-effect teal darken-2 right">View</router-link></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'all-employees',
  data () {
    return {
      employees: [],
      search: '',
      departments: []
    }
  },
  created () {
    db.collection('employees').orderBy('dept').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          'id': doc.id,
          'employee_id': doc.data().employee_id,
          'name': doc.data().name,
          'dept': doc.data().dept,
          'position': doc.data().position,
          'supervisor': doc.data().supervisor,
          'salary': doc.data().salary,
          'address': doc.data().address,
          'phone': doc.data().phone,
          'notes': doc.data().notes
        }
        this.employees.push(data)
      })
    })
  },
  computed: {
    filteredEmployees: function() {
      return this.employees.filter((employee) => {
        if(this.departments.length != 0){
          for(var i=0; i < this.departments.length; i++){
            if( this.departments[i] == employee.dept.toLowerCase()){
              return employee.name.toLowerCase().match(this.search.toLowerCase()) || employee.employee_id.match(this.search)
            }
          }
        }
        else
          return employee.name.toLowerCase().match(this.search.toLowerCase()) || employee.employee_id.match(this.search)
      })
    }
  }
}
</script>
<style>
  [type="checkbox"] + label {
    margin-right: 35px;
  }
  #checkboxes{
    margin-bottom: 15px;
  }
  .it {
    color: red;
  }
</style>
