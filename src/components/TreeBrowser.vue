<template>
  <div>
    <div
      @click="expanded = !expanded"
      :style="{'margin-left': `${depth * 10}px`}"
      class="node"
    >
      <span
        v-if="hasChildren"
        class="type">{{expanded ? '&#9660;' : '&#9658;'}}</span>
        <span v-else>&#9671;</span>
      <a class="ui-text-regular">{{node.id}}</a>
    </div>
    <a
      v-if="expanded">
      <TreeBrowser
        v-for="childnode in node.nodes"
        :key="childnode.id"
        :node="childnode"
        :depth="depth + 1"
      />
    </a>
  </div>
</template>

<script>
export default {
  name: 'TreeBrowser',
  props: {
    node: Object,
    depth: {
      type: Number,
      default: 0
    }
  },
  computed: {
    hasChildren () {
      return this.node.nodes
    }
  },
  data () {
    return {
      expanded: false
    }
  }
}
</script>

<style scoped>
.node{
  text-align: left;
}
</style>
