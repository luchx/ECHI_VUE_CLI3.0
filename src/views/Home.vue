<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import service from '@/axios/service';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  mounted() {
    service.get({
      url: '/test1'
    }).then(res => {
      console.log('mock 数据返回 =================>', res.data)
    })

    service.get({
      url: '/test2'
    }).then(res => {
      console.log('mock 数据返回 =================>', res.data)
    })
  }
}
</script>
