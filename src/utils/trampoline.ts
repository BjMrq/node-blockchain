export const trampoline =
  <TReturn, TArguments extends Array<any>>(
    functionToOptimize: (...allArguments: TArguments) => TReturn | Promise<TReturn>
  ) =>
  // eslint-disable-next-line @typescript-eslint/ban-types
  async (...allArguments: TArguments): Promise<TReturn extends Function ? never : TReturn> => {
    let result = await functionToOptimize(...allArguments)
    while (typeof result === 'function') {
      result = await result()
    }

    //@ts-expect-error
    return result
  }
