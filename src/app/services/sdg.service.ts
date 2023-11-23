import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SdgService {

  sgdIconLabels: string[] = [
    'No Poverty', 'Zero Hunger', 'Good Health and Well-Being', 'Quality Education', 'Gender Equality',
    'Clean Water and Sanitation', 'Affordable and Clean Energy', 'Decent Work and Economic Growth',
    'Industry, Innovation, and Infrastructure', 'Reduced Inequalities', 'Sustainable Cities and Communities',
    'Responsible Consumption and Production', 'Climate Action', 'Life Below Water', 'Life on Land',
    'Peace, Justice, and Strong Institutions', 'Partnerships for the Goals'
  ];

  sdgIconColors: string[] = [
    '#eb1c2dff', '#d3a029ff', '#279b48ff',
    '#c31f33ff', '#ef402bff', '#00aed9ff', '#fdb713ff', '#8f1838ff',
    '#f36d25ff', '#e11484ff', '#f99d26ff', '#cf8d2aff', '#48773eff',
    '#007dbcff', '#5dbb46ff', '#02558bff', '#183668ff'
  ];

  sdgIconDescriptions: string[] = [
    'End poverty everywhere in its all forms.',
    'End hunger, achieve food security and improved nutrition and promote sustainable agriculture.',
    'Ensure healthy lives and promote well-being for all at all ages.',
    'Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.',
    'Achieve gender equality and empower all women and girls.',
    'Ensure availability and sustainable management of water and sanitation for all.',
    'Ensure access to affordable, reliable, sustainable and modern energy for all.',
    'Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all.',
    'Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation.',
    'Reduce inequality within and among countries.',
    'Make cities and human settlements inclusive, safe, resilient and sustainable.',
    'Ensure sustainable comsumption and production patterns.',
    'Take urgent action to combat climate change and its impacts.',
    'Conserve and sustainably use the oceans, seas and marine resources for sustainable development.',
    'Protect, restore, and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss.',
    'Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels.',
    'Strengthen the means of implementation and revitalize the Global Partnerships Sustainable Development.'
  ];

  sdgIconPaths: string[] = this.createSDGSIconPathsArray();
  private createSDGSIconPathsArray() : string[] {
    const iconBasePath = '/assets/images/sdgs/E-WEB-Goal-'
    const array = [];
    for (let i = 1; i <= 17; i++) {
      // Use String literal and padStart to achieve the '01', '02', ..., '17' format
      const filename: string = `${iconBasePath}${i.toString().padStart(2, '0')}.png`;

      array.push(filename);
    }
    return array;
  }

  sdgIconImages: HTMLImageElement[] = this.createSDGSIconImagesArray();
  private createSDGSIconImagesArray() : HTMLImageElement[] {
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


  private selectedGoalSource = new BehaviorSubject<number>(0);
  selectedGoal$ = this.selectedGoalSource.asObservable();

  updateSelectedGoal(goal: number) {
    this.selectedGoalSource.next(goal);
    console.log('updated goal!', goal)
  }

  constructor() { }
}
