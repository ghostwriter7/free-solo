import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextService {
  public homeTitle = 'Home';
  public homeDescription = `Hi. I'm Hubert. <br/>
   I'm a self taught developer, obsessed with learning, frankly speaking. <br />
   Would you like to get into my mind, just a little bit? Play the game below.<br />
   Would you prefer to see the work I've done? Navigate to projects. Enjoy your trip.`;

  constructor() { }
}
