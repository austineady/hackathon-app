//
//  ParkingLocationEmpty.swift
//  ImagineUpstateHackathon
//
//  Created by Harrison Stall on 6/27/15.
//  Copyright (c) 2015 harrison.r.stall@vanderbilt.edu. All rights reserved.
//

import Foundation
import MapKit

class ParkingLocationEmpty: NSObject, MKAnnotation {
  let title: String
  let locationName: String
  let coordinate: CLLocationCoordinate2D
  let spotsAvail: Int
  let maxSpots: Int
  let filledSpots: Int
  let price: Int
  
  init(title: String, locationName: String, coordinate: CLLocationCoordinate2D, spotsAvail: Int, maxSpots: Int, filledSpots: Int, price: Int) {
    self.title = title
    self.locationName = locationName
    self.coordinate = coordinate
    self.spotsAvail = spotsAvail
    self.maxSpots = maxSpots
    self.filledSpots = filledSpots
    self.price = price
    super.init()
  }
  
  var subtitle: String {
    return locationName
  }
  
  func mapItem() -> MKMapItem {
    
    var mapItem = MKMapItem()
    return mapItem
  }
  
  
}