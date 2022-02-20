import User from './User.js';

// Criar um Symbol para a propriedade privada 'kUsers'
const kUsers = Symbol('Users')
const kData = Symbol('Data')
class Users {
  constructor() {
    // inicializar a propriedade privada 'kData' como uma estrutura importante vista no curso
    this[kData] = new Map()
  }

  add(userRaw) {
    const user = new User(userRaw);
    // inserir valor na estrutura escolhida.
    this[kData].set(userRaw)
  }

  hasUsers() {
    // Como saber se tem informação dentro da estrutura escolhida?
    return this[kData].size > 0;
  }

  // Me parece que o objeto gerado precisa ser iterável 🤔
  *[Symbol.iterator]() {
    for (const user of this[kData]) {
      yield user
    }
  }

  [Symbol.toPrimitive](hint) {
    if (hint !== "string") throw new TypeError()

    return new Intl.ListFormat("pt-PT", { style: "long", type: "conjunction" })
      .format(this[kData])
  }

  toString() {
    return new Intl.ListFormat("pt-PT", { style: "long", type: "conjunction" })
      .format(this[kData])
  }
}

export default Users;
