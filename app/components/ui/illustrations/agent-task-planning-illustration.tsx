import { CheckCircle2, CircleDashed, Play } from 'lucide-react'

export const AgentTaskPlanningIllustration = () => {
    return (
        <div
            aria-hidden
            className="min-w-xs max-w-xs">
            <div className="bg-card/95 ring-border-illustration shadow-black/4 rounded-2xl p-6 shadow-md ring-1 dark:bg-white/10 dark:ring-white/20">
                <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-foreground dark:text-white">Task Planning</div>
                    <div className="bg-primary/10 text-primary ml-auto rounded px-2 py-0.5 text-[10px] dark:bg-primary/30 dark:text-cyan-300">Auto-generated</div>
                </div>

                <div className="bg-illustration ring-border-illustration mt-4 rounded-lg p-2.5 shadow shadow-black/5 ring-1 dark:bg-white/5 dark:ring-white/10">
                    <div className="text-muted-foreground text-[10px] dark:text-white/70">Goal</div>
                    <div className="mt-1 text-xs text-foreground dark:text-white">Build a REST API endpoint for user authentication with JWT tokens</div>
                </div>

                <div className="mt-4 space-y-2">
                    <div className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-500" />
                        <div className="flex-1">
                            <div className="text-xs font-medium line-through opacity-50 dark:text-white/60">1. Gather requirements</div>
                            <div className="text-muted-foreground text-[10px] dark:text-white/60">Completed in 2.3s</div>
                        </div>
                    </div>

                    <div className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-500" />
                        <div className="flex-1">
                            <div className="text-xs font-medium line-through opacity-50 dark:text-white/60">2. Research solutions</div>
                            <div className="text-muted-foreground text-[10px] dark:text-white/60">Completed in 5.1s</div>
                        </div>
                    </div>

                    <div className="bg-primary/5 ring-primary/20 -mx-2 flex items-start gap-2 rounded-lg p-2 ring-1 dark:bg-primary/20 dark:ring-cyan-400/30">
                        <div className="relative mt-0.5">
                            <CircleDashed
                                className="text-primary size-4 animate-spin dark:text-cyan-400"
                                style={{ animationDuration: '3s' }}
                            />
                            <Play className="text-primary absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-current dark:text-cyan-400" />
                        </div>
                        <div className="flex-1">
                            <div className="text-primary text-xs font-semibold dark:text-white">3. Implement solution</div>
                            <div className="text-primary/70 text-[10px] dark:text-white/80">In progress... 12s</div>
                        </div>
                    </div>

                    <div className="flex items-start gap-2 opacity-40">
                        <CircleDashed className="text-muted-foreground mt-0.5 size-4 shrink-0 dark:text-white/50" />
                        <div className="flex-1">
                            <div className="text-xs font-medium dark:text-white/70">4. Test and validate</div>
                            <div className="text-muted-foreground text-[10px] dark:text-white/60">Pending</div>
                        </div>
                    </div>

                    <div className="flex items-start gap-2 opacity-40">
                        <CircleDashed className="text-muted-foreground mt-0.5 size-4 shrink-0 dark:text-white/50" />
                        <div className="flex-1">
                            <div className="text-xs font-medium dark:text-white/70">5. Deliver result</div>
                            <div className="text-muted-foreground text-[10px] dark:text-white/60">Pending</div>
                        </div>
                    </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[10px]">
                    <div className="text-muted-foreground dark:text-white/70">2/5 tasks complete</div>
                    <div className="text-muted-foreground dark:text-white/70">Est. 45s remaining</div>
                </div>
            </div>
        </div>
    )
}

export default AgentTaskPlanningIllustration