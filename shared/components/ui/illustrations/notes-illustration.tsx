import { Play } from 'lucide-react'

export const NotesIllustration = () => {
    return (
        <div
            aria-hidden
            className="max-w-xs">
            <div className="bg-illustration shadow-black/6.5 ring-border-illustration z-1 relative rounded-2xl p-6 shadow-lg ring-1">
                <span className="text-muted-foreground text-xs">
                    Today <span className="bg-foreground/50 size-0.5 rounded-full"></span> <span>09:15 AM</span>{' '}
                </span>
                <div className="mb-4 mt-1 text-lg font-semibold">Marketing Website Launch</div>
                <span className="text-muted-foreground">The new marketing website is scheduled to go live next Monday.</span> <span className="text-foreground font-medium">Key highlights include a redesigned hero section, improved SEO structure,</span> <span className="text-muted-foreground">and integrated analytics dashboard for tracking conversion rates.</span>
                <div className="bg-foreground/10 group relative mt-6 h-fit w-fit cursor-pointer overflow-hidden rounded-full p-px shadow-md shadow-black/5">
                    <div className="bg-linear-to-br/increasing mask-r-to-75% mask-r-from-25% duration-2000 absolute inset-0 aspect-square -translate-y-1/3 animate-spin from-emerald-400 via-blue-500 to-indigo-400 opacity-50"></div>
                    <div className="group-hover:bg-illustration bg-background/95 relative flex h-8 items-center gap-1.5 rounded-full px-3 text-sm duration-100">
                        <Play className="fill-foreground *:not-first:opacity-50 size-3" />
                        03:47
                    </div>
                </div>
            </div>
        </div>
    )
}