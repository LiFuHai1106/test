<template>
  <div ref="node" :style="nodeContainerStyle" class="ef-node-container">
    <div class="ef-node-top" v-if="node.titleShow">
      {{ node.title }}
    </div>
    <!-- 节点图标 -->
    <div class="ef-node-left-ico flow-node-drag">
      <i :class="node.status == 'success' ? 'el-icon-circle-check' : 'el-icon-stopwatch'"></i>
    </div>
    <!-- 节点名称 -->
    <div class="ef-node-text" :show-overflow-tooltip="true">
      {{ node.name }}<span style="padding-left:15px">{{ node.time | timeFormat }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import dayjs from "dayjs";

@Component({
  components: {},
  filters: {
    timeFormat: function(data: any) {
      return dayjs((dayjs(data) as any).$d).format("HH:mm:ss"); //时间戳转为时分秒
    },
  },
})
export default class extends Vue {
  @Prop({ required: false }) private node!: any;
  @Prop({ required: false }) private activeElement!: any;
  get nodeContainerStyle() {
    return {
      top: this.node.top,
      left: this.node.left,
    };
  }
}
</script>
