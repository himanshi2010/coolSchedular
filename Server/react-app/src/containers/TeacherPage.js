import React from 'react'
import { getUser, removeUserSession } from '../Utils/Common'

function TeacherPage ()  {
    const handleLogout = () => {
        removeUserSession();
        this.history.push('/');
        window.location.reload();
      }
    

        const user = getUser();

        return (
            <div>
                Welcome {user} !<br /><br />
                <input type="button" onClick={handleLogout} value="Logout" />
            </div>
        )
    
}

export default TeacherPage
