<template>
  <div>
    <template v-for="item in subMenu">
      <el-submenu
        v-if="item.children && item.children.length > 0 && item.name !== 'notfound'"
        :index="item.path"
        :key="item.name">
        <template slot="title">
          <item v-if="item.title" :icon="item.icon" :title="item.title" />
        </template>
        <sub-menu :sub-menu="item.children"/>
      </el-submenu>
      <el-menu-item
        v-else-if="item.name !== 'notfound'"
        :key="item.path"
        :index="item.path"
        @click="handleSelect(item)">
        <item v-if="item.title" :icon="item.icon" :title="item.title" />
      </el-menu-item>
    </template>
  </div>
</template>

<script>
import Item from './Item'

export default {
  name: 'SubMenu',
  components: { Item },
  props: {
    subMenu: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleSelect(item) {
      this.$store.commit('tabs/UPDATE_TABS_LIST', item)
      this.$router.push(item.path)
    }
  }
}
</script>
