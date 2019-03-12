import swal from 'sweetalert2'

const helper = {
  swall (type, errorCode = '', msg = '', callback, confirmation = false) {
    const swallOption = {}
    swallOption.title = (type === 'danger') ? 'Terjadi Kesalahan' : 'Perhatian'
    swallOption.text = errorCode ? `[${errorCode}] ${msg}` : msg
    swallOption.type = type

    if (confirmation) {
      swallOption.showCancelButton = true
      swallOption.confirmButtonText = 'Ya'
      swallOption.cancelButtonText = 'Batal'
      swallOption.showCloseButton = true
      swallOption.showLoaderOnConfirm = true
    }

    swal.fire(swallOption).then(result => {
      if (result.value) {
        if (callback) callback()
      }
    })
  }
}

export default helper 
