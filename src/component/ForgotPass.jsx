import React, { Fragment, useEffect, useState } from 'react';
import { Button, Form, FormControl, FormLabel, Image, Modal } from 'react-bootstrap';
import success from '../component/images/success.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function ForgotPassPage() {
    const initialForgotState = {
        email: '',
    };
    const [data, setData] = useState(initialForgotState);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const sendBtn = async (event) => {
        event.preventDefault();

        try {
            const response = await axios({
                method: "post",
                url: `http://localhost:4000/forgot-password`,
                data: data,
                headers: {
                    "Content-type": "application/json"
                }
            });
            if (response && response.data.message === "Password reset email sent") {
                toast.success("Password reset email sent. Please check your email.");
            }
        } catch (error) {
        }
    };

    return (
        <div className="sub-manu-wrap" style={{ position: "absolute", top: "25%", right: "35%", width: "350px" }}>
            <div className="sub-manu" style={{ background: "#f5f6f7", padding: "20px", borderRadius: "5%" }}>
                <Modal.Header>
                    <div className="signup" style={{ display: "flex", alignItems: "center", paddingLeft: "80px" }}>
                        <h5 style={{ fontWeight: "500" }}>Forgot Password</h5>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={sendBtn}>
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={handleInputChange}
                        />
                        <Button type="submit" variant="dark" style={{ width: "100%", marginTop: "20px" }}>
                            Send
                        </Button>
                    </Form>
                </Modal.Body>
            </div>
        </div>
    )
}

export default ForgotPassPage;