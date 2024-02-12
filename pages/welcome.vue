<template>
  
  <div id="container" class="fade-in">
    
      <div id="fasttrck-logo-container" class="fasttrck-logo-container">
        <div id="fasttrck-logo-wrapper" class="fasttrck-logo-wrapper">
          <img id="logo" src="/logo-.png"/>
          <img id="fasttrack" src="/fast-track.png"/>
        </div>  
      </div>

      <section id="actions" class="main-section">
          <button class="btn" @click="navigate('/quiz')">start</button>
          <button class="btn" @click="navigate('/score')">score</button>
          <button class="btn" @click="navigate('/configuration')">settings</button>
      </section>
      <div id ="mouse" class="mouse-wrapper">
        <div  class="mouse"></div>
      </div>
  </div>
</template>

<script lang="ts" setup>
async function navigate(url : string) {
  await navigateTo(url)
} 

onBeforeMount(() => {
  setTimeout(() => {
    scrollTo(0,0);
  }, 0);
})

onBeforeUnmount(() => {
  setTimeout(() => {
    scrollTo(0,0);
  }, 0);
})
onMounted(() => {
  const logo = document.getElementById("logo") ;
  const fasttrack = document.getElementById("fasttrack") ;
  const fasttrckLogoContainer = document.getElementById("fasttrck-logo-container") ;
  const fasttrckLogoWrapper = document.getElementById("fasttrck-logo-wrapper") ;
  const mouse = document.getElementById("mouse") ;
  
  let isFixed = false ;
  let snap = true ;

  const parallaxEffect = () => {
    const distance = window.scrollY;

    const colorsList = ['#e54f35','#63b6e6']

    let colorIndex = Math.round(((distance / window.innerHeight) / colorsList.length) * 10) - 1;
    if (colorIndex < 0) {
      colorIndex = 0;
    }

    if (fasttrckLogoContainer) {
      fasttrckLogoContainer.style.backgroundColor = colorsList[colorIndex];
    }

    if(isFixed === false) {
      if(logo) {
      logo.style.transform = `translate(${(0)}px,-${(distance * 1)}px) rotate(${(distance * 0.3) % 360}deg)` ;
      }  
      if(fasttrack){
        fasttrack.style.transform = `translateX(${(distance * 1.5)}px)`
      }
    }


    if (!isFixed && distance >= window.innerHeight - 150 && fasttrckLogoContainer && fasttrack && logo && fasttrckLogoWrapper && fasttrckLogoContainer && mouse ) {
      fasttrack.style.transform = '';
      logo.style.transform = '';
      mouse.style.display = "none";
      fasttrckLogoContainer.classList.remove('fasttrck-logo-container');
      fasttrckLogoContainer.classList.add('fasttrck-logo-container-fixed');
      fasttrckLogoWrapper.classList.add("slide-bottom");
      isFixed = true ;
    }




    if (isFixed && distance < window.innerHeight - 150 && fasttrckLogoContainer && fasttrckLogoWrapper && mouse) {
      fasttrckLogoContainer.classList.add('fasttrck-logo-container');
      fasttrckLogoContainer.classList.remove('fasttrck-logo-container-fixed');
      fasttrckLogoWrapper.classList.remove("slide-bottom");
      mouse.style.display = "block";

      isFixed = false ;
      snap = true ;
    }

    if(isFixed && snap) {
      scrollTo(0,window.innerHeight);
      snap = false ;
    }
}

  parallaxEffect();

  window.addEventListener("scroll",parallaxEffect)
})
</script>

<style scroped>
  .html::-webkit-scrollbar {
    display: none !important; 
    -ms-overflow-style: none !important;  /* IE and Edge */
    scrollbar-width: none !important;  /* Firefox */
  }
</style>