export function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

const shortMonths = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec',
] as const

function isoDateParts(isoDate: string) {
    const [year, month, day] = isoDate.split('-').map(Number)
    return { year, month: shortMonths[month - 1], day }
}

export function formatDayMonthYear(isoDate: string): string {
    const { year, month, day } = isoDateParts(isoDate)
    return `${day} ${month} ${year}`
}

export function formatMonthDayYear(isoDate: string): string {
    const { year, month, day } = isoDateParts(isoDate)
    return `${month} ${day} ${year}`
}
