import React from 'react'

const UserData = ({ user, mobile, tablet }) => {
   // RENDER
   return (
      <div className="current-user">
         <div className="current-user__user">
            <img
               src={user.picture}
               alt="profil"
               className="current-user__id-pic"
            />
            {mobile || tablet ? (
               ''
            ) : (
               <div className="current-user__identity">
                  <p className="current-user__surname">{user.surname}</p>
               </div>
            )}
         </div>
      </div>
   )
}

export default UserData
