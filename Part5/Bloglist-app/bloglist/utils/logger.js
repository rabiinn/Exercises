const info = (...arg) => {
    console.log(...arg)
}

const error = (... arg) => {
    console.error(...arg)
}

export default {info, error}