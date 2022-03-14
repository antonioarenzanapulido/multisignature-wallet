import React from 'react';
import { Button, FormControl, FormLabel, Input, Text, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Box } from '@chakra-ui/react'

function NewTransfer({ createTransfer, enabled }: { createTransfer: Function, enabled: boolean }) {
    const [transfer, setTransfer] = React.useState({ to: '', amount: '' })

    const updateTransfer = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const value = e.target.value
        setTransfer({ ...transfer, [field]: value })
    }

    const submit = () => {
        createTransfer(transfer)
    }

    return (
        <Box  p={4}
        borderWidth='1px'
        borderRadius='lg' bg="white">
            <Text fontSize='xl'>Create transfer</Text>
            <Box as="form">

                <FormLabel mt={4} htmlFor='address'>Address</FormLabel>
                <Input 
                    id='address' 
                    placeholder='KETH address'
                    onChange={(e) => updateTransfer(e, 'to')}
                />

                <FormLabel mt={4} htmlFor='amount'>Amount</FormLabel>
                <NumberInput>
                    <NumberInputField
                        id='amount'
                        placeholder='Amount to send'
                        onChange={(e) => updateTransfer(e, 'amount')} 
                    />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>


                <Button mt={4} colorScheme='teal' size='md' isDisabled={!enabled} onClick={() => submit()}>
                    Button
                </Button>
            </Box>
        </Box>
    )
}

export default NewTransfer