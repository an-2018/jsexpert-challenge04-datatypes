import Crypto from '../entity/Crypto.js';
import CryptoRepository from '../repository/CryptoRepository.js';

class CryptoService {
  constructor({ repository } = {}) {
    this.repository = repository || new CryptoRepository();
    this.currentPage = 1000
    this.isLast = false
  }
  async *list() {
    // implementar generator que chama a repository fazendo a paginação

    let limit = 5
    while (!this.isLast) {

      const response = await this.repository.list(this.currentPage, limit)
      const data = response.data

      if (this.hasNext(data)) {
        this.currentPage++
      }

      yield data
    }
  }

  hasNext(data) {
    return data.length > 0
  }
  /*
  hasNext(str) {
    if (!str) return false
    let res = str.split(',').find(element => {
      return element.match(/<(.*?)>; rel="next"/)
    });
    return res ? true : false
  }
  */
}

export default CryptoService;
