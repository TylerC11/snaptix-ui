import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Details() {
    const { id } = useParams()
    
    return (
        <>
            <p><Link to="/">Go home</Link></p>
            <h1>Details Page</h1>
            <p>Display details for Sport {id}.</p>

            <h2>Details</h2>
            <p>Comming soon...</p>
            <p>
                <Link to={`/purchase`}>Purchase Tickets</Link>
            </p>
        </>
    )
}
