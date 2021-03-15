interface Pipeline {
  stages: string;
}

interface Stage {
  title: string;
  jobs: Job[];
}

interface Job {
  name: string;
  status: "success" | "fail";
  time: number;
}

const pipeline: Pipeline = {
  stages: "test11",
};

export default pipeline;
