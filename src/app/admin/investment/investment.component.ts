import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ii-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit {
  investObj = '';
  isInvestor = false;

  constructor(private
  ) {
  }

  ngOnInit() {
  }

}
