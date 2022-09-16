import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'


const Post = () => {
    return (
        <>
            <article className="post">
                <div className="post__user">
                    <img src="./images/avatar.png" alt="profil" />
                    <p className='post__user__user-surname'>Lionel</p>
                    <p className='post__user__user-name'>Van S</p>
                </div>
                
                <div className="post__container">
                        <h3> Mon super Article </h3>
                    <div className="post__container__content">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Doloribus hic vitae enim nihil tempore tenetur quidem officia minima ea. Eius 
                        repellat, ipsam, aperiam in nihil odit laudantium architecto neque nam quisquam magnam
                        aspernatur eaque libero reprehenderit hic quae labore quidem. Sapiente, quasi dolores
                        sequi suscipit placeat excepturi expedita officiis ex qui saepe deleniti debitis sed 
                        est, veniam quisquam, nemo tenetur odio vero eligendi dolore quae nesciunt fugit. 
                        Libero dolores illum ipsa eum eveniet modi officia vel a corporis cumque eos, optio 
                        id porro veritatis quis possimus numquam dolore, ullam laboriosam. Voluptatum itaque, 
                        atque qui magnam iure aut dolorum fugit laborum!</p>
                        <img src="https://picsum.photos/200/300" alt="post"></img>
                    </div>
    
                    <div className="post__container__like">
                        <FontAwesomeIcon icon= {  faThumbsUp } size="2x"  className="like icon" />
                        <FontAwesomeIcon icon= {  faThumbsDown } size="2x" className="dislike icon" />
                    </div>

                    <div className="post__container__data">
                        <p>le 10 Septembre 2022, à 16h40</p>
                        <div className="post__container__data__edit">
                            <FontAwesomeIcon icon= {  faPenToSquare } size="2x"  className="icon edit" />
                            <FontAwesomeIcon icon= {  faTrashCan } size="2x"  className="icon delete" />
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
};

export default Post;