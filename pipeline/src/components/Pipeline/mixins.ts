import { Component, Mixins } from "vue-property-decorator";

@Component
// eslint-disable-next-line @typescript-eslint/class-name-casing
class easyFlowMixin extends Mixins() {
  jsplumbSetting = {
    // 动态锚点、位置自适应
    Anchors: [
      "Top",
      "TopCenter",
      "TopRight",
      "TopLeft",
      "Right",
      "RightMiddle",
      "Bottom",
      "BottomCenter",
      "BottomRight",
      "BottomLeft",
      "Left",
      "LeftMiddle",
    ],
    // 容器ID
    Container: "efContainer",
    // 连线的样式，直线或者曲线等，可选值:  StateMachine、Flowchart，Bezier、Straight
    Connector: ["Bezier", { curviness: 100 }],
    // 鼠标不能拖动删除线
    ConnectionsDetachable: false,
    // 删除线的时候节点不删除
    DeleteEndpointsOnDetach: false,
    /**
     * 空白端点
     */
    Endpoint: ["Blank", { Overlays: "" }],
    /**
     * 连线的两端端点样式
     * fill: 颜色值，如：#12aabb，为空不显示
     * outlineWidth: 外边线宽度
     */
    EndpointStyle: { fill: "#1879ffa1", outlineWidth: 1 },
    // 是否打开jsPlumb的内部日志记录
    LogEnabled: true,
    /**
     * 连线的样式
     */
    PaintStyle: {
      // 线的颜色
      stroke: "#E0E3E7",
      // 线的粗细，值越大线越粗
      strokeWidth: 1,
      // 设置外边线的颜色，默认设置透明，这样别人就看不见了，点击线的时候可以不用精确点击
      outlineStroke: "transparent",
      // 线外边的宽，值越大，线的点击范围越大
      outlineWidth: 10,
    },
    DragOptions: { cursor: "pointer", zIndex: 2000 },
    /**
     *  叠加
     */
    Overlays: [
      // 箭头叠加
      [
        "Arrow",
        {
          width: 10, // 箭头尾部的宽度
          length: 8, // 从箭头的尾部到头部的距离
          location: 1, // 位置，建议使用0～1之间
          direction: 1, // 方向，默认值为1（表示向前），可选-1（表示向后）
          foldback: 0.623, // 折回，也就是尾翼的角度，默认0.623，当为1时，为正三角
        },
      ],
      [
        "Label",
        {
          label: "",
          location: 0.1,
          cssClass: "aLabel",
        },
      ],
    ],
    // 绘制图的模式 svg、canvas
    RenderMode: "svg",
    // 鼠标滑过线的样式
    HoverPaintStyle: { stroke: "#b0b2b5", strokeWidth: 1 },
    // 滑过锚点效果
    // EndpointHoverStyle: {fill: 'red'}
    Scope: "jsPlumb_DefaultScope", // 范围，具有相同scope的点才可连接
  };
  /**
   * 连线参数
   */
  jsplumbConnectOptions = {
    isSource: true,
    isTarget: true,
    // 动态锚点、提供了4个方向 Continuous、AutoDefault
    anchor: "Continuous",
    // 设置连线上面的label样式
    labelStyle: {
      cssClass: "flowLabel",
    },
    // 修改了jsplumb 源码，支持label 为空传入自定义style
    emptyLabelStyle: {
      cssClass: "emptyFlowLabel",
    },
  };
  /**
   * 源点配置参数
   */
  jsplumbSourceOptions = {
    // 设置可以拖拽的类名，只要鼠标移动到该类名上的DOM，就可以拖拽连线
    filter: ".flow-node-drag",
    filterExclude: false,
    anchor: "Continuous",
    // 是否允许自己连接自己
    allowLoopback: true,
    maxConnections: -1,
    onMaxConnections: function(info: any) {
      console.log(`超过了最大值连线: ${info.maxConnections}`);
    },
  };
  jsplumbTargetOptions = {
    // 设置可以拖拽的类名，只要鼠标移动到该类名上的DOM，就可以拖拽连线
    filter: ".flow-node-drag",
    filterExclude: false,
    // 是否允许自己连接自己
    anchor: "Continuous",
    allowLoopback: true,
    dropOptions: { hoverClass: "ef-drop-hover" },
  };
}

export default easyFlowMixin;

// export const easyFlowMixin = {
//   data() {
//     return {
//       jsplumbSetting: {
//         // 动态锚点、位置自适应
//         Anchors: [
//           "Top",
//           "TopCenter",
//           "TopRight",
//           "TopLeft",
//           "Right",
//           "RightMiddle",
//           "Bottom",
//           "BottomCenter",
//           "BottomRight",
//           "BottomLeft",
//           "Left",
//           "LeftMiddle",
//         ],
//         // 容器ID
//         Container: "efContainer",
//         // 连线的样式，直线或者曲线等，可选值:  StateMachine、Flowchart，Bezier、Straight
//         Connector: ["Bezier", { curviness: 100 }],
//         // 鼠标不能拖动删除线
//         ConnectionsDetachable: false,
//         // 删除线的时候节点不删除
//         DeleteEndpointsOnDetach: false,
//         /**
//          * 空白端点
//          */
//         Endpoint: ["Blank", { Overlays: "" }],
//         /**
//          * 连线的两端端点样式
//          * fill: 颜色值，如：#12aabb，为空不显示
//          * outlineWidth: 外边线宽度
//          */
//         EndpointStyle: { fill: "#1879ffa1", outlineWidth: 1 },
//         // 是否打开jsPlumb的内部日志记录
//         LogEnabled: true,
//         /**
//          * 连线的样式
//          */
//         PaintStyle: {
//           // 线的颜色
//           stroke: "#E0E3E7",
//           // 线的粗细，值越大线越粗
//           strokeWidth: 1,
//           // 设置外边线的颜色，默认设置透明，这样别人就看不见了，点击线的时候可以不用精确点击
//           outlineStroke: "transparent",
//           // 线外边的宽，值越大，线的点击范围越大
//           outlineWidth: 10,
//         },
//         DragOptions: { cursor: "pointer", zIndex: 2000 },
//         /**
//          *  叠加
//          */
//         Overlays: [
//           // 箭头叠加
//           [
//             "Arrow",
//             {
//               width: 10, // 箭头尾部的宽度
//               length: 8, // 从箭头的尾部到头部的距离
//               location: 1, // 位置，建议使用0～1之间
//               direction: 1, // 方向，默认值为1（表示向前），可选-1（表示向后）
//               foldback: 0.623, // 折回，也就是尾翼的角度，默认0.623，当为1时，为正三角
//             },
//           ],
//           [
//             "Label",
//             {
//               label: "",
//               location: 0.1,
//               cssClass: "aLabel",
//             },
//           ],
//         ],
//         // 绘制图的模式 svg、canvas
//         RenderMode: "svg",
//         // 鼠标滑过线的样式
//         HoverPaintStyle: { stroke: "#b0b2b5", strokeWidth: 1 },
//         // 滑过锚点效果
//         // EndpointHoverStyle: {fill: 'red'}
//         Scope: "jsPlumb_DefaultScope", // 范围，具有相同scope的点才可连接
//       },
//       /**
//        * 连线参数
//        */
//       jsplumbConnectOptions: {
//         isSource: true,
//         isTarget: true,
//         // 动态锚点、提供了4个方向 Continuous、AutoDefault
//         anchor: "Continuous",
//         // 设置连线上面的label样式
//         labelStyle: {
//           cssClass: "flowLabel",
//         },
//         // 修改了jsplumb 源码，支持label 为空传入自定义style
//         emptyLabelStyle: {
//           cssClass: "emptyFlowLabel",
//         },
//       },
//       /**
//        * 源点配置参数
//        */
//       jsplumbSourceOptions: {
//         // 设置可以拖拽的类名，只要鼠标移动到该类名上的DOM，就可以拖拽连线
//         filter: ".flow-node-drag",
//         filterExclude: false,
//         anchor: "Continuous",
//         // 是否允许自己连接自己
//         allowLoopback: true,
//         maxConnections: -1,
//         onMaxConnections: function(info, e) {
//           console.log(`超过了最大值连线: ${info.maxConnections}`);
//         },
//       },
//       jsplumbTargetOptions: {
//         // 设置可以拖拽的类名，只要鼠标移动到该类名上的DOM，就可以拖拽连线
//         filter: ".flow-node-drag",
//         filterExclude: false,
//         // 是否允许自己连接自己
//         anchor: "Continuous",
//         allowLoopback: true,
//         dropOptions: { hoverClass: "ef-drop-hover" },
//       },
//     };
//   },
// };
