import React from 'react';
import Transfer from './types/Transfer';

function TransferList({ transfers, approveTransfer }: { transfers: Transfer[], approveTransfer: (transferId: string) => any }) {
    return (
        <div>
            <h2>Transfers</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Amount</th>
                        <th>To</th>
                        <th>Approvals</th>
                        <th>Sent</th>
                    </tr>
                </thead>
                <tbody>
                    {transfers.map(transfer => (
                        <tr key={transfer.id}>
                            <th>{transfer.id}</th>
                            <th>{transfer.amount}</th>
                            <th>{transfer.to}</th>
                            <th>
                                {transfer.approvals}
                                <button onClick={() => approveTransfer(transfer.id)}>Approve</button>
                            </th>
                            <th>{transfer.sent ? 'yes' : 'no'}</th>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>

    )
}

export default TransferList