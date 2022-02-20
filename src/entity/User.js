class User {
  constructor({ id }) {
    this.id = id;
  }
  // TODO: Alguma manipulação a fazer considerando que o objeto gerado será constantemente escrito em tela?
  [Symbol.toPrimitive](hint) {
    if(hint === "string") {
      return `User - id: ${this.id}`
    }
  }
  toString() {
    return `User - id: ${this.id}`
  }
}

export default User;
