export const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
  
    if (!token) return null;
  
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); 
      return payload.id || payload.userId; 
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  