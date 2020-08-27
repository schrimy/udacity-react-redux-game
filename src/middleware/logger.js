//curried function that logs out each action / reducer event and calls next middleware function
const logger = (store) => (next) => (action) => {
    console.group(action.type)
        console.log('The action: ', action)
        const returnValue = next(action)
        console.log('The new State: ', store.getState())
    console.groupEnd()
    return returnValue
}

export default logger