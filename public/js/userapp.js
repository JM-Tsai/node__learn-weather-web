
console.log('hi user');

fetch('http://localhost:3000/weather?address=Taiwan').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error);
        } else {
            console.log(data.currentLocation);
            console.log(data.forecast);
        }
    })
})

const weatherForm = document.querySelector('form')
const locSearch = document.querySelector('.locSearch')
const resText1 = document.querySelector('.resText1')
const resText2 = document.querySelector('.resText2')
const errorText = document.querySelector('.errorText')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const address = locSearch.value
    // 提交後清除文本
    locSearch.value = ''
    errorText.textContent = ''
    fetch(`/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorText.textContent = data.error
            } else {
                resText1.textContent = data.currentLocation
                resText2.textContent = data.forecast
            }
        })
    })

    if (body.current.precip >= 50) {
        
    }
})