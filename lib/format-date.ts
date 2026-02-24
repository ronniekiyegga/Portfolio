export function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

/** e.g. "February 3rd 2026" for blog cards */
export function formatDateOrdinal(dateString: string): string {
    const date = new Date(dateString)
    const day = date.getDate()
    const suffix = day === 1 || day === 21 || day === 31 ? 'st' : day === 2 || day === 22 ? 'nd' : day === 3 || day === 23 ? 'rd' : 'th'
    return date.toLocaleDateString('en-US', { month: 'long' }) + ` ${day}${suffix} ` + date.getFullYear()
}