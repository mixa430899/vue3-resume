<template>
  <div class="avatar">
    <img :src="src">
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
      // здесь можно добавить какой-нибудь match с регуляркой для урла, делать я этого конечно же не буду
      validator(v) {
        return v.length >= 5 && v.length <= 255
      }
    }
  }
}
</script>

<style scoped>
  .avatar {
    display: flex;
    justify-content: center;
  }

  .avatar img {
    width: 150px;
    height: auto;
    border-radius: 50%;
  }
</style>