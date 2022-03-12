interface Transfer {
    id: string,
    amount: string,
    to: string,
    approvals: string[]
    sent: boolean
}

export default Transfer