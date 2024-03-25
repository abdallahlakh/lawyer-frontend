async function fetchData(navigate, setUserType, setId) {
    try {
        console.log('Fetching data');
        const accessToken = localStorage.getItem('access-token');
        const refreshToken = localStorage.getItem('refresh-token');

        if (accessToken) {
            const validAccessToken = await fetch('http://127.0.0.1:8000/api/auth/jwt/verify/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: accessToken }),
            });

            if(validAccessToken.ok){
                const response = await fetch('http://127.0.0.1:8000/api/auth/users/me/', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'JWT ' + localStorage.getItem('access-token'),
                    },
                });

                if (response.ok || response.status === 200) {
                    console.log('Account retrieved successfully');
                    const data = await response.json();

                    if (data) {
                        if (data.is_lawyer){
                            setUserType('lawyer');      
                        }
                        else if (data.is_customer){
                            setUserType('customer');
                        }
                        setId(data.id);
                        return true;
                    }
                } else {
                    console.error('Failed to retrieve account');
                    return false;
                }
            }

            if (!validAccessToken.ok) {                        
                const refreshAccessToken = await fetch('http://127.0.0.1:8000/api/auth/jwt/refresh/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ refresh : refreshToken }),
                });

                if (refreshAccessToken.ok) {
                    const data = await refreshAccessToken.json();
                    localStorage.setItem('access-token', data.access);
                    return false;
                } else {
                    console.error('JWT token refresh failed');
                    return false;
                }
            }
        } else {
            navigate('/login');
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}
export default fetchData;