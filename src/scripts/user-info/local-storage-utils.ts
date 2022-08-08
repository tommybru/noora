export function writeResultToLocal(result: any) {
    let results = JSON.parse(getFromLocal("progress") as string)

    if (!Array.isArray(results))
        results = []

    console.log("Current results:", results)
    results.push(result)

    console.log()
    writeToLocal("progress", JSON.stringify(results))
}

export function writeToLocal(key: string, value: any) {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, value)
    } else {
        console.log("Could not write to local storage for key: " + key)
    }
}

export function getFromLocal(key: string) {
    if (typeof window !== "undefined")
        return localStorage.getItem(key)
}
