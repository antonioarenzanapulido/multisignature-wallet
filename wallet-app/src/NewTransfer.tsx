import React from 'react';

function NewTransfer({createTransfer} : {createTransfer: Function}) {
    const [transfer, setTransfer] = React.useState({})

    const updateTransfer = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const value =  e.target.value
        setTransfer({...transfer, [field]: value})
    }

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createTransfer(transfer)
    }

    return (
        <header>
            <h2>Create transfer</h2>
            <form onSubmit={(e) => submit(e)}>
                <label htmlFor="amount">To</label>
                <input
                    id="to"
                    type="text"
                    onChange={(e) => updateTransfer(e, 'to')}
                />
                <label htmlFor="amount">Amount</label>
                <input
                    id="amount"
                    type="text"
                    onChange={(e) => updateTransfer(e, 'amount')}
                />
                <button>Submit</button>
            </form>
        </header>
    )
}

export default NewTransfer