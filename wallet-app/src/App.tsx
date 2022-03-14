import React from 'react';
import Web3 from 'web3'
import Header from './Header';
import NewTransfer from './NewTransfer';
import TransferList from './TransferList';
import Transfer from './types/Transfer';
import Wallet from './contracts/Wallet.json'
import { Box, Heading, Stack, StackDivider } from '@chakra-ui/react'
import detectEthereumProvider from '@metamask/detect-provider'
import { getKeyValue } from './utils';

function App() {
  const [web3, setWeb3] = React.useState<any>(undefined)
  const [account, setAccount] = React.useState<any>(undefined);
  const [balance, setBalance] = React.useState<any>(undefined)
  const [wallet, setWallet] = React.useState<any>(undefined)
  const [approvers, setApprovers] = React.useState([]);
  const [quorum, setQuorum] = React.useState<undefined | string>(undefined)
  const [transfers, setTransfers] = React.useState<Transfer[]>([]);

  React.useEffect(() => {
    const init = async () => {
      const balance = await getBalance(web3)
      const wallet = await getWallet(web3)
      const approvers = await wallet.methods.getApprovers().call();
      const quorum = await wallet.methods.quorum().call();
      const transfers = await wallet.methods.getTransfers().call();

      setAccount(web3.currentProvider.selectedAddress)
      setBalance(balance)
      setWallet(wallet)
      setApprovers(approvers)
      setQuorum(quorum)
      setTransfers(transfers)
    }
    if (web3 !== undefined) {
      init()
    }
  }, [web3])


  const connectWallet = async () => {
    let provider: any = await detectEthereumProvider();

    if (provider) {
      await provider.request({ method: 'eth_requestAccounts' });
      try {
        const web3 = new Web3(window.ethereum as any);
        setWeb3(web3);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const getWallet = async (web3: any) => {
    const networkId = await web3.eth.net.getId();
    const contractDeployment: any = getKeyValue(Wallet.networks, networkId);
    return new web3.eth.Contract(
      Wallet.abi,
      contractDeployment && contractDeployment.address
    )
  }

  const getBalance = async (web3: any) => {
    const networkId = await web3.eth.net.getId();
    const contractDeployment: any = getKeyValue(Wallet.networks, networkId);
    return web3.eth.getBalance(contractDeployment.address)
  }

  const createTransfer = async (transfer: { amount: string; to: string; }) => {
    await wallet.methods
      .createTransfer(transfer.amount, transfer.to)
      .send({ from: account })


    const transfers = await wallet.methods.getTransfers().call();
    setTransfers(transfers)
  }

  const approveTransfer = async (transferId: string) => {
    await wallet.methods
      .approveTransfer(transferId)
      .send({ from: account })


    const transfers = await wallet.methods.getTransfers().call();
    setTransfers(transfers)
  }


  return (
    <Box w="100%" bg="black" minH="100vh" px={12}>
      <Heading pt={16} as='h1' size='2xl' color='white' fontWeight="bold" textAlign="center">
        Multisignature wallet
      </Heading>
      <Stack mt={16} spacing={8} direction={{ base: 'column', lg: 'row' }}>
        <Stack
          divider={<StackDivider borderColor='gray.200' />}
          spacing={8}>
          <Header balance={balance} approvers={approvers} quorum={quorum} connectWallet={connectWallet} />
          <NewTransfer createTransfer={createTransfer} enabled={web3 !== undefined} />
        </Stack>
        <TransferList transfers={transfers} account={account} approveTransfer={approveTransfer} />
      </Stack>
      <Heading py={16} as='h1' size='lg' color='white' fontWeight="bold" textAlign="center">
        Made by aren-pulid0
      </Heading>
    </Box>
  );


}

export default App;
