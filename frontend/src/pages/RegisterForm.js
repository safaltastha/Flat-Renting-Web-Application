import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const validationSchema = Yup.object().shape({
    email: Yup.string()
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[\W_]/, 'Password must contain at least one special character')
        .required('Password is required'),
    role: Yup.string()
        .oneOf(['tenant', 'landlord', 'vehicle supplier'], 'Invalid role')
        .required('Role is required')
});


const RegisterForm = () => {
  const navigate = useNavigate();
    const handleSubmit = async (values, { setSubmitting,resetForm }) => {
        try {
            const response = await axios.post('http://localhost:3001/auth/register', values);
            
            resetForm();
            navigate('/login');
        } catch (error) {
            alert('Failed to register user: ' + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <Formik
                initialValues={{ email: '', password: '', role: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="email">Email</label>
                            <Field type="email" name="email" />
                            <ErrorMessage name="email" component="div" className="error" />
                        </div>

                        <div>
                            <label htmlFor="password">Password</label>
                            <Field type="password" name="password" />
                            <ErrorMessage name="password" component="div" className="error" />
                        </div>

                        <div>
                            <label htmlFor="role">Role</label>
                            <Field as="select" name="role">
                                <option value="" label="Select role" />
                                <option value="tenant" label="Tenant" />
                                <option value="landlord" label="Landlord" />
                                <option value="vehicle supplier" label="Vehicle Supplier" />
                            </Field>
                            <ErrorMessage name="role" component="div" className="error" />
                        </div>

                        <div>
                            <button type="submit" disabled={isSubmitting}>
                                Register
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegisterForm;
