import http from '../http-common'

class UploadFilesService {
  upload = (file, onUploadProgress) => {
    /* const token = sessionStorage.getItem('Auth Token') */
    const formData = new FormData()

    formData.append('file', file)

    return http.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        /* Authorization: `Bearer ${token}`, */
      },
      onUploadProgress,
    })
  }

  getFiles = () => http.get('files')
}

export default new UploadFilesService()
