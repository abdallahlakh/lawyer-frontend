import React, {useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import fetchData from './Security/FetchData';
import styled from 'styled-components';

const NavbarContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 3px;
    background-color: #006400;
`;

const NavbarText = styled.div`
    color: white;
    margin-bottom: 20px;
`;

const NavbarLinks = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    color: white;

    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

const StyledLink = styled(Link)`
    display: block;
    padding: 10px 20px;
    color: white;
    transition: background-color 0.2s;
    text-decoration: none;
    background-color: #006400;
    border-radius: 5px;
    text-align: center;
`;

const StyledButton = styled.button`
    display: inline-block;
    padding: 10px 20px;
    color: white;
    background-color: #006400;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    text-align: center;
    transition: background-color 0.2s;
    cursor: pointer;

    @media (max-width: 600px) {
        margin-bottom: 10px;
    }
`;

const ManagementOptions = styled.div`
    position: absolute;
    top: 12px;
    right: 5px;
    background-color: black;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    text-align: left;

    @media (max-width: 600px) {
        position: static;
        box-shadow: none;
    }
`;

// ... (keep your existing component code here)

return (
    <NavbarContainer>
        <NavbarText>
            {userType === 'customer' && <StyledLink to="/my-account">Customer account</StyledLink>}
            {userType === 'lawyer' && <StyledLink to="/my-account">Lawyer account</StyledLink>}
            <StyledButton onClick={handleManagementOptionsClick}>Manage Account</StyledButton>
        </NavbarText>
        <NavbarLinks>
            {userType === 'lawyer' && <StyledLink to="/see-missions">See my missions</StyledLink>}
            {userType === 'customer' && <StyledLink to="/see-bookings">See my bookings</StyledLink>}
            <StyledButton onClick={insertInfo}>Insert My Info</StyledButton>  
            <StyledButton onClick={getInfo}>Get My Info</StyledButton>
            <StyledLink to="/advanced-search">Search For Lawyers</StyledLink>
            <StyledButton onClick={logoutAccount}>Logout</StyledButton>
        </NavbarLinks>
        {showManagementOptions && (
            <ManagementOptions>
                <StyledLink onClick={getAccount}>Get Account</StyledLink>
                <StyledLink to="/delete-account">Delete Account</StyledLink>
                <StyledLink to="/reset-password">Reset Password</StyledLink>
                <StyledLink to="/change-password">Change Password</StyledLink>
            </ManagementOptions>
        )}
    </NavbarContainer>
);