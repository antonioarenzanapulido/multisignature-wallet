import { Box, Table, TableCaption, Td, Text, Th, Thead, Tr, Tbody, Button } from '@chakra-ui/react';
import React from 'react';
import Transfer from './types/Transfer';

function TransferList({ transfers, account, approveTransfer }
    : { transfers: Transfer[], account: string, approveTransfer: (transferId: string) => any }) {
    return (
        <Box p={4} flex={1} maxW={'100%'} bg="white" borderWidth='1px'
        borderRadius='lg'>
            <Text fontSize='xl'>Transfer List</Text>
            <Table mt={4}>

                <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Amount</Th>
                        <Th>To</Th>
                        <Th>Approvals</Th>
                        <Th>Sent</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {transfers.map(transfer => (
                        <Tr key={transfer.id}>
                            <Td>{transfer.id}</Td>
                            <Td>{transfer.amount}</Td>
                            <Td>{transfer.to}</Td>
                            <Td justifyContent="space-between">
                                {transfer.approvals}
                                {
                                    transfer.approvers.find(approver => approver.toLowerCase() === account) === undefined ?
                                    <Button ml={4} colorScheme='teal' onClick={() => approveTransfer(transfer.id)}>Approve</Button>
                                    :
                                    null
                                } 
                                
                            </Td>
                            <Td>{transfer.sent ? 'yes' : 'no'}</Td>
                        </Tr>
                    ))}

                </Tbody>
            </Table>
        </Box>

    )
}

export default TransferList