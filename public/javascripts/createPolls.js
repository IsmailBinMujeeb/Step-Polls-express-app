let addOption = document.getElementById('addOption');
let pollOptions = document.getElementById('poll-options');

console.log(pollOptions)

addOption.addEventListener('click', ()=>{

    const option = document.createElement('input');

    option.type = 'text';
    option.name = 'options'
    option.placeholder = 'New Option';
    option.required = true;
    
    const div = document.createElement('div').appendChild(option);

    div.className = 'option-input'

    pollOptions.appendChild(div);

})