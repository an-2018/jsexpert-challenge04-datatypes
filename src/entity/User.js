class User {
  constructor({ id }) {
    this.id = id;
  }
  // TODO: Alguma manipulação a fazer considerando que o objeto gerado será constantemente escrito em tela?
  [Symbol.toPrimitive](hint) {
    console.log(hint)
    if (hint !== "string") throw new TypeError()

    return `id: ${this.id}`
  }
  toString() {
    return `id: ${this.id}`
  }
}

export default User;
