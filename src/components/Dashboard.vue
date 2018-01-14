<template>
  <div id="dashboard">
    <h3>Manage Employees easily </h3>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'dashboard',
  data () {
    return {
      employees: []
    }
  }
}
</script>

