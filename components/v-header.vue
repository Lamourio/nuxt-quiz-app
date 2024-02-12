<template>
  <div class="header-content">
    <div class="header-logo">
    <div id="fasttrck-logo-wrapper" class="fasttrck-logo-wrapper">
      <img id="logo" src="/logo-.png"/>
      <img id="fasttrack" src="/fast-track.png"/>
    </div>
  </div>
    <v-button :onClick="() => navigate('/')" :isDisabled="false" >Home</v-button> 
  </div>
</template>

<script lang="ts" setup>
  async function navigate(url : string) {
    await navigateTo(url);
  } 
</script>
