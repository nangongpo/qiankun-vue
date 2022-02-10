<template>
  <div class="login-wrapper">
    <div class="content-outer">
      <div class="project-title">{{ projectTitle }}</div>
      <div class="project-desc">{{ projectTitleEn }}</div>
      <div class="content-inner">
        <div class="left">
          <div class="image"></div>
        </div>
        <div class="right">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { projectTitle, projectTitleEn, projectFooter } from '@/settings'
export default {
  name: '',
  components: {},
  data() {
    return {
      projectTitle,
      projectTitleEn: projectTitleEn.toUpperCase(),
      projectFooter
    }
  }
}

</script>
<style lang="scss" scoped>
.login-wrapper {
  @include relative;
  background: $heavy-blue url('~@/assets/background/bg1.jpg');
  background-size: cover;
  padding: 0 20px;
  box-sizing: border-box;
  .content-outer {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    .project-title {
      font-size: 48px;
      font-weight: 700;
      line-height: 1.4;
      text-shadow: 2.5px 3px 10px rgba(8, 54, 109, 0.3);
      padding-bottom: 10px;
      color: #ffffff;
      max-width: 960px;
    }
    .project-desc {
      font-size: 18px;
      padding-bottom: 8px;
      color: #ffffff;
    }
  }
  .content-inner {
    width: 820px;
    height: 440px;
    background: url('~@/assets/background/bg2.png');
    background-size: cover;
    position: relative
  }
  .left {
    position: absolute;
    top: 22px;
    right: 366px;
    bottom: 37px;
    left: 22px;
    background: url('~@/assets/background/bg3.png');
    background-size: cover;
    .image {
      width: 100%;
      height: 100%;
      background: url('~@/assets/background/bg3-1.png') no-repeat center center;
      background-size: 80% 80%;
    }
  }
  .right {
    position: absolute;
    top: 22px;
    left: 454px;
    right: 37px;
    bottom: 37px;
    text-align: center;
    padding-top: 20px;
  }
}
@media screen and (max-width: 768px) {
  .content-outer {
    .project-title {
      font-size: 28px !important;
      padding: 0 10px;
    }
    .project-desc {
      display: none
    }
    .content-inner {
      width: 100%;
      background: transparent;
      padding: 0 20px;
    }
    .left {
      display: none
    }
    .right {
      position: static;
      background: #fff;
      border-radius: 20px;
      padding-bottom: 20px;
    }
  }
}
</style>
