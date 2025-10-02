export interface InsurancePackages{
    id:number;
    title:string;
    description:string;
    price:string;
    image:string;
    selected:boolean;
}

export const insuranceData: InsurancePackages[]= [
  {
    id: 1,
    title: 'Home Insurance',
    description: 'Lorem Ipsum is simply dummy text of the printing & typesetting industry Lorem Ipsum is simply dummy text.',
    price: '2000.00',
    image: '/assets/homeInsurance.jpg',
    selected: true,
  },
  {
    id: 2,
    title: 'Car Insurance',
    description: 'Lorem Ipsum is simply dummy text of the printing & typesetting industry Lorem Ipsum is simply dummy text.',
    price: '2000.00',
    image: '/assets/carInsurance.jpg',
    selected: false,
  },
  {
    id: 3,
    title: 'Life Insurance',
    description: 'Lorem Ipsum is simply dummy text of the printing & typesetting industry Lorem Ipsum is simply dummy text.',
    price: '2000.00',
    image: '/assets/lifeInsurance.jpg',
    selected: false,
  },
  {
    id: 4,
    title: 'Health Insurance',
    description: 'Lorem Ipsum is simply dummy text of the printing & typesetting industry Lorem Ipsum is simply dummy text.',
    price: '2000.00',
    image: '/assets/healthInsurance.png',
    selected: false,
  },
  {
    id: 5,
    title: 'Travel Insurance',
    description: 'Lorem Ipsum is simply dummy text of the printing & typesetting industry Lorem Ipsum is simply dummy text.',
    price: '2000.00',
    image: '/assets/travelInsurance.jpg',
    selected: false,
  },
  {
    id: 6,
    title: 'Business Insurance',
    description: 'Lorem Ipsum is simply dummy text of the printing & typesetting industry Lorem Ipsum is simply dummy text.',
    price: '2000.00',
    image: '/assets/businessInsurance.jpg',
    selected: false,
  },
];
