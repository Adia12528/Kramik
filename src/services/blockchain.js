import Web3 from 'web3'
import KramikAuthABI from '../contracts/KramikAuth.json'

class BlockchainService {
  constructor() {
    this.web3 = null
    this.contract = null
    this.currentAccount = null
    this.contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
  }

  async connectWallet() {
    if (window.ethereum) {
      try {
        this.web3 = new Web3(window.ethereum)
        
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        
        // Get accounts
        const accounts = await this.web3.eth.getAccounts()
        this.currentAccount = accounts[0]
        
        // Initialize contract
        this.initializeContract()
        
        // Listen for account changes
        window.ethereum.on('accountsChanged', (accounts) => {
          this.currentAccount = accounts[0] || null
          if (accounts.length === 0) {
            console.log('Please connect to MetaMask.')
          }
        })
        
        // Listen for chain changes
        window.ethereum.on('chainChanged', (chainId) => {
          window.location.reload()
        })
        
        return this.currentAccount
      } catch (error) {
        throw new Error('Wallet connection failed: ' + error.message)
      }
    } else {
      throw new Error('Please install MetaMask!')
    }
  }

  initializeContract() {
    if (!this.web3 || !this.contractAddress) return

    this.contract = new this.web3.eth.Contract(
      KramikAuthABI.abi,
      this.contractAddress
    )
  }

  async signMessage(message) {
    if (!this.web3 || !this.currentAccount) {
      throw new Error('Wallet not connected')
    }

    try {
      const signature = await this.web3.eth.personal.sign(
        Web3.utils.fromUtf8(message),
        this.currentAccount,
        '' // No password needed for MetaMask
      )
      return signature
    } catch (error) {
      throw new Error('Message signing failed: ' + error.message)
    }
  }

  async verifyStudentRegistration(studentData) {
    if (!this.contract || !this.currentAccount) {
      throw new Error('Contract not initialized')
    }

    try {
      // Create student hash from data
      const studentHash = this.web3.utils.sha3(
        JSON.stringify({
          email: studentData.email,
          enrollmentId: studentData.enrollmentId,
          name: studentData.name,
          timestamp: Date.now()
        })
      )

      const transaction = await this.contract.methods
        .registerStudent(studentHash, this.currentAccount)
        .send({ 
          from: this.currentAccount,
          gas: 300000 
        })

      return transaction
    } catch (error) {
      throw new Error('Blockchain registration failed: ' + error.message)
    }
  }

  async getStudentRecord(studentAddress) {
    if (!this.contract) {
      throw new Error('Contract not initialized')
    }

    try {
      return await this.contract.methods
        .getStudentRecord(studentAddress)
        .call()
    } catch (error) {
      throw new Error('Failed to get student record: ' + error.message)
    }
  }

  async verifyStudent(studentAddress) {
    if (!this.contract) {
      throw new Error('Contract not initialized')
    }

    try {
      return await this.contract.methods
        .verifyStudent(studentAddress)
        .call()
    } catch (error) {
      throw new Error('Verification failed: ' + error.message)
    }
  }

  async getContractStats() {
    if (!this.contract) {
      throw new Error('Contract not initialized')
    }

    try {
      const studentCount = await this.contract.methods.studentCount().call()
      const adminCount = await this.contract.methods.adminCount().call()
      const owner = await this.contract.methods.owner().call()

      return {
        studentCount: parseInt(studentCount),
        adminCount: parseInt(adminCount),
        owner
      }
    } catch (error) {
      throw new Error('Failed to get contract stats: ' + error.message)
    }
  }

  // Utility method to format address
  formatAddress(address) {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  // Check if connected to correct network
  async checkNetwork() {
    if (!this.web3) return false

    const chainId = await this.web3.eth.getChainId()
    const targetChainId = import.meta.env.VITE_BLOCKCHAIN_NETWORK === 'sepolia' ? 11155111 : 1

    return chainId === targetChainId
  }
}

export default new BlockchainService()