export const getLocalStorage = (key) => {
    if (typeof localStorage !== 'undefined') {
        const ls = localStorage.getItem(key)
        return ls ? JSON.parse(ls) : null
    }
    return null
}

export const setLocalStorage = (key, value) => {
    if (typeof localStorage!== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value))
    }
}