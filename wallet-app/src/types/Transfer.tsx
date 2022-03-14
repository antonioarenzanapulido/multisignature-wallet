interface Transfer {
    id: string,
    amount: string,
    to: string,
    approvals: string[]
    sent: boolean
    approvers: string[]
}

export default Transfer