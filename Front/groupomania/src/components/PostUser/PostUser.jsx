import React from 'react'

const PostUser = ({ postUsers }) => {
   return (
      <div className="user-container">
         <div className="user-container__user">
            <img
               src={postUsers.picture}
               alt="profil"
               className="user-container__id-pic"
            />
            <div className="user-container__identity">
               <p className="user-container__surname">{postUsers.surname}</p>
               <p className="user-container__name">{postUsers.name}</p>
            </div>
         </div>
      </div>
   )
}

export default PostUser
