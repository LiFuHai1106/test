<template>
  <div ref="node" :style="nodeContainerStyle" class="ef-node-container">
    <!-- 节点图标 -->
    <div class="ef-node-left-ico flow-node-drag">
      <i :class="node.ico"></i>
    </div>
    <!-- 节点名称 -->
    <div class="ef-node-text" :show-overflow-tooltip="true">
      {{ node.name }}<span style="padding-left:15px">{{ node.time }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    node: Object,
    activeElement: Object,
  },
  data() {
    return {};
  },
  computed: {
    // 节点容器样式
    nodeContainerStyle() {
      return {
        top: this.node.top,
        left: this.node.left,
      };
    },
  },
  methods: {},
};
</script>
