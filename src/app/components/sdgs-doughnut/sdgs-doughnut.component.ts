import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-sdgs-doughnut',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sdgs-doughnut.component.html',
  styleUrl: './sdgs-doughnut.component.css'
})
export class SdgsDoughnutComponent {

  @ViewChild('doughnutCanvas') doughnutCanvas!: ElementRef;

  ngAfterViewInit(): void {
    const context = this.doughnutCanvas.nativeElement.getContext('2d');

    Chart.defaults.font.family = 'Poppins';
    Chart.defaults.font.size = 10;
    const data = {
     
      labels: [
        'No Poverty', 'Zero Hunger', 'Good Health and Well-Being', 'Quality Education', 'Gender Equality',
        'Clean Water and Sanitation', 'Affordable and Clean Energy', 'Decent Work and Economic Growth',
        'Industry, Innovation, and Infrastructure', 'Reduced Inequalities', 'Sustainable Cities and Communities',
        'Responsible Consumption and Production', 'Climate Action', 'Life Below Water', 'Life on Land',
        'Peace, Justice, and Strong Institutions', 'Partnerships for the Goals'
      ],
      datasets: [{
        label: "my fuck",
        data: this.getMockData(), // Call the method to generate mock data
        backgroundColor: ['#eb1c2dff', '#d3a029ff', '#279b48ff',
        '#c31f33ff', '#ef402bff', '#00aed9ff', '#fdb713ff', '#8f1838ff',
        '#f36d25ff', '#e11484ff', '#f99d26ff', '#cf8d2aff', '#48773eff',
        '#007dbcff', '#5dbb46ff', '#02558bff', '#183668ff'
      
        ],
      }],
      hoverOffset: 4,

    };

    const image = new Image();
    image.src = '/assets/images/forkfam_logo_mini.png';

    const imagePlugin = {
      id: 'customBackgroundImage',
      beforeDraw: (chart: Chart) => {
        if(image.complete) {
          const ctx = chart.ctx;
          const {top, left, width, height} = chart.chartArea;
          const x = left + width / 2 - image.width / 2;
          const y = top + height / 2 - image.height / 2;
          ctx.drawImage(image, x, y);
        } else {
          image.onload = () => chart.draw();
        }
      }


    }

    const chart = new Chart(context, {
      type: 'doughnut',
      data: data,
      plugins: [imagePlugin],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
           display: false,
          },
          title: {
            display: true,
            text: 'forkfam supports the Sustainable Development Goals',
            fullSize: false,
            position: 'top',
            align: 'end',
            padding: {
              top: 10,
              bottom: 30
            },
            font: {
              size: 24
            }
          },
          subtitle: {
            display: false,
          }
        },
        layout: {
        },
        
      },
    });
  }

  private getMockData(): number[] {
    // Generate random data for each label (you can adjust this logic based on your requirements)
    const mockData: number[] = [];
    for (let i = 0; i < 17; i++) {
      mockData.push(100); // Adjust the range of random values as needed
    }
    return mockData;
  }


}
