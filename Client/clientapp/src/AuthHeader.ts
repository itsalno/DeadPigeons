export default function addAuthHeaders() {
    const token = localStorage.getItem('token')
    return {
        Authorization: token ? `Bearer ${token}` : '',
    };
}