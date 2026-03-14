import { cn } from "@/lib/utils";

interface WidgetButtonProps {
  children: React.ReactNode;
}

const pillOuterGradient =
  "bg-gradient-to-b from-white/30 via-[#fff1fe] via-[#fbe9d9] via-[#dea8ff] to-white/30 dark:from-[#0f0f18] dark:via-[#0f0f18] dark:to-[#0f0f18]";

const ButtonWidget = ({ children }: WidgetButtonProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-2.5 rounded-[32px] p-1.5",
        pillOuterGradient,
        "shadow-[0_0_20px_rgba(59,7,242,0.08)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]",
      )}
    >
      <div className="">{children}</div>
    </div>
  );
};

export default ButtonWidget;

// return <div className="rounded-full pill-outer-cream">{children}</div>;
