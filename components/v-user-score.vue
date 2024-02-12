<template>
          <v-button :onClick="() => navigate('/score/list')" :isDisabled="false" >See All</v-button> 
        <div class="user-info" v-if="rank.success">
            <h1 v-if="website.submittedResult.length === 1">congrats you run alone and you reach the first</h1>
            <p>You were better than {{ rank.percentage }}% of all quizers </p>
        </div>
</template>

<script lang="ts" setup>
  const website = useWebsiteStore();
  const props = defineProps(['index']);
  const rank = website.getMyRank(props.index);

    async function navigate(url : string) {
    await navigateTo(url)
  } 
</script>

<style>
  .user-info {
    text-align: center;
  }
</style>