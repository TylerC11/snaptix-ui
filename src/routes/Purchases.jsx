import { useEffect, useState } from "react";

export default function Purchases() {
   return (
        <>
            <p><Link to="/">Go home</Link></p>
            <h1>Purchase Page</h1>
            <p>Display Tickets for Sport {id}.</p>

            <h2>Purchase Tickets</h2>
            <p>Comming soon...</p>
            <p>
                <Link to={`/sports/${id}`}>Go Back</Link>
            </p>
        </>
    )
}