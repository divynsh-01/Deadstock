import { Step, Stepper, StepLabel } from '@mui/material';
import React from 'react';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import "./CheckoutSteps.css"

const CheckoutSteps = ({ activeStep }) => {
    const steps = [
        {
            label: "Shipping Details",
            icon: <LocalShippingIcon />
        },
        {
            label: "Confirm Order",
            icon: <LibraryAddCheckIcon />
        },
        {
            label: "Payment",
            icon: <AccountBalanceIcon />
        },
    ];

    return (
        <Stepper className='mmm' activeStep={activeStep} alternativeLabel>
            {steps.map((step, index) => (
                <Step key={index} active={activeStep === index ? true : false}
                    completed={activeStep >= index ? true : false}>
                    <StepLabel StepIconComponent={() => step.icon}
                        style={{color: activeStep>= index ? "#007bff" : 'black'}}>
                        {step.label}
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    );
};

export default CheckoutSteps;
