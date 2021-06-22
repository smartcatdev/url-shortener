/**
 * 
 * get the user URL
 * create a random hash
 * check if hash exists
 *      yes
 *          create new hash
 *      no
 *          store hash
 *  return full url to caller         
 * 
 */

export default class urlShortener{

    constructor(url) {
        this.allowedChars = ['a', 'b', 'c', 'd', 'e', 'f', '1', '2', '3', '4', '5']
        this.hashSize = 8
        this.defaultUrl = 'https://tinyurl.com/'
        this.url = url
    }
    
    getShortUrl() {
        return this._createUrl()
    }
    
    _createUrl() {
        // return defaultUrl + getHash()
    
        let hash = this._getHash()
        if (this._hashExists(hash)) {
            this._createUrl()
        }

        this._storeHash(hash)
        return this.defaultUrl + hash
    }
    
    _getHash() {
        let hash = ''
        for (let i = 0; i < this.hashSize; i++) {
            hash += this.allowedChars[Math.floor(Math.random() * this.allowedChars.length)]
        }
    
        return hash
    }
    
    _hashExists(hash) {
        let storedHashes = JSON.parse(localStorage.getItem('stored-hash')) ?? []
        
        if (storedHashes.length !== 0) {
            for (let [storedHash, url] of storedHashes) {
                if (hash == storedHash) {
                    result = true
                }
            }
        } 
        
        return false

    }
    
    _storeHash(hash) {
        let storedHashes = JSON.parse(localStorage.getItem('stored-hash')) ?? []
        storedHashes.push([hash, this.url])
        localStorage.setItem('stored-hash', JSON.stringify(storedHashes))
    }

}
