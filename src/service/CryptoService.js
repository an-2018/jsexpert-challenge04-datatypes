import Crypto from '../entity/Crypto.js';
import CryptoRepository from '../repository/CryptoRepository.js';

class CryptoService {
  constructor({ repository } = {}) {
    this.repository = repository || new CryptoRepository();
  }
  async *list() {
    // TODO: implementar generator que chama a repository fazendo a paginação
    let currentPage = 1
    let pagesLimit = 4
    while(currentPage){
      const result = await this.repository.list(currentPage, pagesLimit)

      if(!result) break
      currentPage++

      for(let item of result){
        yield item
      }
    }
  }
}

export default CryptoService;
