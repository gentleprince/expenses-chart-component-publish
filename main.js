const total = document.querySelector('#total');
const this_month = document.querySelector('#para1');
const percent = document.querySelector('#para2');

//calling api & chart.js
getData();

async function getData() {
    // url
    const url = 'https://expenses-chartjs.netlify.app/data.json'
    // fetch option
    const headers_option = {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    }
    // fetch call
    const response = await fetch(url, headers_option);
    const data = await response.json();
    // length of Json object gotten from api
    let length = data.length - 1;
    // Arrays to contain values from the data gotten
    let labels = [];
    let values = [];
    // push data into the arrays
    for (i = 0; i < length; i++) {
        labels.push(data[i].day);
        values.push(data[i].amount);
    }
    // Account status data from api
    const monthly_total = data[7].account[0].mtotal;
    const pincrease = data[7].account[1].percent_increase;
    const balance = data[7].account[2].balance;
    // Display content on html page
    total.innerHTML = `$${balance}`;
    percent.innerHTML = `+${pincrease}%`;
    this_month.innerHTML = `$${monthly_total}`;
    // bgcolor function
    const sortedData = values.slice().sort((a, b) => a - b);
    const backgroundColors = values.map(v => sortedData.indexOf(v) >= values.length - 1 ? 'hsl(186, 34%, 60%)' : 'hsl(10, 79%, 65%)');
    // hoverbgcolor function
    const hoversortedData = values.slice().sort((a, b) => a - b);
    const hoverbackgroundColors = values.map(v => hoversortedData.indexOf(v) >= values.length - 1 ? 'hsl(186, 34%, 85%)' : 'hsl(10, 79%, 75%)');
    // pointer
    function handleHover(e) {
        e.native.target.style.cursor = 'pointer';
    }

    function leaveHover(e) {
        e.native.target.style.cursor = 'default';
    }
    // chart.js
    var ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: backgroundColors,
                hoverBackgroundColor: hoverbackgroundColors,
                borderRadius: 5,
                borderWidth: 1,
                borderSkipped: false
            }]
        },
        options: {
            plugins: {
                tooltip: {
                    displayColors: false,
                    yAlign: 'bottom',
                    xAlign: 'center',
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';

                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(context.parsed.y);
                            }
                            return label;
                        },
                        title: function (context) {
                            context == null;
                        }
                    }
                },
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Spending - Last 7 days',
                    fontSize: 20,
                    padding: {
                        top: 20,
                        bottom: 30
                    },
                    color: '#000'
                }
            },
            scales: {
                yAxis: {
                    display: false
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            onHover: handleHover,
            onLeave: leaveHover
        }
    });
}
