import React, { Fragment, useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import success from '../component/images/success.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EmailVerify() {
    const [validUrl, setValidUrl] = useState(false);
    const { id, token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `https://server-blpu.onrender.com/${id}/verify/${token}`;
                const { data } = await axios.get(url);
                console.log(data);
                setValidUrl(true);
            } catch (error) {
                console.log(error);
                setValidUrl(false);
            }
        }
        verifyEmailUrl()
    }, [])

    const submit = () => {
        navigate('/login');
    }

    return (
        <Fragment>
            {validUrl ? (
                <div style={{ marginLeft: "400px" }}>
                    <Image style={{ height: "200px", marginLeft: "130px" }} src={success}></Image>
                    <h1 style={{ marginLeft: "40px" }}>Email verified successfully</h1>
                    <Link to='/login'>
                        <Button onClick={submit} style={{ marginLeft: "160px", marginTop: "20px", width: "150px", height: "30px" }}>Login</Button>
                    </Link>
                </div>
            ) : (
                <h1>404 Not Found</h1>
            )}
        </Fragment>
    )
}

export default EmailVerify;
