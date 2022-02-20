import User from './User.js';

// Criar um Symbol para a propriedade privada 'kUsers'
const kUsers = Symbol('Users')
const kData = Symbol('Data')
class Users {
  constructor() {
    // inicializar a propriedade privada 'kData' como uma estrutura importante vista no curso
    /*
      WeakMap could be used here, so when users leaves the session their data also is removed 
      from the list of active users the problem founded was how to keep it iterable to list 
      the users
    */
    this[kData] = new Map()
  }

  add(userRaw) {
    const user = new User(userRaw);
    // inserir valor na estrutura escolhida.
    this[kData].set(user.id, user)
  }

  hasUsers() {
    // Como saber se tem informação dentro da estrutura escolhida?
    return this[kData].size > 0;
  }

  // Me parece que o objeto gerado precisa ser iterável 🤔
  *[Symbol.iterator]() {
    for (const user of this[kData]) {
      console.log(user)
      yield user[1]
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
