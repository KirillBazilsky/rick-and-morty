<template>
    <router-link v-for = "link in linkArr" :key="link.title" :to="link.to" class="link">{{ link.title }}</router-link>      
</template>
  
<script setup lang="ts">

interface Link {
  to: string;
  title: string;
}
   const linkArr: Link[] = [
    {to:'/characters',
     title:'Characters'
    },
    {to:'/locations',
    title:'Locations'
    },
    {to:'/episodes',
     title:'Episodes'
    }
   ]
</script>
  
<style scoped lang="sass">
   
</style>
  