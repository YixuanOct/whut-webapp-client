<script setup>
import anime from "animejs/lib/anime.es.js";

function beforeEnter(el) {
  anime.set(el, {
    opacity: 0,
  });
}
function enter(el, done) {
  anime({
    targets: el,
    opacity: 1,
    duration: 600,
    easing: "easeOutExpo",
    complete: done,
  });
}
function leave(el, done) {
  anime({
    targets: el,
    opacity: 0,
    duration: 600,
    easing: "easeInExpo",
    complete: done,
  });
}
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
      mode="out-in"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style></style>
