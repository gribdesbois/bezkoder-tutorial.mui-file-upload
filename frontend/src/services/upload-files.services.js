import http from './../http-common'

class UploadFilesService {
  upload(files, onUploadProgress) {
    const token = sessionStorage.getItem('Auth Token')
    let formData = new FormData()

    formData.append('file', file)

    return http.post('/images', formData, {
      headers : {
        'Content-Type' : 'multipart/form-data',
        'Authorization' : `Bearer ${token}`
      },
      onUploadProgress,
    })
  }

  getFiles() {
    return http.get('files')
  }
}

export default new UploadFilesService()