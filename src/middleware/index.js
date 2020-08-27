import thunk from 'redux-thunk'
import logger from './logger'
import { applyMiddleware } from 'redux'

//root middleware that combines other middleware to pass into store creator
export default applyMiddleware(
    thunk,
    logger
)