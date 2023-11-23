import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, TooltipItem } from 'chart.js/auto';
import { Subscription } from 'rxjs';
import { SdgService } from 'app/services/sdg.service';

@Component({
  selector: 'app-sdgs-doughnut',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sdgs-doughnut.component.html',
  styleUrl: './sdgs-doughnut.component.css'
})
export class SdgsDoughnutComponent {

  @ViewChild('doughnutCanvas') doughnutCanvas!: ElementRef;

  chart: Chart<'doughnut'> | null = null;
  lastHidden: number | undefined;

  icons: HTMLImageElement[] = this.createSDGSIconsArray();
  private createSDGSIconsArray() : HTMLImageElement[] {
    const iconBasePath = '/assets/images/sdgs/E-WEB-Goal-'
    const array = [];

    for (let i = 1; i <= 17; i++) {
      // Use String literal and padStart to achieve the '01', '02', ..., '17' format
      const filename: string = `${iconBasePath}${i.toString().padStart(2, '0')}.png`;
      const image = new Image(140, 140);
      image.src = filename;
      array.push(image);
    }
    return array;
  }
  
  private subscription: Subscription | undefined;

  constructor(private sdgService: SdgService) {}

  ngOnInit() {
    this.subscription = this.sdgService.selectedGoal$.subscribe((selectedGoal) => {
      this.hideOrShowData(selectedGoal);
    });
  }

  hideOrShowData(index: number) {
    if(this.chart === null) {
      console.log('Chart is null!');
      return;
    }
    if(this.lastHidden === undefined) {
      console.log('last is undefined, so hide:', index);
      this.lastHidden = index;
      this.chart.hide(0, index);
    } else {
      console.log('last is not undefined');
      if(this.lastHidden === index) {
        console.log('last is the same')
        this.chart.show(0, index);
        this.lastHidden = undefined;
      } else {
        this.chart.show(0, this.lastHidden);
        this.chart.hide(0, index);
        this.lastHidden = index;

      }
    }
  }

  ngAfterViewInit(): void {
    const context = this.doughnutCanvas.nativeElement.getContext('2d');

    Chart.defaults.font.family = 'Poppins';
    Chart.defaults.font.size = 24;
    const data = {
     
      labels: this.sdgService.sgdIconLabels,
      datasets: [{
        data: this.getMockData(), // Call the method to generate mock data
        backgroundColor: this.sdgService.sdgIconColors,
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

    const getOrCreateTooltip = (chart: Chart) => {
      let tooltipEl = chart.canvas.parentNode!.querySelector('div');

      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
        tooltipEl.style.borderRadius = '3px';
        tooltipEl.style.color = 'white';
        tooltipEl.style.opacity = '1';
        tooltipEl.style.pointerEvents = 'none';
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.transform = 'translate(-50%, 0)';
        tooltipEl.style.transition = 'all .1s ease';
        
    
        const table = document.createElement('table');
        table.style.margin = '0px';
    
        tooltipEl.appendChild(table);
        chart.canvas.parentNode!.appendChild(tooltipEl);
      }
    
      return tooltipEl;
    };

    const externalTooltipHandler = (context: any) => {
      // Tooltip Element
      const {chart, tooltip} = context;
      const tooltipEl = getOrCreateTooltip(chart);
    
      // Hide if no tooltip
      if (tooltip.opacity === '0') {
        tooltipEl.style.opacity = '0';
        return;
      }
    
      // Set Text
      if (tooltip.body) {
        const titleLines = tooltip.title || [];
        const bodyLines = tooltip.body.map((b: { lines: any; }) => b.lines);
    
        const tableHead = document.createElement('thead');
    
        titleLines.forEach((title: string) => {
          const tr = document.createElement('tr');
          tr.style.borderWidth = '0';
    
          const th = document.createElement('th');
          th.style.borderWidth = '0';
          const text = document.createTextNode(title);
    
          th.appendChild(text);
          tr.appendChild(th);
          tableHead.appendChild(tr);
        });
    
        const tableBody = document.createElement('tbody');
        bodyLines.forEach((body: string, i: number) => {
          const colors = tooltip.labelColors[i];
    
          const span = document.createElement('span');
          span.style.background = colors.backgroundColor;
          span.style.borderColor = colors.borderColor;
          span.style.borderWidth = '2px';
          span.style.marginRight = '10px';
          span.style.height = '10px';
          span.style.width = '10px';
          span.style.display = 'inline-block';
    
          const tr = document.createElement('tr');
          tr.style.backgroundColor = 'inherit';
          tr.style.borderWidth = '0';
    
          const td = document.createElement('td');
          td.style.borderWidth = '0';
    
          const text = document.createTextNode(body);
    
          td.appendChild(span);
          td.appendChild(text);
          tr.appendChild(td);
          tableBody.appendChild(tr);
        });
    
        const tableRoot = tooltipEl.querySelector('table')!;
    
        // Remove old children
        while (tableRoot.firstChild) {
          tableRoot.firstChild.remove();
        }
    
        // Add new children
        tableRoot.appendChild(tableHead);
        tableRoot.appendChild(tableBody);
      }
    
      const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
    
      // Display, position, and set styles for font
      tooltipEl.style.opacity = '1';
      tooltipEl.style.left = positionX + tooltip.caretX + 'px';
      tooltipEl.style.top = positionY + tooltip.caretY + 'px';
      tooltipEl.style.font = tooltip.options.bodyFont.string;
      tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
    };

    this.chart = new Chart(context, {
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
            text: 'What are the Sustainable Development Goals?',
            fullSize: true,
            position: 'top',
            align: 'center',
            font: {
              size: 18,
            }
          },
          subtitle: {
            display: false,
          },
          tooltip: {
            enabled: true,
            usePointStyle: true,
            titleFont: {
              size: 16,
            },
            titleMarginBottom: 64,
            bodyFont: {
              size: 48,
            },
            bodyAlign: 'right',
            padding: 52,
            footerMarginTop: 64,
            footerFont: {
              size: 18,
            },
            callbacks: {
                beforeTitle: (context: TooltipItem<'doughnut'>[]) => {
                  
                  return 'forkfam is committed to'
                },
                // title: function(context) {
                //   return '';
                // },

                // afterTitle: function(context) {
                //   return '';
                // },

                // beforeBody: function(context) {
                //   return ''
                    
                // },
                // beforeLabel: (context: TooltipItem<'doughnut'>) => {
                  
                //   return ''
                // },
                label: (context: TooltipItem<'doughnut'>) => {
                  
                  return 'goal ' + (context.dataIndex + 1)
                },

                afterBody: function(context) {
                  return '';
                },

                beforeFooter: function(context) {
                  return '';
                },

                footer: (context : TooltipItem<'doughnut'>[]) => {
                  const raw = this.sdgService.sdgIconDescriptions[context[0].dataIndex];
                  if(raw.length > 35) {
                    return this.splitString(raw);
                  }
                  return raw;
                },

                afterFooter: (context : TooltipItem<'doughnut'>[]) => {
                  // const raw = this.iconDescriptions[context[0].dataIndex];
                  // if(raw.length > 35) {
                  //   return this.splitString(raw);
                  // }
                  // return raw;
                },
            
                labelPointStyle: (context) => {
                  return {
                    pointStyle: this.sdgService.sdgIconImages[context.dataIndex],
                    rotation: 0,
                  };

                },
                // labelColor: function(context) {
                //   return {
                //       borderColor: 'rgb(0, 0, 255)',
                //       backgroundColor: 'rgb(255, 0, 0)',
                //       borderWidth: 2,
                //       borderDash: [2, 2],
                //       borderRadius: 2,
                //   };
                // },
                labelTextColor: function(context) {
                    return 'rgba(69, 71, 69, 0.47)';
                }
              }
          },
        },
        
        
      },
    });
  }


  ngOnDestroy() {
    // Make sure to unsubscribe to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


 
  private splitString(input: string): string[] {
    const words = input.split(' ');
    const result: string[] = [];
    let currentSubstring = '';

    for (const word of words) {
        if ((currentSubstring + word).length <= 32) {
            currentSubstring += (currentSubstring === '' ? '' : ' ') + word;
        } else {
            result.push(currentSubstring);
            currentSubstring = word;
        }
    }

    if (currentSubstring !== '') {
        result.push(currentSubstring);
    }

    return result;
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
