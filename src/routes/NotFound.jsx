import React from 'react';
import { Search, Arrow90degLeft } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

export default function Home() 
{
    return (
        <div className='navbar-light bg-light py-5'>
            <h1 className='text-center'><Search /> 404 Page Not Found</h1>
            <p  className='text-center'>
                We are not able to locate requested page. <strong>404 Not Found</strong>!<br/>
                <Link className='btn btn-sm btn-default my-3' to="/"><Arrow90degLeft /> Back</Link>
            </p>
        </div>
    )
}
