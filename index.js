const nextButton = document.getElementById('next');
const inputFields = document.getElementsByTagName('input');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const phoneError = document.getElementById('phone-error');
const personalInfoStep = document.getElementById('personal-info');
const planStep = document.getElementById('select-plan');
const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const four = document.getElementById('four');

nextButton.addEventListener('click', (event) => {
    event.preventDefault(); 
    validateForm();
});


function validateForm() {
    let isValid = true;

    // Loop through all input fields and validate them
    for (let i = 0; i < inputFields.length; i++) {
        const input = inputFields[i];
        const value = input.value.trim(); 

        // Check if the input is empty
        if (value === '') {
            isValid = false; 
            if (input.type === 'text') {
                nameError.style.display = 'block';
                break;
            } else if (input.type === 'email') {
                emailError.style.display = 'block';
                break;
            } else if(input.type === 'tel') {
                phoneError.style.display = 'block';
                break;
            }
        } else {
            // Hide error messages for valid inputs
            if (input.type === 'text') {
                nameError.style.display = 'none';
            } else if (input.type === 'email') {
                emailError.style.display = 'none';
            } else if(input.type === 'tel') {
                phoneError.style.display = 'none';
            }
        }
    }

    // If the form is valid, proceed to the next step
    if (isValid) {
        selectPlan();
    }
}

function selectPlan() {
    personalInfoStep.style.display = 'none';
    one.classList.remove('active');
    two.classList.add('active');
    planStep.style.display = 'block';
}

function addOns() {
    planStep.style.display = 'none';
    two.classList.remove('active');
    three.classList.add('active');
    document.getElementById('add-on').style.display = 'block';
}

function summary() {
    document.getElementById('add-on').style.display = 'none';
    three.classList.remove('active');
    four.classList.add('active');
    document.getElementById('summary').style.display = 'block';
}


document.getElementById('plan-back').addEventListener('click', (event) => {
    event.preventDefault();
    personalInfoStep.style.display = 'block';
    one.classList.add('active');
    two.classList.remove('active');
    planStep.style.display = 'none';
});


document.getElementById('plan-next').addEventListener('click', (event) => {
    event.preventDefault();
    addOns();
});

document.getElementById('add-back').addEventListener('click', (event) => {
    event.preventDefault();
    planStep.style.display = 'block';
    two.classList.add('active');
    three.classList.remove('active');
    document.getElementById('add-on').style.display = 'none';
});

document.getElementById('add-next').addEventListener('click', (event) => {
    event.preventDefault();
    summary();
});

document.getElementById('confirm-back').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('add-on').style.display = 'block';
    three.classList.add('active');
    four.classList.remove('active');
    document.getElementById('summary').style.display = 'none';
});