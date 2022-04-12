import User from './User.js';

// Criar um Symbol para a propriedade privada 'kUsers'
const kUsers = Symbol('Users')
class Users {
  constructor() {
    // inicializar a propriedade privada 'kData' como uma estrutura importante vista no curso
    /*
      WeakMap could be used here, so when users leaves the session their data also is removed 
      from the list of active users the problem founded was how to keep it iterable to list 
      the users
    */
    this[kUsers] = new Set()
  }

  add(userRaw) {
    const user = new User(userRaw);
    // inserir valor na estrutura escolhida.
    this[kUsers].add(user)
  }

  hasUsers() {
    // Como saber se tem informação dentro da estrutura escolhida?
    return this[kUsers].size > 0;
  }

  // Me parece que o objeto gerado precisa ser iterável 🤔
  *[Symbol.iterator]() {
    for (const user of this[kUsers]) {
      yield user
    }
  }

  [Symbol.toPrimitive](hint) {
    if (hint !== "string") throw new TypeError()

    return new Intl.ListFormat("pt-PT", { style: "long", type: "conjunction" })
      .format(this[kUsers])
  }

  toString() {
    return new Intl.ListFormat("pt-PT", { style: "long", type: "conjunction" })
      .format(this[kUsers])
  }

}

export default Users;
