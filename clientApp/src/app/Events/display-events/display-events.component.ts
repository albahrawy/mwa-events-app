import { Component } from "@angular/core";

/**
 * @title Card with multiple sections
 */
@Component({
  selector: "card-fancy-example",
  templateUrl: "card-fancy-example.html",
  styleUrls: ["card-fancy-example.css"]
})
export class CardFancyExample {
  events = [
    {
      name: "name1",
      title: "title1",
      description: "description1",
      date: "date1",
      address: "location1",
      location: { long: 1, lat: 2 },
      category: "",
      image: "https://material.angular.io/assets/img/examples/shiba2.jpg",
      comments: [],
      members: []
    },
    {
      name: "name2",
      title: "title2",
      description: "description2",
      date: "date2",
      location: "location2",
      image: "https://material.angular.io/assets/img/examples/shiba2.jpg"
    },
    {
      name: "name3",
      title: "title3",
      description: "description3",
      date: "date3",
      location: "location3",
      image: "https://material.angular.io/assets/img/examples/shiba2.jpg"
    },
    {
      name: "name4",
      title: "title4",
      description: "description4",
      date: "date4",
      location: "location4",
      image: "https://material.angular.io/assets/img/examples/shiba2.jpg"
    },
    {
      name: "name5",
      title: "title5",
      description: "description5",
      date: "date5",
      location: "location5",
      image: "https://material.angular.io/assets/img/examples/shiba2.jpg"
    },
    {
      name: "name6",
      title: "title6",
      description: "description6",
      date: "date6",
      location: "location6",
      image: "https://material.angular.io/assets/img/examples/shiba2.jpg"
    },
    {
      name: "name7",
      title: "title7",
      description: "description7",
      date: "date7",
      location: "location7",
      image: "https://material.angular.io/assets/img/examples/shiba2.jpg"
    },
    {
      name: "name8",
      title: "title8",
      description: "description8",
      date: "date8",
      location: "location8",
      image: "https://material.angular.io/assets/img/examples/shiba2.jpg"
    },
    {
      name: "name9",
      title: "title9",
      description: "description9",
      date: "date9",
      location: "location9",
      image: "https://material.angular.io/assets/img/examples/shiba2.jpg"
    }
  ];
}

