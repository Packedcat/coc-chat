const validateFunction = (func: any, decorator: any) => {
  if (typeof func !== 'function') {
    throw new Error(
      `@${decorator} decorator can only be applied to methods not: ${typeof func}`
    )
  }
}

export default function log(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const userFunc = descriptor.value
  validateFunction(userFunc, 'log')

  return {
    ...descriptor,
    value: function logger(...params: any[]) {
      console.log(`Calling function "${propertyKey}" with params: `, ...params)
      return userFunc.apply(this, [...params])
    },
  }
}
