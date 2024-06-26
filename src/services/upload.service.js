export const uploadService = {
  uploadImg,
  addImg
}
async function uploadImg(ev) {
  const CLOUD_NAME = 'drlt4yjnj'
  const UPLOAD_PRESET = 'o6wcnjwc'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  try {
    const formData = new FormData()
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('file', ev.target.files[0])

    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData
    })
    const imgUrl = await res.json()
    return imgUrl
  } catch (err) {
    console.error('Failed to upload', err)
    throw err
  }
}

async function addImg(ev) {
  const CLOUD_NAME = 'drlt4yjnj'
  const UPLOAD_PRESET = 'o6wcnjwc'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  try {
    const formData = new FormData()
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('file', ev.target.files[0])

    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData
    })

    const { url } = await res.json()
    const imgElement = document.querySelector('.Addimg')
    imgElement.src = url
  } catch (err) {
    console.error(err)
  }
}
