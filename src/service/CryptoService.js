import Crypto from '../entity/Crypto.js';
import CryptoRepository from '../repository/CryptoRepository.js';

class CryptoService {
  constructor({ repository } = {}) {
    this.repository = repository || new CryptoRepository();
    this.currentPage = 1
    this.isLast = false
  }
  async *list() {
    // implementar generator que chama a repository fazendo a paginação

    let limit = 5
    while (!this.isLast) {

      const response = await this.repository.list(this.currentPage, limit)
      const data = response.data

      if (this.hasNext(response.headers.link)) {
        this.currentPage++
      } else {
        this.currentPage = 1
      }

      yield data
    }
  }

  hasNext(str) {
    if (!str) return false
    let res = str.split(',').find(element => {
      console.log(element)
      return element.match(/<(.*?)>; rel="next"/)
    });
    return res ? true : false
  }
}

export default CryptoService;
