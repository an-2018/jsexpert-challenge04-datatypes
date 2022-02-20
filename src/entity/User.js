class User {
  constructor({ id }) {
    this.id = id;
  }
  // TODO: Alguma manipulação a fazer considerando que o objeto gerado será constantemente escrito em tela?
  [Symbol.toPrimitive](hint) {
    if (hint !== "string") throw new TypeError()

    let user = `[id: ${(this.id + "").slice(0, 6)}` + "***]"
    return user
  }
  toString() {
    return `id: ${this.id}`
  }
}

export default User;
