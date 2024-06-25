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
    alert('Cambios guardados');
    
    var accountSection = document.querySelector('.account-section');
    var personalInfoFormSection = document.getElementById('personal-info-form-section');

    personalInfoFormSection.classList.add('hidden');
    accountSection.classList.remove('hidden');
});
