import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  from: any = "";
  fromLocation: any = [];
  origin: any;
  fromLocationTemplate: boolean = true;

  to: any = "";
  toLocation: any = [];
  destination: any;
  toLocationTemplate: boolean = false;

  date: any = "";
  departureDateTemplate: boolean = false

  flights: any;
  flightTemplate: boolean = false

  adults : any;



  constructor() { }

  ngOnInit(): void {
  }  

  handleFromLocation() {

    if (this.from.length > 3) {
      fetch(`https://flight-app-20id.onrender.com/city-and-airport-search/${this.from}`)
      .then(response => response.json())
      .then(data => this.fromLocation = data.data)      
    }       
    
  }

  handleOrigin(location: any) {
    this.origin = location;
    this.fromLocationTemplate = false;    
    this.toLocationTemplate = true; 
    this.fromLocation = [];  
    
  }

  handleToLocation() {

    if (this.to.length > 3) {
      fetch(`https://flight-app-20id.onrender.com/city-and-airport-search/${this.to}`)
      .then(response => response.json())
      .then(data => this.toLocation = data.data)      
    }       
    
  }

  handleDestination(location: any) {
    this.destination = location;
    this.toLocationTemplate = false;    
    this.toLocation = []
    this.departureDateTemplate = true;
  }
    
    
  onFindFlight() {
    
    if (this.date == "") {
      alert("Please choose a date")
    } else {
      fetch(`https://flight-app-20id.onrender.com/flight-search?originCode=${this.origin.iataCode}&destinationCode=${this.destination.iataCode}&dateOfDeparture=${this.date}`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
      }
     })
    .then(response => response.json())
    .then(data => {

      this.flights = data.data
      console.log(this.flights)
      this.departureDateTemplate = false
      this.flightTemplate = true
      this.adults = this.adults
    })
    .catch((error) => {

      alert(error)
    });
    }
    
  }


}

