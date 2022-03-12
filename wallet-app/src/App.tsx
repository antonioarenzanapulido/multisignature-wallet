import React from 'react';
import Header from './Header';
import NewTransfer from './NewTransfer';
import TransferList from './TransferList';
import Transfer from './types/Transfer';
import { getWeb3, getWallet } from './utils'

function App() {
  const [web3, setWeb3] = React.useState<any>(undefined)
  const [accounts, setAccounts] = React.useState<any>(undefined)
  const [wallet, setWallet] = React.useState<any>(undefined)
  const [approvers, setApprovers] = React.useState([]);
  const [quorum, setQuorum] = React.useState<undefined | string>(undefined)
  const [transfers, setTransfers] = React.useState<Transfer[]>([]);

  React.useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3()
      const accounts = await web3.eth.getAccounts()
      const wallet = await getWallet(web3)
      const approvers = await wallet.methods.getApprovers().call();
      const quorum = await wallet.methods.quorum().call();
      const transfers = await wallet.methods.getTransfers().call();

      setWeb3(web3)
      setAccounts(accounts)
      setWallet(wallet)
      setApprovers(approvers)
      setQuorum(quorum)
      setTransfers(transfers)
    }
    init()
  }, [])

  const createTransfer = (transfer: { amount: string; to: string; }) => {
    wallet.methods
      .createTransfer(transfer.amount, transfer.to)
      .send({from: accounts[0]})
  }

  const approveTransfer = (transferId: string) => {
    wallet.methods
      .approveTransfer(transferId)
      .send({from: accounts[0]})
  }

  if(
    web3 === 'undefined'
    || typeof accounts === 'undefined'
    || typeof wallet === 'undefined'
    || typeof quorum === 'undefined'
  ) {
      return <div>Loading</div>
  }
 
  return (
    <div >
        <Header approvers={approvers} quorum={quorum} />
        <NewTransfer createTransfer={createTransfer}/>
        <TransferList transfers={transfers} approveTransfer={approveTransfer}/>
    </div>
  );
  
  
}

export default App;
