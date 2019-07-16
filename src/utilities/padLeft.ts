export function padLeft(nbr: number, stringLength: number): string {
    const zeros = "0".repeat(stringLength);
    return (zeros + nbr).slice(-stringLength);
}
