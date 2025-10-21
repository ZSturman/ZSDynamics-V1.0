/* median */
/* bj */
var bj_median_before_current = [445, 385, 346, 450, 382, 603, 527]
var bj_median_after_current = [365, 316, 284, 369, 309, 494, 432]
var bj_median_diff_after_current = [80, 69, 62, 81, 73, 109, 95]
/* craps */
var craps_median_before_curent = [274, 125, 155, 203, 95, 236, 298]
var craps_median_after_current = [474, 325, 355, 403, 295, 436, 498]
var craps_median_diff_after_current = [200, 200, 200, 200, 200, 200, 200]

/* Bad week */
/* bj */
var bj_bad_week_before_current = [122, 167, 100, 123, 197, 152, 84]
var bj_bad_week_after_grad = [114, 154, 95, 115, 177, 140, 80]
var bj_bad_week_deduct_grad = [7, 13, 5, 8, 20, 12, 4]
var bj_bad_week_perc_deduct = [.06, .08, .05, .06, .1, .08, .04]
var bj_bad_week_after_current = [100, 136, 82, 100, 161, 124, 68]
var bj_bad_week_deduct_current = [22, 31, 18, 23, 36, 28, 16]

/* craps */
var craps_bad_week_before_current = [126, 193, 114, 176, 159, 84, 86]
var craps_bad_week_after_current = [326, 393, 314, 376, 359, 284, 286]

/* Good Week */
/* bj  */
var bj_good_week_before_current = [1100, 1264, 1096, 1167, 769, 1038, 945]
var bj_good_week_deduct_grad = [190, 206, 190, 197, 138, 184, 170]
var bj_good_week_after_grad = [910, 1058, 906, 970, 631, 854, 775]

var bj_good_week_after_crrent = [902, 1036, 899, 957, 631, 851, 775]
var bj_good_week_deduct_current = [198, 228, 197, 210, 138, 187, 170]

/* craps */
var data_craps_good_week_before = [1258, 1475, 859, 1213, 1229, 890, 700]
var data_craps_good_week_after = [1458, 1675, 1059, 1413, 1429, 1090, 900]




days_of_week = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']

bj_bar_color_one = ['rgba(131, 148, 159, 1)']
bj_bar_color_two = ['rgba(131, 148, 159, 0.4)']
bj_bar_color_three = ['rgba(185, 192, 197, 1)']
bj_bar_color_four = ['rgba(226, 235, 243, 1)']
bj_bar_color_dark = ['rgba(99, 99, 99, 1)']

craps_bar_color_one = ['rgba(184, 208, 225, 1)']
craps_bar_color_two = ['rgba(184, 208, 225, 0.4)']

border_width = 1







var ch1_data = {
    labels: days_of_week,
    datasets: [{
            label: 'Blackjack',
            data: bj_median_before_current,
            backgroundColor: bj_bar_color_one,
            borderColor: 'transparent',
            borderWidth: border_width,
            borderRadius: 10
        },
        {
            label: 'Craps',
            data: craps_median_before_curent,
            backgroundColor: craps_bar_color_one,
            borderColor: 'transparent',
            borderWidth: border_width,
            borderRadius: 10

        }
    ]
}


const ctx1 = document.getElementById('slide_ch1').getContext('2d');
const cht1 = new Chart(ctx1, {
    type: 'bar',
    data: ch1_data,
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    callback: function(value){
                        return '$' + value;
                    },
                    beginAtZero: true
                }
            }]
        },
        plugins: {
            title: {
                display: true,
                text: 'Blackjack Dealer vs. Craps Dealer Meadian Daily Toke Boxes',
                position: 'top'
            },
            legend: {
                position: 'bottom',
                align: 'center',
                display: true,
            },
            tooltip: {
                callbacks:{
                    title: function(tooltipItem) {
                        var ds_index = tooltipItem[0].datasetIndex
                        if (ds_index === 0){
                            return "Blackjack"
                        } else if (ds_index === 1){
                            return "Craps"
                        }
                    },
                    label: function(tooltipItem){
                        var raw = tooltipItem.raw
                        return "$" + raw
                    }
                },
            },
        },
        layout: {
            padding: {
                top: 0
            },
        },

    }
});


var ch2_data = {
    labels: days_of_week,
    datasets: [{
            label: 'Blackjack After Deduction',
            data: bj_median_after_current,
            backgroundColor: bj_bar_color_one,
            borderColor: 'transparent',
            borderSkipped: false,
            borderWidth: border_width,
            stack: 'Stack 0',
        },
        {
            label: 'Blackjack Before Deduction',
            data: bj_median_diff_after_current,
            backgroundColor: bj_bar_color_two,
            borderColor: 'transparent',
            borderRadius: {
                topLeft: 10,
                topRight: 10,
            },
            borderSkipped: false,
            borderWidth: border_width,
            stack: 'Stack 0',
        },
        {
            label: 'Craps Before Deduction',
            data: craps_median_before_curent,
            backgroundColor: craps_bar_color_one,
            borderColor: 'transparent',
            borderSkipped: false,
            borderWidth: border_width,
            stack: 'Stack 1',

        },
        {
            label: 'Craps After Deduction',
            data: craps_median_diff_after_current,
            backgroundColor: craps_bar_color_two,
            borderColor: 'transparent',
            borderRadius: {
                topLeft: 10,
                topRight: 10,
            },
            borderWidth: border_width,
            borderSkipped: false,
            stack: 'Stack 1',

        },


    ]
}

const ctx2 = document.getElementById('slide_ch2').getContext('2d');
const cht2 = new Chart(ctx2, {
    type: 'bar',
    data: ch2_data,
    options: {
        plugins:{
            title: {
                display: true,
                text: 'Blackjack Dealer vs. Craps Dealer Toke Boxes After Redistribution',
                position: 'top'
            },
            legend: {
                position: 'bottom',
                align: 'center',
                display: true,
            },
            tooltip: {
                callbacks:{
                    title: function(tooltipItem) {
                        var ds_index = tooltipItem[0].datasetIndex
                        if (ds_index === 0){
                            return "BJ: After Deduc."
                        } else if (ds_index === 1){
                            return "BJ: Before Deduc."
                        } else if(ds_index === 2){
                            return "Craps: Before Add."
                        } else if (ds_index === 3){
                            return "Craps: After Add."
                        }
                    },
                    label: function(tooltipItem){
                        var d_index = tooltipItem.dataIndex
                        var ds_index = tooltipItem.datasetIndex
                        var raw = tooltipItem.raw

                        if (ds_index === 0){
                            return "$" + raw
                        } else if (ds_index === 1){
                            var total = Math.round(raw/.18)
                            return "$" + total 
                        } else if(ds_index === 2){
                            return "$" + raw
                        } else if (ds_index === 3){
                            var x = craps_median_before_curent[d_index]
                            var total = Math.round(raw + x)
                            return "$" + total
                        }
                    }
                },
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: [{
                stacked: true
            }]
        }
    }
});


var bj_cr_bad_week_b4_current = {
    labels: days_of_week,
    datasets: [{
            label: 'Blackjack',
            data: bj_bad_week_before_current,
            backgroundColor: bj_bar_color_one,
            borderColor: 'transparent',
            borderWidth: border_width,
            borderRadius: 10
        },
        {
            label: 'Craps',
            data: craps_bad_week_before_current,
            backgroundColor: craps_bar_color_one,
            borderColor: 'transparent',
            borderWidth: border_width,
            borderRadius: 10

        }
    ]
}

const ctx3 = document.getElementById('bad_week_ch1').getContext('2d');
const cht3 = new Chart(ctx3, {
    type: 'bar',
    data: bj_cr_bad_week_b4_current,
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Bad Week For Tips: Blackjack Dealer vs. Craps Dealer',
                position: 'top'
            },
            legend: {
                position: 'bottom',
                align: 'center',
                display: true,
            },
            tooltip: {
                callbacks:{
                    title: function(tooltipItem) {
                        var ds_index = tooltipItem[0].datasetIndex
                        if (ds_index === 0){
                            return "Blackjack"
                        } else if (ds_index === 1){
                            return "Craps"
                        }
                    },
                    label: function(tooltipItem){
                        var raw = tooltipItem.raw
                        return "$" + raw
                    }
                },
            },
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});


var bj_cr_bad_week_after_current = {
    labels: days_of_week,
    datasets: [{
            label: 'Blackjack',
            data: bj_bad_week_after_current,
            backgroundColor: bj_bar_color_one,
            borderColor: 'transparent',
            borderWidth: border_width,
            borderRadius: 10
        },
        {
            label: 'Craps',
            data: craps_bad_week_after_current,
            backgroundColor: craps_bar_color_one,
            borderColor: 'transparent',
            borderWidth: border_width,
            borderRadius: 10

        },
    ],
}

const ctx4 = document.getElementById('bad_week_ch2').getContext('2d');
const cht4 = new Chart(ctx4, {
    type: 'bar',
    data: bj_cr_bad_week_after_current,
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Bad Week For Tips: Blackjack Dealer vs. Craps Dealer',
                position: 'top'
            },
            legend: {
                position: 'bottom',
                align: 'center',
                display: true,
            },
            tooltip: {
                callbacks:{
                    title: function(tooltipItem) {
                        var ds_index = tooltipItem[0].datasetIndex
                        if (ds_index === 0){
                            return "Blackjack"
                        } else if (ds_index === 1){
                            return "Craps"
                        }
                    },
                    label: function(tooltipItem){
                        var raw = tooltipItem.raw
                        return "$" + raw
                    }
                },
            },
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});





var data2 = {
    labels: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400],
    datasets: [{
        label: 'Percentage',
        data: [0, .05, .1, .15, .18, .18, .18, .18, .18, .18, .1, .1, .1, .1, .1],
        showLine: true,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0
    }]
};



const ctx5 = document.getElementById('slide_5').getContext('2d');
const stackedLine = new Chart(ctx5, {
    type: 'line',
    data: data2,
    options: {
        scales: {
            y: {
                ticks: {
                    min: 0,
                    max: 1500,
                    stepSize: 100
                }
            },
            x: {
                display: true,
                ticks: {
                    min: 0,
                    max: 0.2,
                    stepSize: .005, 
                }
            }
        },
        elements: {
            point: {
                radius: 0
            }
        }
    }
});


var bj_18_v_grad_bad_week = {
    labels: days_of_week,
    datasets: [{
            label: 'Blackjack Tips',
            data: bj_bad_week_before_current,
            backgroundColor: bj_bar_color_four,
            borderColor: bj_bar_color_dark,
            borderWidth: border_width,
            borderRadius: 10
        },
        {
            label: 'Old System',
            data: bj_bad_week_after_current,
            backgroundColor: bj_bar_color_three,
            borderColor: 'transparent',
            borderWidth: border_width,
            borderRadius: 10
        },
        {
            label: 'New System',
            data: bj_bad_week_after_grad,
            backgroundColor: bj_bar_color_one,
            borderColor: 'transparent',
            borderWidth: border_width,
            borderRadius: 10
        }
    ]
}

const ctx6 = document.getElementById('bad_week_old_v_new').getContext('2d');
const cht6 = new Chart(ctx6, {
    type: 'bar',
    data: bj_18_v_grad_bad_week,
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Blackjack Dealer Tips: Old System vs. New System',
                position: 'top'
            },
            legend: {
                position: 'bottom',
                align: 'center',
                display: true,
            },
            tooltip: {
                callbacks:{
                    title: function(tooltipItem) {
                        var ds_index = tooltipItem[0].datasetIndex
                        if (ds_index === 0){
                            return "Tips Before Deduction"
                        } else if (ds_index === 1){
                            return "Tips After 18%"
                        } else if (ds_index === 2){
                            return "Tips After New System"
                        }
                    },
                    label: function(tooltipItem){
                        var raw = tooltipItem.raw
                        return "$" + raw
                    }
                },
            },
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});



var bj_craps_goodweek = {
    labels: days_of_week,
    datasets: [{
            label: 'Blackjack',
            data: bj_good_week_before_current,
            backgroundColor: bj_bar_color_one,
            borderColor: 'transparent',
            borderWidth: border_width
        },
        {
            label: 'Craps',
            data: data_craps_good_week_before,
            backgroundColor: craps_bar_color_one,
            borderColor: 'transparent',
            borderWidth: border_width

        }
    ]
}


const ctx7 = document.getElementById('bj_craps_goodweek_ch1').getContext('2d');
const cht7 = new Chart(ctx7, {
    type: 'bar',
    data: bj_craps_goodweek,
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});


var bj_craps_goodweek_ch2 = {
    labels: days_of_week,
    datasets: [{
            label: 'Blackjack After',
            data: bj_good_week_after_crrent,
            backgroundColor: bj_bar_color_two,
            borderColor: 'transparent',
            borderWidth: border_width,
            stack: 'Stack 0',
        },
        {
            label: 'Deduction -',
            data: bj_good_week_deduct_current,
            backgroundColor: bj_bar_color_one,
            borderColor: 'transparent',
            borderWidth: border_width,
            stack: 'Stack 0',
        },
        {
            label: 'Craps before',
            data: data_craps_good_week_before,
            backgroundColor: craps_bar_color_two,
            borderColor: 'transparent',
            borderWidth: border_width,
            stack: 'Stack 1',

        },
        {
            label: 'Addition + ',
            data: craps_median_diff_after_current,
            backgroundColor: craps_bar_color_one,
            borderColor: 'transparent',
            borderWidth: border_width,
            stack: 'Stack 1',

        },


    ]
}

const ctx8 = document.getElementById('bj_craps_goodweek_ch2').getContext('2d');
const cht8 = new Chart(ctx8, {
    type: 'bar',
    data: bj_craps_goodweek_ch2,
    options: {
        interaction: {
            intersect: true,
        },
        scales: {
            x: {
                stacked: true,
            },
            y: [{
                stacked: true
            }]
        }
    }
});


var bj_18_v_grad_good_week = {
    labels: days_of_week,
    datasets: [{
            label: 'Blackjack Tips',
            data: bj_good_week_before_current,
            backgroundColor: bj_bar_color_one,
            borderColor: 'transparent',
            borderWidth: border_width
        },
        {
            label: 'After 18%',
            data: bj_good_week_after_crrent,
            backgroundColor: craps_bar_color_one,
            borderColor: 'transparent',
            borderWidth: border_width
        },
        {
            label: 'After Sliding Scale',
            data: bj_good_week_after_grad,
            backgroundColor: craps_bar_color_one,
            borderColor: 'transparent',
            borderWidth: border_width
        }
    ]
}

const ctx9 = document.getElementById('bj_goodweek_old_v_new').getContext('2d');
const cht9 = new Chart(ctx9, {
    type: 'bar',
    data: bj_18_v_grad_good_week,
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});



