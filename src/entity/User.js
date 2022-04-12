class User {
  constructor({ id }) {
    this.id = id;
  }
  // TODO: Alguma manipulação a fazer considerando que o objeto gerado será constantemente escrito em tela?
  [Symbol.toPrimitive](hint) {
    if (hint !== "string") throw new TypeError()

    const user = `[id: ${(this.id + "").substring(0, 6)}***]`
    return user
  }
}

export default User;
