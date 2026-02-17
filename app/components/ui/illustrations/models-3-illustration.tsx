import { Gemini } from "@/app/components/ui/svgs/gemini";
import { MistralAi } from "@/app/components/ui/svgs/mistral-ai";
import { Openai } from "@/components/ui/svgs/openai";
import { Deepseek } from "@/components/ui/svgs/deepseek";
import { QwenLight as Qwen } from "@/components/ui/svgs/qwen";
import { Play } from "lucide-react";

type Model = {
  name: string;
  icon: React.ReactNode;
};

export const Models3Illustration = () => {
  const models: Model[] = [
    { name: "Gemini", icon: <Gemini /> },
    { name: "Open AI", icon: <Openai className="fill-foreground" /> },
    { name: "Deepseek", icon: <Deepseek /> },
    { name: "Mistral AI", icon: <MistralAi /> },
    { name: "Qwen", icon: <Qwen className="fill-foreground" /> },
  ];
  return (
    <div aria-hidden className="min-w-sm relative">
      <div className="perspective-dramatic flex flex-col gap-4">
        <div className="mask-radial-[100%_100%] mask-radial-from-75% mask-radial-at-top-left rotate-x-5 rotate-z-6 -rotate-4 pl-6 pt-1">
          <div className="ring-border-illustration bg-background/75 shadow-black/6.5 rounded-tl-2xl px-2 pt-4 shadow-lg ring-1">
            <div className="text-muted-foreground mb-3 flex items-center gap-2.5 px-3 font-medium">
              Models{" "}
              <Play className="size-2.5 translate-y-0.5 rotate-90 fill-current opacity-50" />
            </div>

            <div className="bg-illustration ring-border-illustration flex flex-col gap-5 rounded-tl-xl pl-5 pt-5 shadow ring-1">
              {models.map((model, index) => (
                <div
                  key={index}
                  className="flex origin-bottom items-center gap-2.5 [&>svg]:size-5"
                >
                  {model.icon}
                  <span className="text-base">{model.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Models3Illustration;
