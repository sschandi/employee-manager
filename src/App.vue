<template>
  <div id="app">
    <Navbar/>
    <main>
      <div class="main container">
        <router-view/>
      </div>
    </main>
    <Footer/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'
export default {
  name: 'app',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
  #app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  #app main {
    flex: 1 0 auto;
    padding-bottom: 20px;
  }
</style>
