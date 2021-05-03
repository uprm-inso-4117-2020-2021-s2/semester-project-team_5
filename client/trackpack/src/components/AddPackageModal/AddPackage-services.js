import axios from "axios";

export const AddPackage = async (packageData) => {
  let errorMessage;
  const carrier = determineCarrier(packageData.tracking_number);
  if (carrier) {
    packageData.carrier = carrier;
    let res;
    await axios
      .post("http://localhost:5000/packages", packageData)
      .then((response) => {
        res = response.data;
      })
      .catch((err) => {
        errorMessage = err.response.data;
      });

    if (!errorMessage) {
      let result;
      result = await filterPackageData(res.carrier_info, res.package.package_id);
      return res;
    }
  } else {
    return { message: "Tracking Number is invalid." };
  }
};

const determineCarrier = (trackingNumber) => {
  const UPSregex = /\b(1Z ?[0-9A-Z]{3} ?[0-9A-Z]{3} ?[0-9A-Z]{2} ?[0-9A-Z]{4} ?[0-9A-Z]{3} ?[0-9A-Z]|[\dT]\d\d\d ?\d\d\d\d ?\d\d\d)\b/;
  const FedEXregex = /(\b96\d{20}\b)|(\b\d{15}\b)|(\b\d{12}\b)/;
  const FedEXregex2 = /\b((98\d\d\d\d\d?\d\d\d\d|98\d\d) ?\d\d\d\d ?\d\d\d\d( ?\d\d\d)?)\b/;
  const FedEXregex3 = /^[0-9]{15}$/;
  const USPSregex = /(\b\d{30}\b)|(\b91\d+\b)|(\b\d{20}\b)/;
  const USPSregex2 = /^E\D{1}\d{9}\D{2}$|^9\d{15,21}$/;
  const USPSregex3 = /^91[0-9]+$/;
  const USPSregex4 = /^[A-Za-z]{2}[0-9]+US$/;

  if (UPSregex.test(trackingNumber)) {
    // its UPS
    return "UPS";
  } else if (
    FedEXregex.test(trackingNumber) ||
    FedEXregex2.test(trackingNumber) ||
    FedEXregex3.test(trackingNumber)
  ) {
    //it's fedex
    return "FEDEX";
  } else if (
    USPSregex.test(trackingNumber) ||
    USPSregex2.test(trackingNumber) ||
    USPSregex3.test(trackingNumber) ||
    USPSregex4.test(trackingNumber)
  ) {
    // it's USPS
    return "USPS";
  } else {
    //throw error. It's not supported yet.
    return null;
  }
};

const filterPackageData = async (packagaData, package_id) => {
  let result = [];
  let currentInfo = {};
  let packageStatus = {};
  let errorMessage;
  let res;
  let shipment = packagaData.trackResponse.shipment;
  console.log(packagaData)
  for (let pack=0 ; pack < shipment.length; pack++) {
    // console.log("pack", shipment[pack]);
    for (let activity=0; activity < shipment[pack].package.length; activity++) {
      // console.log("activity", shipment[pack].package);
      for (let activityItem=0; activityItem < shipment[pack].package[activity].activity.length; activityItem++) {
        currentInfo.date = shipment[pack].package[activity].activity[activityItem].date;
        currentInfo.time = shipment[pack].package[activity].activity[activityItem].time
        currentInfo.location = shipment[pack].package[activity].activity[activityItem].location.address
        currentInfo.status = shipment[pack].package[activity].activity[activityItem].status
        currentInfo.package_id = package_id;

        packageStatus.description = currentInfo.status.description;
        packageStatus.code = currentInfo.status.code;
        packageStatus.date = currentInfo.date;
        packageStatus.package_id = currentInfo.package_id;

        await axios
          .post("http://localhost:5000/packages-statuses", packageStatus)
          .then((response) => {
            res = response.data;
          })
          .catch((err) => {
            errorMessage = err.response.data;
          });
        if (errorMessage) {
          return errorMessage;
        }
        result.push(currentInfo);
      }
    }
  }
  return result;
};

// {'trackResponse': {'shipment': [{'package': [{'activity': [{'date': '20191121',
//                                                             'location': {'address': {'city': 'BALDWIN',
//                                                                                      'country': 'US',
//                                                                                      'postalCode': '',
//                                                                                      'stateProvince': 'MD'}},
//                                                             'status': {'code': '48',
//                                                                        'description': 'DeliveryAttempted',
//                                                                        'type': 'X'},
//                                                             'time': '140400'},
//                                                            {'date': '20191121',
//                                                             'location': {'address': {'city': 'Sparks',
//                                                                                      'country': 'US',
//                                                                                      'postalCode': '',
//                                                                                      'stateProvince': 'MD'}},
//                                                             'status': {'code': '48',
//                                                                        'description': "Thereceiverwasnotavailablefordelivery                                                                                     'country': 'US',
//                                                                                      'postalCode': '',
//                                                                                      'stty': '',ateProvince': ''}},                                                                     untry': 'US',
//                                                             'status': {'code': 'MP',    stalCode': '',
//                                                                        'description': 'OateProvince': ''}},rderProcessed:ReadyforUPS',
//                                                                        'type': 'M'},    rderProcessed:ReadyforUPS',
//                                                             'time': '132642'}],
//                                               'trackingNumber': '1Z5338FF0107231059'}]}]}}                                                                                      }}
