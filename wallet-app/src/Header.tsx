import React from 'react';

function Header({ approvers, quorum }: { approvers: string[], quorum: string }) {
    return (
        <header>
            <ul>
                <li>Approvers: {approvers.join(', ')}</li>
                <li>Quorum: {quorum}</li>
            </ul>
        </header>
    )
}

export default Header