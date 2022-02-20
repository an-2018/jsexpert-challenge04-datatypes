import User from './User.js';

// TODO: Criar um Symbol para a propriedade privada 'kUsers'
const kUsers = Symbol('Users')
const kData = Symbol('Data')
class Users {
  constructor() {
    // TODO: inicializar a propriedade privada 'kData' como uma estrutura importante vista no curso
    this[kData] = new Map()
  }

  add(userRaw) {
    const user = new User(userRaw);
    // TODO: inserir valor na estrutura escolhida.
    this[kData].set(userRaw)
  }

  hasUsers() {
    // TODO: Como saber se tem informação dentro da estrutura escolhida?
    return this[kData].size > 0;
  }

  // TODO: Me parece que o objeto gerado precisa ser iterável 🤔
  *[Symbol.iterator]() {
    for(const item of this[kData]){
      yield item
    }
  }
}

export default Users;
