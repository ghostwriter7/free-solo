import { Component, OnInit } from '@angular/core';
import { IconsService } from '../../core/services';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public links: { icon: string; path: string; tooltip: string }[] = [
    { icon: 'github', path: 'https://github.com/ghostwriter7', tooltip: 'My GitHub profile' },
    { icon: 'linkedin', path: 'https://www.linkedin.com/in/hubert-rozplochowski-266a4a220/', tooltip: 'My LinkedIn profile' },
    { icon: 'movie', path: 'https://www.youtube.com/watch?v=-sXGkJsTrY8&t=7s', tooltip: 'Juggling!' }
  ];


  constructor(public iconsService: IconsService) { }

  ngOnInit(): void {
  }

}
