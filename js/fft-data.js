var fft_json = {
  type: "line",
  data: {
    labels: [1, 2, 3, 4, 5],
    datasets: [
      {
        data: [0, 0, 0, 0, 0],
        borderWidth: 2,
        borderColor: "rgba(0,0,255,0.4)",
        strokeColor: "rgba(0,0,255,1)",
        backgroundColor: "rgba(0,191,255,0.5)",
        fill: false
      }
    ]
  },
  options: {
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: "frequency (THz)",
            fontsize: 18
          }
        }
      ],
      yAxes: [
        {
          type: "logarithmic",
          ticks: {
            beginAtZero: false
          },
          scaleLabel: {
            display: true,
            labelString: "Intensity (mV)",
            fontsize: 18
          }
        }
      ]
    },
    responsive: true,
    elements: {
      point: {
        radius: 1
      }
    }
  }
};