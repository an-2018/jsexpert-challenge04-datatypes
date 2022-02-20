import Crypto from '../entity/Crypto.js';
import CryptoRepository from '../repository/CryptoRepository.js';

class CryptoService {
  constructor({ repository } = {}) {
    this.repository = repository || new CryptoRepository();
  }
  async *list() {
    // implementar generator que chama a repository fazendo a paginação
    let isLast = false
    let currentPage = 1
    let pageLimit = 5
    while (!isLast) {
      const response = await this.repository.list(currentPage, pageLimit)

      const data = response.data
      
      const [first, nexturl, lasturl] = response.headers.link.split(',')
      currentPage = this.extractNumber(nexturl)
      let lastPage = this.extractNumber(lasturl)
      
      isLast = currentPage === lastPage
      
      yield data
    }
  }

  extractNumber(str) {
    /* link: '
            <http://localhost:3001/crypto?_page=1&_limit=5>; rel="first", 
            <http://localhost:3001/crypto?_page=2&_limit=5>; rel="next", 
            <http://localhost:3001/crypto?_page=1000&_limit=5>; rel="last"',
    */
    return Number(str.match(/_page=?\d*/)[0].split('=')?.[1])
  }

}

export default CryptoService;
