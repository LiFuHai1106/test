interface Pipeline {
  nodeList: Stage[];
  lineList: any[];
}

interface Stage {
  title: string;
  jobs: Job[];
}

interface Job {
  id: string;
  title: string;
  titleShow: boolean;
  name: string;
  left: string;
  top: string;
  status: "success" | "fail";
  time: number;
}

const pipeline: Pipeline = {
  nodeList: [
    {
      title: "编译",
      jobs: [
        {
          id: "nodeA",
          title: "编译",
          titleShow: true,
          name: "编译",
          left: "26px",
          top: "161px",
          status: "success",
          time: 1,
        },
      ],
    },
    {
      title: "部署",
      jobs: [
        {
          id: "nodeB",
          title: "编译",
          titleShow: true,
          name: "编译",
          left: "26px",
          top: "161px",
          status: "success",
          time: 2,
        },
      ],
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

export default pipeline;
