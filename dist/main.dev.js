"use strict";

var total = document.querySelector('#total');
var this_month = document.querySelector('#para1');
var percent = document.querySelector('#para2'); //calling api & chart.js

getData();

function getData() {
  var url, headers_option, response, data, length, labels, values, monthly_total, pincrease, balance, sortedData, backgroundColors, hoversortedData, hoverbackgroundColors, handleHover, leaveHover, ctx, myChart;
  return regeneratorRuntime.async(function getData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          leaveHover = function _ref2(e) {
            e["native"].target.style.cursor = 'default';
          };

          handleHover = function _ref(e) {
            e["native"].target.style.cursor = 'pointer';
          };

          // url
          url = 'http://127.0.0.1:5500/project%20202/expenses-chart-component-main/data.json'; // fetch option

          headers_option = {
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          }; // fetch call

          _context.next = 6;
          return regeneratorRuntime.awrap(fetch(url, headers_option));

        case 6:
          response = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(response.json());

        case 9:
          data = _context.sent;
          // length of Json object gotten from api
          length = data.length - 1; // Arrays to contain values from the data gotten

          labels = [];
          values = []; // push data into the arrays

          for (i = 0; i < length; i++) {
            labels.push(data[i].day);
            values.push(data[i].amount);
          } // Account status data from api


          monthly_total = data[7].account[0].mtotal;
          pincrease = data[7].account[1].percent_increase;
          balance = data[7].account[2].balance; // Display content on html page

          total.innerHTML = "$".concat(balance);
          percent.innerHTML = "+".concat(pincrease, "%");
          this_month.innerHTML = "$".concat(monthly_total); // bgcolor function

          sortedData = values.slice().sort(function (a, b) {
            return a - b;
          });
          backgroundColors = values.map(function (v) {
            return sortedData.indexOf(v) >= values.length - 1 ? 'hsl(186, 34%, 60%)' : 'hsl(10, 79%, 65%)';
          }); // hoverbgcolor function

          hoversortedData = values.slice().sort(function (a, b) {
            return a - b;
          });
          hoverbackgroundColors = values.map(function (v) {
            return hoversortedData.indexOf(v) >= values.length - 1 ? 'hsl(186, 34%, 85%)' : 'hsl(10, 79%, 75%)';
          }); // pointer

          // chart.js
          ctx = document.getElementById('myChart').getContext('2d');
          myChart = new Chart(ctx, {
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
                    label: function label(context) {
                      var label = context.dataset.label || '';

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
                    title: function title(context) {
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

        case 26:
        case "end":
          return _context.stop();
      }
    }
  });
}