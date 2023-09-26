import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
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
  flight: any;
  flightTemplate: boolean = false

  booked: boolean = false

  first: string = "";
  last: string= "";

  

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }  

  // onFindFlight() {
    
  //   if (this.date == "") {
  //     alert("Please choose a date")
  //   } else {
  //     fetch(`http://localhost:5000/flight-search?originCode=${this.origin.iataCode}&destinationCode=${this.destination.iataCode}&dateOfDeparture=${this.date}`, {
  //     method: 'GET', 
  //     headers: {
  //       'Content-Type': 'application/json',
  //     }
  //    })
  //   .then(response => response.json())
  //   .then(data => {

  //     this.flights = data.data
  //     console.log(this.flights)
  //     this.departureDateTemplate = false
  //     this.flightTemplate = true
  //   })
  //   .catch((error) => {

  //     alert(error)
  //   });
  //   }
    
  // }

  onBookFlight(flight: any) {

    if (this.first == "" && this.last == "") {
      alert("Enter your first and last name")
      return;
    }

    const data = { flight: flight };
    const name = {
      first: this.first,
      last: this.last
    }
    const dataForBookingFlight = { flight: flight, name: name }
   

    fetch('http://localhost:5000/flight-confirmation', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(dataObject => {
      console.log('Success:');

      const data = { flight: flight };

      console.log(data);
      

      fetch('http://localhost:5000/flight-booking', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataForBookingFlight),
      })
      .then(response => response.json())
      .then(data => {

        console.log('Success:', data);
        

        this.booked  = true;
        this.flightTemplate = false
        this.flights = []
        this._router.navigate(['success']);
      })
      .catch((error) => {

        alert(error)
      });

    })
    .catch((error) => {
      console.error('Error:', error);
      alert(error)
    });
  }
}
