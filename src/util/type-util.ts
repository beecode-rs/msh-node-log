export const typeUtil = {
  exhaustiveCheck: (message: string, _: never): Error => {
    return new Error(`ExhaustiveCheck: ${message} [${_}]`)
  },
}
