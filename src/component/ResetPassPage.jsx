import React, { useState } from 'react';
import { Button, Form, FormControl, FormLabel, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function ResetPassPage() {
    const { token } = useParams()

    const initialResetState = {
        password: '',
    };
    const [data, setData] = useState(initialResetState);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const updateBtn = async (event) => {
        event.preventDefault();

        try {
            const response = await axios({
                method: "post",
                url: `https://server-blpu.onrender.com/reset-password/${token}`,
                data: data,
                headers: {
                    "Content-type": "application/json"
                }
            });
            if (response) {
                navigate('/login');
                toast.success("Password updated successfully");
            }
        } catch (error) {
            console.log("🚀 ~ updateBtn ~ error:", error)
        }
    }

    return (
        <div className="sub-manu-wrap" style={{ position: "absolute", top: "25%", right: "35%", width: "350px" }}>
            <div className="sub-manu" style={{ background: "#f5f6f7", padding: "20px", borderRadius: "5%" }}>
                <Modal.Header>
                    <div className="signup" style={{ display: "flex", alignItems: "center", paddingLeft: "80px" }}>
                        <h5 style={{ fontWeight: "500" }}>Reset Password</h5>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={updateBtn}>
                        <FormLabel>New Password</FormLabel>
                        <FormControl
                            type="password"
                            name="password"
                            placeholder="Enter new password"
                            onChange={handleInputChange}
                        />
                        <Button type="submit" variant="dark" style={{ width: "100%", marginTop: "20px" }}>
                            Update
                        </Button>
                    </Form>
                </Modal.Body>
                {errorMessage && <div className="message" style={{ color: 'green', marginTop: '10px' }}>{errorMessage}</div>}
            </div>
        </div>
    )
}

export default ResetPassPage;
