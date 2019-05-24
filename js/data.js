var json = {
            type: 'line',
            data: {
                labels: [
        1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31
                ],
                datasets: [{
                    //label: '支出',
                    data: [
        312,312,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
                    ],
                    borderWidth: 2,
                    strokeColor: 'rgba(0,0,255,1)',
                    backgroundColor: 'rgba(0,191,255,0.5)',
                    fill: false
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero:true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'position (mm)',
                            fontsize: 18
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Intensity',
                            fontsize: 18
                        }
                    }]
                },
                responsive: true
            }
        }
        