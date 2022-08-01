import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const errorAlert = (message, lang) => {
  if (lang === 'sa')
    MySwal.fire({
      icon: 'error',
      title: 'خطأ',
      text: 'جدث خطأ في العملية',
    });
  else
    MySwal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message || 'Something went wrong!',
    });
};
export const warningAlert = (message, lang) => {
  if (lang === 'sa')
    MySwal.fire({
      // title: 'wrong',
      icon: 'warning',
      text: 'تنبيه.....!',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });
  else
    MySwal.fire({
      // title: 'wrong',
      icon: 'warning',
      text: message,
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });
};

export const successAlert = (lang) => {
  if (lang === 'sa')
    MySwal.fire({
      position: 'center',
      icon: 'success',
      title: 'العملية تمت بنجاح',
      showConfirmButton: false,
      timer: 1500,
    });
  else
    MySwal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500,
    });
};
export const confirmAlert = (id, lang) => {
  if (lang === 'sa')
    Swal.fire({
      title: 'هل انت متأكد',
      text: 'لن تتمكن من التراجع عن هذا!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'لا',
      confirmButtonText: 'نعم',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
      }
    });
  else
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
      }
    });
};
export const confirmAlert2 = (
  id,
  Action,
  msg = 'In order to proceed this change we need to reset, do want to continue?',
  lang = 'en'
) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success mx-1',
      cancelButton: 'btn btn-danger mx-1',
    },
    buttonsStyling: false,
  });
  return new Promise((resolve, reject) => {
    if (lang === 'sa') {
      swalWithBootstrapButtons
        .fire({
          title: 'هل انت متأكد ؟',
          text: 'لن تتمكن من التراجع عن هذا!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'نعم',
          cancelButtonText: 'لا',
          // reverseButtons: true
        })
        .then((result) => {
          if (result.isConfirmed) {
            if (Action) Action(id);
            resolve(true);
          }
          // else reject(false)
        })
        .catch(() => {
          reject(false);
        });
    } else {
      swalWithBootstrapButtons
        .fire({
          title: 'Are you sure?',
          text: msg,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          // reverseButtons: true
        })
        .then((result) => {
          if (result.isConfirmed) {
            if (Action) Action(id);
            resolve(true);
          }
          // else reject(false)
        })
        .catch(() => {
          reject(false);
        });
    }
  });
};
