/* eslint-disable */
/* This file contains code from the "legacy" era, it needs to be re-written */

import { lazy } from 'react'

export default lazy(() => import('./HelloWorld'))

export const requiredAllowance = "1500"

export { default as logo } from './HelloWorld.jpg'
