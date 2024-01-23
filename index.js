const form = document.querySelector('#formContact');
const tbody = document.querySelector('tbody');
const inputName = document.querySelector('#nameContact');
const inputNumber = document.querySelector('#numberContact');

inputNumber.addEventListener('input', (e) => {
    let cursorPos = e.target.selectionStart
    let formatInput = autoFormatPhoneNumber(e.target.value);
    e.target.value = formatInput;
    let isBackSpace = (e?.data == null) ? true : false;
    let nextCusPos = nextDigit(formatInput, cursorPos, isBackSpace);
    inputNumber.setSelectionRange(nextCusPos+1, nextCusPos+1);
})

function autoFormatPhoneNumber(value) {
    let phoneNumberString = value
    let cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    let match = cleaned.match(/^(\d{0,2})?(\d{0,5})?(\d{0,4})?/)
    return [match[1] ? '(' : '',
            match[1],
            match[2] ? ')' : '',
            match[2],
            match[3] ? '-' : '',
            match[3]].join('')
}

function nextDigit(input, cursorPos, isBackSpace){
    if(isBackSpace){
        for (let i = cursorPos-1; i>0; i--){
            if(/\d/.test(input[i])){
                return i;
            }else{
                for (let i = cursorPos-1; i < input.length; i++){
                    if(/\d/.test(input[i])){
                        return i;
                    }
                }
            }
        }
    }
    return cursorPos;
}

function addRow(){
    const tr = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = inputName.value;
    tr.appendChild(nameCell);

    const numberCell = document.createElement('td');
    const numberLinkCell = document.createElement('a');
    numberLinkCell.href = `tel:${inputNumber.value}`;
    numberLinkCell.textContent = inputNumber.value;
    numberCell.appendChild(numberLinkCell);
    tr.appendChild(numberCell);

    tbody.appendChild(tr);
}

function clearForm(){
    inputName.value = '';
    inputNumber.value = '';
}

function duplicateValues(){
    const phoneNumberLinks = tbody.querySelectorAll('a[href^="tel:"]');
    const phoneNumberValues = Array.from(phoneNumberLinks).map(link => link.textContent.replace(/\D/g, ''));
    const inputNumberValuesCleaned = inputNumber.value.replace(/\D/g, '');
    if(phoneNumberValues.includes(inputNumberValuesCleaned)){
        alert(`Número: ${inputNumber.value} já cadastrado!`);
    }else{
        addRow();
        clearForm();
    }
};

form.addEventListener('submit', (e) => {
    duplicateValues();
    e.preventDefault();
})