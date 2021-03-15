interface Pipeline {
  stages: Stage[];
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
