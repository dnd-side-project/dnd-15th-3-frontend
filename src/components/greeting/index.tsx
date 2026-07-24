import { greeting } from "./index.css";

interface GreetingProps {
  name: string;
  tone?: "normal" | "primary";
  size?: "md" | "lg";
}

export function Greeting({ name, tone = "normal", size = "md" }: GreetingProps) {
  return <p className={greeting({ tone, size })}>Hello, {name}!</p>;
}
