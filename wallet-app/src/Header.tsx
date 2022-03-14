
import React from 'react';
import { Box, Text } from '@chakra-ui/layout';
import { Button, ListItem, UnorderedList } from '@chakra-ui/react';

function Header({ balance, approvers, quorum, connectWallet }
    : { balance: string | undefined, approvers: string[], quorum: string | undefined, connectWallet: Function}) {

    return (
        <Box p={4} borderWidth='1px' borderRadius='lg' bg="white">
            <Text mt={4} fontSize='xl'>Contract balance: {balance}</Text>
            <Text mt={4} fontSize='xl'>Approvers</Text>
            <UnorderedList mt={2}>
                {
                    approvers.map((approver,index) => (
                        <ListItem key={index}>{approver}</ListItem>
                    ))
                }
            </UnorderedList>
            <Text mt={4} fontSize='xl'>Quorum: {quorum}</Text>
            <Button colorScheme='teal' mt={4} onClick={() => connectWallet()}>
              Connect wallet
            </Button>
        </Box>
    )
}

export default Header