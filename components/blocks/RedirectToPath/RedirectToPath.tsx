import { Progress } from "antd";
import { useEffect, useState } from "react";

type RedirectToPathProps = {
  path: string;
  timing: number;
};

export const RedirectToPath = ({ path, timing }: RedirectToPathProps) => {
  const [percentage, setPercentage] = useState(0);
  const step = 100 / timing;

  useEffect(() => {
    const intervalPercentage = setInterval(() => {
      if (percentage < 100) {
        setPercentage(percentage + step);
      } else {
        setPercentage(100);
        clearInterval(intervalPercentage);
      }
    }, 1000);
    return () => {
      clearInterval(intervalPercentage);
    };
  }, []);

  return (
    <Progress
      type="circle"
      strokeColor={{
        "0%": "#108ee9",
        "100%": "#87d068",
      }}
      percent={percentage}
    />
  );
};
