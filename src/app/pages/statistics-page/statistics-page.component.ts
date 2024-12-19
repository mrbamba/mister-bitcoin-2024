import { DatePipe } from '@angular/common';
import { Component, Input, input, OnInit } from '@angular/core';
import type { EChartsCoreOption } from 'echarts/core';

@Component({
  selector: 'statistics-page',
  standalone: false,
  
  templateUrl: './statistics-page.component.html',
  styleUrl: './statistics-page.component.scss'
})
export class StatisticsPageComponent implements OnInit{
  options!: EChartsCoreOption
  @Input() tradeVolume!: any

  ngOnInit(): void {
    
    
    const xAxisData = [];
    const timeData = this.tradeVolume.map((item: any) => new Date(item.x* 1000).getMonth());
    // const timeData = [1, 2, 3, 4, 5, 6];
    const data2 = this.tradeVolume.map((item: any) => item.y);
    console.log('x:', timeData, 'y: ', data2);
    
    // const timeData = []
    // const data2 = []

    for (let i = 0; i < 100; i++) {
      xAxisData.push(timeData );

      // timeData.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
      // data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.options = {
      legend: {
        data: ['bar', 'bar2'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: timeData,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: 'bar2',
          type: 'bar',
          data: data2,
          animationDelay: (idx: number) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };
  }
}
