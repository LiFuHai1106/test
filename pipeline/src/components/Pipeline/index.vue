<template>
  <div style="height: calc(100vh);">
    <div style="display: flex;height: calc(100% - 47px);">
      <div id="efContainer" ref="efContainer" class="container">
        <template v-for="node in data.nodeList">
          <flow-node :id="node.id" :key="node.id" :node="node" :activeElement="activeElement"> </flow-node>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { jsPlumb } from "jsplumb";
import easyFlowMixin from "@/components/Pipeline/mixins";
import flowNode from "@/components/Pipeline/node";
import lodash from "lodash";
import "./index.css";
import pipeline from "./data";

@Component({
  components: {
    flowNode,
  },
})
export default class extends Mixins(easyFlowMixin) {
  private a = pipeline;
  private jsPlumb: any;
  private data = {};
  private flowList = {
    nodeList: [
      {
        id: "nodeA",
        title: "编译",
        titleShow: true,
        name: "编译",
        left: "26px",
        top: "161px",
        status: "success",
        time: 1318781876406,
      },
      {
        id: "nodeB",
        title: "部署",
        titleShow: true,
        name: "部署",
        left: "340px",
        top: "161px",
        status: "success",
        time: 1318781876406,
      },
      {
        id: "nodeC1",
        title: "代码扫描和检查",
        titleShow: true,
        name: "STC",
        left: "639px",
        top: "161px",
        status: "fail",
        time: 1318781876406,
      },
      {
        id: "nodeC2",
        title: "代码扫描和检查",
        titleShow: false,
        name: "STC",
        left: "639px",
        top: "231px",
        status: "fail",
        time: 1318781876406,
      },
      {
        id: "nodeD1",
        title: "集成测试",
        titleShow: true,
        name: "集成测试",
        left: "939px",
        top: "161px",
        status: "fail",
        time: 1318781876406,
      },
      {
        id: "nodeD2",
        title: "集成测试",
        titleShow: false,
        name: "单元测试",
        left: "939px",
        top: "231px",
        status: "fail",
        time: 1318781876406,
      },
    ],
    lineList: [
      {
        from: "nodeA",
        to: "nodeB",
      },
      {
        from: "nodeB",
        to: "nodeC1",
      },
      {
        from: "nodeB",
        to: "nodeC2",
      },
      {
        from: "nodeC1",
        to: "nodeD1",
      },
      {
        from: "nodeC2",
        to: "nodeD2",
      },
    ],
  };
  // 激活的元素、可能是节点、可能是连线
  private activeElement = {
    // 可选值 node 、line
    type: undefined,
    // 节点ID
    nodeId: undefined,
    // 连线ID
    sourceId: undefined,
    targetId: undefined,
  };

  private jsPlumbInit() {
    this.jsPlumb.ready(() => {
      // 导入默认配置
      this.jsPlumb.importDefaults(this.jsplumbSetting);
      // 会使整个jsPlumb立即重绘。
      this.jsPlumb.setSuspendDrawing(false, true);
      // 初始化节点
      this.loadEasyFlow();

      // 连线
      this.jsPlumb.bind("beforeDrop", (evt: any) => {
        const from = evt.sourceId;
        const to = evt.targetId;
        if (this.hasLine(from, to)) {
          this.$message.error("该关系已存在,不允许重复创建");
          return false;
        }
        this.$message.success("连接成功");
        return true;
      });
      this.jsPlumb.setContainer(this.$refs.efContainer);
    });
  }
  private loadEasyFlow() {
    // 初始化节点
    for (let i = 0; i < (this as any).data.nodeList.length; i++) {
      const node = (this as any).data.nodeList[i];
      // 设置源点，可以拖出线连接其他节点
      this.jsPlumb.makeSource(node.id, lodash.merge(this.jsplumbSourceOptions, {}));
      // // 设置目标点，其他源点拖出的线可以连接该节点
      this.jsPlumb.makeTarget(node.id, this.jsplumbTargetOptions);
      if (!node.viewOnly) {
        this.jsPlumb.draggable(node.id, {
          containment: "parent",
          stop: function(el: any) {
            // 拖拽节点结束后的对调
            console.log("拖拽结束: ", el);
          },
        });
      }
    }
    // 初始化连线
    for (let i = 0; i < (this as any).data.lineList.length; i++) {
      const line = (this as any).data.lineList[i];
      const connParam = {
        source: line.from,
        target: line.to,
        label: line.label ? line.label : "",
        connector: line.connector ? line.connector : "",
        anchors: line.anchors ? line.anchors : undefined,
        paintStyle: line.paintStyle ? line.paintStyle : undefined,
      };
      this.jsPlumb.connect(connParam, this.jsplumbConnectOptions);
    }
  }

  // 是否具有该线
  private hasLine(from: any, to: any) {
    for (let i = 0; i < (this as any).data.lineList.length; i++) {
      const line = (this as any).data.lineList[i];
      if (line.from === from && line.to === to) {
        return true;
      }
    }
    return false;
  }
  // 加载流程图
  dataReload(data: any) {
    (this as any).data.nodeList = [];
    (this as any).data.lineList = [];
    this.$nextTick(() => {
      data = lodash.cloneDeep(data);
      this.data = data;
      this.$nextTick(() => {
        this.jsPlumb = jsPlumb.getInstance();
        this.$nextTick(() => {
          this.jsPlumbInit();
        });
      });
    });
  }
  mounted() {
    this.jsPlumb = jsPlumb.getInstance();
    this.$nextTick(() => {
      // 默认加载流程A的数据、在这里可以根据具体的业务返回符合流程数据格式的数据即可
      this.dataReload(this.flowList);
    });
  }
}
</script>
