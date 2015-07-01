//
//  ViewController.swift
//  ImagineUpstateHackathon
//
//  Created by Harrison Stall on 6/26/15.
//  Copyright (c) 2015 harrison.r.stall@vanderbilt.edu. All rights reserved.
//

import UIKit
import MapKit


class ViewController: UIViewController {

  @IBOutlet weak var spotsAvailLabel: UILabel!
  @IBOutlet weak var logoView: UIImageView!
  
  @IBOutlet weak var currentVendor: UILabel!

  
  @IBOutlet weak var bgImage: UIImageView!
  
  
  var numOpenSpots = 50
  let myColor:UIColor = UIColor(red: 76/255.0, green: 175/255.0, blue: 80/255.0, alpha: 1.0)
  //red:76.0, green:175.0,blue:80.0,alpha:1.0
  
  override func viewDidLoad() {
    super.viewDidLoad()
    // Do any additional setup after loading the view, typically from a nib.
    self.view.backgroundColor = myColor
    
    currentVendor.text = "Current Vendor: Main St."
    
    bgImage.image = UIImage(named:"greenvilleparking(1).gif")!
  
    DataManager.getTopAppsDataFromFileWithSuccess { (data) -> Void in
      // Get the number 1 app using optional binding and NSJSONSerialization
      //1
      var parseError: NSError?
      let parsedObject: AnyObject? = NSJSONSerialization.JSONObjectWithData(data,
        options: NSJSONReadingOptions.AllowFragments,
        error:&parseError)
      
      
      //2
      if let topApps = parsedObject as? NSDictionary {
        println("this runs2")
        if let id = topApps["id"] as? NSDictionary {
//          if let apps = feed["entry"] as? NSArray {
//            if let firstApp = apps[0] as? NSDictionary {
//              if let imname = firstApp["im:name"] as? NSDictionary {
//                if let appName = imname["label"] as? NSString {
//                  //3
//                  println("Optional Binding: \(appName)")
//                }
//              }
//            }
          //}
          println(id)
        }
      }
    }
  
  
  
  }

  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
    // Dispose of any resources that can be recreated.
  }

  @IBAction func plusButtonPressed(sender: UIButton) {
    numOpenSpots+=1
    spotsAvailLabel!.text = "Spots Available: \(numOpenSpots)"
  }


  @IBAction func minusButtonPressed(sender: UIButton) {
    numOpenSpots-=1
    spotsAvailLabel!.text = "Spots Available: \(numOpenSpots)"
    
  }
}

