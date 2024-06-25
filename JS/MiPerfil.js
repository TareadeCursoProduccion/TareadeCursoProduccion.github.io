document.getElementById('personal-info-btn').addEventListener('click', function() {
    var accountSection = document.querySelector('.account-section');
    var personalInfoSection = document.getElementById('personal-info');
    if (personalInfoSection.classList.contains('hidden')) {
        personalInfoSection.classList.remove('hidden');
        accountSection.classList.add('hidden');
    } else {
        personalInfoSection.classList.add('hidden');
    }
});

let form = document.getElementById('personal-info-form');
form.querySelector('#first-name').value = localStorage.getItem('nombreUser');
form.querySelector('#last-name').value = localStorage.getItem('apellidosUser');
form.querySelector('#username').value = localStorage.getItem('currentUser');
form.querySelector('#password').value = localStorage.getItem('currentPassword');
form.querySelector('#phoneNumber').value = localStorage.getItem('currentPhone');

document.getElementById('nombreUsuario').innerHTML = localStorage.getItem('nombreUser') + " " +localStorage.getItem('apellidosUser');
document.getElementById('correoUsuario').innerHTML = localStorage.getItem('emailUser');
localStorage.getItem('apellidosUser');
const email = document.getElementById('emailgris');
email.innerHTML = localStorage.getItem('emailUser');


document.getElementById('personal-data-btn').addEventListener('click', function() {
    var personalInfoSection = document.getElementById('personal-info');
    var personalInfoFormSection = document.getElementById('personal-info-form-section');

    personalInfoSection.classList.add('hidden');
    personalInfoFormSection.classList.remove('hidden');
});

document.getElementById('back-to-account').addEventListener('click', function() {
    var accountSection = document.querySelector('.account-section');
    var personalInfoSection = document.getElementById('personal-info');

    personalInfoSection.classList.add('hidden');
    accountSection.classList.remove('hidden');
});

document.getElementById('back-to-personal-info').addEventListener('click', function() {
    var personalInfoSection = document.getElementById('personal-info');
    var personalInfoFormSection = document.getElementById('personal-info-form-section');

    personalInfoFormSection.classList.add('hidden');
    personalInfoSection.classList.remove('hidden');
});

document.getElementById('personal-info-form').addEventListener('submit', function(event) {
    event.preventDefault();

    localStorage.setItem('nombreUser',form.querySelector('#first-name').value); 
    localStorage.setItem('apellidosUser', form.querySelector('#last-name').value); 
    localStorage.setItem('currentUser', form.querySelector('#username').value); 
    localStorage.setItem('currentPassword', form.querySelector('#password').value); 
    localStorage.setItem('currentPhone', form.querySelector('#phoneNumber').value); 
    

    alert('Cambios guardados');
    window.location.reload(true); 
    var accountSection = document.querySelector('.account-section');
    var personalInfoFormSection = document.getElementById('personal-info-form-section');

    i
    personalInfoFormSection.classList.add('hidden');
    accountSection.classList.remove('hidden');
});
