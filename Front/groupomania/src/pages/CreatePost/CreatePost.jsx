import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ErrorConnexion from '../ErrorConnexion/ErrorConnexion'
import formData from 'form-data'

const CreatePost = () => {
  // UseEffect pour savoir si un utilisateur est connecté
  const [userIsLog, setUserIsLog] = useState(false)

  useEffect(() => {
    const user = sessionStorage.getItem('user')
    if (user) {
      setUserIsLog(true)
    } else {
      setUserIsLog(false)
    }
  }, [])

  async function handleData(e) {
    e.preventDefault()

    const text = document.querySelector('.add-post-form__text').value
    const picture = document.querySelector('.add-post-form__picture').files[0]

    console.log(picture.name)

    let userId = sessionStorage.getItem('user')
    userId = userId && JSON.parse(userId)

    const form = new formData()
    form.append('text', text)
    form.append('file', picture)

    try {
      await axios({
        method: 'post',
        url: 'http://localhost:3001/createPost',
        headers: {
          Authorization: userId.token,
        },
        data: form,
      })
    } catch (err) {
      console.log(err)
    }
  }

  // RENDER
  return (
    <>
      {userIsLog ? (
        <main id="main-create-post">
          <h1>Créez un post</h1>
          <form id="form" className="add-post-form" method="POST">
            <label>
              <textarea
                type="text"
                className="add-post-form__text"
                placeholder="Tapez votre message ici"
                required
              />
            </label>
            <label>
              <input
                type="file"
                name="file"
                accept=".jpg, .jpeg, .png"
                id="file"
                className="add-post-form__picture"
                required
              />
            </label>
            <button
              type="submit"
              className="btn"
              onClick={(e) => handleData(e)}
            >
              Poster
            </button>
          </form>
        </main>
      ) : (
        <ErrorConnexion />
      )}
    </>
  )
}

export default CreatePost
