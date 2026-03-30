import { cn } from "@/lib/utils";

interface WidgetButtonProps {
  children: React.ReactNode;
  isMobile?: boolean;
  className?: string;
}

const pillOuterGradient =
  "bg-gradient-to-b from-white/20 via-[#ffffff] via-[#fbe9d9] via-[#F8EDFF] to-white/20 dark:from-[#0f0f18] dark:via-[#0f0f18] dark:to-[#0f0f18]";

const ButtonWidget = ({ children, isMobile, className }: WidgetButtonProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-2.5 rounded-[32px] p-1.5 ",
        pillOuterGradient,
        isMobile && "hidden md:flex",
        "shadow-[0_0_20px_rgba(59,7,242,0.08)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]",
        className,
      )}
    >
      <div className="rounded-full">{children}</div>
    </div>
  );
};

export default ButtonWidget;

// return <div className="rounded-full pill-outer-cream">{children}</div>;
