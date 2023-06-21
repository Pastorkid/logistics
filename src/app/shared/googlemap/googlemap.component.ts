import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { packageDocument } from 'src/app/interface/packages';
import { PackagesService } from 'src/app/services/packages.service';

interface marker {
  lat: number;
  lng: number;
  label: string;
}
enum PackageState {
  ongoing = 'ONGOING',
  completed = 'COMPLETED',
}

@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.component.html',
  styleUrls: ['./googlemap.component.css'],
})
export class GooglemapComponent implements OnInit, AfterViewInit, OnChanges {
  markers: marker[] = [];
  icon = {
    url: '/assets/markericon.png', // url
    scaledSize: new google.maps.Size(70, 80), // scaled size
  };
  ongoingpackage: packageDocument[] = [];
  errorMessage: string = '';
  sub!: Subscription;
  @Input() zoomchangeforchild!: Subject<any>;
  zoom: BehaviorSubject<any> = new BehaviorSubject(6);
  @ViewChild('googlemapComponent') googlemapComponent: any;
  loaded: boolean = false;
  constructor(private packagesService: PackagesService) {}
  ngAfterViewInit(): void {
    this.loaded = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['zoom']) {
    }
  }

  ngOnInit(): void {
    this.zoomchangeforchild?.subscribe((data) => {
      this.zoom.next(data);
    });
    this.sub = this.packagesService
      .getpackackerequests(PackageState.ongoing)
      .subscribe({
        next: (ongoingPackage) => {
          const obj: marker[] = [];
          ongoingPackage.map((m) => {
            obj.push({
              lat: Number(m.pickup_lat),
              lng: Number(m.pickup_lon),
              label: m.pickup_address,
            });
          });
          const objtwo: marker[] = [];
          ongoingPackage.map((m) => {
            objtwo.push({
              lat: Number(m.dropoff_lat),
              lng: Number(m.dropoff_lon),
              label: m.pickup_address,
            });
          });
          this.markers.push(...obj);
          this.markers.push(...objtwo);
          this.ongoingpackage = ongoingPackage;
        },

        error: (err) => (this.errorMessage = err),
      });
  }
  display: any;
  center: BehaviorSubject<google.maps.LatLngLiteral | any> =
    new BehaviorSubject({
      lat: 9.081999,
      lng: 8.675277,
    });

  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: this.icon,
  };
}
