import React from 'react';

const Post = () => {
    return (
        <>
            <article className="post">
                <div className="post__user">
                    <img src="./images/avatar.png" alt="Photo de profil" />
                    <p className='post__content__user-name'>Lionel Van Schellebeck</p>
                </div>
                
                <div className="post__content">
                    <p className="post__content__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Doloribus hic vitae enim nihil tempore tenetur quidem officia minima ea. Eius 
                    repellat, ipsam, aperiam in nihil odit laudantium architecto neque nam quisquam magnam
                    aspernatur eaque libero reprehenderit hic quae labore quidem. Sapiente, quasi dolores
                    sequi suscipit placeat excepturi expedita officiis ex qui saepe deleniti debitis sed 
                    est, veniam quisquam, nemo tenetur odio vero eligendi dolore quae nesciunt fugit. 
                    Libero dolores illum ipsa eum eveniet modi officia vel a corporis cumque eos, optio 
                    id porro veritatis quis possimus numquam dolore, ullam laboriosam. Voluptatum itaque, 
                    atque qui magnam iure aut dolorum fugit laborum!</p>
                    <p className="post__content__date">le 10 Septembre 2022, à 16h40</p>
                </div>
            </article>
        </>
    );
};

export default Post;