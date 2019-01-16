import { Component, OnInit, HostListener } from "@angular/core";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { environment } from "../../environments/environment";

import {
  SwiperComponent,
  SwiperDirective,
  SwiperConfigInterface,
  SwiperScrollbarInterface,
  SwiperPaginationInterface
} from "ngx-swiper-wrapper";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  constructor(private heroService: HeroService) {
    this.getScreenSize();
  }

  heroes: Hero[] = [];
  screenHeight: any;
  screenWidth: any;

  public config: SwiperConfigInterface = {
    a11y: true,
    direction: "vertical",
    slidesPerView: 1.5,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: true
  };

  ngOnInit() {
    console.log(environment);
    this.getHeroes();
    this.heroService.getTum().subscribe(data => console.log(data));
    this.heroService.getHello().subscribe(data => console.log(data));
    this.heroService.getTest().subscribe(data => console.log(data));
  }
  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe(heroes => (this.heroes = heroes.slice(1, 5)));
  }

  @HostListener("window:resize", ["$event"])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < "768") {
      console.log("less than");
      this.config.direction = "vertical";
    } else {
      this.config.direction = "horizontal";
    }

    console.log(this.screenHeight, this.screenWidth);
  }
}
