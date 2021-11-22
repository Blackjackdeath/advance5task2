let arr;
async function init() {
    try {
        const response = await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
        const data = await response.json();
        document.querySelectorAll('.buyCell')[0].textContent = data[0].sale;
        document.querySelectorAll('.buyCell')[1].textContent = data[1].sale;
        document.querySelectorAll('.buyCell')[2].textContent = data[2].sale;
        document.querySelectorAll('.saleCell')[0].textContent = data[0].buy;
        document.querySelectorAll('.saleCell')[1].textContent = data[1].buy;
        document.querySelectorAll('.saleCell')[2].textContent = data[2].buy;
        arr=data;
    } catch (error) {
        return console.log(error);
    };
};

function change() {
    if (document.getElementById('typeMoney').textContent !=='Українська гривня'){
        document.getElementById('typeMoney').textContent = this.value;
    }
    else{
        document.getElementById('uaType').textContent = this.value;
    }
    document.getElementById('buy').value=0;
    document.getElementById('sell').value=0;
};
function convert() {
    if(document.getElementById('typeMoney').textContent !=='Українська гривня'){
        switch (document.getElementById('typeMoney').textContent) {
            case 'USD':
                 document.getElementById('buy').value=Math.round((document.getElementById('sell').value/parseFloat(arr[0].sale))*100)/100;
                break;
            case 'EUR':
                document.getElementById('buy').value=Math.round((document.getElementById('sell').value/parseFloat(arr[1].sale))*100)/100;
                break;
            case 'RUB':
                document.getElementById('buy').value=Math.round((document.getElementById('sell').value/parseFloat(arr[2].sale))*100)/100;
                break;
        };
    }
    else{
        switch (document.getElementById('uaType').textContent) {
            case 'USD':
                 document.getElementById('buy').value=Math.round((document.getElementById('sell').value*parseFloat(arr[0].buy))*100)/100;
                break;
            case 'EUR':
                document.getElementById('buy').value=Math.round((document.getElementById('sell').value*parseFloat(arr[1].buy))*100)/100;
                break;
            case 'RUB':
                document.getElementById('buy').value=Math.round((document.getElementById('sell').value*parseFloat(arr[2].buy))*100)/100;
                break;
        };
    }
    
};
function changeOperation(){
    let c=document.getElementById('typeMoney').textContent;
    document.getElementById('typeMoney').textContent=document.getElementById('uaType').textContent;
    document.getElementById('uaType').textContent=c;
    document.getElementById('buy').value=0;
    document.getElementById('sell').value=0;
}
init();
document.getElementsByTagName('button')[0].addEventListener('click', changeOperation);
document.getElementsByTagName('button')[1].addEventListener('click', convert);
document.getElementById('dollar').addEventListener('click', change);
document.getElementById('euro').addEventListener('click', change);
document.getElementById('rub').addEventListener('click', change);